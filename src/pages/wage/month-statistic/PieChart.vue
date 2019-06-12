<template>
  <v-chart class="my-chart" ref="chart" theme="macarons" :options="pie"/>
</template>

<script>
  import ECharts from "vue-echarts/components/ECharts";
  import "echarts/lib/chart/pie";
  import "echarts/lib/component/toolbox"
  import "echarts/lib/component/legend";
  import "echarts/lib/component/tooltip"
  import "echarts/lib/component/title"

  export default {
    name: "PieChart",
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
      roseType: {
        type: String | Boolean,
        default: null
      },
      radius: {
        type: Array | String,
        default() {
          return '55%'
        }
      },
    },
    mounted() {
      let self = this;
       setTimeout(() => {
         window.addEventListener('resize', function () {
           self.$refs.chart.resize();
         })
       }, 10)
    },
    data() {
      return {
        pie: {
          title: {
            text: this.title
          },
          tooltip: {
            trigger: 'item',
            formatter: '{b} : {c} ({d}%)'
          },
          legend: {
            data: this.indicators,
            bottom: 5
          },
          toolbox: {
            feature: {
              saveAsImage: {}
            }
          },
          // legendHoverLink: true,
          calculable: true,
          series: [
            {
              type: 'pie',
              roseType: this.roseType,
              radius: this.radius,
              center: ['50%', '50%'],
              data: this.seriesData,
              animationEasing: 'cubicInOut',
              animationDuration: 2000
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
    /*height: 100%;*/
    min-height: 400px;
    /*min-width: 200px;*/
  }
  /*.echarts {*/
    /*width: 100%;*/
    /*height: 100%;*/
    /*!*min-width: 200px;*!*/
    /*!*min-height: 200px;*!*/
  /*}*/
</style>