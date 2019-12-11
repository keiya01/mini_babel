import fs from "fs";

const write = async (code: string, dir: string, file: string) => {
	if (!fs.existsSync(dir)) {
		fs.mkdirSync(dir);
	}
	fs.writeFileSync(`${dir}/${file}`, code);
};

export default write;
