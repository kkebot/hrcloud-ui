<template>
  <Card>
    <password-manage :employee-id="userId"></password-manage>
  </Card>
</template>

<script>
  import WageManage from "../employee/panel/WageManage";
  import {getUsername} from "../../utils/username";
  import PasswordManage from "../employee/panel/PasswordManage";
  import PasswordForm from "../employee/panel/PasswordForm";

  export default {
    components: {PasswordForm, PasswordManage, WageManage},
    name:"Password",
    data() {
      return {
        userId: getUsername()
      }
    }
  }
</script>

<style scoped>

</style>