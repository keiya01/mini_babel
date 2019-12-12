import build from "../build";
import { BuildConfig } from "../types/build";

const mockDirs: { [key: string]: any } = {};

jest.mock("fs", () => ({
	...jest.requireActual("fs"),
	readdir: (path: string, callback: (error: NodeJS.ErrnoException | null, files: string[]) => void) => {
		callback(null, Object.keys(mockDirs[path]));
	},
	existsSync: (_: string) => {
		return true;
	},
	writeFileSync: (path: string, data: string) => {
		const [dir, file] = path.split("/");
		mockDirs[dir] = {};
		mockDirs[dir][file] = data;
	},
	readFileSync: (path: string, _: string) => {
		const [dir, file] = path.split("/");
		return mockDirs[dir][file];
	}
}));

const buildConfig: BuildConfig = { rootDir: "mockFiles", outDir: "mockDist" };

describe("build()", () => {
	it("should be transformed to const declaration if var declaration is declared only once", () => {
		mockDirs["mockFiles"] = {
			"mock.js": "var a = 'test';"
		};
		build(buildConfig);
		expect(mockDirs[buildConfig.outDir]["mock.js"]).toEqual("const a = 'test';");
	});

	it("should be transformed to let declaration if value is assigned to variable of var declaration at multiple times", () => {
		mockDirs["mockFiles"] = {
			"mock.js": `
var a = 'test';
a = 'abc';
      `.trim()
		};
		build(buildConfig);
		expect(mockDirs[buildConfig.outDir]["mock.js"]).toEqual(
			`
let a = 'test';
a = 'abc';
    `.trim()
		);
	});

	it("should be transformed to const declaration if let declaration is declared only once", () => {
		mockDirs["mockFiles"] = {
			"mock.js": "let a = 'test';"
		};
		build(buildConfig);
		expect(mockDirs[buildConfig.outDir]["mock.js"]).toEqual("const a = 'test';");
	});

	it("should be transformed arrow function if normal function is assigned to variable", () => {
		mockDirs["mockFiles"] = {
			"mock.js": `
const a = function() {
}
`.trim()
		};
		build(buildConfig);
		expect(mockDirs[buildConfig.outDir]["mock.js"]).toEqual(
			`
const a = () => {
};`.trim()
		);
	});
});
