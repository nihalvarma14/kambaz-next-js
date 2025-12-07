"use client";
import { useParams, useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { Button, Dropdown } from "react-bootstrap";
import { FaPlus, FaEllipsisV, FaCheckCircle, FaBan } from "react-icons/fa";
import Link from "next/link";
import * as client from "./client";

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
  questions?: unknown[];
}

interface User {
  _id?: string;
  firstName: string;
  lastName: string;
  username: string;
  role: string;
}

interface RootState {
  accountReducer: {
    currentUser: User | null;
  };
}

export default function Quizzes() {
  const params = useParams();
  const cid = params.cid as string;
  const router = useRouter();
  const { currentUser } = useSelector((state: RootState) => state.accountReducer);
  const [quizzes, setQuizzes] = useState<Quiz[]>([]);

  const fetchQuizzes = async () => {
    if (!cid || Array.isArray(cid)) return;
    try {
      const quizzes = await client.findQuizzesForCourse(cid);
      setQuizzes(quizzes);
    } catch (error) {
      console.error("Error fetching quizzes:", error);
    }
  };

  useEffect(() => {
    fetchQuizzes();
  }, [cid]);

  const createNewQuiz = async () => {
    if (!cid || Array.isArray(cid)) return;
    const newQuiz = {
      title: "Unnamed Quiz",
      course: cid,
      quizType: "Graded Quiz",
      points: 0,
      assignmentGroup: "Quizzes",
      shuffleAnswers: true,
      timeLimit: 20,
      multipleAttempts: false,
      howManyAttempts: 1,
      showCorrectAnswers: "Immediately",
      accessCode: "",
      oneQuestionAtATime: true,
      webcamRequired: false,
      lockQuestionsAfterAnswering: false,
      dueDate: "",
      availableDate: "",
      untilDate: "",
      published: false,
    };

    try {
      const quiz = await client.createQuiz(cid, newQuiz);
      setQuizzes([...quizzes, quiz]);
      router.push(`/Courses/${cid}/Quizzes/${quiz._id}`);
    } catch (error) {
      console.error("Error creating quiz:", error);
    }
  };

  const deleteQuiz = async (quizId: string) => {
    if (window.confirm("Are you sure you want to delete this quiz?")) {
      try {
        await client.deleteQuiz(quizId);
        setQuizzes(quizzes.filter((q) => q._id !== quizId));
      } catch (error) {
        console.error("Error deleting quiz:", error);
      }
    }
  };

  const togglePublish = async (quiz: Quiz) => {
    try {
      const updatedQuiz = { ...quiz, published: !quiz.published };
      await client.updateQuiz(quiz._id, updatedQuiz);
      setQuizzes(
        quizzes.map((q) => (q._id === quiz._id ? updatedQuiz : q))
      );
    } catch (error) {
      console.error("Error toggling publish:", error);
    }
  };

  const getAvailabilityStatus = (quiz: Quiz) => {
    const now = new Date();
    const availableDate = quiz.availableDate ? new Date(quiz.availableDate) : null;
    const untilDate = quiz.untilDate ? new Date(quiz.untilDate) : null;

    if (availableDate && now < availableDate) {
      return `Not available until ${availableDate.toLocaleDateString()}`;
    }
    if (untilDate && now > untilDate) {
      return "Closed";
    }
    return "Available";
  };

  const isFaculty = currentUser?.role === "FACULTY" || currentUser?.role === "ADMIN";

  return (
    <div className="p-4">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2>Quizzes</h2>
        {isFaculty && (
          <Button variant="danger" onClick={createNewQuiz}>
            <FaPlus className="me-2" />
            Quiz
          </Button>
        )}
      </div>

      {quizzes.length === 0 ? (
        <div className="text-center text-muted p-5">
          <p>No quizzes yet.</p>
          {isFaculty && <p>Click the &quot;+ Quiz&quot; button to create your first quiz!</p>}
        </div>
      ) : (
        <ul className="list-group">
          {quizzes.map((quiz) => (
            <li
              key={quiz._id}
              className="list-group-item d-flex justify-content-between align-items-start"
            >
              <div className="flex-grow-1">
                <div className="d-flex align-items-center gap-2">
                  {isFaculty && (
                    <span
                      onClick={() => togglePublish(quiz)}
                      style={{ cursor: "pointer" }}
                      title={quiz.published ? "Published" : "Unpublished"}
                    >
                      {quiz.published ? (
                        <FaCheckCircle className="text-success" />
                      ) : (
                        <FaBan className="text-danger" />
                      )}
                    </span>
                  )}
                  <Link
                    href={`/Courses/${cid}/Quizzes/${quiz._id}`}
                    className="text-danger text-decoration-none fw-bold"
                  >
                    {quiz.title}
                  </Link>
                </div>
                <div className="text-muted small mt-1">
                  <div>
                    <strong>Availability:</strong> {getAvailabilityStatus(quiz)}
                  </div>
                  {quiz.dueDate && (
                    <div>
                      <strong>Due:</strong> {new Date(quiz.dueDate).toLocaleDateString()}
                    </div>
                  )}
                  <div>
                    <strong>Points:</strong> {quiz.points}
                  </div>
                  <div>
                    <strong>Questions:</strong> {quiz.questions?.length || 0}
                  </div>
                </div>
              </div>

              {isFaculty && (
                <Dropdown>
                  <Dropdown.Toggle variant="light" size="sm">
                    <FaEllipsisV />
                  </Dropdown.Toggle>
                  <Dropdown.Menu>
                    <Dropdown.Item
                      onClick={() =>
                        router.push(`/Courses/${cid}/Quizzes/${quiz._id}/edit`)
                      }
                    >
                      Edit
                    </Dropdown.Item>
                    <Dropdown.Item onClick={() => deleteQuiz(quiz._id)}>
                      Delete
                    </Dropdown.Item>
                    <Dropdown.Item onClick={() => togglePublish(quiz)}>
                      {quiz.published ? "Unpublish" : "Publish"}
                    </Dropdown.Item>
                  </Dropdown.Menu>
                </Dropdown>
              )}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}