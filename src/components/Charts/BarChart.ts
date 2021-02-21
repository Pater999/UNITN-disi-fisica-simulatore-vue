import { Vue, Component, Prop } from 'vue-property-decorator';
import { Bar } from 'vue-chartjs';

@Component({
  extends: Bar,
})
export default class BarChart extends Vue {
  @Prop({ required: true })
  chartData!: Chart.ChartData;
  @Prop({ required: false })
  chartTitle!: string;
  @Prop({ required: false, default: true })
  showLegend!: boolean;

  options = {
    scales: {
      xAxes: [
        {
          stacked: true,
        },
      ],
      yAxes: [
        {
          stacked: true,
          ticks: {
            stepSize: 1,
          },
        },
      ],
    },
    title: {
      display: !!this.chartTitle,
      text: this.chartTitle,
    },
    legend: {
      display: this.showLegend,
    },
    responsive: true,
    maintainAspectRatio: false,
  };

  mounted() {
    // @ts-ignore
    this.renderChart(this.chartData, this.options);
  }
}
