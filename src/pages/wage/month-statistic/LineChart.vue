<template>
  <v-chart class="my-chart" ref="chart" theme="macarons" :options="lines"/>
</template>

<script>
  import ECharts from "vue-echarts/components/ECharts";
  import "echarts/lib/chart/line";
  import "echarts/lib/component/legend";
  import "echarts/lib/component/tooltip"
  import "echarts/lib/component/title"
  import "echarts/lib/component/toolbox"

  export default {
    name: "LineChart",
    components: {
      "v-chart": ECharts
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
        lines: {
          title: {
            text: this.title
          },
          grid: {
            left: 10,
            right: 50,
            bottom: 20,
            top: 30,
            containLabel: true
          },
          tooltip : {
            trigger: 'axis',
            axisPointer: {
              type: 'cross',
              label: {
                backgroundColor: '#6a7985'
              },
            },
            padding: [5, 10]
          },
          legend: {
            data: this.terms
          },
          toolbox: {
            feature: {
              saveAsImage: {}
            }
          },
          xAxis: {
            // type: 'category',
            boundaryGap : false,
            data: this.indicators,
            axisTick: {
              show: false
            }
          },
          yAxis: {
            type: 'value',
            axisLabel: {
              formatter: value => value.toFixed(2)
            },
          },
          series: this.getSeries()
        }
      }
    },
    mounted() {
      console.log("LineChart mounted")
    },
    methods: {
      getSeries() {
        return this.terms.map(
          term => ({
            name: term.name,
            type: 'line',
            // stack: '合计',
            smooth: true,
            animationDuration: 2800,
            animationEasing: 'cubicInOut',
            // label: {
            //   normal: {
            //     show: this.showLabels,
            //     position: 'insideRight'
            //   }
            // },
            itemStyle: {},
            areaStyle: {},
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