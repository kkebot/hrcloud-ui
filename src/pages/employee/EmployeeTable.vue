<template>
  <page-data
      ref="table" :columns="columns" :load-data="loadData">
    <slot></slot>
  </page-data>
</template>

<script>
  import PageData from "../../components/PageData/PageData";
  import {wrapText} from "../../utils/text";
  import {dateText, employeeStatusText, entityText, scaleText} from "../render"


  export default {
    name: "EmployeeTable",
    components: {PageData},
    props: {
      simple: {
        type: Boolean,
        default: false
      },
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
          title: "工号",
          key: "id"
        },
        {

          title: "姓名",
          key: "name"
        },
        {

          title: "性别",
          key: "gender",
        },
        {
          title: '证件号码',
          key: 'credential',
          render: (h, { row }) => {
            return h('span', wrapText(row.credential, 8))
          }
        },
        {

          title: "出生年月",
          key: "birth",
          render: (h, {row}) => {
            return h('span', dateText(row.birth))
          },
          exportData: row => dateText(row.birth)
        },
        {

          title: "入职时间",
          key: "entryTime",
          render: (h, {row}) => {
            return h('span', dateText(row.entryTime))
          },
          exportData: row => dateText(row.entryTime)
        },
        {

          title: "职务",
          key: "mainPosition",
          render: (h, {row}) => {
            const p = row.mainPosition;
            if (!!p) {
              return h('Button', {
                props: {
                  size: 'small',
                  type: 'primary'
                },
                on: {
                  click: () => self.$router.push({ name: 'PositionDetails', params: { id: p.id}})
                }
              }, wrapText(entityText(row.mainPosition), 5))
            } else
              return h('span', "/")
          },
          exportData: row => entityText(row.mainPosition)
        },
        {
          title: '薪资级别',
          key: 'scale',
          render: (h, {row}) => {
            return h('Tag', scaleText(row.scale))
          },
          exportData: row => scaleText(row.scale)
        },
        {
          title: '状态',
          key: 'status',
          render: (h, { row }) => h('Tag', {
            props: {
              color: row.status ? 'success':'error'
            }
          },employeeStatusText(row.status)),
          exportData: row => employeeStatusText(row.status)
        },
        {
          title: "联系方式",
          key: "phoneNumbers",
          render: (h, {row}) => {
            return h('span', row.phoneNumbers[0])
          },
          exportData: row => row.phoneNumbers.join("/")
        },
        {
          title: "住址",
          key: "address",
          render: (h, {row}) => {
            return h('span', wrapText(row.address, 8))
          },
        },
        {
          title: "操作",
          key: "operations",
          render: (h, {row}) => {
            return h('Button', {
              props: {
                size: 'small',
                icon: 'md-person'
              },
              on: {
                click: () => self.$router.push({ name: 'EmployeePanel', params: { id: row.id }})
              }
            })
          },
          noExport: true
        },
      ];
      const simplified = ['id', 'name', 'gender', 'status', 'mainPosition', 'scale', 'operations'];
      const result = this.simple ? full.filter(c => simplified.includes(c.key)) : full
      return {
        columns: this.useOperations ? result:result.slice(0,-1)
      }
    },
    methods: {
      resetPage() {
        this.$refs.table.resetPage()
      }
    }

  }
</script>

<style scoped>

</style>