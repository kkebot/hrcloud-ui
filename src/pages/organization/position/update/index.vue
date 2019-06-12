<template>
  <Card>
    <Divider orientation="left">编辑岗位信息</Divider>
    <template v-if="!!position">
      <position-form
          :position="position"
          @on-form-ready="updatePosition"
          :use-button="true"></position-form>
    </template>
  </Card>
</template>

<script>
  import PositionForm from "../PositionForm";
  import {getPositionApi, updatePositionApi} from "../../../../api/position";

  export default {
    components: {PositionForm},
    data() {
      return {
        positionId: this.$route.query.positionId,
        position: null,
      }
    },
    mounted() {
      getPositionApi(this.positionId).then(res => {
        this.position = res.data
      }).catch(e => this.$Notice.error({title: `获取岗位信息失败${e.status}`, desc: e.data.message}))
    },
    methods: {
      updatePosition(model) {
        const id = this.positionId;
        updatePositionApi(id, model)
          .then(_ => {
            this.$Notice.success({title: "更新岗位成功"});
            this.$router.push({name: 'PositionDetails', params: {id}})
          }).catch(e => {
            let title = `更新岗位失败(${e.status})`;
            let desc = e.data.message;
            this.$Notice.error({title, desc});
        });
      },
    }
  }
</script>

<style scoped>
  h4, .ivu-divider {
    color: #2b85e4;
  }
</style>