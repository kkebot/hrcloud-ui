<template>
  <Card>
    <p slot="title">编辑部门信息</p>
    <template v-if="!!department">
      <department-form
          :department="department"
          @on-form-ready="updateDepartment"
          :use-button="true"></department-form>
    </template>
  </Card>
</template>

<script>
  import DepartmentForm from "../DepartmentForm";
  import {getDepartmentApi, updateDepartmentApi} from "../../../../api/department";

  export default {
    components: {DepartmentForm},
    data() {
      return {
        department: null,
        departmentId: this.$route.query.departmentId
      }
    },
    mounted() {
      getDepartmentApi(this.departmentId).then(res => {
        this.department = res.data
      }).catch(e => this.$Notice.error({ title: `获取岗位信息失败${e.status}`, desc: e.data.message}))
    },
    methods: {
      updateDepartment(formData) {
        const id = this.departmentId;
        updateDepartmentApi(id, formData).then(_ => {
          this.$Notice.success({ title: "更新部门成功"})
          this.$router.push({ name: 'DepartmentDetails', params: { id }})
        }).catch(e => {
          const title = "更新部门失败";
          let desc = e.data.message
          this.$Notice.error({ title, desc })
        });
      },
    }
  }
</script>

<style scoped>

</style>