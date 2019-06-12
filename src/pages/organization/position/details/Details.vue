<template>
  <div v-if="!!position">
    <Row type="flex" :gutter="20">
      <Col span="8">
        <Card>
          <Divider orientation="left">岗位信息</Divider>
          <position-view :position="position"></position-view>
          <Divider/>
          <Row type="flex" justify="space-between" v-if="!!position && isAdmin">
            <Col>
              <Button type="primary" :to="{ name: 'PositionUpdate', query: { positionId: position.id } }">编辑岗位</Button>
            </Col>
            <Col>
              <Button :disabled="!position.status" type="error" @click="modal=true">撤销</Button>
            </Col>
          </Row>
        </Card>
      </Col>
      <Col span="16">
        <Card>
          <Divider orientation="left">所属员工</Divider>
          <employee-table :load-data="loadEmployees" simple></employee-table>
        </Card>
      </Col>
    </Row>
    <br/>
    <Card v-if="isAdmin">
      <Divider orientation="left">{{position.name}} - 职务变动</Divider>
      <adjustment-table :load-data="loadAdjustments"></adjustment-table>
    </Card>
    <Modal
        v-model="modal"
        title="撤销岗位"
        :footer-hide="true">
      <Alert type="warning">
        确认要撤销岗位？
        <template slot="desc">此操作不可恢复</template>
      </Alert>
      <Divider/>
      <Button type="error" long @click="cancelPosition">撤销</Button>
    </Modal>
  </div>
</template>

<script>
  import PositionView from "../PositionView";
  import {queryEmployeesApi} from "../../../../api/employee";
  import EmployeeTable from "../../../employee/EmployeeTable";
  import PageData from "../../../../components/PageData/PageData";
  import AdjustmentTable from "../../../employee/panel/AdjustmentTable";
  import {cancelPositionApi, getPositionAdjustmentsApi, getPositionDetailsApi} from "../../../../api/position";
  import {hasAuthorities} from "../../../../utils";

  export default {
    components: {AdjustmentTable, PageData, EmployeeTable, PositionView},
    name: 'Details',
    inject: ['reload'],
    data() {
      return {
        modal: false,
        position: null,

        isAdmin: hasAuthorities(['ADMIN']),
      }
    },
    mounted() {
      this.refreshData(this.$route.params.id);
    },
    methods: {
      loadEmployees(page, size, callback) {
        const {id } = this.position;
        queryEmployeesApi('position', id, page, size).then(res => {
          const {content, totalElements} = res.data;
          callback(content, totalElements)
        }).catch(e => this.$Notice.error({title: `获取员工列表失败(${e.status})`, desc: e.data.message}))
      },
      loadAdjustments(page, size, callback) {
        const {id } = this.position;
        getPositionAdjustmentsApi(id, page, size).then(res => {
          const {content, totalElements} = res.data;
          callback(content, totalElements)
        }).catch(e => this.$Notice.error({title: `获取职务变动失败(${e.status})`, desc: e.data.message}))
      },
      cancelPosition() {
        const {id } = this.position;
        cancelPositionApi(id)
          .then(_ => {
            this.$Notice.success({title: "撤销岗位成功"});
            this.reload();
          }).catch(e => {
          const title = "无法删除";
          let desc = e.data.message
          this.$Notice.error({title, desc});
        });
        this.modal=false;
      },
      refreshData(id) {
        getPositionDetailsApi(id).then(res => this.position = res.data)
          .catch(e => this.$Notice.error({ title: `获取岗位信息失败${e.status}`, desc: e.data.message}));
        this.$router.replace({ name: "PositionDetails", params: { id }});
      }
    }
  }
</script>

<style scoped>
  h4, .ivu-divider {
    color: #2b85e4;
  }
</style>
