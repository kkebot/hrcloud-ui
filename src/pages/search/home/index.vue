<template>
  <div>
    <Row type="flex" justify="center" align="middle">
      <Col>
        <icon type="md-search" size="55"></icon>
      </Col>
      <Col span="1"></Col>
      <Col>
        <span style="font-size: 50px">搜索</span>
      </Col>
    </Row>
    <br/>
    <Row type="flex" align="middle" justify="center" :gutter="10">
      <Col span="2">
        <Select v-model="entity" size="large" @on-change="keyword=null">
          <Option v-for="(o, i) in options" :key="i" :value="o.entity">{{ o.text }}</Option>
        </Select>
      </Col>
      <Col span="2">
        <Select v-model="keyword" @on-change="value=null" :disabled="!entity" size="large">
          <template v-if="!!entity">
            <Option v-for="(f, i) in fields" :key="i" :value="f.key">{{ f.text }}</Option>
          </template>
        </Select>
      </Col>
      <Col span="12">
        <Input
            v-model="value"
            size="large"
            search
            enter-button="开始"
            @on-search="!!entity && !!keyword && !!value && $router.push({ name: 'SearchResult', query : { entity, keyword, value}})"
            placeholder="输入字符串" />
      </Col>
    </Row>
  </div>
</template>

<script>
  export default {
    computed: {
      fields() {
        return this.options.find(opt => opt.entity === this.entity).fields
      }
    },
    data() {
      return {
        entity: 'employee',
        keyword: 'name',
        value: null,
        options: [
          {
            entity: 'department',
            text: '部门',
            fields: [
              {
                key: 'id',
                text: '编号'
              },
              {
                key: 'name',
                text: '名称'
              }
            ]
          },
          {
            entity: 'position',
            text: '岗位',
            fields: [
              {
                key: 'id',
                text: '编号'
              },
              {
                key: 'name',
                text: '名称'
              }
            ]
          },
          {
            entity: 'employee',
            text: '员工',
            fields: [
              {
                key: 'id',
                text: '编号',
              },
              {
                key: 'name',
                text: '姓名',
              },
              {
                key: 'credential',
                text: '身份证',
              },
              {
                key: 'positionId',
                text: '岗位编号',
              },
              {
                key: 'departmentId',
                text: '部门编号',
              }
            ]
          }
        ]
      }
    }
  }
</script>

<style scoped>

</style>