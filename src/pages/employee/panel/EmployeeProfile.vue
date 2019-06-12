<template>
  <div v-if="!!employee">
    <Row type="flex" :gutter="25" align="middle">
      <Col span="16">
        <div>
          <Divider orientation="left">基础信息</Divider>
          <Row type="flex" align="middle">
            <Col span="4"><label>姓名</label></Col>
            <Col>{{ employee.name }}</Col>
          </Row>
          <br/>
          <Row type="flex" align="middle">
            <Col span="4"><label>编号</label></Col>
            <Col>{{ employee.id }}</Col>
          </Row>
          <br/>
          <Row type="flex" align="middle">
            <Col span="4"><label>性别</label></Col>
            <Col>{{ employee.gender }}</Col>
          </Row>
          <br/>
          <Row type="flex" align="middle">
            <Col span="4"><label>证件号码</label></Col>
            <Col>{{ employee.credential }}</Col>
          </Row>
          <br/>
          <Row type="flex" align="middle">
            <Col span="4"><label>出生日期</label></Col>
            <Col>{{ employee.birth | formatDate }}</Col>
          </Row>
          <br/>
          <Row type="flex" align="middle">
            <Col span="4"><label>年龄</label></Col>
            <Col>{{ age }}</Col>
          </Row>
        </div>
      </Col>
      <Col span="8">
        <template v-if="!!avatarUrl">
          <div class="avatar-container">
            <img :src="avatarUrl" class="avatar-image">
          </div>
          <div style="text-align: center">
            <br/>
            <span>个人照片</span>
          </div>
        </template>
        <template v-else>
          <div class="avatar-container">
            <Alert show-icon>
              <template slot="desc">无个人照片</template>
            </Alert>
          </div>
        </template>
      </Col>
    </Row>
    <br/>

    <Row type="flex" :gutter="25">
      <Col span="12">
        <div>
          <Divider orientation="left">任职信息</Divider>
          <Row type="flex" align="middle">
            <Col span="4"><label>入职时间</label></Col>
            <Col>{{ employee.entryTime | formatDate }}</Col>
          </Row>
          <br/>
          <Row type="flex" align="middle">
            <Col span="4"><label>当前状态</label></Col>
            <Col>
              <Tag :color="!!employee.status ? 'success':'error'">
                {{ !!employee.status ? '在职':'离职'}}
              </Tag>
            </Col>
            <!--<Col>-->
            <!--<Button size="small" icon="md-arrow-forward"-->
            <!--:to="{ name: 'EmployeePanel', params: { id: employeeId }, query: { tab: 'adjustment'}}"/>-->
            <!--</Col>-->
          </Row>
          <br/>
          <Row type="flex" align="middle">
            <Col span="4"><label>司龄</label></Col>
            <Col>
              <Tag>{{ servingAge }}</Tag>
            </Col>
          </Row>
          <br/>
          <Row type="flex" align="middle">
            <Col span="4"><label>当前职务</label></Col>
            <Col span="20" v-if="!!employee.mainPosition">
              <Row type="flex" align="middle" justify="space-between">
                <Col>
                  <Tag color="success">
                    {{ employee.mainPosition | formatPosition }}
                  </Tag>
                </Col>
                <Col>
                  <Button type="primary" size="small" icon="md-arrow-forward"
                          :to="{ name: 'PositionDetails', params: { id: employee.mainPosition.id} }"/>
                </Col>
              </Row>
            </Col>
          </Row>
          <br/>
          <Row type="flex" align="middle">
            <Col span="4"><label>薪资级别</label></Col>
            <Col span="20" v-if="!!employee.scale">
              <Tag color="primary">
                {{ employee.scale | formatScale}}
              </Tag>
            </Col>
          </Row>
          <br/>
          <Row type="flex">
            <Col span="4"><label>招聘方式</label></Col>
            <Col>{{ employee.recruitment }}</Col>
          </Row>
        </div>
      </Col>
      <Col span="12">
        <div>
          <Divider orientation="left">联系方式</Divider>
          <Row type="flex">
            <Col span="4"><label>住址</label></Col>
            <Col>{{ employee.address }}</Col>
          </Row>
          <br/>
          <Row type="flex">
            <Col span="4"><label>电子邮箱</label></Col>
            <Col>{{ employee.email }}</Col>
          </Row>
          <br/>
          <Row type="flex" :gutter="10">
            <Col span="4"><label>手机号码</label></Col>
            <Col v-if="employee.phoneNumbers.length > 0" span="8">
              <Collapse>
                <Panel>
                  <span>{{ employee.phoneNumbers[0]}}</span>
                  <template slot="content">
                    <br/>
                    <div v-for="pn in employee.phoneNumbers">
                      <p>
                        <Icon type="md-call"/>
                        {{ pn }}
                      </p>
                      <br/>
                    </div>
                  </template>
                </Panel>
              </Collapse>
            </Col>

          </Row>
          <br/>
        </div>
      </Col>
    </Row>
    <br/>

    <Row type="flex" :gutter="25">
      <Col span="12">
        <div>
          <Divider orientation="left">教育信息</Divider>
          <Row type="flex">
            <Col span="4"><label>学历</label></Col>
            <Col>{{ employee.education }}</Col>
          </Row>
          <br/>
          <Row type="flex">
            <Col span="4"><label>毕业院校</label></Col>
            <Col>{{ employee.college }}</Col>
          </Row>
          <br/>
          <Row type="flex">
            <Col span="4"><label>专业</label></Col>
            <Col>{{ employee.major }}</Col>
          </Row>
          <br/>
          <Row type="flex">
            <Col span="4"><label>毕业时间</label></Col>
            <Col>{{ employee.graduateTime | formatDate }}</Col>
          </Row>
          <br/>
          <Row type="flex">
            <Col span="4"><label>学位</label></Col>
            <Col>{{ employee.degree }}</Col>
          </Row>
        </div>
      </Col>
      <Col span="12">
        <div>
          <Divider orientation="left">其他信息</Divider>
          <Row type="flex">
            <Col span="4"><label>婚姻状态</label></Col>
            <Col>{{ employee.marriage }}</Col>
          </Row>
          <br/>
          <Row type="flex">
            <Col span="4"><label>政治面貌</label></Col>
            <Col>{{ employee.politicalStatus }}</Col>
          </Row>
        </div>
      </Col>
    </Row>
    <br/>
    <Row type="flex" :gutter="25">
      <Col span="12">
        <div>
          <Divider orientation="left">附件</Divider>
          <Collapse>
            <Panel>
              下载文件
              <div slot="content" v-if="!!attachments.length">
                <template v-for="attachment in attachments">
                  <Row type="flex" align="middle">
                    <Col span="6"><label>{{ attachment.type }}</label></Col>
                    <Col>
                      <Button icon="md-download" size="small" @click="download(attachment.resource.id)"/>
                    </Col>
                  </Row>
                  <br/>
                </template>
              </div>
              <div v-else slot="content">
                无附件
              </div>
            </Panel>
          </Collapse>
        </div>
      </Col>
    </Row>
    <Divider/>
    <Row type="flex" justify="space-between" align="middle">
      <Col>
        <ButtonGroup>
          <Button :to="{name: 'EmployeeUpdate', query: { employeeId }}">更新个人信息</Button>
          <Button v-if="isAdmin"

              :disabled="!employee.status"
              type="primary"
              :to="{name: 'EmployeeAdjustment', query: { employeeId }}">调整职务/薪级
          </Button>
        </ButtonGroup>
      </Col>
      <Col v-if="isAdmin">
        <template v-if="!!employee.status">
          <Button type="error" @click="dischargeModal=true">解除聘用</Button>
        </template>
        <template v-else>
          <Button type="success" @click="restore">恢复聘用</Button>
        </template>
      </Col>
    </Row>
    <Modal
        title="解除聘用"
        v-model="dischargeModal"
        :footer-hide="true">
      <simple-change-form ref="dischargeForm"></simple-change-form>
      <br/>
      <Alert type="warning" show-icon>
        警告
        <template slot="desc">
          该操作将会解除员工当前职务和撤销其薪资级别
        </template>
      </Alert>
      <Button long type="error" @click="discharge">解除聘用</Button>
    </Modal>
  </div>
</template>

<script>
  import {dischargeApi, getAttachmentsApi, getEmployeeApi, restoreEmployeeApi} from "../../../api/employee";
  import {dateDiff} from "../../../utils/math";
  import SimpleChangeForm from "./SimpleChangeForm";
  import {downloadResourceApi, getResourceUrlApi} from "../../../api/resource";
  import {dateText, entityText, scaleText} from "../../render";
  import {hasAuthorities} from "../../../utils";

  export default {
    name: "EmployeeProfile",
    components: {SimpleChangeForm},
    props: ['employeeId'],
    inject: ['reload'],
    data() {
      return {
        isAdmin: hasAuthorities(['ADMIN']),
        employee: null,
        dischargeModal: false,
        attachments: []
      }
    },
    computed: {
      servingAge() {
        const {year, month, day} = dateDiff(this.employee.entryTime, new Date())
        return `${year}年 ${month}个月 ${day}日`;
      },
      age() {
        return dateDiff(this.employee.birth, new Date()).year
      },
      avatarUrl() {
        const avatar = this.attachments.find(a => a.type==='个人照片');
        return avatar && getResourceUrlApi(avatar.resource.id)
      }
    },
    mounted() {
      getEmployeeApi(this.employeeId).then(res => this.employee = res.data);
      getAttachmentsApi(this.employeeId).then(res => {
        this.attachments = res.data;

      })
    },
    methods: {
      discharge() {
        this.dischargeModal = false;

        const formData = this.$refs.dischargeForm.getFormData();
        const id = this.employeeId;
        dischargeApi(id, formData).then(_ => {
          this.$Notice.success({ title: `解除聘用成功(员工编号${id})`});
          this.reload()
        }).catch(e => this.$Notice.error({ title: `解除聘用失败(${e.status})`, desc: e.data.message}))
      },
      download(id) {
        downloadResourceApi(id)
      },
      restore() {
        restoreEmployeeApi(this.employeeId)
          .then(_ => {
            this.$Notice.success({ title: '恢复聘用成功'});
            this.reload();
          })
          .catch(e => this.$Notice.error({ title: `恢复聘用失败${e.status}`, desc: e.data.message}))
      }
    },
    filters: {
      formatDate: dateText,
      formatScale: scaleText,
      formatPosition: entityText
    }
  }
</script>

<style scoped>
  h4, .ivu-divider {
    color: #2b85e4;
  }

  .phone-numbers {
    text-align: center;
  }

  .avatar-container {
    max-width: 200px;
    max-height: 200px;
    margin: 0 auto;
  }
  .avatar-image {
    background: rgba(45, 140, 240, 0.21);
    width: 100%;
    padding: 5px;
  }
</style>
