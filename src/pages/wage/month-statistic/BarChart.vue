<template>
  <v-chart class="my-chart" ref="chart" theme="macarons" :options="bar"/>
</template>

<script>
  import ECharts from "vue-echarts/components/ECharts";
  import "echarts/lib/chart/bar";
  import "echarts/lib/component/toolbox"
  import "echarts/lib/component/legend";
  import "echarts/lib/component/tooltip"
  import "echarts/lib/component/title"

  export default {
    name: "BarChart",
    components: {
      "v-chart": ECharts
    },
    mounted() {
      let self = this;
      setTimeout(() => {
        window.addEventListener('resize', function () {
          self.$refs.chart.resize();
        })
      }, 10)
    },
    props: {
      title: {
        type: String,
        default: ''
      },
      toolbox: {
        feature: {
          saveAsImage: {}
        }
      },
      seriesData: {
        type: Array,
        default() {
          return []
        }
      },
      indicators: {
        type: Array,
        default() {
          return []
        }
      },
    },
    data() {
      return {
        bar: {
          title: {
            text: this.title
          },
          tooltip: {
            trigger: 'item',
            formatter: '{b} : {c}'
          },
          xAxis: {
            type: 'category',
            data: this.indicators
          },
          yAxis: {
            type: 'value',
            splitLine: {lineStyle:{type:'dashed'}},
          },
          series: [
            {
              data: this.seriesData,
              type: 'bar'
            }
          ]
        }
      }
    }
  }
</script>

<style scoped>
  .echarts, .my-chart {
    width: 100%;
    min-height: 400px;
  }
</style>