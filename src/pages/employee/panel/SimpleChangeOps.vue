<template>
  <div>
    <Row type="flex" :gutter="5">
      <Col>
        <Button size="small" shape="circle" @click="upModal=true" icon="md-create"/>
      </Col>
      <Col v-if="!!record.resource">
        <Button size="small" shape="circle" type="success" @click="onDownload" icon="md-download"/>
      </Col>
    </Row>
    <Modal
        title="更新记录"
        v-model="upModal" :footer-hide="true">
      <simple-change-form
          :use-button="true"
          :effective-on="record.effectiveOn"
          :description="record.description"
          @on-form-ready="onOk"/>
    </Modal>
  </div>
</template>

<script>
  import SimpleChangeForm from "./SimpleChangeForm";
  import {downloadResourceApi} from "../../../api/resource";

  export default {
    name: "SimpleChangeOps",
    components: {SimpleChangeForm},
    props: {
      record: {
        type: Object,
        default() {
          return {
            effectiveOn: new Date(),
            description: ''
          }
        }
      }
    },
    inject: ['reload'],
    data() {
      return {
        upModal: false
      }
    },
    methods: {
      onDownload() {
        downloadResourceApi(this.record.resource.id)
      },
      onOk(formData) {
        this.$emit("on-form-ready", formData);
        this.upModal = false;
      }
    }
  }
</script>

<style scoped>

</style>