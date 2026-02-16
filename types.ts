
export type UserRole = 'admin' | 'user';
export type SourceMode = 'document' | 'web' | 'both';

export interface User {
  id: string;
  username: string;
  password?: string;
  role: UserRole;
  accessibleDocs: string[]; // List of Doc IDs
}

export interface Document {
  id: string;
  name: string;
  content: string; // Extracted text content
  instruction: string; // Specific instructions for this doc
  uploadDate: string;
  type: 'pdf' | 'text';
}

export interface Message {
  id: string;
  role: 'user' | 'model';
  text: string;
  timestamp: string;
  source?: SourceMode;
}

export interface ChatSession {
  id: string;
  docId: string;
  userId: string;
  messages: Message[];
  title: string;
}
