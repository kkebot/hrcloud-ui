<template>
  <Card>
    <Divider orientation="left">{{ !!ruleId? `规则编号${ruleId} - `: ''}}消息</Divider>
    <page-data
        ref="table"
        :load-data="loadData"
        :use-export="false"
        :columns="columns">
      <Row type="flex" align="middle" :gutter="10">
        <Col>
          <ButtonGroup >
            <Button @click="scan">扫描</Button>
            <Button v-if="!!ruleId" @click="(ruleId=null)||(isRead=null)||$refs.table.resetPage()">所有</Button>
            <Button type="success" :to="{name: 'NotificationSetup'}">添加</Button>
          </ButtonGroup>
        </Col>
        <Col>
          <RadioGroup v-model="isRead" type="button" @on-change="$refs.table.resetPage()">
            <Radio label="true">已读</Radio>
            <Radio label="false">未读</Radio>
          </RadioGroup>
        </Col>
      </Row>
    </page-data>
  </Card>
</template>

<script>
  import PageData from "../../../components/PageData/PageData";
  import {dateText} from "../../render";
  import {getNotificationsApi, markNotificationApi, scanNotificationsApi} from "../../../api/notification";
  import {getDatabase} from "../setup/table";
  import NotificationOps from "../NotificationOps";
  import {queryOwnerApi} from "../../../api/employee";
  import NotifyRuleView from "../NotifyRuleView";

  export default {
    components: {NotifyRuleView, PageData},
    inject: ['reload'],
    data() {
      const self = this;
      const database = getDatabase();
      const { isRead, ruleId } = this.$route.query;
      return {
        isRead, ruleId,
        columns: [
          {
            key: 'id',
            title: '消息编号',
          },
          {
            key: 'entityType',
            title: '实体类型',
            render: (h, { row }) => {
              return h('span', database[row.entityType].text)
            }
          },
          {
            key: 'rule_id',
            title: '规则编号',
            render: (h, { row }) => {
              return h('Button', {
                props: {
                  icon: 'md-search',
                  size: 'small'
                },
                on: {
                  click: () => self.$router.push({ name: 'RulesList', query: { ruleId: row.ruleId}})
                }
              }, row.ruleId)
            },
          },
          {
            key: 'isRead',
            title: '状态',
            render: (h, { row }) => {
              return h('Tag', {
                props: {
                  color: row.isRead ? 'default':'warning'
                }
              }, row.isRead ? '已读':'未读')
            }
          },
          {
            key: 'createdAt',
            title: '发现时间',
            align: 'center',
            render: (h, { row }) => {
              return h('span', dateText(row.createdAt))
            }
          },
          {
            title: "操作",
            key: "operation",
            render: (h, { row }) => {
              return h(NotificationOps, {
                props: {
                  notification: row,
                },
                on: {
                  'go-to': () => self.redirect(row),
                  'on-read': () => markNotificationApi(row.id)
                    .then(_ => {
                      self.$Notice.success({ title: `已标记消息(编号${row.id})为已读`})
                      self.reload()
                    }).catch(e => self.$Notice.error({ title: `标记消息失败${e.status}`, desc: e.data.message}))
                }
              });
            }
          }
        ],
      }
    },
    methods: {
      redirect(notification) {
        const {entityType, entityId} = notification;

        switch (entityType) {
          case 'contract':
          case 'adjustment':
          case 'wage_record':
            queryOwnerApi({entityType, entityId}).then(res => {
              const id = res.data;
              this.$router.push({name: 'EmployeePanel', params: {id}, query: {tab: entityType}})
            });
            break;
          case 'position':
          case 'department':
            this.$router.push({path: `/organization/${entityType}/${entityId}`})
            break;
        }
      },
      loadData(page, size, callback) {
        const { isRead, ruleId } = this;

        getNotificationsApi({ isRead, ruleId, page, size}).then(res => {
          const {content, totalElements} = res.data;
          this.$router.replace({ name: 'NotificationList', query: { isRead, ruleId }})
          callback(content, totalElements)
        }).catch(e => this.$Notice.error({ title: `获取消息失败${e.status}`, desc: e.data.message}))
      },
      scan() {
        scanNotificationsApi().then(_ => {
          this.$refs.table.resetPage()
        }).catch(e => this.$Notice.error({ title: `扫描失败${e.status}`, desc: e.data.message}))
      },
    }
  }
</script>

<style scoped>
  .ivu-divider {
    color: #2b85e4;
  }
</style>