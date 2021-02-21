export interface Question {
  A: string;
  B: string;
  C: string;
  D: string;
  id: number;
  imageLink: string;
  question: string;
  points?: number;
}

export interface DifficultExercises extends Question {
  formula: string;
  function: string;
  id: number;
  solution: string;
}

export interface SimpleExercises extends Question {
  formula: string;
  function: string;
  id: number;
  solution: string;
}

export interface TheoreticalQuestion extends Question {
  solution: string;
}

export interface QuestionsDTO {
  difficultExercises: DifficultExercises[];
  simpleExercises: SimpleExercises[];
  theoreticalQuestions: TheoreticalQuestion[];
}
