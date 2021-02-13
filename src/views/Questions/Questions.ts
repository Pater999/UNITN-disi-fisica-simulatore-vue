import { Component, Vue, Watch } from 'vue-property-decorator';
import axiosInstance from '@/axios-instance';
import { QuestionsDTO } from '@/models/questionDTO';

@Component
export default class Questions extends Vue {
  isLoading = false;
  showSolutions = false;
  activeNames = ['1'];
  questions: QuestionsDTO | null = null;
  filteredQuestions: QuestionsDTO | null = null;
  questionSearch = '';
  selectedTab = 'theoreticalQuestions';

  created() {
    this.fetchQuestions();
  }

  @Watch('questionSearch')
  @Watch('selectedTab')
  updateQuestionFilter() {
    if (!this.questions) return;
    const t = { ...this.questions };

    /* eslint-disable  @typescript-eslint/no-explicit-any */
    (t as any)[this.selectedTab] = (t as any)[
      this.selectedTab
    ].filter((q: any) =>
      q.question.toLowerCase().includes(this.questionSearch.toLowerCase())
    );

    this.filteredQuestions = t as QuestionsDTO;
  }

  async fetchQuestions() {
    this.isLoading = true;
    try {
      const result = await axiosInstance.get('/questions.json');
      this.questions = result.data;
      this.filteredQuestions = result.data;
    } catch (error) {
      this.$message.error('500: Server error');
    } finally {
      this.isLoading = false;
    }
  }
}
