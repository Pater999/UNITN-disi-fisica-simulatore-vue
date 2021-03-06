import { Question } from '@/models/questionDTO';
import { CHANGE_ANSWER, END_EXAM } from '@/store/types/actions-types';
import { Component, Vue, Watch } from 'vue-property-decorator';
import { mapGetters } from 'vuex';

const APP_NAME = 'SIMULATORE_FISICA';

@Component({
  computed: {
    ...mapGetters([
      'examQuestions',
      'examQuestionsCount',
      'userExamSolutions',
      'examStartDate',
      'examTime',
    ]),
  },
})
export default class Test extends Vue {
  examQuestions!: Question[];
  examQuestionsCount!: number;
  userExamSolutions!: string[];
  examStartDate!: number;
  examTime!: number;

  interval: number | undefined;

  imageDialogVisible = false;

  currentQuestion = 1;
  timePercentage = 0;
  windowWidth = 0;
  pagerCount = 5;

  @Watch('currentQuestion')
  currentQuestionChanged() {
    window.localStorage.setItem(
      `${APP_NAME}_currentQuestion`,
      this.currentQuestion.toString()
    );
  }

  created() {
    const cq = window.localStorage.getItem(`${APP_NAME}_currentQuestion`);
    this.currentQuestion = cq ? parseInt(cq) : 1;

    this.interval = setInterval(this.updateTimePercentage, 100);

    window.addEventListener('resize', this.handleResize);
    this.handleResize();
  }

  beforeDestroy() {
    window.removeEventListener('resize', this.handleResize);
    clearInterval(this.interval);
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

  updateTimePercentage() {
    const percentage =
      ((new Date().getTime() - this.examStartDate) / this.examTime) * 100;
    if (percentage > 100) {
      this.timePercentage = 100;
      this.endExam();
    } else {
      this.timePercentage = percentage;
    }
  }

  async endExam() {
    clearInterval(this.interval);
    await this.$store.dispatch(END_EXAM, {
      endDate: new Date(this.examStartDate + this.examTime),
    });
    await this.$alert(
      "Hai finito il tempo a disposizione per completare l'esame",
      'Tempo finito',
      {
        confirmButtonText: 'Vai ai risultati',
      }
    );
    this.$router.replace('/test-results');
  }

  async solutionChanged() {
    await this.$store.dispatch(CHANGE_ANSWER, {
      answers: this.userExamSolutions,
    });
  }

  formatTimeLeft() {
    const time = this.examStartDate + this.examTime - new Date().getTime();
    return this.msToTime(time > 0 ? time : 0);
  }

  customColorMethod() {
    const green =
      (this.timePercentage > 50
        ? 1 - (2 * (this.timePercentage - 50)) / 100.0
        : 1.0) * 255;
    const red =
      (this.timePercentage > 50 ? 1.0 : (2 * this.timePercentage) / 100.0) *
      255;
    const blue = 0;

    return this.rgbToHex(Math.floor(red), Math.floor(green), blue);
  }

  msToTime(ms: number) {
    return new Date(ms)
      .toISOString()
      .slice(11, -1)
      .split('.')[0];
  }

  rgbToHex = (r: number, g: number, b: number) =>
    '#' +
    [r, g, b]
      .map(x => {
        const hex = x.toString(16);
        return hex.length === 1 ? '0' + hex : hex;
      })
      .join('');
}
