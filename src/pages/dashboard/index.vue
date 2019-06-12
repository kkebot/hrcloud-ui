<template>
  <div>
    <template v-for="(slot, i) in slots">
      <Divider orientation="left">{{ slot.title }}</Divider>
      <Row type="flex" :gutter="40" :key="i">
        <Col v-for="(card, j) in slot.cards"
            :key="j"
            style="height: 120px;padding-bottom: 10px;"
            :xs="12"
            :md="12"
            :lg="8">
          <router-link :to="card.to">
            <info-card shadow :icon="card.icon" :icon-size="36" :color="card.color">
              <h2>{{ card.text }}</h2>
              <br/>
              <span>{{ card.desc }}</span>
            </info-card>
          </router-link>
        </Col>
      </Row>
    </template>
  </div>
</template>

<script>
  import InfoCard from "../../components/InfoCard/InfoCard";

  export default {
    components: {InfoCard},
    data() {
      return {
        slots: [
          {
            title: '信息管理',
            cards: [
              {
                text: "部门架构",
                desc: "管理公司架构",
                to: {
                  name: 'Management'
                },
                icon: "ios-people",
                color: '#34a5e4'
              },
              {
                text: "搜索",
                desc: "部门/岗位/员工",
                to: {
                  name: 'Search'
                },
                icon: "md-search",
                color: '#3437e4'
              },
              {
                text: "导入员工",
                desc: "员工信息",
                to: {
                  name: 'EmployeeImport'
                },
                icon: "md-person-add",
                color: '#4c13cb'
              },
            ]
          },
          {
            title: '薪资管理',
            cards: [
              {
                text: "薪资上传",
                desc: "薪资信息",
                to: {
                  name: 'WageUpload'
                },
                icon: 'ios-cash',
                color: '#22daa0'
              },
              {
                text: "部门统计",
                desc: "薪资信息",
                to: {
                  name: 'WageDepartment'
                },
                icon: 'ios-stats',
                color: '#16ecd6'
              }
            ]
          },
          {
            title: '消息提醒',
            cards: [
              {
                text: "未读消息",
                desc: "消息提醒",
                to: {
                  name: 'NotificationList'
                },
                icon: 'md-text',
                color: '#d24958'
              },
              {
                text: "设置规则",
                desc: "消息提醒",
                to: {
                  name: 'NotificationSetup'
                },
                icon: 'md-notifications',
                color: '#ec9252'
              },
            ]
          },
        ],
      }
    }
  }
</script>

<style scoped>
  a {
    color: #515a6e;
  }

</style>