<template>
  <div class="header-user">
    <i-dropdown @on-click="handleClick">
      <i-avatar :src="avatar" />
      <span class="text">{{ name }}</span>
      <i-dropdown-menu slot="list">
        <i-dropdown-item name="logout">
          <i-icon class="icon" size="16" type="ios-power-outline" />
          <span>退出登录</span>
        </i-dropdown-item>
      </i-dropdown-menu>
    </i-dropdown>
  </div>
</template>

<script>
  import {mapActions, mapState} from 'vuex'

  export default {
  name: 'HeaderUser',

  components: {},

  data() {
    return {}
  },

  computed: {
    ...mapState('user', ['name', 'avatar'])
  },

  methods: {
    ...mapActions('user', ['logOut']),

    handleClick(name) {
      switch (name) {
        case 'user':
          this.$router.push({ name: 'UserCenter' })
          break
        case 'setting':
          this.$router.push({ name: 'UserSet' })
          break
        case 'logout':
          this.logOut().then(res => {
            if (res) {
              this.$Message.success({
                content: '退出登陆成功',
                onClose: () => {
                  this.$router.push({ name: 'Login' })
                }
              })
            }
          });
          break
      }
    }
  }
}
</script>
<style lang="less">
.header-user {
  cursor: pointer;
  display: inline-block;
  height: 64px;
  vertical-align: middle;
  line-height: 64px;

  .text {
    font-size: 14px;
    padding-left: 5px;
    color: rgba(0, 0, 0, 0.65);
  }

  .icon {
    margin-right: 8px;
    vertical-align: middle;
  }
}
</style>
