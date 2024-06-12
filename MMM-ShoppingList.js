/* MagicMirror²
 * Module: MMM-ShoppingList
 *
 * By [Miguel Flores]
 */

Module.register('MMM-ShoppingList', {
    shoppingList: [],
    
    defaults: {
        columnCount: 1 // Default column count
    },

    start: function () {
        this.sendSocketNotification('GET_SHOPPING_LIST');
    },

    socketNotificationReceived: function (notification, payload) {
        console.log(`Received notification: ${notification}`);

        if (notification === 'SHOPPING_LIST') {
            console.log('Received shopping list:', JSON.stringify(payload));
            this.shoppingList = payload;
            this.updateDom();
        } else if (notification === 'ADD_TO_SHOPPING_LIST') {
            console.log(`Received new item: ${payload.item}`);
            this.shoppingList.push(payload.item);
            this.updateDom();
		} else if (notification === 'REMOVE_FROM_SHOPPING_LIST') {
            console.log(`Removing item: ${payload.item}`);
            const index = this.shoppingList.indexOf(payload.item);
            if (index !== -1) {
                this.shoppingList.splice(index, 1);
                this.updateDom();
            }
        } else if (notification === 'CLEAR_SHOPPING_LIST') {
            console.log('Clearing shopping list');
            this.shoppingList = [];
            this.updateDom();
        }
    },

	getStyles: function () {
		return ['MMM-ShoppingList.css'];
	},

    getDom: function () {
        const wrapper = document.createElement('div');
        wrapper.className = 'MMM-ShoppingList-wrapper'; // Add a custom class for styling

        // Apply column count style
        wrapper.style.columnCount = this.config.columnCount || this.defaults.columnCount;

        if (this.shoppingList.length === 0) {
            wrapper.innerHTML = '<b>Shopping list is empty.</b>';
        } else {
            // Create the list and populate it with items
            const list = document.createElement('ul');
            this.shoppingList.forEach(item => {
                const listItem = document.createElement('li');
                listItem.innerHTML = item;
                list.appendChild(listItem);
            });

            // Append the list to the wrapper
            wrapper.appendChild(list);
        }

        return wrapper;
    },
});
