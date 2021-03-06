import axiosInstance from '@/axios-instance';
import { Question, QuestionsDTO, UserQuestion } from '@/models/questionDTO';
import { Component, Vue } from 'vue-property-decorator';
import { mapGetters } from 'vuex';

import BarChart from '@/components/Charts/BarChart';
import CorrectQuestions from './CorrectQuestions/CorrectQuestions.vue';
import { ChartData } from 'chart.js';
import { CLEAR_EXAM } from '@/store/types/actions-types';

interface QuestionResult {
  id: number;
  solution: string;
  points: number;
}

@Component({
  computed: {
    ...mapGetters(['examQuestions', 'userExamSolutionsParsed', 'examTimeUsed']),
  },
  components: {
    BarChart,
    CorrectQuestions,
  },
})
export default class Result extends Vue {
  isLoading = false;
  examQuestions!: Question[];
  userExamSolutionsParsed!: string[];
  questionsResult: UserQuestion[] = [];
  chartLoaded = false;
  showStatsTab = true;

  chartData: ChartData = {
    datasets: [],
    labels: [],
  };

  examTimeUsed!: number;
  totalQuestions = 0;
  correctAnswers = 0;
  wrongAnswers = 0;
  whiteAnswers = 0;
  points = 0;
  pointsNoPenalty = 0;
  promoted = false;
  penalty = 0.6;
  totalPoints = 0;

  twoPointsQuestion = 0;
  fourPointsQuestion = 0;
  sixPointsQuestion = 0;

  twoPointsCorrect = 0;
  fourPointsCorrect = 0;
  sixPointsCorrect = 0;

  twoPointsWrong = 0;
  fourPointsWrong = 0;
  sixPointsWrong = 0;

  created() {
    this.fetchQuestions();
  }

  async fetchQuestions() {
    this.isLoading = true;
    try {
      const result = await axiosInstance.get('/questions.json');
      this.questionsResult = this.getFlatQuestionsResult(result.data);
      this.calculateResult();
    } catch (error) {
      this.$message.error('500: Server error');
    } finally {
      this.isLoading = false;
    }
  }

  calculateResult() {
    this.totalQuestions = this.questionsResult.length;
    this.penalty = this.totalQuestions >= 21 ? 0.75 : 0.6;
    for (const t of this.questionsResult) {
      this.totalPoints += t.points || 2;

      if (t.points === 6) this.sixPointsQuestion++;
      else if (t.points === 4) this.fourPointsQuestion++;
      else this.twoPointsQuestion++;

      if (t.userSol === '') {
        this.whiteAnswers++;
      } else if (t.userSol === t.sol) {
        this.correctAnswers++;
        this.points += t.points;
        this.pointsNoPenalty += t.points;

        if (t.points === 6) this.sixPointsCorrect++;
        else if (t.points === 4) this.fourPointsCorrect++;
        else this.twoPointsCorrect++;
      } else {
        this.wrongAnswers++;
        this.points -= this.penalty * (t.points || 2);

        if (t.points === 6) this.sixPointsWrong++;
        else if (t.points === 4) this.fourPointsWrong++;
        else this.twoPointsWrong++;
      }
    }
    if (this.points > 0)
      this.points = Math.ceil(32 * (this.points / this.totalPoints));
    else this.points = Math.ceil(this.points);
    this.pointsNoPenalty = Math.ceil(
      32 * (this.pointsNoPenalty / this.totalPoints)
    );

    if (this.points >= 18) {
      this.promoted = true;
    }

    const chartData = {
      datasets: [
        {
          label: 'In bianco',
          data: [
            this.twoPointsQuestion -
              this.twoPointsWrong -
              this.twoPointsCorrect,
            this.fourPointsQuestion -
              this.fourPointsWrong -
              this.fourPointsCorrect,
            this.sixPointsQuestion -
              this.sixPointsWrong -
              this.sixPointsCorrect,
          ],
          backgroundColor: '#53E9F5',
        },
        {
          label: 'Corrette',
          data: [
            this.twoPointsCorrect,
            this.fourPointsCorrect,
            this.sixPointsCorrect,
          ],
          backgroundColor: '#47F5A0',
        },
        {
          label: 'Sbagliate',
          data: [
            this.twoPointsWrong,
            this.fourPointsWrong,
            this.sixPointsWrong,
          ],
          backgroundColor: '#F57C6C',
        },
      ],
      labels: ['2 punti', '4 punti', '6 punti'],
    } as ChartData;

    this.chartData = chartData;
    this.chartLoaded = true;
  }

  getFlatQuestionsResult(questions: QuestionsDTO) {
    const difficult = questions.difficultExercises.map(q => ({
      solution: q.solution,
      id: q.id,
      formula: q.formula,
    }));
    const theoretical = questions.theoreticalQuestions.map(q => ({
      solution: q.solution,
      id: q.id,
      formula: '',
    }));
    const simple = questions.simpleExercises.map(q => ({
      solution: q.solution,
      id: q.id,
      formula: q.formula,
    }));

    const tmp = difficult.concat(theoretical).concat(simple);

    return this.examQuestions.map((elem, index) => ({
      ...elem,
      sol: tmp.find(q => q.id === elem.id)?.solution || '',
      formula: tmp.find(q => q.id === elem.id)?.formula || '',
      userSol: this.userExamSolutionsParsed[index],
    }));
  }

  async goToMenu() {
    await this.$router.push({
      name: 'home-page',
    });
  }

  beforeDestroy() {
    this.$store.dispatch(CLEAR_EXAM);
  }

  msToTime(ms: number) {
    return new Date(ms)
      .toISOString()
      .slice(11, -1)
      .split('.')[0];
  }
}
