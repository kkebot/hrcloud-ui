<template>
  <Card>
    <Divider orientation="left">添加合同</Divider>
    <Row type="flex" justify="space-between" align="bottom">
      <Col>
        <sign-contract-form
            ref="form"
            @on-form-ready="sign"
            :use-button="true"/>
      </Col>
      <Col>
        <Button @click="clear">清除</Button>
      </Col>
    </Row>
  </Card>
</template>

<script>
  import SignContractForm from "../panel/SignContractForm";
  import {signContractApi} from "../../../api/contract";

  export default {
  components: {SignContractForm},
  data() {
    return {
      employeeId: this.$route.query.employeeId,
    }
  },
  methods: {
    sign(formData) {
      signContractApi(this.employeeId, formData).then(_ => {
        this.$Notice.success({ title: `签约成功`});
        this.$router.push({ name: 'EmployeePanel', params: { id: this.employeeId }, query: { tab: 'contract'}})
      }).catch(e => this.$Notice.error({ title: `签约失败`, desc: e.data.message}))
    },
    clear() {
      this.$refs.form.reset()
    }
  }
}
</script>

<style scoped>
h4, .ivu-divider {
  color: #2b85e4;
}
</style>