<template>
  <ButtonGroup size="small">
    <Button type="primary"
            icon="md-search"
            @click="$emit('check-details')"></Button>
    <Button icon="md-notifications"
            @click="$emit('check-read')">
    </Button>
    <Button v-if="!!rule.status" type="error"
            icon="md-close"
            @click="$emit('on-disabled')"></Button>
  </ButtonGroup>
</template>

<script>
  export default {
    name: "NotifyRuleOps",
    props: {
      rule: {
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