import estraverse from "estraverse";
import { Program, VariableDeclaration } from "estree";

const toConstDeclaration = (node: VariableDeclaration) => {
	if (node.kind === "var") {
		node.kind = "const";
	}
};

const toArrowFunction = (node: VariableDeclaration) => {
	node.declarations = node.declarations.map(declaration => {
		if (declaration.init && declaration.init.type === "FunctionExpression") {
			declaration.init.type = "ArrowFunctionExpression" as any;
		}
		return declaration;
	});
};

const traverse = (ast: Program) => {
	estraverse.traverse(ast, {
		enter: node => {
			if (node.type !== "Program") {
				return estraverse.VisitorOption.Skip;
			}

			ast.body = node.body.map(childNode => {
				if (childNode.type == "VariableDeclaration") {
					toConstDeclaration(childNode);
					toArrowFunction(childNode);
					return childNode;
				}

				return childNode;
			});
		}
	});
	return ast;
};

export default traverse;
