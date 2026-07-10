import { Exam } from "../models/Exam.js";
import { StorageService } from "./StorageService.js";
import { STORAGE_KEYS } from "../utils/StorageKeys.js";

//+====================== Exam Service ======================+
export class ExamService {
    //+============ Exam Object Management ============+
    static createExam(teacherId, title, description, category, code, durationMinutes) {
        if (!title || !code || !durationMinutes) {
            return {
                success: false,
                data: null,
                message: "Title, exam code, and duration are required."
            };
        }

        const exams = StorageService.get(STORAGE_KEYS.EXAMS);
        const codeExists = exams.some(exam => exam.code === code);

        if (codeExists) {
            return {
                success: false,
                data: null,
                message: `Exam code "${code}" already exists.`
            };
        }

        const exam = new Exam(
            Date.now().toString(),
            teacherId,
            title,
            description,
            category,
            code,
            Number(durationMinutes)
        );

        StorageService.add(STORAGE_KEYS.EXAMS, exam);

        return {
            success: true,
            data: exam,
            message: "Exam created successfully."
        };
    }


    static getExamsByTeacher(teacherId) {
        const exams = StorageService.get(STORAGE_KEYS.EXAMS);

        return exams.filter(exam => exam.teacherId === teacherId);
    }


    static deleteExam(examId) {
        const exam = StorageService.find(STORAGE_KEYS.EXAMS, examId);

        if (!exam) {
            return {
                success: false,
                data: null,
                message: "Exam not found."
            };
        }

        StorageService.remove(STORAGE_KEYS.EXAMS, examId);

        return {
            success: true,
            data: exam,
            message: "Exam deleted successfully."
        };
    }



    static getExam(examId) {
        const exam = StorageService.find(STORAGE_KEYS.EXAMS, examId);

        if (!exam) {
            return {
                success: false,
                message: "Exam not found."
            };
        }

        return {
            success: true,
            data: exam,
            message: "Exam found."
        };
    }


    static getAllExams() {
        const exams = StorageService.get(STORAGE_KEYS.EXAMS);

        return {
            success: true,
            data: exams,
            message: "Exams loaded successfully."
        };
    }
    

    static updateExam(examId, title, description) {
        const exam = StorageService.find(STORAGE_KEYS.EXAMS, examId);

        if (!exam) {
            return {
                success: false,
                message: "Exam not found."
            };
        }

        exam.title = title;
        exam.description = description;

        StorageService.update(STORAGE_KEYS.EXAMS, examId, exam);

        return {
            success: true,
            data: exam,
            message: "Exam updated successfully."
        };
    }


    
    //+============ Exam Detail Management ============+
    
    static addQuestion(examId, questionText) {
        const exam = StorageService.find(STORAGE_KEYS.EXAMS, examId);

        if (!exam) {
            return {
                success: false,
                message: "Exam not found."
            };
        }

        const question = {
            id: crypto.randomUUID(),
            text: questionText,
            answerOptions: []
        };

        exam.questions.push(question);

        StorageService.update(STORAGE_KEYS.EXAMS, examId, exam);

        return {
            success: true,
            data: question,
            message: "Question added successfully."
        };
    }


    static removeQuestion(examId, questionId) {
        const exam = StorageService.find(STORAGE_KEYS.EXAMS, examId);

        if (!exam) {
            return {
                success: false,
                message: "Exam not found."
            };
        }

        exam.questions = exam.questions.filter(question => question.id !== questionId);

        StorageService.update(STORAGE_KEYS.EXAMS, examId, exam);

        return {
            success: true,
            data: exam,
            message: "Question removed successfully."
        };
    }


    static addAnswerOption(examId, questionId, optionText, isCorrect) {
        const exam = StorageService.find(STORAGE_KEYS.EXAMS, examId);

        if (!exam) {
            return {
                success: false,
                message: "Exam not found."
            };
        }

        const question = exam.questions.find(question => question.id === questionId);

        if (!question) {
            return {
                success: false,
                message: "Question not found."
            };
        }

        if (isCorrect) {
            question.answerOptions.forEach(option => {
                option.isCorrect = false;
            });
        }

        const answerOption = {
            id: crypto.randomUUID(),
            text: optionText,
            isCorrect
        };

        question.answerOptions.push(answerOption);

        StorageService.update(STORAGE_KEYS.EXAMS, examId, exam);

        return {
            success: true,
            data: answerOption,
            message: "Answer option added successfully."
        };
    }


    static removeAnswerOption(examId, questionId, optionId) {
        const exam = StorageService.find(STORAGE_KEYS.EXAMS, examId);

        if (!exam) {
            return {
                success: false,
                message: "Exam not found."
            };
        }

        const question = exam.questions.find(question => question.id === questionId);

        if (!question) {
            return {
                success: false,
                message: "Question not found."
            };
        }

        question.answerOptions = question.answerOptions.filter(option => option.id !== optionId);

        StorageService.update(STORAGE_KEYS.EXAMS, examId, exam);

        return {
            success: true,
            data: exam,
            message: "Answer option removed successfully."
        };
    }
}