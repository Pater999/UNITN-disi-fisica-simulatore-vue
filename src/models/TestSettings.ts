export enum ExamType {
  Normal,
  Covid,
  Personalized,
}

export interface TestSettings {
  examType: ExamType;
  theoreticalQuestionsCount: number;
  simpleExercisesCount: number;
  difficultExercisesCount: number;
  randomOrder: boolean;
  shuffle: boolean;
  infiniteTime: boolean;
  time: number;
}

interface ExamConst {
  covid: TestSettings;
  normal: TestSettings;
  personal: TestSettings;
}

export const examConst: ExamConst = {
  covid: {
    examType: ExamType.Covid,
    theoreticalQuestionsCount: 7,
    simpleExercisesCount: 3,
    difficultExercisesCount: 1,
    randomOrder: true,
    shuffle: true,
    infiniteTime: false,
    time: 90,
  },
  normal: {
    examType: ExamType.Normal,
    theoreticalQuestionsCount: 14,
    simpleExercisesCount: 5,
    difficultExercisesCount: 2,
    randomOrder: true,
    shuffle: true,
    infiniteTime: false,
    time: 150,
  },
  personal: {
    examType: ExamType.Personalized,
    theoreticalQuestionsCount: 50,
    simpleExercisesCount: 0,
    difficultExercisesCount: 0,
    randomOrder: true,
    shuffle: true,
    infiniteTime: false,
    time: 180,
  },
};
