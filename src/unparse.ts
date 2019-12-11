import escodegen from "escodegen";
import { Program } from "estree";

const unparse = (ast: Program) => {
	return escodegen.generate(ast);
};

export default unparse;
