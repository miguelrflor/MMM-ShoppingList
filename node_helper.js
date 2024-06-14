/* MagicMirror²
 * Module: MMM-ShoppingList
 *
 * By [Miguel Flores]
 */

const NodeHelper = require('node_helper');
const fs = require('fs');
const path = require('path');
const os = require('os');

module.exports = NodeHelper.create({
    shoppingList: [],
    filePath: path.join(os.homedir(), 'MagicMirror/modules/MMM-ShoppingList/shoppingList.json'),

    start: function () {
        this.sendSocketNotification('GET_SHOPPING_LIST');
    },

    socketNotificationReceived: function (notification, payload) {
        if (notification === 'GET_SHOPPING_LIST') {
            this.readShoppingList();
        } else if (notification === 'ADD_TO_SHOPPING_LIST') {
            this.shoppingList.push(payload.item);
            this.writeShoppingList();
        } else if (notification === 'REMOVE_FROM_SHOPPING_LIST') {
            this.removeItemFromShoppingList(payload.item);
        } else if (notification === 'CLEAR_SHOPPING_LIST') {
            this.clearShoppingList();
        }
    },

    readShoppingList: function () {
        fs.readFile(this.filePath, 'utf8', (err, data) => {
            if (err) {
                console.error('Error reading shopping list:', err);
                return;
            }

            try {
                this.shoppingList = JSON.parse(data);
                this.sendSocketNotification('SHOPPING_LIST', this.shoppingList);
            } catch (parseError) {
                console.error('Error parsing shopping list:', parseError);
            }
        });
    },

    writeShoppingList: function () {
        const jsonString = JSON.stringify(this.shoppingList);

        fs.writeFile(this.filePath, jsonString, 'utf8', (err) => {
            if (err) {
                console.error('Error writing shopping list:', err);
                return;
            }

            this.sendSocketNotification('SHOPPING_LIST', this.shoppingList);
        });
    },

    removeItemFromShoppingList: function (item) {
        const index = this.shoppingList.indexOf(item);
        if (index !== -1) {
            this.shoppingList.splice(index, 1);
            this.writeShoppingList();
        }
    },
    
    clearShoppingList: function () {
        this.shoppingList = []; // Clear the list
        this.writeShoppingList(); // Write the empty list to the file
    },
});
