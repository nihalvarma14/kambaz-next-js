"use client";
import { useState } from "react";
import { Button, Form, Card } from "react-bootstrap";
import { FaPlus, FaTrash } from "react-icons/fa";

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

interface QuestionEditorProps {
  question: Question;
  onSave: (question: Question) => void;
  onCancel: () => void;
}

export default function QuestionEditor({ question: initialQuestion, onSave, onCancel }: QuestionEditorProps) {
  const [question, setQuestion] = useState<Question>(initialQuestion);

  const handleSave = () => {
    onSave(question);
  };

  const addChoice = () => {
    const choices = question.choices || [];
    setQuestion({ ...question, choices: [...choices, ""] });
  };

  const updateChoice = (index: number, value: string) => {
    const choices = [...(question.choices || [])];
    choices[index] = value;
    setQuestion({ ...question, choices });
  };

  const removeChoice = (index: number) => {
    const choices = question.choices?.filter((_, i) => i !== index) || [];
    setQuestion({ ...question, choices });
  };

  const addPossibleAnswer = () => {
    const answers = question.possibleAnswers || [];
    setQuestion({ ...question, possibleAnswers: [...answers, ""] });
  };

  const updatePossibleAnswer = (index: number, value: string) => {
    const answers = [...(question.possibleAnswers || [])];
    answers[index] = value;
    setQuestion({ ...question, possibleAnswers: answers });
  };

  const removePossibleAnswer = (index: number) => {
    const answers = question.possibleAnswers?.filter((_, i) => i !== index) || [];
    setQuestion({ ...question, possibleAnswers: answers });
  };

  return (
    <Card className="mb-3">
      <Card.Body>
        <Form>
          <Form.Group className="mb-3">
            <Form.Label>Question Title</Form.Label>
            <Form.Control
              type="text"
              value={question.title}
              onChange={(e) => setQuestion({ ...question, title: e.target.value })}
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Question Type</Form.Label>
            <Form.Select
              value={question.type}
              onChange={(e) => setQuestion({ ...question, type: e.target.value })}
            >
              <option>Multiple Choice</option>
              <option>True/False</option>
              <option>Fill in the Blank</option>
            </Form.Select>
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Points</Form.Label>
            <Form.Control
              type="number"
              value={question.points}
              onChange={(e) => setQuestion({ ...question, points: parseInt(e.target.value) })}
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Question</Form.Label>
            <Form.Control
              as="textarea"
              rows={3}
              value={question.question}
              onChange={(e) => setQuestion({ ...question, question: e.target.value })}
            />
          </Form.Group>

          {/* Multiple Choice */}
          {question.type === "Multiple Choice" && (
            <div className="mb-3">
              <Form.Label>Choices</Form.Label>
              {question.choices?.map((choice, index) => (
                <div key={index} className="d-flex gap-2 mb-2">
                  <Form.Check
                    type="radio"
                    name="correctAnswer"
                    checked={question.correctAnswer === index}
                    onChange={() => setQuestion({ ...question, correctAnswer: index })}
                  />
                  <Form.Control
                    type="text"
                    value={choice}
                    onChange={(e) => updateChoice(index, e.target.value)}
                    placeholder={`Choice ${index + 1}`}
                  />
                  <Button
                    variant="outline-danger"
                    size="sm"
                    onClick={() => removeChoice(index)}
                  >
                    <FaTrash />
                  </Button>
                </div>
              ))}
              <Button variant="outline-secondary" size="sm" onClick={addChoice}>
                <FaPlus className="me-2" />
                Add Another Answer
              </Button>
            </div>
          )}

          {/* True/False */}
          {question.type === "True/False" && (
            <Form.Group className="mb-3">
              <Form.Label>Correct Answer</Form.Label>
              <div>
                <Form.Check
                  type="radio"
                  label="True"
                  name="trueFalse"
                  checked={question.correctAnswer === true}
                  onChange={() => setQuestion({ ...question, correctAnswer: true })}
                />
                <Form.Check
                  type="radio"
                  label="False"
                  name="trueFalse"
                  checked={question.correctAnswer === false}
                  onChange={() => setQuestion({ ...question, correctAnswer: false })}
                />
              </div>
            </Form.Group>
          )}

          {/* Fill in the Blank */}
          {question.type === "Fill in the Blank" && (
            <div className="mb-3">
              <Form.Label>Possible Answers</Form.Label>
              {question.possibleAnswers?.map((answer, index) => (
                <div key={index} className="d-flex gap-2 mb-2">
                  <Form.Control
                    type="text"
                    value={answer}
                    onChange={(e) => updatePossibleAnswer(index, e.target.value)}
                    placeholder={`Possible Answer ${index + 1}`}
                  />
                  <Button
                    variant="outline-danger"
                    size="sm"
                    onClick={() => removePossibleAnswer(index)}
                  >
                    <FaTrash />
                  </Button>
                </div>
              ))}
              <Button variant="outline-secondary" size="sm" onClick={addPossibleAnswer}>
                <FaPlus className="me-2" />
                Add Another Answer
              </Button>
            </div>
          )}

          <div className="d-flex justify-content-end gap-2">
            <Button variant="secondary" onClick={onCancel}>
              Cancel
            </Button>
            <Button variant="danger" onClick={handleSave}>
              Update Question
            </Button>
          </div>
        </Form>
      </Card.Body>
    </Card>
  );
}