import { Question, QuestionsDTO } from '@/models/questionDTO';
import { TestSettings } from '@/models/TestSettings';
import Vue from 'vue';
import Vuex from 'vuex';
import * as Action from './types/actions-types';
import shuffle from 'lodash/shuffle';

Vue.use(Vuex);

const APP_NAME = 'SIMULATORE_FISICA';

interface State {
  isExamStarted: boolean;
  examQuestions: Question[] | null;
  userExamSolutions: null;
  questions: QuestionsDTO | null;
  examTime: number | null;
  examStartDate: Date | null;
}

export default new Vuex.Store({
  state: {
    isExamStarted: false,
    examQuestions: null,
    examTime: null,
    examStartDate: null,
    userExamSolutions: null,
    questions: null,
  },
  mutations: {
    [Action.SET_EXAM_STATE](state: State, examState: boolean) {
      state.isExamStarted = examState;
    },
    [Action.SET_QUESTIONS](state: State, questions: QuestionsDTO | null) {
      state.questions = questions;

      if (questions) {
        window.localStorage.setItem(
          `${APP_NAME}_questions`,
          JSON.stringify(questions)
        );
      } else {
        window.localStorage.removeItem(`${APP_NAME}_questions`);
      }
    },
    [Action.SET_EXAM_QUESTIONS](
      state: State,
      examQuestions: Question[] | null
    ) {
      state.examQuestions = examQuestions;

      if (examQuestions) {
        window.localStorage.setItem(
          `${APP_NAME}_examQuestions`,
          JSON.stringify(examQuestions)
        );
      } else {
        window.localStorage.removeItem(`${APP_NAME}_examQuestions`);
      }
    },
    [Action.SET_EXAM_TIME](state: State, time: number | null) {
      state.examTime = time;

      if (time) {
        window.localStorage.setItem(`${APP_NAME}_time`, time.toString());
      } else {
        window.localStorage.removeItem(`${APP_NAME}_time`);
      }
    },
    [Action.SET_EXAM_START_DATE](state: State, startDate: Date | null) {
      state.examStartDate = startDate;

      if (startDate) {
        window.localStorage.setItem(
          `${APP_NAME}_startDate`,
          startDate.toUTCString()
        );
      } else {
        window.localStorage.removeItem(`${APP_NAME}_startDate`);
      }
    },
  },
  actions: {
    [Action.READ_EXAM]({ commit }) {
      const startDate = window.localStorage.getItem(`${APP_NAME}_startDate`);
      const time = window.localStorage.getItem(`${APP_NAME}_time`);
      const examQuestions = window.localStorage.getItem(
        `${APP_NAME}_examQuestions`
      );
      const questions = window.localStorage.getItem(`${APP_NAME}_questions`);

      if (startDate && time && examQuestions && questions) {
        commit(Action.SET_EXAM_QUESTIONS, examQuestions);
        commit(Action.SET_EXAM_TIME, time);
        commit(Action.SET_EXAM_START_DATE, new Date());
        commit(Action.SET_QUESTIONS, questions);
        commit(Action.SET_EXAM_STATE, true);
      }
    },
    [Action.START_EXAM](
      { commit },
      {
        questions,
        settings,
      }: { questions: QuestionsDTO; settings: TestSettings }
    ) {
      let difficult = questions.difficultExercises.map(
        q =>
          ({
            question: q.question,
            A: q.A,
            B: q.B,
            C: q.C,
            D: q.D,
            imageLink: q.imageLink,
            id: q.id,
          } as Question)
      );
      let theoretical = questions.theoreticalQuestions.map(
        q =>
          ({
            question: q.question,
            A: q.A,
            B: q.B,
            C: q.C,
            D: q.D,
            imageLink: q.imageLink,
            id: q.id,
          } as Question)
      );
      let simple = questions.simpleExercises.map(
        q =>
          ({
            question: q.question,
            A: q.A,
            B: q.B,
            C: q.C,
            D: q.D,
            imageLink: q.imageLink,
            id: q.id,
          } as Question)
      );

      if (settings.randomOrder) {
        difficult = shuffle(difficult);
        theoretical = shuffle(theoretical);
        simple = shuffle(simple);
      }

      const examQuestions = difficult
        .slice(0, settings.difficultExercisesCount)
        .concat(theoretical.slice(0, settings.theoreticalQuestionsCount))
        .concat(simple.slice(0, settings.simpleExercisesCount));

      commit(Action.SET_EXAM_QUESTIONS, examQuestions);
      commit(
        Action.SET_EXAM_TIME,
        settings.infiniteTime ? -1 : settings.time * 60000
      );
      commit(Action.SET_EXAM_START_DATE, new Date());
      commit(Action.SET_QUESTIONS, questions);
      commit(Action.SET_EXAM_STATE, true);
    },
    [Action.END_EXAM]({ commit }) {
      commit(Action.SET_EXAM_STATE, false);
    },
  },
  getters: {
    isExamStarted: state => state.isExamStarted,
    examQuestions: state => state.examQuestions,
    questions: state => state.questions,
  },
  modules: {},
});
