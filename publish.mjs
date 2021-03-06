// Hacked around, not cleaned up, seems to work
'use strict';
import {createRequire} from 'module';
import {promises as fs} from 'fs';
import {spawn} from 'child_process';

const require = createRequire(import.meta.url);
const downloadNpmPackage = require('download-npm-package');

const currentVersion = '0.0.4';

function runCommand(command) {
	return spawn('sh', ['-c', command], {
		cwd: process.cwd(),
		stdio: 'inherit',
		detached: true,
	});
}

const packages = [
	'checkstyle',
	'codeframe',
	'compact',
	'jslint-xml',
	'json',
	'json-with-metadata',
	'junit',
	'stylish',
	'table',
	'tap',
	'unix',
	'visualstudio',
];

function getEslint(version = 'latest') {
	return downloadNpmPackage({
		arg: 'eslint@' + version,
		dir: 'eslint/' + version,
	});
}

console.log('Downloading ESLint…');
await getEslint();
console.log('Downloaded ESLint');

const eslintPackage = JSON.parse(await fs.readFile('eslint/latest/eslint/package.json', 'utf8'));

if (eslintPackage.license !== 'MIT') {
	throw new Error('License is not MIT');
}

if (!eslintPackage.version.startsWith('7')) {
	throw new Error('Version is not 7');
}

if (eslintPackage.type === 'module') {
	throw new Error('Type is not `cjs`');
}

const packageJsonTemplate = JSON.parse(await fs.readFile('template/package.json', 'utf8'));
const readmeTemplate = await fs.readFile('template/readme.md', 'utf8');

async function getDependencies({formatterFileName}) {
	const formatterFile = await fs.readFile(formatterFileName, 'utf8');
	const matches = formatterFile.matchAll(/require\("([^.][^"]+)"\)/g);
	const dependencies = {};
	for (const [, dependency] of matches) {
		const version = eslintPackage.dependencies[dependency];
		if (version) {
			dependencies[dependency] = version;
		}
	}
	return dependencies;
}

async function createPackageJson({description, name, dependencies, dir}) {
	const packageJson = JSON.parse(JSON.stringify(packageJsonTemplate));
	packageJson.name = name;
	packageJson.description = description;
	packageJson.version = currentVersion;
	packageJson.author = eslintPackage.author;
	packageJson.homepage = `https://github.com/fregante/eslint-formatters/tree/main/packages/${name}`;
	packageJson.engines.node = eslintPackage.engines.node;
	packageJson.dependencies = dependencies;

	await fs.writeFile(dir + '/package.json', JSON.stringify(packageJson, null, '\t') + '\n');
}

async function createReadme({name, description, formatter, dir}) {
	await fs.writeFile(
		dir + '/readme.md',
		readmeTemplate
			.replace(/NAME/g, name)
			.replace(/DESCRIPTION/g, description)
			.replace(/FORMATTER/g, formatter)
	);
}

async function bundleFormatter({formatterFileName, dir, dependencies}) {
	await runCommand(
		`node_modules/.bin/ncc build ${formatterFileName} -o ${dir} --license license ` +
			Object.keys(dependencies)
				.map(dep => '--external ' + dep)
				.join(' ')
	);
}

async function createPackage(formatter) {
	console.log('Creating', formatter);
	const name = `eslint-formatter-${formatter}`;
	const dir = 'packages/' + name;
	const formatterFileName = `eslint/latest/eslint/lib/cli-engine/formatters/${formatter}.js`;
	const description = `ESLint’s official \`${formatter}\` formatter, unofficially published as a standalone module`;

	await fs.mkdir(dir, {recursive: true});

	const dependencies = await getDependencies({formatterFileName, dir});

	await createPackageJson({name, description, dependencies, dir});
	await createReadme({name, description, formatter, dir});
	await fs.copyFile('template/index.d.ts', dir + '/index.d.ts');

	await bundleFormatter({formatterFileName, dir, dependencies});

	// 🎉
	await runCommand(`npm publish ${dir}`);
}
await fs.rm('packages', {
	recursive: true,
});

await Promise.all(packages.map(formatter => createPackage(formatter)));
