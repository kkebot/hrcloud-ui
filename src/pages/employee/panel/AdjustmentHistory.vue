<template>
  <adjustment-table :load-data="loadData" :use-operations="isAdmin">
    <Button v-if="isAdmin" type="primary" :to="{name: 'EmployeeAdjustment', query: { employeeId }}">调整职务/薪级
    </Button>
  </adjustment-table>
</template>

<script>
  import {getAdjustmentHistoryApi} from "../../../api/employee";
  import AdjustmentTable from "./AdjustmentTable";
  import {hasAuthorities} from "../../../utils";


  export default {
    name: "AdjustmentHistory",
    components: {AdjustmentTable},
    props: {
      employeeId: {
        type: Number | String,
        default: null
      },
    },
    data() {
      return {
        isAdmin: hasAuthorities(['ADMIN']),
      }
    },
    methods: {
      loadData(page, size, callback) {
        getAdjustmentHistoryApi(this.employeeId, page, size).then(res => {
          const { content, totalElements } = res.data;
          callback(content, totalElements)
        }).catch(e => this.$Notice.error({ title: `获取调整历史失败`, desc: e.data.message}))
      }
    }
  }
</script>

<style scoped>

</style>