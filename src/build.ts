import fs from "fs";
import { parse } from "./parse";
import traverse from "./traverse";
import unparse from "./unparse";
import write from "./file";
import { BuildConfig } from "./types/build";

const build = (config: BuildConfig) => {
	fs.readdir(config.rootDir, (error, files) => {
		if (error) {
			throw new Error(`${error}`);
		}
		files.map(file => {
			let ast = parse(`${config.rootDir}/${file}`);
			ast = traverse(ast);
			const code = unparse(ast);
			write(code, config.outDir, file);
		});
	});
};

export default build;
