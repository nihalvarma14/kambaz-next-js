export interface SessionUser {
  _id: string;
  username: string;
  firstName?: string;
  lastName?: string;
  email?: string;
  role: string;
}

// Simple in-memory session store (for development)
const sessions = new Map<string, SessionUser>();

export function createSession(userId: string, user: SessionUser): string {
  const sessionId = Math.random().toString(36).substring(7);
  sessions.set(sessionId, user);
  return sessionId;
}

export function getSession(sessionId: string): SessionUser | null {
  return sessions.get(sessionId) || null;
}

export function deleteSession(sessionId: string): void {
  sessions.delete(sessionId);
}