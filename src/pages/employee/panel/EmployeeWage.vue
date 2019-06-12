<template>
  <WageTable></WageTable>
</template>

<script>
  import WageTable from "../../wage/WageTable";

  export default {
  name: "EmployeeWage",
  components: {WageTable},
  props: {
    initEmployee: {
      type: Object
    }
  },
  data() {
    return {
      employee: { ...this.initEmployee}
    }
  },
  watch: {
    'initEmployee.id': {
      handler(val) {
        this.employee = { ...this.initEmployee}
      }
    }
  },
}
</script>

<style scoped>

</style>
