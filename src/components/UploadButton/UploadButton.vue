<template>
  <div>
    <Row type="flex" align="middle" :gutter="8">
      <Col v-if="!!labelText" :span="labelSpan">
        <div :style="!labelSpan && {width: labelWidth+'px'}">
          <span>{{ labelText }}</span>
        </div>
      </Col>
      <Col>
        <Upload ref="upload"
                :show-upload-list="false"
                action=""
                :accept="accept"
                :before-upload="handleUpload">
          <Button :disabled="disabled" icon="md-arrow-up" :type="color">{{buttonHint}}</Button>
        </Upload>
      </Col>
      <Col v-if="!!file">
        <Button size="small" @click="file=null" icon="md-close"/>
      </Col>
    </Row>
    <div v-if="!!file && showSelected">
      <br/>
      <Alert>已选择文件:{{ file.name }}</Alert>
    </div>
  </div>
</template>

<script>
export default {
  name: "UploadButton",
  props: {
    labelText: {
      type: String,
      default: '上传文件'
    },
    labelWidth: {
      type: Number,
      default: 50
    },
    accept: {
      type: String,
      default: '.txt'
    },
    buttonText: {
      type: String,
      default: '选择本地文件'
    },
    showSelected: {
      type: Boolean,
      default: true,
    },
    disabled: {
      type: Boolean,
      default: false
    },
    labelSpan: {
      type: Number,
      default: null
    },
    color: {
      type: String,
      default: null
    }
  },
  computed: {
    buttonHint() {
      return !!this.file ? '重新选择' : this.buttonText
    }
  },
  data() {
    return {
      file: null,
      labelClazz: {
        width: this.labelWidth
      }
    }
  },
  methods: {
    handleUpload(file) {
      this.file = file;
      this.$emit("on-file-ready", file);
      return false;
    },
    reset() {
      this.file = null
    }
  }
}
</script>

<style scoped>

</style>