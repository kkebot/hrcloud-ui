<template>
  <div>
    <Form :label-width="100" label-position="left" ref="form" :model="formData">
      <FormItem label="生效时间" class="form-label-font" prop="effectiveOn">
        <DatePicker type="datetime" :editable="false" v-model="formData.effectiveOn"></DatePicker>
      </FormItem>

      <FormItem label="描述文字" class="form-label-font" prop="description">
        <Input v-model="formData.description"/>
      </FormItem>
    </Form>

    <upload-button
        accept=".doc,.docx"
        ref="upload"
        :label-width="100"
        @on-file-ready="formData.file=$event"/>

    <div v-if="useButton">
      <br/>
      <Button type="success" @click="onOk">确定</Button>
    </div>
  </div>
</template>

<script>
  import UploadButton from "../../../components/UploadButton/UploadButton";
  import {obj2form} from "../../../api/common";

  export default {
    name: "SimpleChangeForm",
    components: {UploadButton},
    props: {
      useButton: {
        type: Boolean,
        default: false,
      },

      effectiveOn: {
        type: String,
        default() {
          return new Date().toString()
        }
      },

      description: {
        type: String,
        default: ''
      },
    },
    data() {
      return {
        formData: this.defaultForm()
      }
    },
    methods: {
      defaultForm() {
        return {
          effectiveOn: new Date(this.effectiveOn),
          description: this.description,
          file: null,
        };
      },
      reset() {
        this.formData = this.defaultForm()
        this.$refs.upload.reset();
      },
      getFormData() {
        const formData = this.formData
        return obj2form(formData)
      },
      onOk() {
        this.$emit("on-form-ready", this.getFormData());
        this.reset()
      },
      debugPrint() {
        const { effectiveOn, formData } = this;
        console.log({ effectiveOn, formData })
      }
    }
  }
</script>

<style scoped>
  .form-label-font > :first-child {
    font-size: inherit;
  }
</style>
