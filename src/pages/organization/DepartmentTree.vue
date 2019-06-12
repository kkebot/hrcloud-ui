<template>
  <div>
    <Tree ref="treeComp" :data="data" :load-data="loadData" @on-select-change="onSelectedChange"></Tree>
  </div>
</template>
<script>
  import {getDepartmentApi, getHeadOfficeApi, getSubordinatesApi} from "../../api/department";

  export default {
  name: 'DepartmentTree',
  props: ['initId'],
  data () {
    return {
      data: [
        {
          title: 'parent',
          loading: false,
          children: [],
          entity: null,
          expand: false,
        }
      ]
    }
  },
  computed: {
    root() {
      return this.data[0]
    }
  },
  mounted () {
    getHeadOfficeApi().then(res => {
      const entity = res.data;
      this.root.title = entity.name;
      this.root.entity = entity;

      if (!!this.initId) {
        getDepartmentApi(this.initId).then(res => {
          const target = res.data;
          this.expandMounted(this.root, target.hierarchy)
        })
      } else {
        this.expandMounted(this.root, entity.hierarchy)
      }
    })
  },
  methods: {
    debug() {
      console.log(this.root)
      console.log(this.$refs.treeComp)
    },
    // flip(node) { // OK!
    //   if (!node.expand && node.children.length===0) {
    //     this._loadData(node, array => {
    //       node.children.push(...array);
    //       node.expand=true
    //     })
    //   } else {
    //     node.expand = !node.expand
    //   }
    // },
    expandMounted(node, destination) {
      const e = node.entity;
      const hierarchy = e.hierarchy || '/';

      if (hierarchy === destination) {
        this.$set(node, 'selected', true);// instead of node.selected=true
        this.onSelectedChange([node])
        return;
      }

      this._loadData(node, array => {
        node.children.push(...array);
        node.expand=true;

        for(let child of node.children) {
          const sub = hierarchy +""+ child.entity.id + "/";
          if (destination.includes(sub)) {
            this.expandMounted(child, destination);
            break;
          }
        }
      });
    },
    loadData: function (item, callback) {
      this._loadData(item, callback)
    },
    _loadData: function (item, callback) {
      getSubordinatesApi(item.entity.id).then(res => {
        if (!res.data)
          return

        const array = []
        const subs = res.data || []
        subs.forEach(e => array.push({title: e.name, loading: false, children: [], entity: e}))
        callback(array)
      });
    },
    onSelectedChange: function (array) {
      const node = array[array.length - 1]
      if (!!node) // undefined on deselection
        this._loadData(node, () => {})

      this.$emit("node-select-change", node)
    },
  }
}
</script>
<style scoped>

</style>
