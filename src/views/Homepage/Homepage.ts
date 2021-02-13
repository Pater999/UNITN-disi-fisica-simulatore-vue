import axiosInstance from '@/axios-instance';
import { QuestionsDTO } from '@/models/questionDTO';
import { TestSettings, examConst } from '@/models/TestSettings';
import { START_EXAM } from '@/store/types/actions-types';
import { Component, Vue } from 'vue-property-decorator';

@Component
export default class Homepage extends Vue {
  isLoading = false;
  form: TestSettings = { ...examConst.covid };
  lockValues = true;
  questions: QuestionsDTO | null = null;

  counts = {
    theoreticalQuestions: 0,
    simpleExercises: 0,
    difficultExercises: 0,
  };

  created() {
    this.fetchCounts();
  }

  async fetchCounts() {
    this.isLoading = true;
    try {
      const result = (await (await axiosInstance.get('/questions.json'))
        .data) as QuestionsDTO;
      this.counts = {
        theoreticalQuestions: result.theoreticalQuestions.length,
        simpleExercises: result.simpleExercises.length,
        difficultExercises: result.difficultExercises.length,
      };
      this.questions = result;
      this.form = { ...examConst.covid };
    } catch (error) {
      this.$message.error('500: Server error');
    } finally {
      this.isLoading = false;
    }
  }

  async startTest() {
    if (
      this.form.difficultExercisesCount +
        this.form.simpleExercisesCount +
        this.form.theoreticalQuestionsCount <
      1
    ) {
      this.$message.error(
        'Attenzione! Devi aggiungere almeno una domanda per iniziare il test'
      );
      return;
    }
    await this.$store.dispatch(START_EXAM, {
      questions: this.questions,
      settings: this.form,
    });
    this.$router.replace('/test');
  }

  examTypeChanged(value: number) {
    switch (value) {
      case 0:
        this.form = { ...examConst.normal };
        this.lockValues = true;
        break;
      case 1:
        this.form = { ...examConst.covid };
        this.lockValues = true;
        break;
      case 2:
        this.form = { ...examConst.personal };
        this.lockValues = false;
        break;
      default:
        break;
    }
  }

  timeTooltip(value: number) {
    return Math.floor(value / 60) + ' ore e ' + (value % 60) + ' minuti';
  }
}
