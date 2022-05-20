import Inventory from "./inventory.js";
import Observable from "./observable.js";

export default class Entity extends Observable {
  currentRoom = null;
  inventory = new Inventory(this);

  setCurrentRoom(currentRoom) {
    this.currentRoom = currentRoom;
  }

  moveEntity = (direction) => {
    this.currentRoom.moveEntity(this, direction);
  };
}
