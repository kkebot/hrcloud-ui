<template>
  <Card class="user-set" shadow>
    <Tabs v-model="tab" @on-click="changeRoute" v-if="!!employeeId">
      <TabPane label="员工信息" name="employee">
        <employee-profile :employee-id="employeeId"></employee-profile>
      </TabPane>
      <TabPane label="调整历史" name="adjustment">
        <adjustment-history :employee-id="employeeId"></adjustment-history>
      </TabPane>
      <TabPane label="薪资记录" name="wage_record">
        <wage-manage :employee-id="employeeId"></wage-manage>
      </TabPane>
      <TabPane label="合同管理" name="contract">
        <contract-manage :employee-id="employeeId"></contract-manage>
      </TabPane>
      <TabPane label="重置密码" name="password">
        <password-manage :employee-id="employeeId"></password-manage>
      </TabPane>
    </Tabs>
  </Card>
</template>
<script>

  import WageManage from "./WageManage";
  import ContractManage from "./ContractManage";
  import EmployeeProfile from "./EmployeeProfile";
  import AdjustmentForm from "../adjustment/AdjustmentForm";
  import AdjustmentHistory from "./AdjustmentHistory";
  import PasswordManage from "./PasswordManage";

  export default {
  components: {PasswordManage, AdjustmentHistory, AdjustmentForm, EmployeeProfile, ContractManage, WageManage},
  data() {
    return {
      tab: this.$route.query.tab || 'employee',
      employeeId: this.$route.params.id,

    }
  },
  methods:{
    changeRoute() {
      const tab = this.tab;
      this.$router.replace({ name: 'EmployeePanel', query: { tab }})
    }
  }
}
</script>
<style lang="less" scoped>
  .user-set {
    .ivu-card-body {
      display: flex;
      padding-left: 0;
    }
  }
</style>
