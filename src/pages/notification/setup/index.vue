<template>
  <div>
    <Card>
      <Row type="flex" :gutter="20">
        <Col span="5">
          <Divider orientation="left">选择第一个表</Divider>
          <Select @on-change="changeFrom">
            <Option :key="table.name" v-for="table in database" :value="table.name">{{ table.text }}</Option>
          </Select>

          <Divider orientation="left">选择消息主体</Divider>
          <Select v-model="clauses.select" @on-change="changeSelect">
            <Option
                v-for="(table, index) in aliases"
                :key="table.alias + '-' + index"
                :value="table.name"
                :label="table.text">
              {{ table.text }}({{ table.alias }})
            </Option>
          </Select>

          <Divider orientation="left">选择连接表</Divider>
          <Select multiple v-model="joint" :max-tag-count="3" @on-change="changeJointTables">
            <Option
                v-for="(t, index) in joinable"
                :key="t.alias + '-' + index"
                :value="t.alias"
                :label="t.text">
              {{ t.text }}({{ t.alias }})
            </Option>
          </Select>

          <Divider orientation="left">描述规则</Divider>
          <div>
            <Form ref="form" v-model="formData" :label-width="40" label-position="left">
              <FormItem label="概要" prop="overview">
                <Input v-model="formData.overview"/>
              </FormItem>
              <FormItem label="描述" prop="description">
                <Input type="textarea" v-model="formData.description" placeholder="请务必仔细且详尽地描述该规则的条件和参数！"/>
              </FormItem>
            </Form>
          </div>
        </Col>
        <Col span="19">
          <Divider orientation="left">配置条件</Divider>
          <Row type="flex" justify="center" align="middle" class="group-style" :gutter="20">
            <Col>
              <ButtonGroup>
                <Button :disabled="!!clauses.where.length" type="success" @click="addCondition()">添加</Button>
                <Button v-for="conj in conjunctions"
                        :disabled="!clauses.where.length"
                        :key="conj.value"
                        @click="addCondition(conj)">{{ conj.text }}
                </Button>
              </ButtonGroup>
            </Col>
            <Col>
              <CheckboxGroup v-model="useAggregate">
                <Checkbox label="group">按列分组</Checkbox>
                <Checkbox label="having" :disabled="!useAggregate.includes('group')">分组筛选</Checkbox>
              </CheckboxGroup>
            </Col>
          </Row>
          <template v-for="(clause, index) in clauses.where">
            <Row type="flex" align="middle" :gutter="20" :key="clause.key">
              <Col v-if="!!clause.conj">
                <Tag>{{ clause.conj.text }}</Tag>
              </Col>
              <Col>
                <slots-expr
                    v-model="clause.value"
                    :selectable="selectable"></slots-expr>
              </Col>
              <Col v-if="!!index || clauses.where.length===1">
                <Button type="error" icon="md-backspace" @click="clauses.where.splice(index, 1)"></Button>
              </Col>
            </Row>
            <br/>
          </template>
          <template v-if="useAggregate.includes('group')">
            <Row type="flex" align="middle" :gutter="10">
              <Col>
                <Tag color="primary">按列分组</Tag>
              </Col>
              <Col>
                <slots-expr v-model="clauses.groupBy" :separator="','" :selectable="{ column: selectable.column }"></slots-expr>
              </Col>
            </Row>
            <br/>
          </template>
          <template v-if="useAggregate.includes('having')">
            <Row type="flex" align="middle" :gutter="10">
              <Col>
                <Tag color="warning">筛选分组</Tag>
              </Col>
              <Col>
                <slots-expr v-model="clauses.having" :selectable="selectable"></slots-expr>
              </Col>
            </Row>
          </template>
        </Col>
      </Row>
      <br/>
      <Row type="flex" :gutter="20">
        <Col span="5">
          <Button @click="setup" long type="success" :disabled="!formData.description">设置提醒</Button>
        </Col>
      </Row>
    </Card>
  </div>
</template>

<script>
  import {getTables} from "./table";
  import {guid} from "./utils";
  import SlotsExpr from "./SlotsExpr";
  import {registerRuleApi} from "../../../api/rule";
  import {obj2form} from "../../../api/common";

  export default {
    components: {SlotsExpr},
    inject: ['reload'],
    data() {
      return {
        formData: {
          description: null,
          overview: null,
        },

        useAggregate: [],

        clauses: {
          where: [], // string array
          groupBy: '', // string
          having: '', // string,
          select: '',
          from: '',
        },

        database: getTables().map(table => ({...table, jointTimes: 0})),
        joint: [],
        aliases: [],
        selectable: {
          function: [
            {
              value: 'YEAR',
              text: '年份'
            },
            {
              value: 'MONTH',
              text: '月份'
            },
            {
              value: 'DAY',
              text: '日子'
            },
            {
              value: 'CONCAT',
              text: '拼接'
            },
            {
              value: 'MAX',
              text: '取最大值'
            },
            {
              value: 'MIN',
              text: '取最小值'
            },
            {
              value: 'DATEDIFF',
              text: '日期差'
            },
            {
              value: 'COUNT',
              text: '计数'
            },
          ],
          operator: [
            {
              value: '+',
              text: '加',
            },
            {
              value: '-',
              text: '减',
            },
            {
              value: '*',
              text: '乘',
            },
            {
              value: '/',
              text: '除以',
            },
            {
              value: '<',
              text: '小于',
            },
            {
              value: '>',
              text: '大于',
            },
            {
              value: '>=',
              text: '大于或等于',
            },
            {
              value: '<=',
              text: '小于或等于',
            },
            {
              value: '!=',
              text: '不等于',
            },
            {
              value: '=',
              text: '等于',
            },
            {
              value: 'IS',
              text: '是',
            },
            {
              value: 'LIKE',
              text: '类似',
            },
            {
              value: 'NOT',
              text: '不是',
            }
          ],
          constant: [
            {value: 'CURRENT_DATE', text: '今天'},
            {value: 'NULL', text: '空'},
            {value: '*', text: '默认'}
          ],
          column: []
        },
        conjunctions: [
          {
            value: 'AND',
            text: '并且',
          },
          {
            value: 'OR',
            text: '或者',
          }
        ]
      }
    },
    computed: {
      joinable() {
        return this.aliases.slice(1)
      }
    },
    methods: {

      setup() {


        let {where, groupBy, having, select, from } = this.clauses;

        if (!from)
          return;

        let st = this.getAlias(select), ft = this.getAlias(from), { column } = this.selectable;
        let selectResult = [`${st.alias}.${st.primary}`];
        column.forEach(col => {
          if (having.includes(col.value)) {
            selectResult.push(col.value);
          }
        });
        const join = this.aliases.filter(t => this.joint.includes(t.alias))
          .map(t => `INNER JOIN ${t.name} ${t.alias} ON ${t.joinFrom.alias}.${t.joinFrom.ref}=${t.alias}.${t.joinTo}`)
          .join('\n');

        const clauses = ["SELECT DISTINCT " + selectResult.join(","), `FROM ${ft.name} ${ft.alias}`, join];
        if (where.length>0)
          clauses.push('WHERE ' + where.map(c => `${(c.conj && c.conj.value) || ''} ${c.value}`).join(' '));
        else if (!having) {
          this.$Notice.error({ title: '配置错误', desc: '请配置条件或筛选依据'})
          return;
        }

        if (!!groupBy)
          clauses.push('GROUP BY ' + groupBy);
        if (!!having)
          clauses.push('HAVING ' + having);

        const form = this.formData;
        const sqlStatement = clauses.join("\n");

        console.log(sqlStatement);
        registerRuleApi(obj2form({ ...form, sqlStatement, entityType: select, multiple: selectResult.length > 1})).then(res => {
          this.$Notice.success({ title: `成功添加规则(${res.data.id})`});
          this.$router.push({ name: 'NotificationList' })
        }).catch(e => this.$Notice.error({ title: `添加规则失败(${e.status})`, desc: e.data.message}))
      },

      changeFrom(name) {
        this.reset();

        const { clauses } = this;
        clauses.from = name;

        const t = this.createAlias(name);
        this.setColumns(this.listAll(t));
        this.aliases = [t].concat(this.expand(t));

        this.changeSelect(name);
      },

      setColumns(column) {
        this.selectable.column = column;
      },

      changeSelect(name) {
        const { clauses } = this;
        clauses.select = name;
      },

      getTable(name) {
        return this.database.find(t => t.name === name);
      },

      getAlias(name) {
        return this.aliases.find(t => t.name === name);
      },

      reset() {
        this.database.forEach(t => t.jointTimes = 0);
        this.joint = [];
        this.aliases = [];
        this.setColumns([])
      },

      createAlias(name) {
        const target = this.getTable(name);

        const copy = {...target, alias: `_${target.name}_${target.jointTimes}`};
        target.jointTimes += 1;
        return copy;
      },

      expand(table) {
        return table.columns
          .filter(col => !!col.join)
          .map(col => {
            const ret = this.createAlias(col.join.table);
            ret.text = col.text;
            ret.joinFrom = {
              ref: col.name,
              alias: table.alias
            };
            ret.joinTo = col.join.key;
            return ret;
          });
      },

      listAll(table) {
        return table.columns
          .filter(col => !col.hidden)
          .map(col => ({value: table.alias + "." + col.name, text: `${col.text}(${table.text})`}))
      },

      changeJointTables() {
        const { joint, clauses } = this;
        const ft = this.getAlias(clauses.from);

        let old = this.aliases.filter(t => t.name !== clauses.from && (joint.includes(t.alias) || t.joinFrom.alias === ft.alias));

        this.aliases = [].concat.apply(old, joint.map(alias => {
            const t = this.aliases.find(t => t.alias === alias);
            return this.expand(t)
          })
        );
        this.aliases.push(ft);

        this.setColumns([].concat.apply(this.listAll(ft), joint.map(ta => {
            const t = this.aliases.find(t => ta === t.alias);
            return this.listAll(t);
          })
        ));
      },

      addCondition(conj) {
        // https://segmentfault.com/a/1190000013787818
        const {where} = this.clauses;
        if (!conj)
          where.push({key: guid()});
        else
          where.push({value: null, conj, key: guid()});
      }
    }
  }
</script>

<style scoped>
  .tag-style {
    text-align: center;
    margin: 5px;
  }

  .group-style {
    margin: 16px;
  }

  h4, .ivu-divider {
    color: #2b85e4;
  }
</style>
