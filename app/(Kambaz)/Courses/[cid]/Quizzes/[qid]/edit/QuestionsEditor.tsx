"use client";
import { useState, useEffect } from "react";
import { Button, ListGroup } from "react-bootstrap";
import { FaPlus, FaEdit, FaTrash } from "react-icons/fa";
import * as client from "../../client";
import QuestionEditor from "./QuestionEditor";

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

interface QuizQuestionsEditorProps {
  quizId: string;
}

export default function QuizQuestionsEditor({ quizId }: QuizQuestionsEditorProps) {
  const [questions, setQuestions] = useState<Question[]>([]);
  const [editingQuestion, setEditingQuestion] = useState<Question | null>(null);
  const [showEditor, setShowEditor] = useState(false);

  const fetchQuestions = async () => {
    try {
      const questions = await client.findQuestionsForQuiz(quizId);
      setQuestions(questions);
    } catch (error) {
      console.error("Error fetching questions:", error);
    }
  };

  useEffect(() => {
    fetchQuestions();
  }, [quizId]);

  const createNewQuestion = () => {
    const newQuestion: Question = {
      _id: "",
      quiz: quizId,
      title: "New Question",
      type: "Multiple Choice",
      points: 1,
      question: "",
      choices: ["", "", "", ""],
      correctAnswer: 0,
    };
    setEditingQuestion(newQuestion);
    setShowEditor(true);
  };

  const editQuestion = (question: Question) => {
    setEditingQuestion(question);
    setShowEditor(true);
  };

  const deleteQuestion = async (questionId: string) => {
    if (window.confirm("Are you sure you want to delete this question?")) {
      try {
        await client.deleteQuestion(questionId);
        setQuestions(questions.filter((q) => q._id !== questionId));
      } catch (error) {
        console.error("Error deleting question:", error);
      }
    }
  };

  const handleSaveQuestion = async (q: Question) => {
    try {
      if (q._id) {
        // Update existing
        await client.updateQuestion(q._id, q);
        setQuestions(questions.map((question) => (question._id === q._id ? q : question)));
      } else {
        // Create new
        const newQuestion = await client.createQuestion(quizId, q);
        setQuestions([...questions, newQuestion]);
      }
      setShowEditor(false);
      setEditingQuestion(null);
    } catch (error) {
      console.error("Error saving question:", error);
    }
  };

  const totalPoints = questions.reduce((sum, q) => sum + q.points, 0);

  return (
    <div>
      <div className="d-flex justify-content-between align-items-center mb-3">
        <div>
          <strong>Points: {totalPoints}</strong>
        </div>
        <Button variant="danger" onClick={createNewQuestion}>
          <FaPlus className="me-2" />
          New Question
        </Button>
      </div>

      {showEditor && editingQuestion ? (
        <QuestionEditor
          question={editingQuestion}
          onSave={handleSaveQuestion}
          onCancel={() => {
            setShowEditor(false);
            setEditingQuestion(null);
          }}
        />
      ) : (
        <ListGroup>
          {questions.length === 0 ? (
            <div className="text-center text-muted p-5">
              <p>No questions yet. Click &quot;New Question&quot; to add one!</p>
            </div>
          ) : (
            questions.map((question, index) => (
              <ListGroup.Item
                key={question._id}
                className="d-flex justify-content-between align-items-start"
              >
                <div className="flex-grow-1">
                  <div className="fw-bold">
                    Question {index + 1}: {question.title}
                  </div>
                  <div className="text-muted small">
                    Type: {question.type} | Points: {question.points}
                  </div>
                </div>
                <div className="d-flex gap-2">
                  <Button
                    variant="outline-secondary"
                    size="sm"
                    onClick={() => editQuestion(question)}
                  >
                    <FaEdit />
                  </Button>
                  <Button
                    variant="outline-danger"
                    size="sm"
                    onClick={() => deleteQuestion(question._id)}
                  >
                    <FaTrash />
                  </Button>
                </div>
              </ListGroup.Item>
            ))
          )}
        </ListGroup>
      )}
    </div>
  );
}