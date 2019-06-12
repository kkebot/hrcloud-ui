<template>
  <div>
    <div>
      <Row type="flex" :gutter="10" align="middle">
        <Col span="4"><span>规则编号</span>:</Col>
        <Col><Tag>{{ rule.id }}</Tag></Col>
      </Row>
      <br/>
    </div>

    <div>
      <Row type="flex" :gutter="10" align="middle">
        <Col span="4"><span>状态</span>:</Col>
        <Col><Tag :color="statusColor">{{ statusText }}</Tag></Col>
      </Row>
      <br/>
    </div>

    <div>
      <Row type="flex" :gutter="10" align="middle">
        <Col span="4"><span>创建时间</span>:</Col>
        <Col>{{ new Date(rule.createdAt).toLocaleString()}}</Col>
      </Row>
      <br/>
    </div>


    <div>
      <Row type="flex" :gutter="10" align="middle">
        <Col span="4"><span>消息实体</span>:</Col>
        <Col><Tag>{{ database[rule.entityType].text }}</Tag></Col>
      </Row>
      <br/>
    </div>

    <div>
      <Row type="flex" :gutter="10" align="middle">
        <Col span="4"><span>概述</span>:</Col>
        <Col>{{ rule.overview }}</Col>
      </Row>
      <br/>
    </div>

    <div>
      <Row type="flex" :gutter="10" align="middle">
        <Col span="4"><span>详情</span>:</Col>
        <Col>{{ rule.description }}</Col>
      </Row>
      <br/>
    </div>

    <div>
      <Collapse>
        <Panel>
          查看 SQL 语句
          <p slot="content">{{ rule.sqlStatement }}</p>
        </Panel>
      </Collapse>
    </div>

  </div>
</template>

<script>
  import {getDatabase} from "./setup/table";

  export default {
    name: "NotifyRuleView",
    props: {
      rule: {
        type: Object,
        default() {
          return {}
        }
      }
    },
    data() {
      return {
        database: getDatabase()
      }
    },
    computed: {
      statusColor() {
        return !!this.rule.status ? 'success':'warning'
      },
      statusText() {
        return !!this.rule.status ? '正在生效':'已失效'
      }
    }
  }
</script>

<style scoped>

</style>