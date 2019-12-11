import { parse } from "./parse";
import traverse from "./traverse";
import unparse from "./unparse";
import write from "./file";
import { BuildConfig } from "./types/build";

const build = (config: BuildConfig) => {
	let ast = parse(config.entry);
	ast = traverse(ast);
	const code = unparse(ast);
	write(code, config.outDir, config.output);
};

export default build;
