import { parse } from "./parse";
import traverse from "./traverse";
import unparse from "./unparse";

const filename = process.argv[2];
let ast = parse(filename);
ast = traverse(ast);
const code = unparse(ast);

console.log(code);
