<template>
  <Alert class="alert-padding" :type="isFunction?'info':'warning'">
    <Row type="flex" :gutter="10" align="middle">
      <template v-if="isFunction">
        <Col>
          <Select v-model="func" @on-change="updateModel">
            <Option v-for="(p, index) in selectable.function" :value="p.value" :key="p.value + '-' + index">{{ p.text }}</Option>
          </Select>
        </Col>
        <Col><span class="span-text">(</span></Col>
      </template>
      <Col v-for="(item, index) in items" :key="item.slot + '-' + index">
        <template v-if="item.slot==='operator'">
          <Select v-model="item.value" @on-change="updateModel">
            <Option v-for="(o, index) in selectable.operator" :value="o.value" :key="o.value + '-' + index">{{ o.text }}</Option>
          </Select>
        </template>
        <template v-else>
          <Row type="flex" align="middle">
            <Col v-if="!!separator && index > 0">
              <span class="span-text">{{ separator }}</span>
            </Col>
            <Col>
              <Select v-model="item.slot" @on-change="(item.value='') || updateModel()">
                <Option v-for="(slot, index) in slotTypes" :value="slot.value" :key="slot.value + '-' + index">{{ slot.text }}</Option>
              </Select>
            </Col>
            <Col v-if="!!item.slot">
              <template v-if="item.slot==='text'">
                <Input class="value-input" v-model="item.value" :clearable="true" @on-change="updateModel" />
              </template>
              <template v-else-if="item.slot==='expression'">
                <slots-expr v-model="item.value" :selectable="selectable" @change-model="updateModel"></slots-expr>
              </template>
              <template v-else-if="item.slot==='function'">
                <slots-expr
                  v-model="item.value"
                  :selectable="selectable"
                  :is-function="true"
                  :separator="','"
                  @change-model="updateModel"></slots-expr>
              </template>
              <template v-else>
                <Select v-model="item.value" @on-change="updateModel">
                  <Option v-for="(o, index) in selectable[item.slot]" :value="o.value" :key="o.value + '-' + index">{{ o.text }}</Option>
                </Select>
              </template>
            </Col>
          </Row>
        </template>
      </Col>
      <template v-if="isFunction">
        <Col><span class="span-text">)</span></Col>
      </template>
      <Col>
        <ButtonGroup size="small">
          <Button icon="md-add" @click="add"/>
          <Button icon="md-backspace" type="error" :disabled="items.length<=1" @click="items.splice(-1, 1)"/>
        </ButtonGroup>
      </Col>
    </Row>
  </Alert>
</template>

<script>
  export default {
    name: "SlotsExpr",
    model: {
      event: 'change-model'
    },
    props: {
      selectable: {
        type: Object,
        default() {
          return {
            column: [],
            function: [],
            operator: [],
            constant: []
          }
        }
      },
      isFunction: {
        type: Boolean,
        default: false
      },
      separator: {
        type:String,
        default: ''
      }
    },
    data() {
      return {
        func: null,
        items: [],
        slotTypes: [
          {
            value: 'text',
            text: '输入',
          },
          {
            value: 'column',
            text: '列',
          },
          {
            value: 'constant',
            text: '特殊值'
          },
          {
            value: 'expression',
            text: '表达式',
          },
          {
            value: 'function',
            text: '函数',
          }
        ]
      }
    },
    mounted() {
      this.add()
    },
    computed: {

    },
    methods: {
      updateModel() {
        const items = this.items.map(item => item.value).join(this.separator);
        const model = `${this.func || ''}(${items})`;
        console.log(model);
        this.$emit('change-model', model)
      },

      debugPrint(value) {
        console.log(value)
      },

      add() {
        const items = this.items;
        if (!this.isFunction && items.length > 0 && items[items.length-1].slot !== 'operator')
          items.push({
            slot: 'operator',
            value: null
          });
        else
          items.push({
            slot: null,
            value: null
          })
      },

    }
  }
</script>

<style scoped>
  .alert-padding {
    padding-right: 10px;
    padding-left: 5px;
    margin-left: 5px;
    margin-bottom: 0;
  }
  .value-input {
    width: 100px;
  }
  .span-text {
    font-size: x-large;
    white-space: pre;
  }
</style>
