<template>
  <div>
    <wage-table ref="table" :use-operations="isAdmin" :load-data="loadData">
      <Row type="flex" align="middle" :gutter="10">
        <Col>
          <DatePicker
              placeholder="起始时间"
              v-model="from"
              :editable="false"></DatePicker>
        </Col>
        <Col>至</Col>
        <Col>
          <DatePicker
              placeholder="结束时间"
              v-model="to"
              :editable="false"></DatePicker>
        </Col>
        <Col>
          <Button type="success" @click="$refs.table.resetPage()">搜索</Button>
        </Col>
      </Row>
    </wage-table>
    <Divider orientation="left">薪资折线图</Divider>
    <template v-if="wages.length>=3">
      <line-chart
          :key="lineKey"
          :terms="stackTerms"
          :series-data="wages"
          :indicators="trendAxis"></line-chart>
    </template>
    <template v-else>
      <Alert type="info" show-icon>
        筛选数据不足
        <p slot="desc">请筛选三个或以上核算月份以查看薪资变化趋势</p>
      </Alert>
    </template>
  </div>
</template>

<script>
  import WageTable from "../../wage/WageTable";
  import {queryWagesApi} from "../../../api/wage";
  import {firstDayOfMonth} from "../../../api/common";
  import LineChart from "../../wage/month-statistic/LineChart";
  import {getWageTerms} from "../../wage/table";
  import {hasAuthorities} from "../../../utils";

  export default {
    name: "WageManage",
    components: {LineChart, WageTable},
    props: ['employeeId'],
    data() {
      return {
        isAdmin: hasAuthorities(['ADMIN']),
        from: firstDayOfMonth(new Date()),
        to: firstDayOfMonth(new Date()),

        lineKey: '',
        stackTerms: [{ key: 'earnings', name: '合计'}].concat(getWageTerms()),
        wages: []
      }
    },
    computed: {
      trendAxis() {
        return this.wages.map(w => w.period)
      }
    },
    methods: {
      loadData(page, size, callback) {
        const {from, to, employeeId} = this;

        queryWagesApi({entityType: 'employee', entityId: employeeId, from, to, page, size}).then(res => {
          const {content, totalElements} = res.data;
          this.wages = content;
          this.lineKey = from + '-' + to + '-' + page + '-' + size;
          console.log(this.lineKey)
          callback(content, totalElements)
        }).catch(e => this.$Notice.error({title: `获取薪资失败(${e.status})`, desc: e.data.message}))
      },
    }
  }
</script>

<style scoped>

</style>
