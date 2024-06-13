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

The commands are self-explanatory, but please note that the first two are meant to handle only one item at a time. The module will write to a JSON file (shoppingList.json) and store each item in a string array. This module utilizes a local HTTP web server using Node.js. 

The server uses port **3000**, so if your Raspberry PI has a local address of 127.0.0.1, you can access the list at **127.0.0.1:3000**. Or you can just open a web browser and type "**http://localhost:3000/**". Some port forwarding may be needed, or firewall settings may need to be configured.  

The server can be launched manually by going to ~/MagicMirror/modules/MMM-ShoppingList/WebServer and typing _**node WebServer.js**_ in the terminal. 

You should see the following message _**Server running at http://localhost:3000/**_

# Automating Web Server and MagicMirror start

To integrate the Node.js web server into your MMM-ShoppingList module to run in the background whenever you start your Magic Mirror, you can create a script that starts both the Magic Mirror and the web server. 

1.) Create a Script: Create a script file (e.g., start.sh) in your Magic Mirror directory.

2.) Edit the Script: Edit the script to start both the Magic Mirror and the Node.js web server. The script should first start the web server using node WebServer.js and then start the Magic Mirror using npm start. Make sure to use the appropriate paths.

Heres what the script may look like

	#!/bin/bash

	# Start the Node.js web server for the shopping list
	cd /home/<yourUsername>/MagicMirror/modules/MMM-ShoppingList/WebServer
	node WebServer.js &

	# Start the Magic Mirror
	cd ~/MagicMirror
	DISPLAY=:0 npm start



3.) Make the script executable 

	chmod +x start.sh

4.) Now start your mirror using the following

	pm2 start <yourScriptName>

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
