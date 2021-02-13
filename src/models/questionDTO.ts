export interface DifficultExercises {
  A: string;
  B: string;
  C: string;
  D: string;
  formula: string;
  function: string;
  id: number;
  imageLink: string;
  question: string;
  solution: string;
}

export interface SimpleExercises {
  A: string;
  B: string;
  C: string;
  D: string;
  formula: string;
  function: string;
  id: number;
  imageLink: string;
  question: string;
  solution: string;
}

export interface TheoreticalQuestion {
  A: string;
  B: string;
  C: string;
  D: string;
  id: number;
  question: string;
  solution: string;
}

export interface QuestionsDTO {
  difficultExercises: DifficultExercises[];
  simpleExercises: SimpleExercises[];
  theoreticalQuestions: TheoreticalQuestion[];
}
