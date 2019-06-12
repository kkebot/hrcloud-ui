<template>
  <div v-if="!!contract.status">
    <ButtonGroup size="small">
      <Button type="info" icon="md-refresh" @click="modal.renew=true"/>
      <Button :disabled="!contract.status" type="error" icon="md-close" @click="modal.cancel=true"/>
    </ButtonGroup>

    <Modal
        v-model="modal.renew"
        :title="`续签合同(编号${contract.id})`"
        :footer-hide="true">
      <contract-renew-form
          :key="contract.id"
          :original-term="contract.effectiveUntil"
          :use-button="true"
          @on-form-ready="(modal.renew=false) || ($emit('on-renew', $event))"/>
    </Modal>

    <Modal
        v-model="modal.cancel"
        :title="`终止合同(编号${contract.id})`"
        :footer-hide="true">
      <simple-change-form ref="cancelForm" :key="contract.id"/>
      <Divider/>
      <Button
          long type="error"
          @click="(modal.cancel=false) || ($emit('on-cancel', $refs.cancelForm.getFormData()))">
        终止合同
      </Button>
    </Modal>
  </div>
</template>

<script>
  import ContractRenewForm from "./ContractRenewForm";
  import SimpleChangeForm from "./SimpleChangeForm";
  import PageData from "../../../components/PageData/PageData";

  export default {
    name: "ContractOps",
    components: {PageData, SimpleChangeForm, ContractRenewForm},
    props: ['contract'],
    inject: ['reload'],
    data() {
      return {
        modal: {
          cancel: false,
          renew: false,
        },
      }
    },
  }
</script>

<style scoped>

</style>
