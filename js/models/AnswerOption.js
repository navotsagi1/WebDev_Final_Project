//+====================== AnswerOption ======================+
export class AnswerOption {
  constructor(id, text, isCorrect = false) {
    this.id = id;
    this.text = text;
    this.isCorrect = isCorrect;
  }
}