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
    name: "StackBarChart",
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
      terms: {
        type: Array,
        default() {
          return []
        }
      },
      showLabels: {
        type: Boolean,
        default: false
      }
    },
    data() {
      return {
        bar: {
          title: {
            text: this.title
          },
          grid: {
            left: '3%',
            right: '4%',
            bottom: '3%',
            containLabel: true
          },
          toolbox: {
            feature: {
              saveAsImage: {}
            }
          },
          tooltip : {
            trigger: 'axis',
            axisPointer : {
              type : 'shadow'
            },

          },
          legend: {
            data: this.terms
          },
          xAxis: {
            type: 'value',
            splitLine: {lineStyle: {type: 'dashed'}},
            axisLabel: {
              formatter: value => value.toFixed(2)
            },
          },
          yAxis: {
            type: 'category',
            data: this.indicators,
          },
          series: this.getSeries()
        }
      }
    },
    methods: {
      getSeries() {
        return this.terms.map(
          term => ({
            name: term.name,
            type: 'bar',
            stack: '合计',
            label: {
              normal: {
                show: this.showLabels,
                position: 'insideRight'
              }
            },
            data: this.seriesData.map(series => series[term.key])
          })
        )
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