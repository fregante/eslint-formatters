#!/bin/bash

set -e

root=$(pwd)
PATH="$PATH":$(npm bin)

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

# Download eslint
npm pack eslint | xargs cat |tar -xz
eslint="$root/package"

# Test downloaded package and extract some values
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

# TODO: Remove once ready
version="0.0.2"

rm -rf packages

for formatter in $packages; do
	cd "$root"

	# Setup package
	pkgName="eslint-formatter-$formatter"
	mkdir -p "packages/$pkgName"
	description="ESLint’s official \`$formatter\` formatter, unofficially published as a standalone module"

	cd "packages/$pkgName"

	# Create package.json
	cp "$root/template/package.json" package.json
	dot-json package.json name "$pkgName"
	dot-json package.json version "$version"
	dot-json package.json node.engines "$nodeEngine"
	dot-json package.json author "$author"
	dot-json package.json description "$description"
	dot-json package.json homepage "https://github.com/fregante/eslint-formatters/tree/main/packages/$pkgName"

	# Generate readme
	sed "s|NAME|$pkgName|;s|DESCRIPTION|$description|;s|FORMATTER|$formatter|" > readme.md < "$root/template/readme.md"

	# Extract actual module
	ncc build "$eslint/lib/cli-engine/formatters/$formatter.js" -o . --license license

	# Add types
	cp "$root/template/index.d.ts" .

	# 🎉
	npm publish
done
