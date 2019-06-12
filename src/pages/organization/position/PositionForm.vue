<template>
  <div>
    <Form ref="form"
          label-position="left"
          :label-width="80"
          :model="formData"
          :rules="ruleValidate">
      <FormItem label="职务名称" prop="name">
        <Input v-model="formData.name"/>
      </FormItem>
      <FormItem label="职务类型" prop="type">
        <Select v-model="formData.type" :disabled="!!position">
          <Option v-for="t in types" :value="t" :key="t">{{t}}</Option>
        </Select>
      </FormItem>
      <FormItem label="编制人数" prop="expectedCount">
        <InputNumber v-model="formData.expectedCount"/>
      </FormItem>
      <FormItem label="创建时间" prop="createdAt">
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
      <Button type="success" :disabled="!isReady" @click="onOk">确定</Button>
    </div>
  </div>
</template>
<script>

  import {obj2form} from "../../../api/common";
  import UploadButton from "../../../components/UploadButton/UploadButton";

  export default {
    name: "PositionForm",
    components: {UploadButton},
    props: [
      'position', 'useButton'
    ],
    computed: {
      isReady() {
        return !!this.formData.name && !!this.formData.createdAt && !!this.formData.type && !!this.formData.expectedCount;
      }
    },
    data() {
      return {
        types: ["行政", "管理", "后勤", "技术"],
        ruleValidate: {
          name: [{required: true, message: '请输入名称', trigger: 'blur'}],
          type: [{required: true, message: '请选择职务类型'}],
          expectedCount: [
            {required: true, message: '请输入人数'},
          ],
          createdAt: [{required: true, message: '请输入创建时间'}]
        },
        formData: {...this.defaultForm(), ...this.position}
      }
    },
    methods: {
      reset() {
        this.formData = this.defaultForm();
        this.$refs.upload.reset();
      },
      defaultForm() {
        return {
          name: null,
          type: null,
          expectedCount: 1,
          createdAt: new Date(),
          file: null,
          description: null
        }
      },
      onOk() {
        this.$refs.form.validate(valid => {
          if (valid) {
            this.$emit("on-form-ready", obj2form(this.formData));
            this.reset()
          }
        });
      }
    }
  }
</script>
