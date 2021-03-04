#!/bin/bash

set -e
root=$(pwd)
PATH="$PATH":$(npm bin)

# Download eslint
npm pack eslint | xargs cat |tar -xz
eslint="$root/package"

license=$(dot-json "$eslint/package.json" license)
[ "$license" = 'MIT' ] || {
	echo License is not MIT
	exit 1
}

version=$(dot-json "$eslint/package.json" version)
[[ "$version" == 7* ]] || {
	echo Version is not 7
	exit 1
}

type=$(dot-json "$eslint/package.json" type)
[[ "$type" == "module" ]] && {
	echo Type is not \`cjs\`
	exit 1
}

nodeEngine=$(dot-json "$eslint/package.json" engines.node)
author=$(dot-json "$eslint/package.json" author)

# html is already taken 😰
packages="
checkstyle
codeframe
compact
jslint-xml
json
json-with-metadata
junit
stylish
table
tap
unix
visualstudio"

rm -rf packages

for formatter in $packages; do
	cd "$root"
	pkgName="eslint-formatter-$formatter"
	mkdir -p "packages/$pkgName"
	description="ESLint’s official \`$formatter\` formatter, unofficially published as a standalone module"

	cd "packages/$pkgName"

	cp "$root/package-template.json" package.json
	dot-json package.json name "$pkgName"
	# dot-json package.json version "$version"
	dot-json package.json version "0.0.0"
	dot-json package.json node.engines "$nodeEngine"
	dot-json package.json author "$author"
	dot-json package.json description "$description"

	# Generate readme
	sed "s|NAME|$pkgName|;s|DESCRIPTION|$description|;s|FORMATTER|$formatter|" > readme.md < "$root/readme-template.md"

	# Extract actual module
	ncc build "$eslint/lib/cli-engine/formatters/$formatter.js" -o . --license license
	npm publish
done
