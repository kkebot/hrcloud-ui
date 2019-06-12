<template>
  <div>
    <Row type="flex">
      <Col span="6"><label>名称</label></Col>
      <Col>{{ position.name }}</Col>
    </Row>
    <br/>
    <Row type="flex">
      <Col span="6"><label>编号</label></Col>
      <Col>{{ position.id }}</Col>
    </Row>
    <br/>
    <Row type="flex" :gutter="10" align="middle">
      <Col span="6"><label>所属部门</label></Col>
      <Col><Tag>{{ position.administration | formatEntity}}</Tag></Col>
      <Col>
        <ButtonGroup size="small">
          <Button icon="md-git-branch" :to="{ name: 'Management', query: {departmentId: position.administration.id}}"/>
          <Button type="primary" icon="md-arrow-forward" :to="{ name: 'DepartmentDetails', params: {id: position.administration.id}}"/>
        </ButtonGroup>
      </Col>
    </Row>
    <br/>
    <Row type="flex" align="middle">
      <Col span="6"><label>状态</label></Col>
      <Col>
        <Tag :color="statusColor">{{ statusText }}</Tag>
      </Col>
    </Row>
    <br/>
    <Row type="flex">
      <Col span="6"><label>设立时间</label></Col>
      <Col>{{ position.createdAt | formatDate}}</Col>
    </Row>
    <br/>
    <Row type="flex">
      <Col span="6"><label>岗位类型</label></Col>
      <Col>{{ position.type }}</Col>
    </Row>
    <br/>
    <Row type="flex">
      <Col span="6"><label>描述</label></Col>
      <Col>{{ position.description }}</Col>
    </Row>
    <br/>
    <Row type="flex" align="middle">
      <Col span="6"><label>编制人数</label></Col>
      <Col>
        <Tag>{{ position.expectedCount }}</Tag>
      </Col>
    </Row>
    <br/>
    <Row type="flex" align="middle">
      <Col span="6"><label>当前人数</label></Col>
      <Col>
        <Tag :color="actualCountColor">
          {{ position.actualCount }}
        </Tag>
      </Col>
    </Row>
    <br/>
    <Row type="flex">
      <Col span="6"><label>上次满编</label></Col>
      <Col>{{ position.lastNormal | formatDate}}</Col>
    </Row>
    <br/>
    <Row type="flex" align="middle">
      <Col span="6"><label>审批文件</label></Col>
      <Col>
        <Button size="small" type="primary" :disabled="!position.resource" @click="download">下载</Button>
      </Col>
    </Row>
  </div>
</template>

<script>
  import {downloadResourceApi} from "../../../api/resource";
  import PageData from "../../../components/PageData/PageData";
  import {dateText, entityText} from "../../render";

  export default {
    name: "PositionView",
    components: {PageData},
    props: ['position'],
    computed: {
      statusText() {
        return !!this.position.status ? "启用" : "已撤销";
      },
      statusColor() {
        return !!this.position.status ? 'success' : 'error'
      },
      actualCountColor() {
        const p = this.position;
        if (p.actualCount > p.expectedCount) {
          return 'error'
        } else if (p.actualCount < p.expectedCount) {
          return 'warning'
        } else
          return 'success'
      }
    },
    filters: {
      formatDate: dateText,
      formatEntity: entityText,
    },
    methods: {
      download() {
        downloadResourceApi(this.position.resource.id)
      },
    }
  }
</script>

<style scoped>

</style>
