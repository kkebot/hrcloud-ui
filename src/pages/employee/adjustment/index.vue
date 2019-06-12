<template>
  <Card v-if="!!employee">
    <Divider orientation="left">员工调整</Divider>
    <Row type="flex" align="middle" v-if="!!department">
      <Col style="width: 100px"><label>当前部门</label></Col>
      <Col>
        {{ department.name }}({{ department.id }})
      </Col>
    </Row>
    <br/>
    <Row type="flex" align="middle">
      <Col style="width: 100px"><label>当前职务</label></Col>
      <Col>
        <Tag color="success">
          {{ employee.mainPosition.name }}
        </Tag>
        ({{ employee.mainPosition.id }})
      </Col>
    </Row>
    <br/>
    <Row type="flex" align="middle">
      <Col style="width: 100px"><label>当前薪级</label></Col>
      <Col>
        <Tag color="success">
          {{ employee.scale.id }}(￥{{ employee.scale.salary }})
        </Tag>
      </Col>
    </Row>
    <Divider/>
    <adjustment-form
        :employee="employee"
        @on-form-ready="onAdjustment"
        :use-button="true">

    </adjustment-form>
  </Card>
</template>

<script>
  import {adjustmentApi, getEmployeeApi} from "../../../api/employee";
  import {queryAdminApi} from "../../../api/department";
  import AdjustmentForm from "./AdjustmentForm";

  export default {
    components: {AdjustmentForm},
    data() {
      return {
        employeeId: this.$route.query.employeeId,
        employee: null,
        department: null,
      }
    },
    mounted() {
      getEmployeeApi(this.employeeId).then(res => this.employee = res.data);
      queryAdminApi('employee', this.employeeId).then(res => this.department = res.data);
    },
    methods: {
      onAdjustment(formData) {
        const id = this.employeeId;
        adjustmentApi(id, formData).then(_ => {

          this.$Notice.success({ title: "调整成功"});
          this.$router.push({ name: 'EmployeePanel', params: { id }, query: { tab: 'employee'}})

        }).catch(e => this.$Notice.error({ title: `调整失败`, desc: e.data.message }))
      }
    }
  }
</script>

<style scoped>
  h4, .ivu-divider {
    color: #2b85e4;
  }
</style>