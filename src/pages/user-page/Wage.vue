<template>
  <Card>
    <wage-manage :employee-id="userId"></wage-manage>
  </Card>
</template>

<script>
  import WageManage from "../employee/panel/WageManage";
  import {getUsername} from "../../utils/username";

  export default {
    components: {WageManage},
    name:"Wage",
    data() {
      return {
        userId: getUsername()
      }
    }
  }
</script>

<style scoped>

</style>