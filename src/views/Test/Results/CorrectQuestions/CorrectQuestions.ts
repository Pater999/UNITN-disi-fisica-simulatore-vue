import { UserQuestion } from '@/models/questionDTO';
import { Component, Prop, PropSync, Vue } from 'vue-property-decorator';

@Component
export default class CorrectQuestions extends Vue {
  @Prop({ required: true })
  examQuestions!: UserQuestion[];
  @Prop({ required: true })
  examQuestionsCount!: number;
  @PropSync('showStatistics', { type: Boolean, required: true })
  showStatistics!: boolean;

  currentQuestion = 1;
  windowWidth = 0;
  pagerCount = 5;

  imageDialogVisible = false;

  created() {
    window.addEventListener('resize', this.handleResize);
    this.handleResize();
  }

  beforeDestroy() {
    window.removeEventListener('resize', this.handleResize);
  }

  questionStatusClass() {
    if (this.examQuestions[this.currentQuestion - 1].userSol === '')
      return 'primary';
    else if (
      this.examQuestions[this.currentQuestion - 1].userSol ===
      this.examQuestions[this.currentQuestion - 1].sol
    )
      return 'success';
    return 'danger';
  }

  questionStatusText() {
    if (this.examQuestions[this.currentQuestion - 1].userSol === '')
      return 'Hai lasciato questa risposta in bianco';
    else if (
      this.examQuestions[this.currentQuestion - 1].userSol ===
      this.examQuestions[this.currentQuestion - 1].sol
    )
      return 'Hai risposto in modo corretto!';
    return 'Hai sbagliato risposta!';
  }

  answerStatusClass(answer: string) {
    if (answer === this.examQuestions[this.currentQuestion - 1].sol) {
      return 'success';
    } else if (
      answer === this.examQuestions[this.currentQuestion - 1].userSol
    ) {
      return 'danger';
    }
    return '';
  }

  handleResize() {
    this.windowWidth = window.innerWidth;
    if (this.windowWidth >= 1300) {
      this.pagerCount = 21;
    } else if (this.windowWidth >= 1024) {
      this.pagerCount = 19;
    } else if (this.windowWidth >= 768) {
      this.pagerCount = 13;
    } else if (this.windowWidth >= 540) {
      this.pagerCount = 7;
    } else {
      this.pagerCount = 5;
    }
  }
}
