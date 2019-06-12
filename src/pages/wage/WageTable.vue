<template>
  <div>
    <page-data
        ref="table"
        :columns="columns"
        :load-data="loadData"><slot></slot></page-data>
    <template v-if="!!wageRecord">
      <Modal v-model="editModal" :footer-hide="true" title="编辑工资">
        <wage-form :use-button="true" :key="wageRecord.id" :wage="wageRecord" @on-wage-ok="onSubmitWage"></wage-form>
      </Modal>
      <Modal v-model="checkModal" title="查看工资">
        <wage-form :use-button="false" :key="wageRecord.id" :wage="wageRecord" :readonly="true"></wage-form>
      </Modal>
    </template>
  </div>
</template>

<script>
  import WageForm from "./WageForm";
  import {updateWageApi} from "../../api/wage";
  import PageData from "../../components/PageData/PageData";
  import {entityText, monthText, scaleText} from "../render";
  import {wrapText} from "../../utils/text";

  const renderMoney = (key) => {
    return (h, { row }) => {
      return h('span', row[key].toFixed(2))
    }
  };

  export default {
    name: "WageTable",
    components: {PageData, WageForm},
    data() {
      const self = this;
      const full = [
        {
          title: "核算周期",
          key: "period",
          render: (h, {row}) => {
            return h('span', monthText(row.period))
          },
          exportData: row => monthText(row.period),
          minWidth: 20
        },
        {
          title: "员工",
          key: "employee",
          render: (h, { row }) => h('Button', {
            props: {
              size: 'small',
            },
            on: {
              click: () => self.$router.push({ name: 'EmployeePanel', params: { id: row.employee.id}, query: { tab: 'wage_record'}})
            }
          }, wrapText(entityText(row.employee), 5)),
          exportData: row => entityText(row.employee),
          minWidth: 40

        },
        {
          title: "时任职务",
          key: "currentPosition",
          render: (h, {row}) => self.renderPosition(h, row.currentPosition),
          exportData: row => entityText(row.currentPosition),
          minWidth: 40
        },
        {
          title: "薪级",
          key: "currentScale",
          render: (h, {row}) => {
            return h('Tag', scaleText(row.currentScale))
          },
          exportData: row => scaleText(row.currentScale),
          minWidth: 40
        },
        {

          title: "基本工资",
          key: "salary",
          render: renderMoney('salary'),
        },
        {

          title: "奖金",
          key: "bonus",
          render: renderMoney('bonus')
        },
        {

          title: "津贴",
          key: "allowance",
          render: renderMoney('allowance')
        },
        {

          title: "加班工资",
          key: "overtimePay",
          render: renderMoney('overtimePay')
        },
        {

          title: "欠发工资",
          key: "backPay",
          render: renderMoney('backPay')
        },
        {

          title: "加薪",
          key: "payRaise",
          render: renderMoney('payRaise')
        },
        {

          title: "减薪",
          key: "payCut",
          render: renderMoney('payCut')
        },
        {

          title: "合计",
          key: "earnings",
          render: renderMoney('earnings'),
          minWidth: 15
        },
        {
          title: "查看",
          key: "check",
          render: (h, {row}) => {
            return h('Button', {
              props: {
                icon: 'md-search',
                size: 'small',
                type: 'info'
              },
              on: {
                click: () => (self.wageRecord=row) && (self.checkModal=true)
              }
            })
          },
          noExport: true
        },
        {
          title: "操作",
          key: "operations",
          render: (h, {row}) => {
            return h('Button', {
              props: {
                icon: 'md-create',
                size: 'small'
              },
              on: {
                click: () => (self.wageRecord=row) && (self.editModal=true)
              }
            })
          },
          noExport: true
        }
      ];
      const simplified = ['period', 'employee', 'currentPosition', 'currentScale', 'earnings', 'check','operations'];
      const result = this.simple ? full.filter(c => simplified.includes(c.key)) : full;
      return {
        columns: this.useOperations ? result:result.slice(0,-1),
        editModal: false,
        checkModal: false,
        wageRecord: null
      }
    },
    props: {
      simple: {
        type: Boolean,
        default: false
      },
      loadData: {
        type: Function,
        default() {
          return (page, size, callback) => { callback([], 0) }
        }
      },
      useOperations: {
        type: Boolean,
        default: true
      }
    },
    methods: {
      onSubmitWage(formData) {
        this.editModal = false;
        updateWageApi(this.wageRecord.id, formData).then(res => {

          const data = this.$refs.table.getData();
          const index = data.findIndex(w => w.id === this.wageRecord.id);
          this.$set(data, index, {...data[index], ...res.data});
          this.$Notice.success({title: "更新工资成功"})

        }).catch(e => this.$Notice.error({title: `更新工资失败${e.status}`, desc: e.data.message}))
      },
      resetPage() {
        this.$refs.table.resetPage()
      },
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