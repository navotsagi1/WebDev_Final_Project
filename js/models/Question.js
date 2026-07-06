//+====================== Question ======================+
export class Question {
  constructor(id, text, options = []) {
    this.id = id;
    this.text = text;
    this.options = options;
  }

  addOption(option) {
    this.options.push(option);
  }
}