<template>
  <page-data :columns="columns" :load-data="loadData"></page-data>
</template>

<script>
  import PageData from "../../../components/PageData/PageData";
  import {wrapText} from "../../../utils/text";
  import {dateText, entityText, scaleText} from "../../render";
  import SimpleChangeOps from "./SimpleChangeOps";
  import {updateAdjustmentApi} from "../../../api/employee";

  export default {
    name: "AdjustmentTable",
    components: {PageData},
    inject: ['reload'],
    props: {
      loadData: {
        type: Function,
        default() {
          return (page, size, callback) => {
            callback([], 0)
          }
        }
      },
      useOperations: {
        type: Boolean,
        default: true
      }
    },
    data() {
      const self = this;
      const full = [
        {
          title: "序号",
          key: "id"
        },
        {
          title: "员工",
          key: "employee",
          render: (h, { row }) => h('Button', {
            props: {
              size: 'small',
            },
            on: {
              click: () => self.$router.push({ name: 'EmployeePanel', params: { id: row.employee.id}, query: { tab: 'adjustment'}})
            }
          }, wrapText(entityText(row.employee), 5)),
          exportData: row => entityText(row.employee)
        },
        {

          title: "职务变动",
          key: "to",
          render: (h, {row}) => self.renderPosition(h, row.to),
          exportData: row => entityText(row.to)
        },
        {

          title: "调整后",
          key: "after",
          render: (h, {row}) => h('Tag', scaleText(row.after)),
          exportData: row => scaleText(row.after)
        },
        {

          title: "描述",
          key: "description",
          render: (h, {row}) => h('span', wrapText(row.description, 25)),
          exportData: (row) =>  "\"" + row.description + "\""
        },
        {

          title: "生效日期",
          key: "effectiveOn",
          render: (h, {row}) => h('span', dateText(row.effectiveOn)),
          exportData: row => dateText(row.effectiveOn)
        },
        {
          title: "查看",
          key: "check",
          render: (h, { row }) => {
            return h('Button', {
              props: {
                size: 'small',
                icon: 'md-download',
                disabled: !row.resource
              },
              on: {
                click: () => downloadResourceApi(row.resource.id)
              }
            },)
          },
          noExport: true
        },
        {
          title: "操作",
          key: "operation",
          render: (h, {row}) => {
            return h(SimpleChangeOps, {
              props: {
                record: row
              },
              on: {
                'on-form-ready': (formData) =>
                  updateAdjustmentApi(row.id, formData).then(_ => {
                    self.$Notice.success({title: "更新调整历史成功"});
                    self.reload();
                  }).catch(e => self.$Notice.error({title: `更新调整历史失败`, desc: e.data.message}))
              }
            });
          },
          noExport: true
        }
      ];
      return {
        columns: self.useOperations ?  full : full.slice(0,-1)
      }
    },
    methods: {
      renderPosition(h, p) {
        const self = this;
        if (!!p)
          return h('Button', {
            props: {
              size: 'small',
              type: 'primary'
            },
            on: {
              click: () => self.$router.push({ name: 'PositionDetails', params: { id: p.id}})
            }
          }, wrapText(entityText(p), 5))
        else
          return h('span', "/")
      },
    }
  }
</script>

<style scoped>

</style>