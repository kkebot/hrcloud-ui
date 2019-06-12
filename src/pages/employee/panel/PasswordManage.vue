<template>
  <Row>
    <Col span="12">
      <password-form ref="form" @on-form-ready="changePassword"></password-form>
    </Col>
  </Row>
</template>

<script>
  import PasswordForm from "./PasswordForm";
  import {changePasswordApi} from "../../../api/employee";
  import {mapActions} from "vuex";
  import {hasAuthorities} from "../../../utils";

  export default {
    name: "PasswordManage",
    components: {PasswordForm},
    props: ['employeeId'],
    inject: ['reload'],
    data() {
      return {
        isAdmin: hasAuthorities(['ADMIN'])
      }
    },
    methods: {
      ...mapActions('user', ['logOut']),
      changePassword(formData) {
        const self = this;
        changePasswordApi(self.employeeId, formData).then(_ => {
          self.$Notice.success({ title: '重置密码成功', desc: ''});
          if (!self.isAdmin)
            self.logOut().then(_ => self.$router.push({ name: 'Login' }));
          else {
            self.$router.push({ name: 'EmployeePanel', params: { id: self.employeeId}, query: { tab: 'employee'}})
            self.reload()
          }
        }).catch(e => this.$Notice.error({ title: "重置密码失败", desc: e.data.message}))
      }
    }
  }
</script>

<style scoped>

</style>