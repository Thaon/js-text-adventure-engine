import Observable from "./observable.js";

export default class Item extends Observable {
  value = 0;

  constructor(name, description, value) {
    super(name, description);
    this.value = value;
  }

  pickupItem = (player) => {
    player.inventory.addItem(this);
  };

  dropItem = (player) => {
    player.inventory.dropItem(this);
  };
}
