# eslint-formatters (publisher)

> Automatically extracts and published the native ESLint formatter.

[Every native ESLint formatter](https://github.com/eslint/eslint/tree/main/lib/cli-engine/formatters) is extracted and published as if `eslint/eslint` was a monorepo.

**Important:** If you're using ESLint, these packages are not useful to you, they are all built into ESLint.

You can see the [output of each on eslint.org](https://eslint.org/docs/user-guide/formatters/).

- [eslint-formatter-checkstyle](packages/eslint-formatter-checkstyle)
- [eslint-formatter-compact](packages/eslint-formatter-compact)
- ~~eslint-formatter-html~~ _unfortunately already exists, so it's not published_
- [eslint-formatter-jslint-xml](packages/eslint-formatter-jslint-xml)
- [eslint-formatter-json](packages/eslint-formatter-json)
- [eslint-formatter-json-with-metadata](packages/eslint-formatter-json-with-metadata)
- [eslint-formatter-junit](packages/eslint-formatter-junit)
- [eslint-formatter-stylish](packages/eslint-formatter-stylish)
- [eslint-formatter-tap](packages/eslint-formatter-tap)
- [eslint-formatter-unix](packages/eslint-formatter-unix)
- [eslint-formatter-visualstudio](packages/eslint-formatter-visualstudio)

Also, ESLint 8 dropped 2 formatters and they're now available as their own projects:

- [eslint-community/eslint-formatter-codeframe](https://github.com/eslint-community/eslint-formatter-codeframe)
- [eslint-community/eslint-formatter-table](https://github.com/eslint-community/eslint-formatter-table)

**Note for ESLint’s maintainers:** Open an issue or ping me on Twitter [@fregante](https://twitter.com/fregante) if you'd like to publish these packages yourself as part of a monorepo. I'll gladly pass the npm names to you. Much 💚
