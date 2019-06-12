<template>
  <div>
    <Row type="flex" :gutter="10">
      <Col span="8">
        <Card>
          <div class="wage-pie-chart" v-if="!!statistics">
            <pie-chart
                :series-data="principal"
                :indicators="indicators"
                title="支出分布"></pie-chart>
          </div>
        </Card>
      </Col>
      <Col span="16">
        <Card v-if="!!earnings">
          <bar-chart title="合计人数分布" :indicators="earnings.labels" :series-data="earnings.distribution"></bar-chart>
        </Card>
      </Col>
    </Row>
    <br/>
    <div v-if="!!statistics">
      <subordinate-statistic :department-id="departmentId" :period="period"></subordinate-statistic>
    </div>
    <br/>
    <Card>
      <Divider orientation="left">员工薪资排序</Divider>
      <wage-table :simple="true" :load-data="loadTopData"></wage-table>
    </Card>
    <br/>
  </div>
</template>
<script>

  import PieChart from "./PieChart";
  import BarChart from "./BarChart";
  import SubordinateStatistic from "./SubordinateStatistic";
  import WageTable from "../WageTable";
  import {getEarningsDistributionApi, queryWagesApi, updateStatisticApi} from "../../../api/wage";
  import {firstDayOfMonth} from "../../../api/common";
  import {getWageStatisticsApi} from "../../../api/department";
  import {getWageTerms} from "../table";

  export default {
    components: {WageTable, SubordinateStatistic, BarChart, PieChart},
    data() {
      return {
        departmentId: this.$route.query.departmentId,
        period: this.$route.query.period,
        statistics: null,
        terms: getWageTerms(),

        earnings: null
      }
    },
    computed: {
      principal() {
        const s = this.statistics;
        return this.terms.map(({ key, name }) => ({ name, value: s[key] }))
      },
      indicators() {
        return this.terms.map(t => t.name)
      }
    },
    mounted() {
      const { departmentId, period } = this;
      getWageStatisticsApi(departmentId, period).then(res => {
        const s = res.data;
        console.log({ s });
        if (!s || s.blur)
          updateStatisticApi(departmentId, period).then(r => this.statistics = r.data);
        else
          this.statistics = s;

      }).catch(e => this.$Notice.error({ title: `获取统计信息失败${e.status}`, desc: e.data.message}))
      this.fetchSubStatistics();

    },
    methods: {
      fetchSubStatistics() {
        const { departmentId, period } = this;
        getEarningsDistributionApi(departmentId, period).then(res => {
          let { distribution } = res.data;

          let labels = [];
          let length = distribution.length;

          distribution.forEach((_, index) => labels.push(`${(index+1)/length*100}%`));
          this.earnings = { distribution, labels }
        }).catch(e => this.$Notice.error({ title: `获取薪资分布失败${e.status}`, desc: e.data.message}))
      },
      loadTopData(page, size, callback) {
        const entityType = 'department';
        const {period, departmentId} = this;
        let from, to;
        from = to = firstDayOfMonth(new Date(period));

        queryWagesApi({ entityType, entityId: departmentId, from, to, page, size })
          .then(res => {
            const { content, totalElements } = res.data;
            callback(content, totalElements)
          }).catch(e => this.$Notice.error({ title: `获取薪资失败(${e.status})`, desc: e.data.message}))
      }
    }
  };
</script>
<style scoped>
.wage-pie-chart {
  min-height: 400px;
}
h4, .ivu-divider {
  color: #2b85e4;
}
</style>