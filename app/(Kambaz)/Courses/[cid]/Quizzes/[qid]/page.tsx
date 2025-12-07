"use client";
import { useParams, useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { Button, Card } from "react-bootstrap";
import * as client from "../client";

interface Quiz {
  _id: string;
  title: string;
  course: string;
  description?: string;
  quizType: string;
  points: number;
  assignmentGroup: string;
  shuffleAnswers: boolean;
  timeLimit: number;
  multipleAttempts: boolean;
  howManyAttempts: number;
  showCorrectAnswers: string;
  accessCode: string;
  oneQuestionAtATime: boolean;
  webcamRequired: boolean;
  lockQuestionsAfterAnswering: boolean;
  dueDate: string;
  availableDate: string;
  untilDate: string;
  published: boolean;
}

interface User {
  _id?: string;
  role: string;
}

interface RootState {
  accountReducer: {
    currentUser: User | null;
  };
}

export default function QuizDetails() {
  const params = useParams();
  const cid = params.cid as string;
  const qid = params.qid as string;
  const router = useRouter();
  const { currentUser } = useSelector((state: RootState) => state.accountReducer);
  const [quiz, setQuiz] = useState<Quiz | null>(null);

  const fetchQuiz = async () => {
    try {
      const quiz = await client.findQuizById(qid);
      setQuiz(quiz);
    } catch (error) {
      console.error("Error fetching quiz:", error);
    }
  };

  useEffect(() => {
    fetchQuiz();
  }, [qid]);

  const isFaculty = currentUser?.role === "FACULTY" || currentUser?.role === "ADMIN";

  if (!quiz) {
    return <div className="p-4">Loading...</div>;
  }

  return (
    <div className="p-4">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2>{quiz.title}</h2>
        <div className="d-flex gap-2">
          {isFaculty && (
            <>
              <Button
                variant="outline-secondary"
                onClick={() => router.push(`/Courses/${cid}/Quizzes/${qid}/preview`)}
              >
                Preview
              </Button>
              <Button
                variant="secondary"
                onClick={() => router.push(`/Courses/${cid}/Quizzes/${qid}/edit`)}
              >
                Edit
              </Button>
            </>
          )}
          {!isFaculty && (
            <Button
              variant="danger"
              onClick={() => router.push(`/Courses/${cid}/Quizzes/${qid}/take`)}
              disabled={!quiz.published}
            >
              {quiz.published ? "Take Quiz" : "Quiz Not Available"}
            </Button>
          )}
        </div>
      </div>

      <Card>
        <Card.Body>
          <div className="mb-3">
            <h5>Quiz Details</h5>
          </div>

          <div className="row mb-2">
            <div className="col-4 fw-bold">Quiz Type</div>
            <div className="col-8">{quiz.quizType}</div>
          </div>

          <div className="row mb-2">
            <div className="col-4 fw-bold">Points</div>
            <div className="col-8">{quiz.points}</div>
          </div>

          <div className="row mb-2">
            <div className="col-4 fw-bold">Assignment Group</div>
            <div className="col-8">{quiz.assignmentGroup}</div>
          </div>

          <div className="row mb-2">
            <div className="col-4 fw-bold">Shuffle Answers</div>
            <div className="col-8">{quiz.shuffleAnswers ? "Yes" : "No"}</div>
          </div>

          <div className="row mb-2">
            <div className="col-4 fw-bold">Time Limit</div>
            <div className="col-8">{quiz.timeLimit} Minutes</div>
          </div>

          <div className="row mb-2">
            <div className="col-4 fw-bold">Multiple Attempts</div>
            <div className="col-8">{quiz.multipleAttempts ? "Yes" : "No"}</div>
          </div>

          {quiz.multipleAttempts && (
            <div className="row mb-2">
              <div className="col-4 fw-bold">How Many Attempts</div>
              <div className="col-8">{quiz.howManyAttempts}</div>
            </div>
          )}

          <div className="row mb-2">
            <div className="col-4 fw-bold">Show Correct Answers</div>
            <div className="col-8">{quiz.showCorrectAnswers}</div>
          </div>

          <div className="row mb-2">
            <div className="col-4 fw-bold">Access Code</div>
            <div className="col-8">{quiz.accessCode || "None"}</div>
          </div>

          <div className="row mb-2">
            <div className="col-4 fw-bold">One Question at a Time</div>
            <div className="col-8">{quiz.oneQuestionAtATime ? "Yes" : "No"}</div>
          </div>

          <div className="row mb-2">
            <div className="col-4 fw-bold">Webcam Required</div>
            <div className="col-8">{quiz.webcamRequired ? "Yes" : "No"}</div>
          </div>

          <div className="row mb-2">
            <div className="col-4 fw-bold">Lock Questions After Answering</div>
            <div className="col-8">{quiz.lockQuestionsAfterAnswering ? "Yes" : "No"}</div>
          </div>

          <hr />

          <div className="mb-3">
            <h5>Dates</h5>
          </div>

          {quiz.dueDate && (
            <div className="row mb-2">
              <div className="col-4 fw-bold">Due Date</div>
              <div className="col-8">{new Date(quiz.dueDate).toLocaleString()}</div>
            </div>
          )}

          {quiz.availableDate && (
            <div className="row mb-2">
              <div className="col-4 fw-bold">Available Date</div>
              <div className="col-8">{new Date(quiz.availableDate).toLocaleString()}</div>
            </div>
          )}

          {quiz.untilDate && (
            <div className="row mb-2">
              <div className="col-4 fw-bold">Until Date</div>
              <div className="col-8">{new Date(quiz.untilDate).toLocaleString()}</div>
            </div>
          )}
        </Card.Body>
      </Card>
    </div>
  );
}