//+====================== Result ======================+
export class Result {
  constructor(id, examId, studentId, score, totalQuestions, answers) {
    this.id = id;
    this.examId = examId;
    this.studentId = studentId;
    this.score = score;
    this.totalQuestions = totalQuestions;
    this.answers = answers;
    this.submittedAt = new Date().toISOString();
  }
}