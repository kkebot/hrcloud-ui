<template>
  <div>
    <div>
      <page-data :columns="columns.contract" :load-data="loadContract">
        <Button v-if="useOperations" type="primary" :to="{name: 'SignContract', query: { employeeId }}">签约新合同</Button>
      </page-data>
    </div>
    <div v-if="!!selected">
      <Divider orientation="left">合同(编号{{ selected.id }})续签历史</Divider>
      <page-data :key="selected.id" :load-data="loadRenew" :columns="columns.renew"></page-data>
    </div>

  </div>
</template>

<script>
  import {getContractsApi} from "../../../api/employee";
  import ContractRenewForm from "./ContractRenewForm";
  import PageData from "../../../components/PageData/PageData";
  import ContractOps from "./ContractOps";
  import {getRenewHistoryApi, renewContractApi, updateContractRenewApi} from "../../../api/contract";
  import {downloadResourceApi} from "../../../api/resource";
  import ContractRenewOps from "./ContractRenewOps";
  import {hasAuthorities} from "../../../utils";
  import {contractStatusText, dateText} from "../../render";
  import {wrapText} from "../../../utils/text";

  export default {
    name: "ContractManage",
    components: {
      ContractOps, PageData, ContractRenewForm, ContractRenewOps
    },
    props: {
      employeeId: null,
    },
    inject: ['reload'],
    data() {
      const self = this;
      const full = {
        contract: [
          {
            title: "编号",
            key: "id"
          },
          {
            title: "状态",
            key: "status",
            render: (h, {row}) => {
              return h('Tag', {
                props: {
                  color: row.status ? 'success' : 'error'
                }
              }, contractStatusText(row.status))
            }
          },
          {
            title: "起始日期",
            key: "effectiveOn",
            render: (h, {row}) => {
              return h('span', dateText(row.effectiveOn))
            },
            exportData: (row) => dateText(row.effectiveOn)
          },
          {
            title: "终止日期",
            key: "effectiveUntil",
            render: (h, {row}) => {
              return h('span', dateText(row.effectiveUntil))
            },
            exportData: (row) => dateText(row.effectiveUntil)
          },
          {

            title: "描述",
            key: "description",
            render: (h, {row}) => {
              return h('span', row.description || '/')
            }
          },
          {
            title: "查看",
            key: "check",
            render: (h, { row }) => {
              return h('ButtonGroup', {
                props: {
                  size: 'small',
                }
              }, [
                h('Button', {
                  props: {
                    icon: 'md-search'
                  },
                  on: {
                    click: () => (self.selected=row)
                  }
                }),
                h('Button', {
                  props: {
                    icon: 'md-download'
                  },
                  on: {
                    click: () => downloadResourceApi(row.resource.id)
                  }
                })
              ])
            },
            noExport: true
          },
          {
            title: "操作",
            key: "operation",
            render: (h, {row}) => {
              return h(ContractOps, {
                props: {
                  contract: row
                },
                on: {
                  'on-renew': (formData) => {
                    renewContractApi(row.id, formData).then(_ => {
                      self.$Notice.success({title: `续签合同成功`});
                      self.reload()
                    }).catch(e => this.$Notice.error({title: `续签合同失败(${e.status})`, desc: e.data.message}))
                  },
                  'on-cancel': (formData) => {
                    renewContractApi(row.id, formData).then(_ => {
                      self.$Notice.success({title: `终止合同成功`});
                      self.reload()
                    }).catch(e => this.$Notice.error({title: `终止合同失败(${e.status})`, desc: e.data.message}))
                  },
                }
              })
            },
            noExport: true
          }
        ],
        renew: [
          {
            title: "序号",
            key: "id"
          },
          {

            title: "上次到期时间",
            key: "originalTerm",
            render: (h, {row}) => {
              return h('span', dateText(row.originalTerm))
            },
            exportData: row => dateText(row.originalTerm)
          },
          {

            title: "描述",
            key: "description",
            render: (h, {row}) => {
              return h('span', wrapText(row.description, 8))
            },
            exportData: row => "\"" + row.description + "\""
          },
          {

            title: "生效时间",
            key: "effectiveOn",
            render: (h, {row}) => {
              return h('span', dateText(row.effectiveOn))
            },
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
            title: '操作',
            key: "operations",
            render: (h, {row}) => {
              return h(ContractRenewOps, {
                props: {
                  renew: row
                },
                on: {
                  'on-update': (formData) => {
                    updateContractRenewApi(row.id, formData).then(_ => {
                      self.$Notice.success({title: `修改续签记录成功`});
                      self.reload()
                    }).catch(e => this.$Notice.error({title: `修改续签记录失败(${e.status})`, desc: e.data.message}))
                  }
                }
              })
            },
            noExport: true
          }
        ],
      };
      const useOperations = hasAuthorities(['ADMIN']);
      return {
        selected: null,
        useOperations,
        columns: {
          contract: useOperations ? full.contract: full.contract.slice(0,-1),
          renew: useOperations ? full.renew:full.renew.slice(0,-1),
        },
      }
    },
    methods: {
      loadContract(page, size, callback) {
        getContractsApi(this.employeeId, page, size).then(res => {
          const {content, totalElements} = res.data;
          callback(content, totalElements)
        }).catch(e => this.$Notice.error({title: `获取合同失败(${e.status})`, desc: e.data.message}))
      },
      loadRenew(page, size, callback) {
        getRenewHistoryApi(this.selected.id, page, size).then(res => {
          const {content, totalElements} = res.data;
          callback(content, totalElements)
        }).catch(e => this.$Notice.error({title: `获取续签历史失败${e.status}`, desc: e.data.message}))
      },
      debugPrint(row) {
        console.log({ row })
      }
    }
  }
</script>

<style scoped>
  h4, .ivu-divider {
    color: #2b85e4;
  }
</style>
