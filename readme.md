# eslint-formatters (publisher)

> Automatically extracts formatters from ESLint and publishes them as standalone packages

**Important:** If you're using ESLint, these packages are not useful to you, they are built into ESLint.

You can see the [output of each on eslint.org](https://eslint.org/docs/user-guide/formatters/).

- [eslint-formatter-stylish](packages/eslint-formatter-stylish)
- [eslint-formatter-json](packages/eslint-formatter-json)
- [eslint-formatter-json-with-metadata](packages/eslint-formatter-json-with-metadata)
- ~~eslint-formatter-html~~ _unfortunately already exists, so it's not published_

ESLint 8 dropped 2 formatters and they're now available as their own projects:

- [eslint-community/eslint-formatter-codeframe](https://github.com/eslint-community/eslint-formatter-codeframe)
- [eslint-community/eslint-formatter-table](https://github.com/eslint-community/eslint-formatter-table)

ESLint 9 dropped more formatters, but they're [not yet maintained independently](https://github.com/eslint/eslint/issues/17524). You can still find them here:

- [eslint-formatter-checkstyle](packages/eslint-formatter-checkstyle)
- [eslint-formatter-compact](packages/eslint-formatter-compact)
- [eslint-formatter-jslint-xml](packages/eslint-formatter-jslint-xml)
- [eslint-formatter-junit](packages/eslint-formatter-junit)
- [eslint-formatter-tap](packages/eslint-formatter-tap)
- [eslint-formatter-unix](packages/eslint-formatter-unix)
- [eslint-formatter-visualstudio](packages/eslint-formatter-visualstudio)
