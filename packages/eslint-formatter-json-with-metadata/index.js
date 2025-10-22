/**
 * @fileoverview JSON reporter, including rules metadata
 * @author Chris Meyer
 */

//------------------------------------------------------------------------------
// Public Interface
//------------------------------------------------------------------------------

module.exports = function (results, data) {
	return JSON.stringify({
		results,
		metadata: data,
	});
};