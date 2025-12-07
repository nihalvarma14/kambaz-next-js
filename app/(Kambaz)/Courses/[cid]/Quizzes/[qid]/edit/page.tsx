"use client";
import { useParams, useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { Button, Form, Nav, Tab, Card } from "react-bootstrap";
import * as client from "../../client";
import QuizQuestionsEditor from "./QuestionsEditor";

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

export default function QuizEditor() {
  const params = useParams();
  const cid = params.cid as string;
  const qid = params.qid as string;
  const router = useRouter();
  const [quiz, setQuiz] = useState<Quiz | null>(null);
  const [activeTab, setActiveTab] = useState("details");

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

  const handleSave = async () => {
    if (!quiz) return;
    try {
      await client.updateQuiz(qid, quiz);
      router.push(`/Courses/${cid}/Quizzes/${qid}`);
    } catch (error) {
      console.error("Error saving quiz:", error);
    }
  };

  const handleSaveAndPublish = async () => {
    if (!quiz) return;
    try {
      await client.updateQuiz(qid, { ...quiz, published: true });
      router.push(`/Courses/${cid}/Quizzes`);
    } catch (error) {
      console.error("Error saving and publishing quiz:", error);
    }
  };

  const handleCancel = () => {
    router.push(`/Courses/${cid}/Quizzes`);
  };

  if (!quiz) {
    return <div className="p-4">Loading...</div>;
  }

  return (
    <div className="p-4">
      <h2>Edit Quiz</h2>

      <Tab.Container activeKey={activeTab} onSelect={(k) => setActiveTab(k || "details")}>
        <Nav variant="tabs" className="mb-3">
          <Nav.Item>
            <Nav.Link eventKey="details">Details</Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link eventKey="questions">Questions</Nav.Link>
          </Nav.Item>
        </Nav>

        <Tab.Content>
          {/* Details Tab */}
          <Tab.Pane eventKey="details">
            <Card>
              <Card.Body>
                <Form>
                  <Form.Group className="mb-3">
                    <Form.Label>Title</Form.Label>
                    <Form.Control
                      type="text"
                      value={quiz.title}
                      onChange={(e) => setQuiz({ ...quiz, title: e.target.value })}
                    />
                  </Form.Group>

                  <Form.Group className="mb-3">
                    <Form.Label>Description</Form.Label>
                    <Form.Control
                      as="textarea"
                      rows={3}
                      value={quiz.description || ""}
                      onChange={(e) => setQuiz({ ...quiz, description: e.target.value })}
                    />
                  </Form.Group>

                  <Form.Group className="mb-3">
                    <Form.Label>Quiz Type</Form.Label>
                    <Form.Select
                      value={quiz.quizType}
                      onChange={(e) => setQuiz({ ...quiz, quizType: e.target.value })}
                    >
                      <option>Graded Quiz</option>
                      <option>Practice Quiz</option>
                      <option>Graded Survey</option>
                      <option>Ungraded Survey</option>
                    </Form.Select>
                  </Form.Group>

                  <Form.Group className="mb-3">
                    <Form.Label>Assignment Group</Form.Label>
                    <Form.Select
                      value={quiz.assignmentGroup}
                      onChange={(e) => setQuiz({ ...quiz, assignmentGroup: e.target.value })}
                    >
                      <option>Quizzes</option>
                      <option>Exams</option>
                      <option>Assignments</option>
                      <option>Project</option>
                    </Form.Select>
                  </Form.Group>

                  <Form.Group className="mb-3">
                    <Form.Label>Time Limit (Minutes)</Form.Label>
                    <Form.Control
                      type="number"
                      value={quiz.timeLimit}
                      onChange={(e) => setQuiz({ ...quiz, timeLimit: parseInt(e.target.value) || 0 })}
                    />
                  </Form.Group>

                  <Form.Group className="mb-3">
                    <Form.Check
                      type="checkbox"
                      label="Shuffle Answers"
                      checked={quiz.shuffleAnswers}
                      onChange={(e) => setQuiz({ ...quiz, shuffleAnswers: e.target.checked })}
                    />
                  </Form.Group>

                  <Form.Group className="mb-3">
                    <Form.Check
                      type="checkbox"
                      label="Multiple Attempts"
                      checked={quiz.multipleAttempts}
                      onChange={(e) => setQuiz({ ...quiz, multipleAttempts: e.target.checked })}
                    />
                  </Form.Group>

                  {quiz.multipleAttempts && (
                    <Form.Group className="mb-3">
                      <Form.Label>How Many Attempts</Form.Label>
                      <Form.Control
                        type="number"
                        value={quiz.howManyAttempts}
                        onChange={(e) =>
                          setQuiz({ ...quiz, howManyAttempts: parseInt(e.target.value) || 1 })
                        }
                      />
                    </Form.Group>
                  )}

                  <Form.Group className="mb-3">
                    <Form.Label>Show Correct Answers</Form.Label>
                    <Form.Select
                      value={quiz.showCorrectAnswers}
                      onChange={(e) => setQuiz({ ...quiz, showCorrectAnswers: e.target.value })}
                    >
                      <option>Immediately</option>
                      <option>After Due Date</option>
                      <option>Never</option>
                    </Form.Select>
                  </Form.Group>

                  <Form.Group className="mb-3">
                    <Form.Label>Access Code</Form.Label>
                    <Form.Control
                      type="text"
                      value={quiz.accessCode}
                      onChange={(e) => setQuiz({ ...quiz, accessCode: e.target.value })}
                      placeholder="Leave blank for no access code"
                    />
                  </Form.Group>

                  <Form.Group className="mb-3">
                    <Form.Check
                      type="checkbox"
                      label="One Question at a Time"
                      checked={quiz.oneQuestionAtATime}
                      onChange={(e) =>
                        setQuiz({ ...quiz, oneQuestionAtATime: e.target.checked })
                      }
                    />
                  </Form.Group>

                  <Form.Group className="mb-3">
                    <Form.Check
                      type="checkbox"
                      label="Webcam Required"
                      checked={quiz.webcamRequired}
                      onChange={(e) => setQuiz({ ...quiz, webcamRequired: e.target.checked })}
                    />
                  </Form.Group>

                  <Form.Group className="mb-3">
                    <Form.Check
                      type="checkbox"
                      label="Lock Questions After Answering"
                      checked={quiz.lockQuestionsAfterAnswering}
                      onChange={(e) =>
                        setQuiz({ ...quiz, lockQuestionsAfterAnswering: e.target.checked })
                      }
                    />
                  </Form.Group>

                  <Form.Group className="mb-3">
                    <Form.Label>Due Date</Form.Label>
                    <Form.Control
                      type="datetime-local"
                      value={quiz.dueDate}
                      onChange={(e) => setQuiz({ ...quiz, dueDate: e.target.value })}
                    />
                  </Form.Group>

                  <Form.Group className="mb-3">
                    <Form.Label>Available Date</Form.Label>
                    <Form.Control
                      type="datetime-local"
                      value={quiz.availableDate}
                      onChange={(e) => setQuiz({ ...quiz, availableDate: e.target.value })}
                    />
                  </Form.Group>

                  <Form.Group className="mb-3">
                    <Form.Label>Until Date</Form.Label>
                    <Form.Control
                      type="datetime-local"
                      value={quiz.untilDate}
                      onChange={(e) => setQuiz({ ...quiz, untilDate: e.target.value })}
                    />
                  </Form.Group>
                </Form>
              </Card.Body>
            </Card>

            <div className="d-flex justify-content-end gap-2 mt-3">
              <Button variant="secondary" onClick={handleCancel}>
                Cancel
              </Button>
              <Button variant="primary" onClick={handleSave}>
                Save
              </Button>
              <Button variant="success" onClick={handleSaveAndPublish}>
                Save &amp; Publish
              </Button>
            </div>
          </Tab.Pane>

          {/* Questions Tab */}
          <Tab.Pane eventKey="questions">
            <QuizQuestionsEditor quizId={qid as string} />
          </Tab.Pane>
        </Tab.Content>
      </Tab.Container>
    </div>
  );
}