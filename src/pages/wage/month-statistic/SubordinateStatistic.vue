<template>
  <div v-if="finished">
    <Row type="flex" align="middle" :gutter="10">
      <Col span="8">
        <Card>
          <div class="wage-pie-chart">
            <pie-chart :series-data="subSum" :indicators="subNames" title="下级支出分布"></pie-chart>
          </div>
        </Card>
      </Col>
      <Col span="8">
        <Card>
          <pie-chart title="下级人数分布" :series-data="subEmployeeCounts" :indicators="subNames"
                     :radius="[30,90]"></pie-chart>
        </Card>
      </Col>
      <Col span="8">
        <Card>
          <bar-chart title="平均员工薪资" :series-data="subAverage" :indicators="subNames"></bar-chart>
        </Card>
      </Col>
    </Row>
    <br/>
    <Card>
      <stack-bar-chart title="下级支出详情" :terms="stackTerms" :indicators="subNames" :series-data="statistics"></stack-bar-chart>
    </Card>
  </div>
</template>

<script>
  import StackBarChart from "./StackBarChart";
  import {round2d} from "../../../utils/math";
  import {getSubordinatesApi, getWageStatisticsApi} from "../../../api/department";
  import PieChart from "./PieChart";
  import BarChart from "./BarChart";
  import {getWageTerms} from "../table";

  export default {
    name: "SubordinateStatistic",
    components: {BarChart, PieChart, StackBarChart},
    props: {
      departmentId: {
        type: String | Number
      },
      period: {
        type: String,
      }
    },
    data() {
      return {
        statistics: [], // [{} ...]
        subordinates: [],
        finished: false,
        stackTerms: getWageTerms()
      }
    },
    computed: {
      subNames() {
        return this.subordinates.map(sub => sub.name)
      },
      subEmployeeCounts() {
        const s = this.statistics;
        return this.subNames.map((name, i) => ({value: round2d(s[i].countEmployee), name}))
      },
      subAverage() {
        return this.statistics.map(sub => round2d(sub.earnings / sub.countEmployee))
      },
      subSum() {
        const s = this.statistics;
        return this.subNames.map((name, i) => ({value: round2d(s[i].earnings), name}))
      },
      terms() {
        return this.stackTerms.map(st => st.name)
      }
    },
    mounted() {
      const {departmentId, period, statistics} = this;
      if (!!departmentId)
        getSubordinatesApi(departmentId).then(res => {
          this.subordinates = res.data;
          let count = 0;
          this.subordinates.forEach(({id}, index) => {
            statistics.push({});
            getWageStatisticsApi(id, period).then(res => {
              statistics[index] = res.data;
              count += 1;
              if (count === this.subordinates.length)
                this.finished = true;
            })
          })
        });
    }
  }
</script>

<style scoped>

</style>