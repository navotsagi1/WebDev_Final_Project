import { StorageService } from "./StorageService.js";
import { STORAGE_KEYS } from "../utils/StorageKeys.js";

//+====================== Result Service ======================+
export class ResultService {
    static submitResult(studentId, exam) {
        let correctAnswers = 0;
        let totalQuestions = exam.questions.length;

        exam.questions.forEach(question => {
            const selectedOption = question.answerOptions.find(option => option.selected);

            if (selectedOption && selectedOption.isCorrect) {
                correctAnswers++;
            }
        });

        const score = totalQuestions === 0
            ? 0
            : Math.round((correctAnswers / totalQuestions) * 100);

        const result = {
            id: crypto.randomUUID(),
            studentId,
            examId: exam.id,
            examTitle: exam.title,
            score,
            correctAnswers,
            totalQuestions,
            submittedAt: new Date().toISOString()
        };

        StorageService.add(STORAGE_KEYS.RESULTS, result);

        return {
            success: true,
            data: result,
            message: "Exam submitted successfully."
        };
    }

    static getResultsByStudent(studentId) {
        const results = StorageService.get(STORAGE_KEYS.RESULTS);

        const studentResults = results.filter(result =>
            result.studentId === studentId
        );

        return {
            success: true,
            data: studentResults,
            message: "Student results loaded successfully."
        };
    }


    static getResultsByExam(examId) {
        const results = StorageService.get(STORAGE_KEYS.RESULTS);

        const examResults = results.filter(result =>
            result.examId === examId
        );

        return {
            success: true,
            data: examResults,
            message: "Exam results loaded successfully."
        };
    }


    static getResultsForTeacher(teacherId) {
        const results = StorageService.get(STORAGE_KEYS.RESULTS);
        const exams = StorageService.get(STORAGE_KEYS.EXAMS);

        const teacherExamIds = exams
            .filter(exam => exam.teacherId === teacherId)
            .map(exam => exam.id);

        const teacherResults = results.filter(result =>
            teacherExamIds.includes(result.examId)
        );

        return {
            success: true,
            data: teacherResults,
            message: "Teacher results loaded successfully."
        };
    }
}