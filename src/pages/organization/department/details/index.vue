<template>
  <Card>
    <department-view @go-to="refreshData($event)" :department="department"/>
    <Divider/>
    <Row type="flex" justify="space-between" v-if="!!department && isAdmin">
      <Col>
        <ButtonGroup>
          <Button type="primary" :to="{ name: 'DepartmentUpdate', query: { departmentId: $route.params.id } }">编辑信息</Button>
          <Button :disabled="!department.status" :to="{ name: 'DepartmentSetup', query: { departmentId: $route.params.id }}">添加下级</Button>
          <Button :disabled="!department.status" :to="{ name: 'PositionSetup', query: { departmentId: $route.params.id }}">添加岗位</Button>
        </ButtonGroup>
      </Col>
      <Col>
        <Button :disabled="!department.status" type="error" @click="modal=true">撤销</Button>
      </Col>
    </Row>
    <Modal
        v-model="modal"
        title="撤销部门"
        :footer-hide="true">
      <Alert type="error" show-icon>
        确认要删除部门？
        <template slot="desc">此操作不可恢复</template>
      </Alert>
      <Divider/>
      <Button long type="error" @click="shutdownDepartment">撤销</Button>
    </Modal>
  </Card>
</template>

<script>
  import DepartmentView from "../DepartmentView";
  import {getDepartmentDetailsApi, shutdownDepartmentApi} from "../../../../api/department";
  import {hasAuthorities} from "../../../../utils";

  export default {
    components: {DepartmentView},
    inject: ['reload'],
    data() {
      return {
        modal: false,
        department: null,

        isAdmin: hasAuthorities(['ADMIN']),
      }
    },
    mounted() {
      this.refreshData(this.$route.params.id);
    },
    methods: {
      shutdownDepartment() {
        const { id } = this.department;
        shutdownDepartmentApi(id)
          .then(_ => {
            this.$Notice.success({title: "撤销部门成功"});
            this.department.status = false
          })
          .catch(e => {
            const title = "无法撤销";
            const desc = e.data.message;
            this.$Notice.error({title, desc});
          });
        this.modal=false;
      },
      refreshData(id) {
        this.$router.replace({ name: "DepartmentDetails", params: { id }});
        getDepartmentDetailsApi(id).then(res => this.department = res.data)
      }
    },
  }
</script>

<style scoped>

</style>