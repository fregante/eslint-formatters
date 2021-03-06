module.exports =
/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ 295:
/***/ ((module, __unused_webpack_exports, __nccwpck_require__) => {

/**
 * @fileoverview "table reporter.
 * @author Gajus Kuizinas <gajus@gajus.com>
 */


//------------------------------------------------------------------------------
// Requirements
//------------------------------------------------------------------------------

const chalk = __nccwpck_require__(242),
    table = __nccwpck_require__(137).table;

//------------------------------------------------------------------------------
// Helpers
//------------------------------------------------------------------------------

/**
 * Given a word and a count, append an "s" if count is not one.
 * @param {string} word A word.
 * @param {number} count Quantity.
 * @returns {string} The original word with an s on the end if count is not one.
 */
function pluralize(word, count) {
    return (count === 1 ? word : `${word}s`);
}

/**
 * Draws text table.
 * @param {Array<Object>} messages Error messages relating to a specific file.
 * @returns {string} A text table.
 */
function drawTable(messages) {
    const rows = [];

    if (messages.length === 0) {
        return "";
    }

    rows.push([
        chalk.bold("Line"),
        chalk.bold("Column"),
        chalk.bold("Type"),
        chalk.bold("Message"),
        chalk.bold("Rule ID")
    ]);

    messages.forEach(message => {
        let messageType;

        if (message.fatal || message.severity === 2) {
            messageType = chalk.red("error");
        } else {
            messageType = chalk.yellow("warning");
        }

        rows.push([
            message.line || 0,
            message.column || 0,
            messageType,
            message.message,
            message.ruleId || ""
        ]);
    });

    return table(rows, {
        columns: {
            0: {
                width: 8,
                wrapWord: true
            },
            1: {
                width: 8,
                wrapWord: true
            },
            2: {
                width: 8,
                wrapWord: true
            },
            3: {
                paddingRight: 5,
                width: 50,
                wrapWord: true
            },
            4: {
                width: 20,
                wrapWord: true
            }
        },
        drawHorizontalLine(index) {
            return index === 1;
        }
    });
}

/**
 * Draws a report (multiple tables).
 * @param {Array} results Report results for every file.
 * @returns {string} A column of text tables.
 */
function drawReport(results) {
    let files;

    files = results.map(result => {
        if (!result.messages.length) {
            return "";
        }

        return `\n${result.filePath}\n\n${drawTable(result.messages)}`;
    });

    files = files.filter(content => content.trim());

    return files.join("");
}

//------------------------------------------------------------------------------
// Public Interface
//------------------------------------------------------------------------------

module.exports = function(report) {
    let result,
        errorCount,
        warningCount;

    result = "";
    errorCount = 0;
    warningCount = 0;

    report.forEach(fileReport => {
        errorCount += fileReport.errorCount;
        warningCount += fileReport.warningCount;
    });

    if (errorCount || warningCount) {
        result = drawReport(report);
    }

    result += `\n${table([
        [
            chalk.red(pluralize(`${errorCount} Error`, errorCount))
        ],
        [
            chalk.yellow(pluralize(`${warningCount} Warning`, warningCount))
        ]
    ], {
        columns: {
            0: {
                width: 110,
                wrapWord: true
            }
        },
        drawHorizontalLine() {
            return true;
        }
    })}`;

    return result;
};


/***/ }),

/***/ 242:
/***/ ((module) => {

module.exports = require("chalk");;

/***/ }),

/***/ 137:
/***/ ((module) => {

module.exports = require("table");;

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
/******/ 	return __nccwpck_require__(295);
/******/ })()
;