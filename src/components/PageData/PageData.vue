<template>
  <div>
    <Row type="flex" align="middle" justify="space-between">
      <Col span="12">
        <Row type="flex" :gutter="5">
          <Col>
            <Button v-if="useExport" type="success" @click="onExport">导出CSV</Button>
          </Col>
          <Col>
            <Select v-model="keys" multiple :max-tag-count="3" @on-change="showColumns" placeholder="选择显示列">
              <Option v-for="c in columns" :value="c.key" :key="c.key">{{c.title}}</Option>
            </Select>
          </Col>
        </Row>
      </Col>
      <Col>
        <slot></slot>
      </Col>
    </Row>
    <br/>
    <Table
        class="query-list__table"
        :columns="displayed"
        :data="content"
        ref="table"
        @on-row-dblclick="$emit('on-db-click', $event)"></Table>
    <br/>
    <Row type="flex" justify="end">
      <Col>
        <Page
            :current="page"
            :total="totalElements"
            :page-size="size"
            show-sizer
            show-total
            @on-change="onPage($event, size)"
            @on-page-size-change="onPage(page, $event)"></Page>
      </Col>
    </Row>
  </div>
</template>

<script>
  export default {
    name: "PageData",
    props: {
      columns: {
        type: Array,
        default() {
          return []
        }
      },
      loadData: {
        type: Function,
        default() {
          return (page, size, callback) => { callback([], 0) }
        }
      },
      useExport: {
        type: Boolean,
        default: true,
      }
    },
    data() {
      return {
        keys: this.columns.map(c => c.key),
        displayed: this.columns.slice(),
        page: 1,
        size: 10,
        totalElements: 1,
        content: []
      }
    },
    mounted() {
      this.resetPage()
    },
    methods: {
      onExport() {
        // TODO
        this.$refs.table.exportCsv({
          filename: "temp.csv",
          original: false,
          columns: this.displayed,
          data: this.content.map(row => {
            let ret = {};
            this.displayed.forEach(col => {
              if (!!col.noExport)
                return;
              if (!!col.exportData)
                ret[col.key] = col.exportData(row);
              else
                ret[col.key] = row[col.key];
            });
            return ret;
          })
        })
      },
      showColumns() {
        this.displayed = this.columns.filter(c => this.keys.includes(c.key))
      },
      resetPage() {
        this.onPage(1, 10)
      },
      onPage(page, size) {
        this.page = page;
        this.size = size;
        this.fetchPage()
      },
      fetchPage() {
        const { page, size } = this;

        this.loadData(page-1, size, (content, totalElements) => {
          this.totalElements = totalElements;
          this.content = content;
        })
      },
      getData() {
        return this.content
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