<template>
  <Card>
    <employee-import-form v-if="!!employee" @on-form-ready="onUpdateEmployee" :profile="employee"/>

  </Card>
</template>

<script>
  import {getEmployeeApi, updateEmployeeApi} from "../../../api/employee";
  import EmployeeImportForm from "../import/EmployeeImportForm";

  export default {
  components: {EmployeeImportForm},
  data() {
    return {
      employee: null,
      employeeId: this.$route.query.employeeId,
    }
  },
  mounted() {
    if (!!this.employeeId)
      getEmployeeApi(this.employeeId).then(res => this.employee = res.data)
  },
  methods: {
    onUpdateEmployee(formData) {
      console.log(formData)
      const id = this.employeeId;
      updateEmployeeApi(id, formData).then(res => {

        this.$Notice.success({ title: "更新员工信息成功"});
        this.$router.go(-1)

      }).catch(e => this.$Notice.error({ title: "更新员工信息失败" }))
    },
    goBack() {
      this.$router.go(-1)
    },
  }
}
</script>

<style scoped>

</style>