import estraverse from "estraverse";
import { Program, VariableDeclaration, VariableDeclarator, Node } from "estree";
import { Declarators } from "./types/declarator";

const getVariableDeclaratorName = (declaration: VariableDeclarator) => {
	if (declaration.id.type !== "Identifier") {
		return null;
	}
	return declaration.id.name;
};

const toArrowFunction = (declaration: VariableDeclarator) => {
	if (declaration.init && declaration.init.type === "FunctionExpression") {
		declaration.init.type = "ArrowFunctionExpression" as any;
	}
	return declaration;
};

const getAssignmentVariableName = (node: Node) => {
	if (
		node.type === "ExpressionStatement" &&
		node.expression.type === "AssignmentExpression" &&
		node.expression.left.type === "Identifier"
	) {
		return node.expression.left.name;
	}
};

const changeVariableDeclarationKind = (childNode: VariableDeclaration, declarators: Declarators) => {
	childNode.declarations.map(declaration => {
		if (declaration.id.type === "Identifier") {
			childNode.kind = declarators[declaration.id.name];
		}
	});
};

const traverse = (ast: Program) => {
	const declarators: Declarators = {};
	estraverse.traverse(ast, {
		enter: node => {
			if (node.type !== "Program") {
				return estraverse.VisitorOption.Skip;
			}

			node.body = node.body.map(childNode => {
				if (childNode.type == "VariableDeclaration") {
					childNode.declarations = childNode.declarations.map(declaration => {
						const variable = getVariableDeclaratorName(declaration);
						if (variable) {
							declarators[variable] = "const";
						}
						return toArrowFunction(declaration);
					});
				}

				const assignmentVariable = getAssignmentVariableName(childNode);
				if (assignmentVariable) {
					declarators[assignmentVariable] = "let";
				}

				return childNode;
			});
		},
		leave: node => {
			if (node.type !== "Program") {
				return estraverse.VisitorOption.Skip;
			}
			node.body.map(childNode => {
				if (childNode.type === "VariableDeclaration") {
					changeVariableDeclarationKind(childNode, declarators);
				}
			});
		}
	});
	return ast;
};

export default traverse;
