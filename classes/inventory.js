export default class Inventory {
  items = [];
  owner = null;
  constructor(owner) {
    this.owner = owner;
  }
  addItem = (item) => {
    this.items.push(item);
    console.log(`You picked up ${item.name}.`);
  };

  dropItem = (item) => {
    this.owner.currentRoom.addItem(item);
    this.items.splice(this.items.indexOf(item), 1);
    console.log(`You dropped ${item.name}.`);
  };

  getItem = (itemName) => {
    let item = this.items.find(
      (item) => item.name.toLowerCase() === itemName.toLowerCase()
    );
    return item;
  };

  listItems = () => {
    console.log("Inventory:");
    this.items.forEach((item) => {
      console.log(`- ${item.name}`);
    });
  };
}
