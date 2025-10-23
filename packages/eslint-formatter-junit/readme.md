# eslint-formatter-junit

> ESLint's `junit` formatter as a standalone package

## Demo

```xml
<?xml version="1.0" encoding="utf-8"?>
<testsuites>
<testsuite package="org.eslint" time="0" tests="1" errors="1" name="foo.js">
<testcase time="0" name="org.eslint.foo" classname="foo"><failure message="Unexpected foo."><![CDATA[line 5, col 10, Error - Unexpected foo. (foo)]]></failure></testcase>
</testsuite>
<testsuite package="org.eslint" time="0" tests="1" errors="1" name="bar.js">
<testcase time="0" name="org.eslint.bar" classname="bar"><failure message="Unexpected bar."><![CDATA[line 6, col 11, Warning - Unexpected bar. (bar)]]></failure></testcase>
</testsuite>
<testsuite package="org.eslint" time="0" tests="1" errors="1" name="baz.js">
<testcase time="0" name="org.eslint.unknown" classname="baz"><error message="Fatal error parsing file."><![CDATA[line 1, col 1, Error - Fatal error parsing file.]]></error></testcase>
</testsuite>
</testsuites>
```
