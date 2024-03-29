module.exports =
/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ 541:
/***/ ((module, __unused_webpack_exports, __nccwpck_require__) => {

/**
 * @fileoverview Codeframe reporter
 * @author Vitor Balocco
 */


const chalk = __nccwpck_require__(242);
const { codeFrameColumns } = __nccwpck_require__(208);
const path = __nccwpck_require__(622);

//------------------------------------------------------------------------------
// Helpers
//------------------------------------------------------------------------------

/**
 * Given a word and a count, append an s if count is not one.
 * @param   {string} word  A word in its singular form.
 * @param   {number} count A number controlling whether word should be pluralized.
 * @returns {string}       The original word with an s on the end if count is not one.
 */
function pluralize(word, count) {
    return (count === 1 ? word : `${word}s`);
}

/**
 * Gets a formatted relative file path from an absolute path and a line/column in the file.
 * @param   {string} filePath The absolute file path to format.
 * @param   {number} line     The line from the file to use for formatting.
 * @param   {number} column   The column from the file to use for formatting.
 * @returns {string}          The formatted file path.
 */
function formatFilePath(filePath, line, column) {
    let relPath = path.relative(process.cwd(), filePath);

    if (line && column) {
        relPath += `:${line}:${column}`;
    }

    return chalk.green(relPath);
}

/**
 * Gets the formatted output for a given message.
 * @param   {Object} message      The object that represents this message.
 * @param   {Object} parentResult The result object that this message belongs to.
 * @returns {string}              The formatted output.
 */
function formatMessage(message, parentResult) {
    const type = (message.fatal || message.severity === 2) ? chalk.red("error") : chalk.yellow("warning");
    const msg = `${chalk.bold(message.message.replace(/([^ ])\.$/u, "$1"))}`;
    const ruleId = message.fatal ? "" : chalk.dim(`(${message.ruleId})`);
    const filePath = formatFilePath(parentResult.filePath, message.line, message.column);
    const sourceCode = parentResult.output ? parentResult.output : parentResult.source;

    const firstLine = [
        `${type}:`,
        `${msg}`,
        ruleId ? `${ruleId}` : "",
        sourceCode ? `at ${filePath}:` : `at ${filePath}`
    ].filter(String).join(" ");

    const result = [firstLine];

    if (sourceCode) {
        result.push(
            codeFrameColumns(sourceCode, { start: { line: message.line, column: message.column } }, { highlightCode: false })
        );
    }

    return result.join("\n");
}

/**
 * Gets the formatted output summary for a given number of errors and warnings.
 * @param   {number} errors   The number of errors.
 * @param   {number} warnings The number of warnings.
 * @param   {number} fixableErrors The number of fixable errors.
 * @param   {number} fixableWarnings The number of fixable warnings.
 * @returns {string}          The formatted output summary.
 */
function formatSummary(errors, warnings, fixableErrors, fixableWarnings) {
    const summaryColor = errors > 0 ? "red" : "yellow";
    const summary = [];
    const fixablesSummary = [];

    if (errors > 0) {
        summary.push(`${errors} ${pluralize("error", errors)}`);
    }

    if (warnings > 0) {
        summary.push(`${warnings} ${pluralize("warning", warnings)}`);
    }

    if (fixableErrors > 0) {
        fixablesSummary.push(`${fixableErrors} ${pluralize("error", fixableErrors)}`);
    }

    if (fixableWarnings > 0) {
        fixablesSummary.push(`${fixableWarnings} ${pluralize("warning", fixableWarnings)}`);
    }

    let output = chalk[summaryColor].bold(`${summary.join(" and ")} found.`);

    if (fixableErrors || fixableWarnings) {
        output += chalk[summaryColor].bold(`\n${fixablesSummary.join(" and ")} potentially fixable with the \`--fix\` option.`);
    }

    return output;
}

//------------------------------------------------------------------------------
// Public Interface
//------------------------------------------------------------------------------

module.exports = function(results) {
    let errors = 0;
    let warnings = 0;
    let fixableErrors = 0;
    let fixableWarnings = 0;

    const resultsWithMessages = results.filter(result => result.messages.length > 0);

    let output = resultsWithMessages.reduce((resultsOutput, result) => {
        const messages = result.messages.map(message => `${formatMessage(message, result)}\n\n`);

        errors += result.errorCount;
        warnings += result.warningCount;
        fixableErrors += result.fixableErrorCount;
        fixableWarnings += result.fixableWarningCount;

        return resultsOutput.concat(messages);
    }, []).join("\n");

    output += "\n";
    output += formatSummary(errors, warnings, fixableErrors, fixableWarnings);

    return (errors + warnings) > 0 ? output : "";
};


/***/ }),

/***/ 208:
/***/ ((module) => {

module.exports = require("@babel/code-frame");;

/***/ }),

/***/ 242:
/***/ ((module) => {

module.exports = require("chalk");;

/***/ }),

/***/ 622:
/***/ ((module) => {

module.exports = require("path");;

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __nccwpck_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		if(__webpack_module_cache__[moduleId]) {
/******/ 			return __webpack_module_cache__[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		var threw = true;
/******/ 		try {
/******/ 			__webpack_modules__[moduleId](module, module.exports, __nccwpck_require__);
/******/ 			threw = false;
/******/ 		} finally {
/******/ 			if(threw) delete __webpack_module_cache__[moduleId];
/******/ 		}
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/compat */
/******/ 	
/******/ 	__nccwpck_require__.ab = __dirname + "/";/************************************************************************/
/******/ 	// module exports must be returned from runtime so entry inlining is disabled
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	return __nccwpck_require__(541);
/******/ })()
;