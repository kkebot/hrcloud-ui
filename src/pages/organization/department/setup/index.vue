<template>
  <Card>
    <Divider orientation="left">添加下级部门</Divider>
    <department-form :use-button="true" @on-form-ready="onSetup"></department-form>
  </Card>
</template>

<script>
  import DepartmentForm from "../DepartmentForm";
  import {setupDepartmentApi} from "../../../../api/department";

  export default {
    components: {DepartmentForm},
    data() {
      return {
        administrationId: this.$route.query.departmentId,
        administration: null,
      }
    },
    methods: {
      onSetup(formData) {
        const { administrationId } = this;
        setupDepartmentApi(administrationId, formData).then(res => {
          const departmentId = res.data.id;
          this.$Notice.success({ title: "设置部门成功"});
          this.$router.push({ name: 'DepartmentDetails', params: { id: departmentId }});
        }).catch(e => this.$Notice.error({ title: `设置部门失败(${e.status})`, desc: e.data.message}))
      },
    }
  }
</script>

<style scoped>
  .ivu-divider {
    color: #2b85e4;
  }
</style>