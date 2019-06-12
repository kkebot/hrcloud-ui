<template>
  <Row type="flex" :gutter="20">
    <Col span="6">
      <Card :style="{'overflow-x': 'auto'}">
        <Divider orientation="left">部门架构</Divider>
        <department-tree @node-select-change="onSelected" :init-id="departmentId"></department-tree>
        <Divider/>
        <Row type="flex" justify="space-between" align="middle">
          <Col>
            <label>月份</label>
          </Col>
          <Col>
            <DatePicker placeholder="核算周期" v-model="period" :editable="false"></DatePicker>
          </Col>
        </Row>
        <br/>
        <Button long @click="$refs.table.resetPage()" :disabled="!departmentId" type="primary">搜索</Button>
      </Card>
    </Col>
    <Col span="18">
      <Card>
        <Divider orientation="left">员工薪资列表</Divider>
        <wage-table
            ref="table"
            :simple="true"
            :load-data="loadData">
          <ButtonGroup>
            <Button :disabled="!departmentId" :to="{ name: 'MonthStatistic', query: { departmentId, 'period': period.toString() }}">生成薪资统计</Button>
            <Button type="success" :to="{ name: 'RawWageUpload'}">导入原始数据</Button>
          </ButtonGroup>
        </wage-table>
      </Card>
    </Col>
  </Row>
</template>

<script>
  import WageTable from "../WageTable";
  import DepartmentTree from "../../organization/DepartmentTree";
  import {queryWagesApi} from "../../../api/wage";
  import {firstDayOfMonth} from "../../../api/common";

  export default {
    components: {WageTable, DepartmentTree},
    data() {
      let { departmentId, period } = this.$route.query;

      return {
        departmentId,
        period: period ? new Date(period) : new Date(),
      }
    },
    mounted() {
      this.$refs.table.resetPage()
    },
    methods: {
      onSelected(node) {
        this.departmentId = (!!node && node.entity.id);
      },
      changeRoute() {
        const {departmentId, period} = this;
        this.$router.replace({ name: 'WageDepartment', query: { departmentId, period: period.toString() }})
      },
      loadData(page, size, callback) {
        const {departmentId, period} = this;
        if (!departmentId)
          return;

        const condition = {
          page, size, entityId: departmentId, "entityType": "department",
          from: firstDayOfMonth(period), to: firstDayOfMonth(period)
        };

        queryWagesApi(condition).then(res => {
          const {content, totalElements} = res.data;
          callback(content, totalElements);
          this.changeRoute()

        }).catch(e => this.$Notice.error({title: `获取部门薪资失败(${e.status})`, desc: e.data.message}))
      },
    },
  }

</script>

<style scoped>
  .ivu-divider {
    color: #2b85e4;
  }
</style>
