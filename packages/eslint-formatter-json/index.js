/**
 * @fileoverview JSON reporter
 * @author Burak Yigit Kaya aka BYK
 */

//------------------------------------------------------------------------------
// Public Interface
//------------------------------------------------------------------------------

module.exports = function (results) {
	return JSON.stringify(results);
};