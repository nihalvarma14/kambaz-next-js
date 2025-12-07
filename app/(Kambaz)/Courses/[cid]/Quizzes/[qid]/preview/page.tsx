"use client";
import { useParams, useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { Button, Form, Card, Alert } from "react-bootstrap";
import { FaCheckCircle, FaTimesCircle } from "react-icons/fa";
import * as client from "../../client";

interface Question {
  _id: string;
  quiz: string;
  title: string;
  type: string;
  points: number;
  question: string;
  choices?: string[];
  correctAnswer?: string | number | boolean;
  possibleAnswers?: string[];
}

interface Quiz {
  _id: string;
  title: string;
  points: number;
}

export default function QuizPreview() {
  const params = useParams();
  const cid = params.cid as string;
  const qid = params.qid as string;
  const router = useRouter();
  const [quiz, setQuiz] = useState<Quiz | null>(null);
  const [questions, setQuestions] = useState<Question[]>([]);
  const [answers, setAnswers] = useState<Record<string, string | number | boolean>>({});
  const [submitted, setSubmitted] = useState(false);
  const [score, setScore] = useState(0);

  const fetchQuizAndQuestions = async () => {
    try {
      const [quizData, questionsData] = await Promise.all([
        client.findQuizById(qid),
        client.findQuestionsForQuiz(qid),
      ]);
      setQuiz(quizData);
      setQuestions(questionsData);
    } catch (error) {
      console.error("Error fetching quiz:", error);
    }
  };

  useEffect(() => {
    fetchQuizAndQuestions();
  }, [qid]);

  const handleAnswerChange = (questionId: string, answer: string | number | boolean) => {
    setAnswers({ ...answers, [questionId]: answer });
  };

  const calculateScore = () => {
    let totalScore = 0;
    questions.forEach((q) => {
      const userAnswer = answers[q._id];
      let isCorrect = false;

      if (q.type === "Multiple Choice") {
        isCorrect = userAnswer === q.correctAnswer;
      } else if (q.type === "True/False") {
        isCorrect = userAnswer === q.correctAnswer;
      } else if (q.type === "Fill in the Blank") {
        const userAnswerStr = String(userAnswer || "").toLowerCase().trim();
        isCorrect = q.possibleAnswers?.some(
          (ans) => ans.toLowerCase().trim() === userAnswerStr
        ) || false;
      }

      if (isCorrect) {
        totalScore += q.points;
      }
    });
    return totalScore;
  };

  const handleSubmit = () => {
    const finalScore = calculateScore();
    setScore(finalScore);
    setSubmitted(true);
  };

  const isAnswerCorrect = (question: Question) => {
    const userAnswer = answers[question._id];

    if (question.type === "Multiple Choice") {
      return userAnswer === question.correctAnswer;
    } else if (question.type === "True/False") {
      return userAnswer === question.correctAnswer;
    } else if (question.type === "Fill in the Blank") {
      const userAnswerStr = String(userAnswer || "").toLowerCase().trim();
      return question.possibleAnswers?.some(
        (ans) => ans.toLowerCase().trim() === userAnswerStr
      );
    }
    return false;
  };

  if (!quiz) {
    return <div className="p-4">Loading...</div>;
  }

  return (
    <div className="p-4">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2>{quiz.title} - Preview</h2>
        <Button variant="outline-secondary" onClick={() => router.push(`/Courses/${cid}/Quizzes/${qid}/edit`)}>
          Edit Quiz
        </Button>
      </div>

      {submitted && (
        <Alert variant="info" className="mb-4">
          <h4>Quiz Completed!</h4>
          <p className="mb-0">
            Your score: <strong>{score}</strong> out of <strong>{quiz.points}</strong> points
          </p>
        </Alert>
      )}

      {questions.map((question, index) => (
        <Card key={question._id} className="mb-3">
          <Card.Body>
            <div className="d-flex justify-content-between align-items-start mb-3">
              <div>
                <h5>
                  Question {index + 1}
                  {submitted && (
                    <span className="ms-2">
                      {isAnswerCorrect(question) ? (
                        <FaCheckCircle className="text-success" />
                      ) : (
                        <FaTimesCircle className="text-danger" />
                      )}
                    </span>
                  )}
                </h5>
                <div className="text-muted small">{question.points} pts</div>
              </div>
            </div>

            <p>{question.question}</p>

            {/* Multiple Choice */}
            {question.type === "Multiple Choice" && (
              <div>
                {question.choices?.map((choice, choiceIndex) => (
                  <Form.Check
                    key={choiceIndex}
                    type="radio"
                    id={`q-${question._id}-choice-${choiceIndex}`}
                    name={`question-${question._id}`}
                    label={choice}
                    checked={answers[question._id] === choiceIndex}
                    onChange={() => handleAnswerChange(question._id, choiceIndex)}
                    disabled={submitted}
                    className={
                      submitted
                        ? choiceIndex === question.correctAnswer
                          ? "text-success fw-bold"
                          : ""
                        : ""
                    }
                  />
                ))}
              </div>
            )}

            {/* True/False */}
            {question.type === "True/False" && (
              <div>
                <Form.Check
                  type="radio"
                  id={`q-${question._id}-true`}
                  name={`question-${question._id}`}
                  label="True"
                  checked={answers[question._id] === true}
                  onChange={() => handleAnswerChange(question._id, true)}
                  disabled={submitted}
                  className={submitted && question.correctAnswer === true ? "text-success fw-bold" : ""}
                />
                <Form.Check
                  type="radio"
                  id={`q-${question._id}-false`}
                  name={`question-${question._id}`}
                  label="False"
                  checked={answers[question._id] === false}
                  onChange={() => handleAnswerChange(question._id, false)}
                  disabled={submitted}
                  className={submitted && question.correctAnswer === false ? "text-success fw-bold" : ""}
                />
              </div>
            )}

            {/* Fill in the Blank */}
            {question.type === "Fill in the Blank" && (
              <div>
                <Form.Control
                  type="text"
                  value={(answers[question._id] as string) || ""}
                  onChange={(e) => handleAnswerChange(question._id, e.target.value)}
                  disabled={submitted}
                  placeholder="Enter your answer"
                />
                {submitted && (
                  <div className="mt-2 small text-muted">
                    Correct answers: {question.possibleAnswers?.join(", ")}
                  </div>
                )}
              </div>
            )}
          </Card.Body>
        </Card>
      ))}

      {!submitted ? (
        <div className="d-flex justify-content-end gap-2 mt-4">
          <Button variant="secondary" onClick={() => router.push(`/Courses/${cid}/Quizzes/${qid}`)}>
            Cancel
          </Button>
          <Button variant="danger" onClick={handleSubmit}>
            Submit Quiz
          </Button>
        </div>
      ) : (
        <div className="d-flex justify-content-end gap-2 mt-4">
          <Button variant="primary" onClick={() => router.push(`/Courses/${cid}/Quizzes/${qid}`)}>
            Back to Quiz Details
          </Button>
        </div>
      )}
    </div>
  );
}