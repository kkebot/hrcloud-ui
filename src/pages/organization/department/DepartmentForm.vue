<template>
  <div>
    <Form :label-width="80" label-position="left" ref="form" :model="formData" :rules="ruleValidate">
      <FormItem label="部门名称" prop="name">
        <Input v-model="formData.name"/>
      </FormItem>
      <FormItem label="创建日期" prop="createdAt">
        <DatePicker type="datetime" :editable="false" v-model="formData.createdAt"></DatePicker>
      </FormItem>
      <FormItem label="描述" prop="description">
        <Input v-model="formData.description"/>
      </FormItem>
    </Form>
    <upload-button
        accept=".doc,.docx"
        ref="upload"
        :label-width="80"
        @on-file-ready="formData.file=$event"/>
    <div v-if="useButton">
      <br/>
      <Button type="success" :disabled="!formData.name || !formData.createdAt" @click="onOk">确定</Button>
    </div>
  </div>
</template>

<script>

  import {obj2form} from "../../../api/common";
  import UploadButton from "../../../components/UploadButton/UploadButton";

  export default {
    name: "DepartmentForm",
    components: {UploadButton},
    props: {
      useButton: {
        type: Boolean,
        default: false,
      },
      department: {
        type: Object,
        default() {
          return {}
        }
      }
    },
    data() {
      return {
        ruleValidate: {
          name: [{required: true, message: '请输入名称', trigger: 'blur'}]
        },
        formData: {...this.defaultForm(), ...this.department},
      }
    },
    methods: {
      handleUpload(file) {
        this.formData.file = file;
        return false;
      },
      reset() {
        this.formData = this.defaultForm();
        this.$refs.upload.reset();
      },
      defaultForm() {
        return {
          name: null,
          createdAt: new Date(),
          file: null,
          description: null
        };
      },
      onOk() {
        this.$refs.form.validate(valid => {
          if (valid) {
            this.$emit("on-form-ready", obj2form(this.formData));
            this.reset();
          }
        });
      }
    }
  }
</script>

<style scoped>

</style>