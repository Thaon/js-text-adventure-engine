import Observable from "./observable.js";

export default class Room extends Observable {
  exits = {
    north: null,
    south: null,
    east: null,
    west: null,
  };
  items = [];
  entities = [];

  // exits --------------------------------------------------
  addExit(direction, room) {
    this.exits[direction] = room;
  }

  hasExit = (direction) => {
    let hasExit = this.exits[direction] !== undefined;
    return hasExit;
  };

  getExit = (direction) => {
    return this.exits[direction];
  };

  // items --------------------------------------------------

  addItem = (item) => {
    this.items.push(item);
  };

  removeItem = (item) => {
    this.items.splice(this.items.indexOf(item), 1);
  };

  getItem = (itemName) => {
    let item = this.items.find(
      (item) => item.name.toLowerCase() === itemName.toLowerCase()
    );
    return item;
  };

  listItems = () => {
    console.log("Items in the room:");
    this.items.forEach((item) => {
      console.log(`- ${item.name}`);
    });
  };

  // entities --------------------------------------------------

  addEntity = (entity) => {
    entity.setCurrentRoom(this);
    this.entities.push(entity);
  };

  removeEntity = (entity) => {
    this.entities.splice(this.entities.indexOf(entity), 1);
  };

  getEntity = (entityName) => {
    let entity = this.entities.find(
      (entity) => entity.name.toLowerCase() === entityName.toLowerCase()
    );
    return entity;
  };

  listEntities = () => {
    console.log("Entities in the room:");
    this.entities.forEach((entity) => {
      console.log(`- ${entity.name}`);
    });
  };

  moveEntity = (entity, direction) => {
    if (this.hasExit(direction)) {
      // remove from current room
      this.removeEntity(entity);
      // move to new room
      this.addEntity(entity);
      // notify the player
      console.log(`You have entered ${this.name}.\n${this.description}`);
    } else {
      console.log(`You can't go that way.`);
    }
  };

  moveEntityToRoom = (entity, room) => {
    entity.currentRoom = room;
    console.log(`${entity.name} was magically transported to ${room.name}.`);
  };

  // inspect --------------------------------------------------

  quickInspect = () => {
    console.log(`-----------------`);
    console.log(`${this.name}`);
  };

  fullInspect = () => {
    console.log(`-----------------`);
    console.log(`${this.name}`);
    console.log(`${this.description}`);
  };
}
