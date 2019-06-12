<template>
  <Card>
    <search-data
        @search-change="onChange"
        :search="search"
        :columns="queryEntity.columns"
        :fields="queryEntity.fields"
        :api="queryEntity.api"></search-data>
  </Card>
</template>

<script>
  import SearchData from "../../../components/SearchData/SearchData";
  import {
    dateText,
    departmentStatusText,
    employeeStatusText,
    entityText,
    positionStatusText,
    scaleText
  } from "../../render";
  import {wrapText} from "../../../utils/text";

  export default {
    components: {SearchData},
    data() {
      const self = this;
      const {entity, keyword, value} = self.$route.query;
      return {
        entity,
        search : { keyword, value },
        entities: {
          employee: {
            fields: [
              {
                key: 'id',
                text: '编号',
              },
              {
                key: 'name',
                text: '姓名',
              },
              {
                key: 'credential',
                text: '身份证',
              },
              {
                key: 'positionId',
                text: '岗位编号',
              },
              {
                key: 'departmentId',
                text: '部门编号',
              }
            ],
            columns: [
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
            ],
            api: '/api/employee/search'
          },
          department: {
            fields: [
              {
                key: 'id',
                text: '部门编号',
              },
              {
                key: 'name',
                text: '部门名称',
              },
            ],
            columns: [
              {
                key: 'id',
                title: '部门编号',
              },
              {
                key: 'name',
                title: '部门名称',
              },
              {
                key: 'createdAt',
                title: '设立时间',
                render: (h, {row}) => h('span', dateText(row.createdAt))
              },
              {
                key: 'status',
                title: '状态',
                render: (h, {row}) => h('Tag', {
                  props: {
                    color: !!row.status ? 'success' : 'error'
                  }
                }, departmentStatusText(row.status))
              },
              {
                key: 'operations',
                title: '操作',
                render: (h, {row}) => {
                  return h('ButtonGroup', {
                    props: {
                      size: 'small'
                    }
                  }, [
                    h('Button', {
                      props: {
                        size: 'small',
                        icon: 'md-git-branch',
                      },
                      on: {
                        click: () => self.$router.push({name: 'Management', query: {departmentId: row.id}})
                      }
                    }),
                    h('Button', {
                      props: {
                        size: 'small',
                        icon: 'md-arrow-forward',
                        type: 'primary'
                      },
                      on: {
                        click: () => self.$router.push({name: 'DepartmentDetails', params: {id: row.id}})
                      }
                    })
                  ])
                },
                noExport: true
              },
            ],
            api: '/api/department/search'
          },
          position: {
            fields: [
              {
                key: 'id',
                text: '岗位编号',
              },
              {
                key: 'name',
                text: '岗位名称',
              },
            ],
            columns: [
              {
                key: 'id',
                title: '岗位编号',
              },
              {
                key: 'name',
                title: '岗位名称',
              },
              {
                key: 'createdAt',
                title: '设立时间',
                render: (h, {row}) => h('span', dateText(row.createdAt))
              },
              {
                key: 'expectedCount',
                title: '编制人数',
                render: (h, {row}) => h('Tag', row.expectedCount)
              },
              {
                key: 'type',
                title: '岗位类型',
                render: (h, {row}) => h('Tag', row.type)
              },
              {
                key: 'status',
                title: '状态',
                render: (h, {row}) => h('Tag', {
                  props: {
                    color: !!row.status ? 'success' : 'error'
                  }
                }, positionStatusText(row.status))
              },
              {
                key: 'operations',
                title: '操作',
                render: (h, {row}) => {
                  return h('Button', {
                    props: {
                      size: 'small',
                      icon: 'md-arrow-forward',
                      type: 'primary'
                    },
                    on: {
                      click: () => self.$router.push({name: 'PositionDetails', params: {id: row.id}})
                    }
                  })
                },
                noExport: true
              },
            ],
            api: '/api/position/search'
          }
        }
      }
    },
    computed: {
      queryEntity() {
        return this.entities[this.entity]
      },
    },
    methods: {
      onChange(search) {
        const { entity } = this;
        this.$router.replace({ name: 'SearchResult', query: { ...search, entity}})
      }
    }
  }
</script>

<style scoped>

</style>