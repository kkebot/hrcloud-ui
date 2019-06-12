<template>
  <div>
    <Form :label-width="100" label-position="left" ref="form" :model="formData" :rules="ruleValidate">

      <FormItem label="新密码" prop="update">
        <Input v-model="formData.update" type="password">
          <span slot="prefix">
            <Icon :size="14" type="md-lock"/>
          </span>
        </Input>
      </FormItem>

      <FormItem label="再次输入" prop="repeat">
        <Input v-model="formData.repeat" type="password">
          <span slot="prefix">
            <Icon :size="14" type="md-lock"/>
          </span>
        </Input>
      </FormItem>
    </Form>
    <Divider/>
    <Button type="success" @click="onOk" :disabled="!formData.repeat || !formData.update">确定</Button>
  </div>
</template>

<script>
  import {obj2form} from "../../../api/common";

  export default {
    name: "PasswordForm",
    props: {
      isAdmin: {
        type: Boolean,
        default: true
      }
    },
    data() {
      const self = this;
      return {
        formData: self.emptyForm(),
        ruleValidate: {
          update: [
            {required: true, message: '请输入新密码（长度不小于6）', trigger: 'blur', min: 6},
          ],
          repeat: [
            {required: true, message: '请再次输入新密码', trigger: 'blur'},
            {validator: self.validateRepeat}
          ],
        },
      }
    },
    methods: {
      emptyForm() {
        return {
          update: null,
          repeat: null,
        }
      },
      reset() {
        this.formData = this.emptyForm()
      },
      onOk() {
        this.$refs.form.validate(valid => {
          if (valid) {
            const {update} = this.formData;
            this.$emit('on-form-ready', obj2form({update}));
          } else {
            this.$Notice.error({title: '表单无效', desc: '请检查你的输入'})
          }
        })
      },
      validateRepeat(rule, value, callback) {
        if (this.formData.update !== value) {
          callback(new Error("两次输入不相同"))
        } else {
          callback()
        }
      },
    }
  }
</script>

<style scoped>

</style>