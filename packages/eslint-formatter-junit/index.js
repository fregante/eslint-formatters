module.exports =
/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ 562:
/***/ ((module, __unused_webpack_exports, __nccwpck_require__) => {

/**
 * @fileoverview jUnit Reporter
 * @author Jamund Ferguson
 */


const xmlEscape = __nccwpck_require__(2);
const path = __nccwpck_require__(622);

//------------------------------------------------------------------------------
// Helper Functions
//------------------------------------------------------------------------------

/**
 * Returns the severity of warning or error
 * @param {Object} message message object to examine
 * @returns {string} severity level
 * @private
 */
function getMessageType(message) {
    if (message.fatal || message.severity === 2) {
        return "Error";
    }
    return "Warning";

}

/**
 * Returns a full file path without extension
 * @param {string} filePath input file path
 * @returns {string} file path without extension
 * @private
 */
function pathWithoutExt(filePath) {
    return path.join(path.dirname(filePath), path.basename(filePath, path.extname(filePath)));
}

//------------------------------------------------------------------------------
// Public Interface
//------------------------------------------------------------------------------

module.exports = function(results) {

    let output = "";

    output += "<?xml version=\"1.0\" encoding=\"utf-8\"?>\n";
    output += "<testsuites>\n";

    results.forEach(result => {

        const messages = result.messages;
        const classname = pathWithoutExt(result.filePath);

        if (messages.length > 0) {
            output += `<testsuite package="org.eslint" time="0" tests="${messages.length}" errors="${messages.length}" name="${result.filePath}">\n`;
            messages.forEach(message => {
                const type = message.fatal ? "error" : "failure";

                output += `<testcase time="0" name="org.eslint.${message.ruleId || "unknown"}" classname="${classname}">`;
                output += `<${type} message="${xmlEscape(message.message || "")}">`;
                output += "<![CDATA[";
                output += `line ${message.line || 0}, col `;
                output += `${message.column || 0}, ${getMessageType(message)}`;
                output += ` - ${xmlEscape(message.message || "")}`;
                output += (message.ruleId ? ` (${message.ruleId})` : "");
                output += "]]>";
                output += `</${type}>`;
                output += "</testcase>\n";
            });
            output += "</testsuite>\n";
        } else {
            output += `<testsuite package="org.eslint" time="0" tests="1" errors="0" name="${result.filePath}">\n`;
            output += `<testcase time="0" name="${result.filePath}" classname="${classname}" />\n`;
            output += "</testsuite>\n";
        }

    });

    output += "</testsuites>\n";

    return output;
};


/***/ }),

/***/ 2:
/***/ ((module) => {

/**
 * @fileoverview XML character escaper
 * @author George Chung
 */


//------------------------------------------------------------------------------
// Public Interface
//------------------------------------------------------------------------------

/**
 * Returns the escaped value for a character
 * @param {string} s string to examine
 * @returns {string} severity level
 * @private
 */
module.exports = function(s) {
    return (`${s}`).replace(/[<>&"'\x00-\x1F\x7F\u0080-\uFFFF]/gu, c => { // eslint-disable-line no-control-regex
        switch (c) {
            case "<":
                return "&lt;";
            case ">":
                return "&gt;";
            case "&":
                return "&amp;";
            case "\"":
                return "&quot;";
            case "'":
                return "&apos;";
            default:
                return `&#${c.charCodeAt(0)};`;
        }
    });
};


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
/******/ 	return __nccwpck_require__(562);
/******/ })()
;