<template>
  <ButtonGroup size="small">
    <Button type="primary" @click="$emit('go-to')">转到</Button>
    <Button v-if="!notification.isRead" @click="$emit('on-read')">已读</Button>
  </ButtonGroup>
</template>

<script>
  export default {
    name: "NotificationOps",
    props: {
      notification: {
        type: Object,
        default() {
          return {}
        }
      }
    }
  }
</script>

<style scoped>

</style>