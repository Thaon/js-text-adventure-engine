// packages
import ps from "prompt-sync";
// custom classes
import Entity from "./entity.js";
import Item from "./item.js";
import Room from "./room.js";

// variable initializations must be after imports
const prompt = ps();

export default class Game {
  entities = [];
  rooms = [];
  items = [];
  player = null;

  introduction =
    "Welcome to the js text adventure engine, type help for a list of commands!";

  initialize = async () => {
    // setup items and entities
    let item = new Item("Sword", "It's a sword.", 10);
    this.items.push(item);
    // setup rooms
    let initialRoom = new Room("Starting room", "It's a fairly lit room, yo.");
    initialRoom.addItem(item);
    this.rooms.push(initialRoom);
    // finally, setup the player
    this.player = new Entity("Player", "It's you, come on.");
    initialRoom.addEntity(this.player);

    // show the player the introduction
    console.log(this.introduction);
  };

  parseCommand = async (command) => {
    // process command
    let commandArray = command.split(" ");
    let commandName = commandArray[0];
    let commandArgs = commandArray.slice(1);
    // console.log(commandName, commandArgs);
    let currentItem = null;

    //switch on the commandName
    switch (commandName) {
      case "search":
        console.log("Searching the room, you find: ");
        this.player.currentRoom.listItems();
        this.player.currentRoom.listEntities();
        break;
      case "examine":
        currentItem = this.player.currentRoom.getItem(commandArgs[0]); // is it in the room?
        if (currentItem == null)
          currentItem = this.player.inventory.getItem(commandArgs[0]); // is it in the inventory?
        if (currentItem == null)
          currentItem = this.player.currentRoom.getEntity(commandArgs[0]); // is it an entity in the room?
        if (currentItem) {
          currentItem.fullInspect();
        } else {
          console.log("You don't see that here.");
        }
        break;
      case "inventory":
        this.player.inventory.listItems();
        break;
      case "go":
        this.player.moveEntity(commandArgs[0]);
        break;
      case "pick":
        currentItem = this.player.currentRoom.getItem(commandArgs[0]);
        if (currentItem) {
          this.player.inventory.addItem(currentItem);
          this.player.currentRoom.removeItem(currentItem);
        } else console.log("There's no such item here.");
        break;

      case "drop":
        currentItem = this.player.inventory.getItem(commandArgs[0]);
        if (itm2) {
          this.player.inventory.dropItem(currentItem);
        } else console.log("You don't have that item.");
        break;

      case "quit":
        process.exit();
        break;

      case "help":
        console.log("Available commands:");
        console.log("- go [direction]");
        console.log("- search");
        console.log("- inventory");
        console.log("- examine [item]");
        console.log("- pick [item]");
        console.log("- drop [item]");
        console.log("- quit");
        break;

      default:
        console.log("I don't understand that command.");
        break;
    }
  };

  gameLoop = async () => {
    await this.initialize();

    let command = "";

    while (command !== "quit") {
      command = prompt("> ");
      this.parseCommand(command);
    }
  };
}
