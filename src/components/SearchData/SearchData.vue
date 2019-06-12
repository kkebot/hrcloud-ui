<template>
    <page-data ref="table" :load-data="loadData" :columns="columns">
      <Row type="flex" :gutter="10">
        <Col>
          <Select v-model="keyword" placeholder="选择字段" @on-change="changeKeyword">
            <Option v-for="f in fields" :value="f.key" :key="f.key">{{f.text}}</Option>
          </Select>
        </Col>
        <Col>
          <Input
              icon="ios-search"
              v-model="value"
              @on-click="onClickSearch"
              placeholder="搜索内容"/>
        </Col>
      </Row>
    </page-data>
</template>

<script>
  import PageData from "../PageData/PageData";
  import request from '@/utils/request'

  export default {
    components: {PageData},
    props: {
      search: {
        type: Object,
        default() {
          return {
            keyword: null,
            value: null
          }
        }
      },
      fields: {
        type: Array,
        default() {
          return []
        }
      },
      columns: {
        type: Array,
        default() {
          return []
        }
      },
      api: {
        type: String,
      }
    },
    data() {
      const {keyword, value} = this.search;
      return { keyword, value }
    },
    methods: {
      loadData(page, size, callback) {
        const { keyword, value, api } = this;
        if (!!keyword && !!value && !!api) {
          request.get(api, { params: { keyword, value, page, size }}).then(res => {
            const { content, totalElements } = res.data;
            this.$Notice.success({ title: `第${page+1}页；一共${totalElements}个结果`});
            callback(content, totalElements);
          }).catch(e => this.$Notice.error({ title: `搜索失败(${e.status})`, desc: e.data.message}));
        }
      },
      changeKeyword(keyword) {
        this.value = null
        this.$emit('search-change', { keyword })
      },
      onClickSearch() {
        this.$refs.table.resetPage();
        const { keyword, value } = this;
        this.$emit('search-change', { keyword, value })
      },
    }
  }
</script>

<style scoped>

</style>
