# MMM-ShoppingList
Shopping List Module for MagicMirror² that utilizes MMM-GoogleAssistant to add and remove items to a list. 

# Description
This module uses voice commands to add items to a shopping list, organizing each item as a bullet point on your mirror. It's designed to help you add food items to the list as you finish them in the kitchen. You can then download the list as a PDF to your phone via the local web server and view it while shopping in the store.

Once you've returned home from the grocery store, you can ask the mirror to clear the shopping list and start fresh for the new week. 

# How it Works

The Shopping List module can be started by triggering your Google Assistant using its listener ("Hey Google", "Ok Google", "Jarvis", etc).  

Followed by either of the three below commands:

    1.) "Add <item> to the shopping list"
  
    2.) "Remove <item> from the shopping list"
  
    3.) "Clear the shopping list"

The commands are self-explanatory, but please note that the first two are meant to handle only one item at a time.

# Screenshots

![Shopping List](https://github.com/miguelrflor/MMM-ShoppingList/raw/master/Screenshots/ShoppingList_Empty.png)

![Shopping List](https://github.com/miguelrflor/MMM-ShoppingList/raw/master/Screenshots/ShoppingList_Items.png)

# Installation

    cd ~MagicMirror/modules
    git clone https://github.com/miguelrflor/MMM-ShoppingList.git

# Configuration
    {
        module: "MMM-ShoppingList",
        position: "top_left", // Adjust the position as needed
        header: "Shopping List",
        config: {
				columnCount: 3
        }
    },
