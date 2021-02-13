import { END_EXAM } from '@/store/types/actions-types';
import { Component, Vue } from 'vue-property-decorator';
import { mapGetters } from 'vuex';

@Component({
  computed: {
    ...mapGetters(['isExamStarted']),
  },
})
export default class Header extends Vue {
  isExamStarted!: boolean;

  async endExam() {
    await this.$store.dispatch(END_EXAM);
    this.$router.replace('/test-results');
  }
}
