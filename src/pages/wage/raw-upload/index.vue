<template>
  <Row type="flex" :gutter="20">
    <Col span="6">
      <Card>
        <Divider orientation="left">注意事项</Divider>

        <Row type="flex" justify="space-between">
          <Col>
            <upload-button ref="upload" label-text="" accept=".xls,.xlsx" @on-file-ready="file=$event"></upload-button>
          </Col>
          <Col>
            <Button type="success" @click="upload" :disabled="!file">导入</Button>
          </Col>
        </Row>
        <br/>
        <Alert show-icon type="warning">
          提醒
          <Icon type="ios-bulb-outline" slot="icon"></Icon>
          <p slot="desc">1. 仅限微软Excel电子表格（后缀为.xls/.xlsx）</p>
          <p slot="desc">2. 表格第一行为列名，依次为<b>员工编号</b>、<b>职务编号</b>、<b>薪资级别编号</b>、<b>核算周期</b>、</p>
          <p slot="desc">   <b>基本工资</b>、<b>津贴</b>、<b>加班工资</b>、<b>欠发工资</b>、<b>加薪</b>和<b>减薪</b></p>
        </Alert>
      </Card>

    </Col>
    <Col span="18">
      <Card>
        <Divider orientation="left">导入结果 - {{ importTimestamp }}</Divider>
        <wage-table
            ref="table"
            :simple="true"
            :load-data="loadData">
        </wage-table>
      </Card>
    </Col>
  </Row>
</template>

<script>
  import {getUploadResultApi, uploadRawWageApi} from "../../../api/wage";
  import WageTable from "../WageTable";
  import UploadButton from "../../../components/UploadButton/UploadButton";

  export default {
    components: {UploadButton, WageTable},
    data() {
      const { importTimestamp } = this.$route.query;
      return {
        importTimestamp,
        file: null,
      }
    },
    methods: {
      upload() {
        const { file } = this;
        uploadRawWageApi(file).then(res => {
          this.$Notice.success({ title: '上传薪资成功', desc: ''});
          this.importTimestamp = res.data;
        }).catch(e => this.$Notice.error({ title: '上传薪资失败', desc: e.data.message}))
        this.reset()
      },
      reset() {
        this.file = null;
        this.$refs.upload.reset();
        this.$refs.table.resetPage()
      },
      loadData(page, size, callback) {
        const { importTimestamp } = this;
        if (!!importTimestamp) {
          getUploadResultApi(importTimestamp, page, size).then(res => {
            const {content, totalElements} = res.data;
            callback(content, totalElements);
            this.$router.replace({ name: 'RawWageUpload', query: { importTimestamp }})
          }).catch(e => this.$Notice.error({title: `获取导入结果失败`, desc: e.data.message}))
        }
      }
    }
  }
</script>

<style scoped>
  .ivu-divider {
    color: #2b85e4;
  }
</style>