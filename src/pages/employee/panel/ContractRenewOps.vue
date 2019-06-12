<template>
  <div>
    <Row type="flex" align="middle" :gutter="5">
      <Col>
        <Button shape="circle" size="small" icon="md-create" @click="modal=true"/>
      </Col>
    </Row>
    <Modal
        v-model="modal"
        :title="`修改续签记录(编号${renew.id})`"
        :footer-hide="true">
      <simple-change-form
          :use-button="true"
          @on-form-ready="(modal=false)||$emit('on-update', $event)"></simple-change-form>
    </Modal>
  </div>
</template>

<script>
  import SimpleChangeForm from "./SimpleChangeForm";

  export default {
    name: "ContractRenewOps",
    components: {SimpleChangeForm},
    props: {
      renew: {
        type: Object,
        default() {
          return {}
        }
      }
    },
    data() {
      return {
        modal: false,
      }
    },
  }
</script>

<style scoped>

</style>
