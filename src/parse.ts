import * as acorn from "acorn";
import fs from "fs";

export const parse = (filename: string) => {
	return acorn.parse(fs.readFileSync(filename, "utf-8"), { sourceType: "module" });
};
