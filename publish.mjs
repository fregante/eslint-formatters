// Hacked around, not cleaned up, seems to work
import path from 'path';
import {createRequire} from 'module';
import {promises as fs} from 'fs';

const require = createRequire(import.meta.url);
const downloadNpmPackage = require('download-npm-package');
const execa = require('execa');

const testing = false;

const formatters = ['checkstyle', 'compact', 'jslint-xml', 'json', 'json-with-metadata', 'junit', 'stylish', 'tap', 'unix', 'visualstudio'];

function getEslint(version = 'latest') {
	return downloadNpmPackage({
		arg: 'eslint@' + version,
		dir: 'eslint/' + version,
	});
}

console.log('Downloading ESLint…');
await getEslint();

const eslintPackage = JSON.parse(await fs.readFile('eslint/latest/eslint/package.json', 'utf8'));
const testingFixture = JSON.parse(await fs.readFile('test/fixture.json', 'utf8'));

if (eslintPackage.license !== 'MIT') {
	throw new Error('License is not MIT');
}

if (!eslintPackage.version.startsWith('8')) {
	throw new Error('Version is not 8');
}

if (eslintPackage.type === 'module') {
	throw new Error('Type is not `cjs`');
}

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
	const packageJson = JSON.parse(await fs.readFile(dir + '/package.json', 'utf8'));
	packageJson.name = name;
	packageJson.description = description;
	packageJson.author = eslintPackage.author;
	packageJson.homepage = `https://github.com/fregante/eslint-formatters/tree/main/packages/${name}`;
	packageJson.engines.node = eslintPackage.engines.node;
	packageJson.dependencies = dependencies;
	packageJson.files = ['index.js', 'index.d.ts'];

	await fs.writeFile(dir + '/package.json', JSON.stringify(packageJson, null, '\t') + '\n');
}

async function setVersion(dir, version) {
	const packageJson = JSON.parse(await fs.readFile(dir + '/package.json', 'utf8'));
	packageJson.version = version;
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
	return execa(`node_modules/.bin/ncc`, [
		'build',
		formatterFileName,
		'-o',
		dir,
		'--license',
		'license',
		...Object.keys(dependencies).flatMap(dep => ['--external', dep]),
	]);
}

async function createPackage(formatter) {
	const name = `eslint-formatter-${formatter}`;
	const dir = 'packages/' + name;
	const formatterFileName = `eslint/latest/eslint/lib/cli-engine/formatters/${formatter}.js`;
	const description = `ESLint’s official \`${formatter}\` formatter, unofficially published as a standalone module`;

	console.log('Creating folder…');
	await fs.mkdir(dir, {recursive: true});

	console.log('Parsing dependencies…');
	const dependencies = await getDependencies({formatterFileName, dir});

	console.log('Creating package…');
	await Promise.all([
		createPackageJson({name, description, dependencies: dependencies, dir}),
		createReadme({name, description, formatter, dir}),
		fs.copyFile('template/index.d.ts', dir + '/index.d.ts'),
		bundleFormatter({formatterFileName, dir, dependencies: dependencies}),
	]);

	console.log('Testing package…');
	await execa('npm', ['install', '--no-package-lock'], {
		cwd: dir,
	});
	const format = require(path.resolve(dir + '/index.js'));
	const output = format(testingFixture);
	await fs.writeFile(dir + '/expected-out', output);

	const hasChanges = await execa(`git`, ['diff', '--exit-code', '--', './' + dir]).then(
		() => false,
		() => true
	);
	if (!hasChanges) {
		console.log('No changes detected');
		return;
	}

	if (testing) {
		console.log('Dry run, will not publish');
		return;
	}

	console.log('Publishing…'), await setVersion(dir, eslintPackage.version);
	await execa(`npm`, ['publish', './' + dir]);
}

for (const formatter of formatters) {
	console.log(`


Publishing ${formatter}…`);
	await createPackage(formatter);
}

console.log(`

`);

const hasAnyChanges = await execa('git', ['commit', '--dry-run']).then(
	() => true,
	() => false
);
if (hasAnyChanges) {
	console.log(`Committing changes…`);
	await execa('git', ['commit', '--all', '--message', eslintPackage.version]);
} else {
	console.log(`No changes found`);
}
