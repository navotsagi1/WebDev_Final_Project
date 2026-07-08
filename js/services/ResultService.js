import { StorageService } from "./StorageService.js";
import { STORAGE_KEYS } from "../utils/storageKeys.js";

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
}