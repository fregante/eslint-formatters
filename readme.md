# eslint-formatters (publisher)

> Automatically extracts and published the native ESLint formatter.

This [every native ESLint formatter](https://github.com/eslint/eslint/tree/master/lib/cli-engine/formatters) is extracted and published as if `eslint/eslint` was a monorepo.

You can see the [output of each on eslint.org](https://eslint.org/docs/user-guide/formatters/).

- [eslint-formatter-checkstyle](packages/eslint-formatter-checkstyle)
- [eslint-formatter-codeframe](packages/eslint-formatter-codeframe)
- [eslint-formatter-compact](packages/eslint-formatter-compact)
- ~~eslint-formatter-html~~ _unfortunately already exists, so it's not published_
- [eslint-formatter-jslint-xml](packages/eslint-formatter-jslint-xml)
- [eslint-formatter-json](packages/eslint-formatter-json)
- [eslint-formatter-json-with-metadata](packages/eslint-formatter-json-with-metadata)
- [eslint-formatter-junit](packages/eslint-formatter-junit)
- [eslint-formatter-stylish](packages/eslint-formatter-stylish)
- [eslint-formatter-table](packages/eslint-formatter-table)
- [eslint-formatter-tap](packages/eslint-formatter-tap)
- [eslint-formatter-unix](packages/eslint-formatter-unix)
- [eslint-formatter-visualstudio](packages/eslint-formatter-visualstudio)

**Important:** If you're using ESLint, these packages are not useful to you, they are all built into ESLint.

**Note for ESLint’s maintainers:** Open an issue if you'd like to publish these packages yourself as part of a monorepo. I'll gladly pass the npm names to you. Much 💚
