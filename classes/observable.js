export default class Observable {
  name = "";
  description = "";

  constructor(name, description) {
    this.name = name;
    this.description = description;
  }

  quickInspect = () => {
    console.log(`-----------------`);
    console.log(`${this.name}`);
    console.log(`${this.description}`);
  };

  fullInspect = () => {
    console.log(`-----------------`);
    console.log(`${this.name}`);
    console.log(`${this.description}`);
  };
}
