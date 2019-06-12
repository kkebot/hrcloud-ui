<template>
  <div>
    <Row type="flex" align="middle" :gutter="20">
      <Col>
        <Button type="success" @click="onExport" icon="md-download">导出为CSV</Button>
      </Col>
      <Col>
        <Select v-model="keys" multiple :max-tag-count="3" @on-change="showColumns" placeholder="选择显示列">
          <Option v-for="c in columns" :value="c.key" :key="c.key">{{c.title}}</Option>
        </Select>
      </Col>
    </Row>
    <br/>
    <Table
        class="query-list__table"
        :columns="displayed"
        :data="data"
        @on-row-dblclick="$emit('on-db-click', $event)"></Table>
    <br/>
    <Row type="flex" justify="end">
      <Col>
        <Page :total="totalElements"
              show-sizer
              :page-size="10"
              @on-change="onPage($event, size)"
              @on-page-size-change="onPage(page, $event)"></Page>
      </Col>
    </Row>
  </div>
</template>

<script>
  export default {
    name: "PageTable",
    props: {
      totalElements: {
        type: Number,
        default: 1
      },
      data: {
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
      }
    },
    data() {
      return {
        keys: this.columns.map(c => c.key),
        displayed: this.columns.slice(),
        page: null,
        size: null
      }
    },
    mounted() {
      this.resetPage()
    },
    methods: {
      onExport() {
        // TODO
      },
      resetPage() {
        this.size = 10;
        this.page = 0;
        this.fetchPage();
      },
      fetchPage() {
        const { page, size } = this;
        console.log({ page, size })
        this.$emit('on-page', page, size)
      },
      showColumns() {
        this.displayed = this.columns.filter(c => this.keys.includes(c.key))
      },
      onPage(pageNum, pageSize) {
        this.page = pageNum-1;
        this.size = pageSize;
        this.fetchPage()
      }
    }
  }
</script>

<style scoped lang="less">
  .query-list__table {
    border: none;
  
  .ivu-table:after {
    display: none;
  }
  
  }
</style>
