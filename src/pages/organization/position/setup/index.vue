<template>
  <Card>
    <Divider orientation="left">添加岗位</Divider>
    <position-form :use-button="true" @on-form-ready="onSetup"></position-form>
  </Card>
</template>

<script>
  import PositionForm from "../PositionForm";
  import {setupPositionApi} from "../../../../api/position";

  export default {
    components: {PositionForm},
    data() {
      return {
        administrationId: this.$route.query.departmentId,
        administration: null,
      }
    },
    methods: {
      onSetup(formData) {
        const { administrationId } = this;
        setupPositionApi(administrationId, formData).then(res => {
          console.log({ res })
          const positionId = res.data.id;
          this.$Notice.success({ title: "设置岗位成功"});
          this.$router.push({ name: 'PositionDetails', params: { id: positionId }});
        }).catch(e => this.$Notice.error({ title: `设置岗位失败(${e.status})`, desc: e.data.message}))
      },
    }
  }
</script>

<style scoped>
  .ivu-divider {
    color: #2b85e4;
  }
</style>