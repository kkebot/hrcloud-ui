<template>
  <div>
    <Row type="flex" align="middle" :gutter="10">
      <Col style="width: 100px"><label>合约到期时间</label></Col>
      <Col>
        <DatePicker type="datetime" :editable="false" v-model="renewTerm"></DatePicker>
      </Col>
    </Row>
    <Divider/>
    <simple-change-form ref="subForm"></simple-change-form>
    <div v-if="useButton">
      <br/>
      <Button type="success" :disabled="!renewTerm || (renewTerm === originalTerm)" @click="onOk">确定</Button>
    </div>
  </div>
</template>

<script>
  import SimpleChangeForm from "./SimpleChangeForm";

  export default {
    name: "ContractRenewForm",
    components: {SimpleChangeForm},
    props: ['originalTerm', 'useButton'],
    data() {
      return {
        renewTerm: this.originalTerm
      }
    },
    methods: {
      reset() {
        this.$refs.subForm.reset();
        this.renewTerm = null
      },

      onOk() {
        const formData = this.$refs.subForm.getFormData();
        if (new Date(this.renewTerm) >= new Date(formData.get('effectiveOn'))) {
          formData.append("renewTerm", this.renewTerm);

          this.$emit("on-form-ready", formData);
          this.reset()
        } else {
          this.$Notice.error({ title: "结束时间不可小于生效日期"})
        }
      }
    }
  }
</script>

<style scoped>

</style>