import axios from "axios";

const axiosWithCredentials = axios.create({ withCredentials: true });
const HTTP_SERVER = process.env.NEXT_PUBLIC_HTTP_SERVER;

export const findQuizzesForCourse = async (courseId: string) => {
  const response = await axios.get(`${HTTP_SERVER}/api/quizzes?courseId=${courseId}`);
  return response.data;
};

export const createQuiz = async (courseId: string, quiz: unknown) => {
  const quizData = quiz as Record<string, unknown>;
  const response = await axiosWithCredentials.post(
    `${HTTP_SERVER}/api/quizzes`,
    { ...quizData, course: courseId }
  );
  return response.data;
};

export const updateQuiz = async (quizId: string, quiz: unknown) => {
  const response = await axiosWithCredentials.put(
    `${HTTP_SERVER}/api/quizzes/${quizId}`,
    quiz
  );
  return response.data;
};

export const deleteQuiz = async (quizId: string) => {
  const response = await axios.delete(`${HTTP_SERVER}/api/quizzes/${quizId}`);
  return response.data;
};

export const findQuizById = async (quizId: string) => {
  const response = await axios.get(`${HTTP_SERVER}/api/quizzes/${quizId}`);
  return response.data;
};

export const findQuestionsForQuiz = async (quizId: string) => {
  const response = await axios.get(`${HTTP_SERVER}/api/quizzes/${quizId}/questions`);
  return response.data;
};

export const createQuestion = async (quizId: string, question: unknown) => {
  const response = await axios.post(
    `${HTTP_SERVER}/api/quizzes/${quizId}/questions`,
    question
  );
  return response.data;
};

export const updateQuestion = async (questionId: string, question: unknown) => {
  const response = await axios.put(
    `${HTTP_SERVER}/api/quizzes/questions/${questionId}`,
    question
  );
  return response.data;
};

export const deleteQuestion = async (questionId: string) => {
  const response = await axios.delete(
    `${HTTP_SERVER}/api/quizzes/questions/${questionId}`
  );
  return response.data;
};

export const submitQuizAttempt = async (quizId: string, attempt: unknown) => {
  const response = await axiosWithCredentials.post(
    `${HTTP_SERVER}/api/quizzes/${quizId}/attempts`,
    attempt
  );
  return response.data;
};

export const findAttemptsForQuiz = async (quizId: string, userId: string) => {
  const response = await axios.get(
    `${HTTP_SERVER}/api/quizzes/${quizId}/attempts/${userId}`
  );
  return response.data;
};