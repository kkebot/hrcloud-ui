<template>
  <div>
    <Form ref="form" :model="formData" label-position="left" :label-width="80" :rules="ruleValidate">
      <FormItem label="核算月份" prop="period">
        <DatePicker :disabled="!isSetup" :editable="false" v-model="formData.period" format="yyyy/MM"
                    @on-change="formData.period=$event"></DatePicker>
      </FormItem>

      <FormItem :label="f.title" :prop="f.key" v-for="f in numericFormFields">
        <Input :readonly="readonly" v-model="formData[f.key]"/>
      </FormItem>
    </Form>
    <Row type="flex" justify="space-between" align="middle">
      <Col>
        <Button v-if="useButton" type="success" @click="onOk">确定</Button>
      </Col>
      <Col>
        <p><b>合计</b>: ￥{{earnings | numFilter}}</p>
      </Col>
    </Row>

  </div>
</template>

<script>

  import {filter} from "../../utils/object";

  const numericRule = {
    type: 'number',
    message: '请输入数字',
    trigger: 'blur',
    transform: value => Number(value)
  };

  const numericFields = [
    {
      key: 'salary',
      title: '基本工资'
    },
    {
      key: 'bonus',
      title: '奖金'
    },
    {
      key: 'allowance',
      title: '津贴'
    },
    {
      key: 'overtimePay',
      title: '加班工资'
    },
    {
      key: 'backPay',
      title: '欠发工资'
    },
    {
      key: 'payRaise',
      title: '加薪'
    },
    {
      key: 'payCut',
      title: '减薪'
    },
  ];
  const numericKeys = numericFields.map(f => f.key)

  export default {
    name: "WageForm",
    props: ['wage', 'readonly', 'useButton'],
    computed: {
      isSetup() {
        return !this.wage.id
      },
      earnings: {
        get: function () {
          return numericKeys.reduce((acc, k) => {
            acc += Number(this.formData[k]);
            return acc;
          }, 0.0)
        },
        set: function (val) {

        }
      },
    },
    filters: {
      numFilter(value) {
        let transformVal = Number(value).toFixed(3)
        let realVal = transformVal.substring(0, transformVal.length - 1);
        return Number(realVal)
      },
    },
    data() {
      return {
        formData: {
          period: this.wage.period,
          ...filter(this.wage, (k, _) => numericKeys.indexOf(k) !== -1)
        },

        numericFormFields: numericFields.slice(),

        ruleValidate: numericKeys.reduce((obj, k) => {
          obj[k] = [numericRule]
          return obj
        }, {}),
      }
    },
    methods: {
      onOk() {
        this.$refs.form.validate(valid => !!valid && this.$emit("on-wage-ok", this.formData));
      }
    }
  }
</script>

<style scoped>

</style>