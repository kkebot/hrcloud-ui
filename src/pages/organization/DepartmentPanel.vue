<template>
  <div>
    <Divider orientation="left">部门架构</Divider>
    <department-tree :init-id="initId" @node-select-change="onSelectChange"></department-tree>
    <br/>
    <Divider orientation="left">下设岗位</Divider>
    <template v-if="positions.length>0">
      <div v-for="pos in positions" style="margin-bottom: 5px">
        <Row type="flex" justify="space-between" align="middle">
          <Col>
            <Row type="flex" :gutter="10" align="middle">
              <Col>
                <Button icon="md-people" size="small" shape="circle"/>
              </Col>
              <Col>
                <p>{{ pos | formatEntity }}</p>
              </Col>
            </Row>
          </Col>
          <Col class="position-editor">
            <Button type="primary" size="small" icon="md-arrow-forward"
                    :to="{ name: 'PositionDetails', params: {id: pos.id}}"/>
          </Col>
        </Row>
      </div>
    </template>
    <template v-else>
      <Alert show-icon>
        无信息
        <template slot="desc">
          当前部门没有设置岗位
        </template>
      </Alert>
    </template>
    <br/>
    <Divider orientation="left" >快捷操作</Divider>
    <template v-if="!!department">
      <ButtonGroup>
        <Button type="primary" :disabled="!department"
                :to="{ name: 'DepartmentDetails', params: { id: department.id }}">查看部门
        </Button>
        <Button v-if="useOperations" :to="{ name: 'DepartmentSetup', query: { departmentId: department.id }}">添加下级</Button>
        <Button v-if="useOperations" :to="{ name: 'PositionSetup', query: { departmentId: department.id }}">添加岗位</Button>
      </ButtonGroup>
    </template>
    <template v-else>
      <Alert show-icon>
        不可用
        <template slot="desc">
          请点击结点以查看部门结构
        </template>
      </Alert>
    </template>

  </div>
</template>

<script>
  import DepartmentTree from "./DepartmentTree";
  import {getDepartmentApi, getPositionsOfApi} from "../../api/department";
  import {entityText} from "../render";

  export default {
    name: "DepartmentPanel",
    components: {DepartmentTree},
    props: {
      initId: {
        type: String|Number,
      },
      useOperations: {
        type: Boolean,
        default: true
      }
    },
    data() {
      return {
        department: null,
        positions: []
      }
    },
    methods: {
      onSelectChange(node) {
        if (!!node && !!node.selected) {
          const {id} = node.entity;

          getDepartmentApi(id).then(res => {
            this.department = res.data;
            this.$emit("on-selected-change", res.data)
          }).catch(e => this.$Notice.error({title: `获取部门信息失败(${e.status})`, desc: e.data.message}))

          getPositionsOfApi(id)
            .then(res => this.positions = res.data)
            .catch(e => this.$Notice.error({title: `获取岗位信息失败(${e.status})`, desc: e.data.message}))

        } else {
          this.department = null;
          this.positions = []
          this.$emit("on-selected-change")
        }
      },
    },
    filters: {
      formatEntity: entityText
    }
  }
</script>

<!-- https://segmentfault.com/q/1010000005663366/a-1020000010778971 -->
<style scoped>
  .position-editor button, .position-editor a {
    visibility: hidden;
  }

  .position-editor:hover button, .position-editor:hover a {
    visibility: visible;
  }

  .ivu-divider {
    color: #2b85e4;
  }
</style>