<template>
  <Card>
    <adjustment-history :employee-id="userId"></adjustment-history>
  </Card>
</template>

<script>
  import AdjustmentHistory from "../employee/panel/AdjustmentHistory";
  import {getUsername} from "../../utils/username";

  export default {
    name: "Adjustment",
    components: {AdjustmentHistory},
    data() {
      return {
        userId: getUsername()
      }
    }
  }
</script>

<style scoped>

</style>