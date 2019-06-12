<template>
  <div v-if="!!department">
    <Divider orientation="left">部门信息</Divider>
    <Row type="flex">
      <Col span="24">
        <div>
          <Row type="flex">
            <Col span="3"><label>名称</label></Col>
            <Col>{{ department | formatEntity }}</Col>
          </Row>
          <br/>
          <Row type="flex" :gutter="10" align="middle">
            <Col span="3"><label>全称</label></Col>
            <Col>{{ department.fullname }}</Col>
            <Col>
              <Button size="small" icon="md-git-branch" :to="{name: 'Management', query: { departmentId: department.id }}"/>
            </Col>
          </Row>
          <br/>
          <Row type="flex" :gutter="10" align="middle">
            <Col span="3"><label>上级部门</label></Col>
            <Col>{{ department.administration | formatEntity }}</Col>
            <Col v-if="!!department.administration">
              <ButtonGroup size="small">
                <Button icon="md-git-branch" :to="{name: 'Management', query: { departmentId: department.administration.id }}"/>
                <Button type="primary" icon="md-arrow-forward" @click="$emit('go-to',department.administration.id)"/>
              </ButtonGroup>
            </Col>
          </Row>
          <br/>
          <Row type="flex">
            <Col span="3"><label>编号</label></Col>
            <Col>{{ department.id }}</Col>
          </Row>
          <br/>
          <Row type="flex" align="middle">
            <Col span="3"><label>状态</label></Col>
            <Col>
              <Tag :color="statusColor">
                {{ statusText }}
              </Tag>
            </Col>
          </Row>
          <br/>
          <Row type="flex">
            <Col span="3"><label>描述</label></Col>
            <Col>{{ department.description }}</Col>
          </Row>
          <br/>
          <Row type="flex">
            <Col span="3"><label>设立时间</label></Col>
            <Col>{{ department.createdAt | formatDate}}</Col>
          </Row>
          <br/>
          <Row type="flex" align="middle">
            <Col span="3"><label>审批文件</label></Col>
            <Col><Button size="small" type="primary" :disabled="!department.resource" @click="download">下载</Button></Col>
          </Row>
          <br/>
          <Row type="flex" align="middle">
            <Col span="3"><label>员工人数</label></Col>
            <Col><Tag>{{ department.countEmployees }}</Tag></Col>
          </Row>
          <br/>
          <Row type="flex" align="middle">
            <Col span="3"><label>岗位数量</label></Col>
            <Col><Tag>{{ department.countPositions }}</Tag></Col>
          </Row>
          <br/>
        </div>
      </Col>
    </Row>
    <br/>
    <Row type="flex" :gutter="25">
      <Col span="12">
        <div>
          <Divider orientation="left">下设部门</Divider>
          <div v-if="department.subordinates.length > 0">
            <div v-for="sub in department.subordinates">
              <Row type="flex" :gutter="10" align="middle">
                <Col>
                  <ButtonGroup size="small">
                    <Button icon="md-git-branch" :to="{name: 'Management', query: { departmentId: sub.id }}"/>
                    <Button icon="md-arrow-forward" type="primary" @click="$emit('go-to', sub.id)"/>
                  </ButtonGroup>
                </Col>
                <Col>{{ sub | formatEntity}}</Col>
              </Row>
              <br/>
            </div>
          </div>
          <div v-else>
            <Alert show-icon>
              无信息
              <template slot="desc">
                当前部门没有下级部门
              </template>
            </Alert>
          </div>
        </div>
      </Col>
      <Col span="12">
        <div>
          <Divider orientation="left">下设岗位</Divider>
          <div v-if="department.positions.length > 0">
            <div v-for="pos in department.positions">
              <Row type="flex" :gutter="10">
                <Col>
                  <Button type="primary" size="small" icon="md-arrow-forward" :to="{ name: 'PositionDetails', params: { id: pos.id} }"/>
                </Col>
                <Col>{{ pos | formatEntity }}</Col>
              </Row>
              <br/>
            </div>
          </div>
          <div v-else>
            <Alert show-icon>
              无信息
              <template slot="desc">
                当前部门没有设置岗位
              </template>
            </Alert>
          </div>
        </div>
      </Col>
    </Row>
  </div>
</template>

<script>
  import {downloadResourceApi} from "../../../api/resource";
  import {dateText, entityText} from "../../render";

  export default {
  name: "DepartmentView",
  props: ['department'],
  computed: {
    statusText() {
      return !!this.department.status ? "启用": "已撤销";
    },
    statusColor() {
      return !!this.department.status ? 'success': 'error'
    },
  },
  filters: {
    formatDate: dateText,
    formatEntity: entityText,
  },
  methods: {
    download() {
      downloadResourceApi(this.department.resource.id)
    },

  }
}
</script>

<style scoped>
h4, .ivu-divider {
  color: #2b85e4;
}
</style>