<template>
  <div>
    <Form :label-width="100" label-position="left" ref="form" :model="formData">

      <FormItem label="起始日期" class="form-label-font" prop="effectiveOn">
        <DatePicker type="datetime" :editable="false" v-model="formData.effectiveOn"></DatePicker>
      </FormItem>

      <FormItem label="结束日期" class="form-label-font" prop="effectiveUntil">
        <DatePicker type="datetime" :editable="false" v-model="formData.effectiveUntil"></DatePicker>
      </FormItem>

      <FormItem label="描述" class="form-label-font" prop="description">
        <Input v-model="formData.description"/>
      </FormItem>
    </Form>
    <upload-button
        ref="upload"
        accept=".doc,.docx"
        :label-width="100"
        @on-file-ready="formData.file=$event"/>

    <div v-if="useButton">
      <br/>
      <Button type="success" :disabled="!formData.effectiveOn || !formData.effectiveUntil || !formData.file" @click="onOk">确定</Button>
    </div>
  </div>
</template>

<script>
  import UploadButton from "../../../components/UploadButton/UploadButton";
  import {obj2form} from "../../../api/common";

  export default {
  name: "SignContractForm",
  components: {UploadButton},
  props: ['contract', 'useButton'],
  data() {
    return {
      formData: this.emptyForm(),
    }
  },
  methods: {
    emptyForm() {
      return {
        effectiveOn: new Date(),
        effectiveUntil: new Date(),
        description: null,
        file: null,
        ...this.contract
      };
    },
    reset() {
      this.formData = this.emptyForm();
      this.$refs.upload.reset()
    },
    getFormData() {
      return obj2form(this.formData)
    },
    onOk() {
      this.$emit("on-form-ready", this.getFormData());
      this.reset()
    }
  }
}
</script>

<style scoped>
.form-label-font > :first-child {
  font-size: inherit;
}
</style>