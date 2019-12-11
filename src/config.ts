import path from "path";
import fs from "fs";
import { BuildConfig } from "./types/build";

export const readConfigJSON = (): BuildConfig => {
	return JSON.parse(fs.readFileSync(path.resolve("mini_babel.json"), "utf-8"));
};
