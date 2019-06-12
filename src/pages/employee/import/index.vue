<template>
  <Card>
    <employee-import-form @on-form-ready="onImportEmployee" />
  </Card>
</template>

<script>
  import {importEmployeeApi} from "../../../api/employee";
  import EmployeeImportForm from "./EmployeeImportForm";


  export default {
  components: {EmployeeImportForm},
  methods: {
    onImportEmployee(formData) {
      console.log(formData);
      importEmployeeApi(formData).then(res => {
        const id = res.data.id
        this.$Notice.success({ title: `导入员工(${id})成功`})
        this.$router.push({ name: 'EmployeePanel', params: { id }})
      }).catch(e => this.$Notice.error({ title: `导入员工失败(${e.message})`}))
    },
  }
}
</script>

<style scoped>

</style>