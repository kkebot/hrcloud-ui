<template>
  <Card>
    <page-data
        ref="table"
        :load-data="loadData"
        :use-export="false"
        :columns="columns">
      <Row type="flex" align="middle" :gutter="10">
        <Col>
          <RadioGroup type="button" @on-change="onChange">
            <Radio label="true"><span>生效</span></Radio>
            <Radio label="false"><span>失效</span></Radio>
            <Radio :label="null"><span>所有</span></Radio>
          </RadioGroup>
        </Col>
        <Col>
          <Button type="success" :to="{name: 'NotificationSetup'}">添加</Button>
        </Col>
      </Row>
    </page-data>
    <template v-if="!!selected">
      <Modal v-model="modalDetails" title="规则详情">
        <notify-rule-view :key="selected.id" :rule="selected"></notify-rule-view>
      </Modal>
      <Modal v-model="modalDisable" title="禁用规则" :footer-hide="true">
        <Alert type="warning" show-icon :key="selected.id">
          此操作不可恢复！
          <template slot="desc">
            编号: ({{ (!!selected && selected.id)}})
            <br/>
            概述: {{ (!!selected && selected.overview) }}
          </template>
        </Alert>
        <Divider></Divider>
        <Button long type="error" @click="(modal=false) || disableRule()">禁用规则(编号{{selected.id}})</Button>
      </Modal>
    </template>
  </Card>
</template>

<script>
  import PageData from "../../../components/PageData/PageData";
  import NotifyRuleOps from "../NotifyRuleOps";
  import {dateText} from "../../render";
  import {disableRuleApi, getRulesApi} from "../../../api/rule";
  import NotifyRuleView from "../NotifyRuleView";

  export default {
    components: {NotifyRuleView, PageData},
    inject: ['reload'],
    data() {
      const self = this;
      return {
        modalDisable: false,
        modalDetails: false,
        selected: null,
        columns: [
          {
            key: 'id',
            title: '编号',
          },
          {
            key: 'overview',
            title: '概述',
            render: (h, { row }) => {
              return h('span', row.overview)
            }
          },
          {
            key: 'createdAt',
            title: '设置时间',
            render: (h, { row }) => {
              return h('span', dateText(row.createdAt))
            }
          },
          {
            key: 'status',
            title: '状态',
            render: (h, { row }) => {
              return h('Tag', {
                props: {
                  color: row.status ? 'success':'warning'
                }
              }, row.status ? '正在生效':'已失效')
            }
          },
          {
            title: "操作",
            key: "operation",
            minWidth: 40,
            render: (h, { row }) => {
              return h(NotifyRuleOps,{
                props: {
                  rule: row,
                },
                on: {
                  'check-read': () => self.$router.push({ name: 'NotificationList', query: { ruleId: row.id}}),
                  'check-details': () => (self.modalDetails=true)&&(self.selected=row),
                  'on-disabled': () => (self.modalDisable=true)&&(self.selected=row)
                }
              });
            }
          }
        ],
      }
    },
    methods: {
      loadData(page, size, callback) {
        const { ruleId, status } = this.$route.query;
        getRulesApi(status, page, size).then(res => {
          const {content, totalElements} = res.data;
          callback(content, totalElements);
          console.log({ ruleId })
          if (!!ruleId) {
            this.selected = content.find(rule => rule.id == ruleId);
            this.modalDetails = true
          }

        }).catch(e => this.$Notice.error({ title: `获取规则失败(${e.status})`, desc: e.data.message}))
      },
      disableRule() {
        disableRuleApi(this.selected.id)
          .then(_ => {
            this.$Notice.success({ title: "禁用规则成功"});
            this.reload();
          }).catch(e => this.$Notice.error({ title: `禁用规则失败${e.status}`, desc: e.data.message}))
      },
      onChange(value) {
        const query = {};
        if (!!value)
          query.status = value
        this.$router.replace({ name: 'RulesList', query });
        this.$refs.table.resetPage()
      }
    }
  }
</script>

<style scoped>

</style>