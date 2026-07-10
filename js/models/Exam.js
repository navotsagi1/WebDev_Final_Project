//+====================== Exam ======================+
export class Exam {
  constructor(id, teacherId, title, description, category, code, durationMinutes) {
    this.id = id;
    this.teacherId = teacherId;
    this.title = title;
    this.description = description;
    this.category = category;
    this.code = code;
    this.durationMinutes = durationMinutes;
    this.questions = [];
    this.createdAt = new Date().toISOString();
  }

  addQuestion(question) {
    this.questions.push(question);
  }

  removeQuestion(questionId) {
    this.questions = this.questions.filter(question => question.id !== questionId);
  }
}