<template>
  <Card>
    <contract-manage :employee-id="userId"></contract-manage>
  </Card>
</template>

<script>
  import ContractManage from "../employee/panel/ContractManage";
  import {getUsername} from "../../utils/username";

  export default {
    components: {ContractManage},
    name:"Contract",
    data() {
      return {
        userId: getUsername()
      }
    }
  }
</script>

<style scoped>

</style>