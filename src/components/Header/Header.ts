import { END_EXAM } from '@/store/types/actions-types';
import { Component, Vue } from 'vue-property-decorator';
import { mapGetters } from 'vuex';

@Component({
  computed: {
    ...mapGetters(['isExamStarted', 'userAnswersCount', 'examQuestionsCount']),
  },
})
export default class Header extends Vue {
  isExamStarted!: boolean;
  userAnswersCount!: number;
  examQuestionsCount!: number;

  async endExam() {
    try {
      await this.$confirm(
        'Hai risposto a ' +
          this.userAnswersCount +
          ' domande su ' +
          this.examQuestionsCount +
          '. Sei sicuro di voler terminare il tentativo?',
        'Termina il test',
        {
          confirmButtonText: 'Termina test',
          cancelButtonText: 'Annulla',
          type: 'warning',
          confirmButtonClass: 'el-button--warning',
          closeOnClickModal: false,
        }
      );

      await this.$store.dispatch(END_EXAM, { endDate: new Date() });
      this.$router.replace('/test-results');
    } catch (error) {
      console.log('ANNULLATO');
    }
  }
}
