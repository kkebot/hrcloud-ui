<template>
  <Card>
    <employee-profile :employee-id="userId"></employee-profile>
  </Card>
</template>

<script>
  import EmployeeProfile from "../employee/panel/EmployeeProfile";
  import {getUsername} from "../../utils/username";

  export default {
    components: {EmployeeProfile},
    name: "Profile",
    data() {
      return {
        userId: getUsername()
      }
    }
  }
</script>

<style scoped>

</style>