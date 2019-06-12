<template>
  <Card>
    <Row type="flex" align="middle" justify="center">
      <Col>
        <h1>Unauthorized</h1>
      </Col>
    </Row>
    <br/>
    <Row type="flex" align="middle" justify="center">
      <Col>
        <Alert type="error" show-icon>
          权限不足
          <span slot="desc">你没有足够权限访问此页面</span>
        </Alert>
      </Col>
    </Row>
  </Card>

</template>

<script>
export default {
  name: 'Unauthorized'
}
</script>

<style scoped>

</style>