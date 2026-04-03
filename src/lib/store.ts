import { writable } from 'svelte/store';

export type ProblemType = 'sequence-analysis' | 'number-to-words' | 'sequence-word' | 'multiplication' | 'true-false' | 'number-line-jumps' | 'time-duration' | 'decompose-number' | 'probability-bag' | 'analog-clock' | 'time-table' | 'time-matching' | 'time-difference' | 'time-conversion' | 'number-composition' | 'multiples-factors' | 'order-number-line' | 'sequence-claim' | 'place-value-decode' | 'math-flow-diagram' | 'number-card-match' | 'find-incorrect-decomp' | 'number-card-calc';

export interface WorksheetBlock {
  id: string; // unique ID for drag and drop
  type: ProblemType;
  data: any; // Holds the randomized problem data
}

export const worksheetBlocks = writable<WorksheetBlock[]>([]);

// Helper to generate a unique ID
export function generateId() {
  return Math.random().toString(36).substring(2, 9);
}
