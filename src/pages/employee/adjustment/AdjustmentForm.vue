<template>
  <div>
    <Row type="flex" align="middle" :gutter="10">
      <Col style="width: 100px"><label>新的部门</label></Col>
      <Col v-if="!!department">
        {{ department.name }}({{ department.id }})
      </Col>
      <Col>
        <Button @click="upModal=true">{{!!department ? '重新选择': '选择部门'}}</Button>
      </Col>
    </Row>
    <br/>
    <Row type="flex" align="middle" :gutter="10">
      <Col style="width: 100px"><label>新的职务</label></Col>
      <Col v-if="!!department">
        <Select v-model="toId" placeholder="选择职务">
          <template v-for="pos in department.positions">
            <Option
                v-if="!!pos.status"
                :value="pos.id"
                :key="pos.id">{{ pos.name }} ({{pos.id}})</Option>
          </template>
        </Select>
      </Col>
      <Col v-else>
        <Alert style="margin-bottom: 0" show-icon>请先选择部门</Alert>
      </Col>
    </Row>
    <br/>
    <Row type="flex" align="middle" :gutter="10">
      <Col style="width: 100px"><label>新的薪级</label></Col>
      <Col>
        <Select v-model="afterId" placeholder="选择薪资级别">
          <Option v-for="s in payScales" :value="s.id">级别{{s.id}}(￥{{s.salary}})</Option>
        </Select>
      </Col>
    </Row>
    <br/>
    <simple-change-form ref="subForm"></simple-change-form>
    <div v-if="useButton">
      <br/>
      <Button type="success" :disabled="((afterId === beforeId) && (toId === fromId)) || (!afterId && !toId)" @click="onOk">确定</Button>
    </div>
    <Modal v-model="upModal" title="选择部门" >
      <department-tree @node-select-change="onSelectChange"></department-tree>
    </Modal>
  </div>
</template>

<script>
  import SimpleChangeForm from "../panel/SimpleChangeForm";
  import DepartmentTree from "../../organization/DepartmentTree";
  import {getDepartmentDetailsApi} from "../../../api/department";
  import {getPayScaleApi} from "../../../api/scale";

  export default {
    name: "AdjustmentForm",
    components: {DepartmentTree, SimpleChangeForm},
    props: {
      useButton: {
        type: Boolean,
        default: false
      },
      employee: {
        type: Object,
        default() {
          return {
            scale: {
              id: null
            },
            mainPosition: {
              id: null
            }
          }
        }
      }
    },
    data() {
      return {
        payScales: [],
        afterId: null,
        department: null,
        upModal: false,
        toId: null,
      }
    },
    computed: {
      beforeId() {
        return this.employee.scale.id
      },
      fromId() {
        return this.employee.mainPosition.id
      }
    },
    mounted() {
      getPayScaleApi().then(res => this.payScales = res.data);
    },
    methods: {
      reset() {
        this.$refs.subForm.reset();
        this.afterId = null;
        this.toId = null;
      },
      onSelectChange(node) {
        this.reset();
        const department = (node && node.entity);
        if (node.selected)
          getDepartmentDetailsApi(department.id).then(res => {
            this.department = res.data;
          })
      },
      onOk() {
        const formData = this.$refs.subForm.getFormData();
        formData.append("toId", this.toId || '');
        formData.append("afterId", this.afterId || '');

        console.log(formData.toString())

        this.$emit("on-form-ready", formData);
        this.reset()
      }
    }
  }
</script>

<style scoped>
  .form-label-font > :first-child {
    font-size: inherit;
  }
</style>