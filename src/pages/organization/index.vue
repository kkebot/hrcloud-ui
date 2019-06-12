<template>
  <Row type="flex" :gutter="20">
    <Col span="7">
      <Card :style="{'overflow-x': 'auto'}">
        <department-panel
            :use-operations="isAdmin"
            @on-selected-change="onSelectChange"
            :init-id="departmentId"></department-panel>
      </Card>
    </Col>
    <Col span="17">
      <Card>
        <Divider orientation="left">员工简要信息</Divider>
        <employee-table
            :simple="true"
            :use-operations="isAdmin"
            ref="table"
            :load-data="loadData">
        </employee-table>
      </Card>
    </Col>
  </Row>
</template>
<script>
  import DepartmentTree from "./DepartmentTree";
  import {queryEmployeesApi} from "../../api/employee";
  import PositionForm from "./position/PositionForm";
  import PageData from "../../components/PageData/PageData";
  import EmployeeTable from "../employee/EmployeeTable";
  import DepartmentPanel from "./DepartmentPanel";
  import {hasAuthorities} from "../../utils";

  export default {
    inject: ['reload'],
    components: {
      DepartmentPanel,
      EmployeeTable, PageData, PositionForm, DepartmentTree
    },
    data() {
      return {
        departmentId: this.$route.query.departmentId,
        isAdmin: hasAuthorities(['ADMIN'])
      }
    },
    mounted() {
      console.log("Department page mounted");
    },
    methods: {
      onSelectChange(value) {
        const newId = value && value.id;
        console.log({ value, newId });

        const {departmentId} = this;
        this.departmentId = newId;

        if (!!newId)
          this.$router.replace({name: 'Management', query: { 'departmentId' : newId }});
        else
          this.$router.replace({ name: 'Management'})

        if (newId !== departmentId)
          this.$refs.table.resetPage();
      },

      loadData(page, size, callback) {
        const id = this.departmentId;
        if (!!id) {
          queryEmployeesApi('department', id, page, size)
            .then(res => {
              const {content, totalElements} = res.data;
              callback(content, totalElements)
            })
            .catch(e => this.$Notice.error({title: `获取员工列表信息失败`, desc: `${e.status}`}));
        } else {
          callback([], 0)
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
