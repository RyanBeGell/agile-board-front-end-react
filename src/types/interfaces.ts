import { IconNames } from "@/types/icons";

export interface Workspace {
  id: string;
  name: string;
  icon: IconNames; 
}

// types.ts
export interface Board {
  id: string;
  name: string;
  gradient: string;
  workspaceId: string;
}

export interface BoardsState {
  items: Board[];
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
}

// types/interfaces.ts
export interface GradientOption {
  id: string;
  gradient: string;
  name: string;
}

export interface NewBoard {
  name: string;
  gradient: string;
  workspaceId: string;
  description?: string; 
}

// types/interfaces.ts
export interface Board extends NewBoard {
  id: string;
  columns: Column[];
}


// types/interfaces.ts
export interface Card {
  id: string;
  title: string;
  description: string;
  columnId: string;
  position: number;
  dueDate: string; 
  assigneeIds: string[];
}

// types/interfaces.ts
export interface Column {
  id: string;
  name: string;
  position: number;
  boardId: string;
  cards: Card[];
}
