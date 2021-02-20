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
  userExamSolutions: string[][] | null;
  examTime: number | null;
  examStartDate: number | null;
}

export default new Vuex.Store({
  state: {
    isExamStarted: false,
    examQuestions: null,
    examTime: null,
    examStartDate: null,
    userExamSolutions: null,
  },
  mutations: {
    [Action.SET_EXAM_STATE](state: State, examState: boolean) {
      state.isExamStarted = examState;

      if (examState) {
        window.localStorage.setItem(
          `${APP_NAME}_isExamStarted`,
          examState.toString()
        );
      } else {
        window.localStorage.setItem(
          `${APP_NAME}_isExamStarted`,
          examState.toString()
        );
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
    [Action.SET_EXAM_USER_ANSWER](
      state: State,
      userAnswers: string[][] | null
    ) {
      state.userExamSolutions = userAnswers;

      if (userAnswers) {
        window.localStorage.setItem(
          `${APP_NAME}_userAnswers`,
          JSON.stringify(userAnswers)
        );
      } else {
        window.localStorage.removeItem(`${APP_NAME}_userAnswers`);
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
    [Action.SET_EXAM_START_DATE](state: State, startDate: number | null) {
      state.examStartDate = startDate;

      if (startDate) {
        window.localStorage.setItem(
          `${APP_NAME}_startDate`,
          startDate.toString()
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
      const userAnswers = window.localStorage.getItem(
        `${APP_NAME}_userAnswers`
      );
      const isExamStarted = window.localStorage.getItem(
        `${APP_NAME}_isExamStarted`
      );

      if (startDate && time && examQuestions && userAnswers && isExamStarted) {
        commit(Action.SET_EXAM_QUESTIONS, JSON.parse(examQuestions));
        commit(Action.SET_EXAM_TIME, parseInt(time));
        commit(Action.SET_EXAM_START_DATE, parseInt(startDate));
        commit(Action.SET_EXAM_USER_ANSWER, JSON.parse(userAnswers));
        commit(Action.SET_EXAM_STATE, isExamStarted === 'true');
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
        Action.SET_EXAM_USER_ANSWER,
        new Array(examQuestions.length).fill([])
      );
      commit(
        Action.SET_EXAM_TIME,
        settings.infiniteTime ? -1 : settings.time * 60000
      );
      commit(Action.SET_EXAM_START_DATE, new Date().getTime());
      commit(Action.SET_EXAM_STATE, true);
    },
    [Action.END_EXAM]({ commit }) {
      commit(Action.SET_EXAM_STATE, false);
    },
    [Action.CHANGE_ANSWER]({ commit }, { answers }: { answers: string[][] }) {
      commit(Action.SET_EXAM_USER_ANSWER, answers);
    },
  },
  getters: {
    isExamStarted: state => state.isExamStarted,
    examQuestions: state => state.examQuestions,
    examQuestionsCount: state => state.examQuestions?.length || 0,
    userExamSolutions: state => state.userExamSolutions,
    examStartDate: state => state.examStartDate,
    examTime: state => state.examTime,
    userAnswersCount: state =>
      state.userExamSolutions?.filter(el => el.length > 0).length ?? 0,
    userExamSolutionsParsed: state =>
      state.userExamSolutions?.map(el => el[0] ?? '') ?? [],
  },
  modules: {},
});
