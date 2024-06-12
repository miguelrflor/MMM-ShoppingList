/* MagicMirror²
 * Module: MMM-ShoppingList
 *
 * By [Miguel Flores]
 */

/**
 * This logger is used to proxy console.log messages inside the node_helper.js so that it can be mocked in tests.
 */
const LoggerProxy = {};

const levels = ['debug', 'log', 'info', 'warn', 'error'];
for (const level of levels) {
    LoggerProxy[level] = function (message) {
        console[level](`MMM-ShoppingList: ${message}`);
    };
}
module.exports = LoggerProxy;




