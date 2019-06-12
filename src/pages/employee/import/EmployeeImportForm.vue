<template>
  <div class="us-basic">
    <Form
        class="us-basic__form"
        ref="form"
        :model="formData"
        :rules="ruleValidate"
        @keydown.enter.native="onOk">
      <Row type="flex" :gutter="30">
        <Col span="12">
          <div>
            <Divider orientation="left">基本信息</Divider>
            <FormItem label="姓名" prop="name">
              <Input v-model="formData.name" placeholder="请输入中文名"></Input>
            </FormItem>
            <FormItem label="证件号码" prop="credential">
              <Input v-model="formData.credential"></Input>
            </FormItem>
            <FormItem label="性别" prop="gender">
              <RadioGroup v-model="formData.gender">
                <Radio label="男"></Radio>
                <Radio label="女"></Radio>
              </RadioGroup>
            </FormItem>
            <FormItem label="出生日期" prop="birth">
              <DatePicker v-model="formData.birth" :editable="false" type="date"></DatePicker>
            </FormItem>
          </div>
        </Col>
        <Col span="12">
          <div>
            <Divider orientation="left">教育信息</Divider>
            <FormItem label="学历" prop="education">
              <Select v-model="formData.education">
                <Option v-for="item in educations" :value="item" :key="item">{{ item }}</Option>
              </Select>
            </FormItem>
            <FormItem label="毕业院校" prop="college">
              <Input v-model="formData.college"></Input>
            </FormItem>
            <FormItem label="专业" prop="major">
              <Input v-model="formData.major"></Input>
            </FormItem>
            <FormItem label="毕业时间" prop="graduateTime">
              <DatePicker v-model="formData.graduateTime"/>
            </FormItem>
            <FormItem label="学位" prop="degree">
              <Select v-model="formData.degree">
                <Option v-for="item in degrees" :value="item" :key="item">{{ item }}</Option>
              </Select>
            </FormItem>
          </div>
        </Col>
      </Row>

      <Row type="flex" :gutter="30">
        <Col span="12">
          <div>
            <Divider orientation="left">联系方式</Divider>
            <FormItem label="邮箱" prop="email">
              <Input v-model="formData.email" placeholder="请输入邮箱"></Input>
            </FormItem>
            <FormItem label="住址" prop="address">
              <Input v-model="formData.address"></Input>
            </FormItem>
            <Collapse>
              <Panel>
                手机号码
                <template slot="content">
                  <FormItem v-for="(phone, index) in formData.phoneNumbers" :key="index" :label="'手机 ' + (index + 1)">
                    <Input type="text" v-model="formData.phoneNumbers[index]">
                      <Button slot="append" icon="md-close" type="error" @click="handleRemove(index)" />
                    </Input>
                  </FormItem>
                  <FormItem>
                    <Button type="dashed" long @click="handleAdd" icon="md-add">添加一个手机号码</Button>
                  </FormItem>
                </template>
              </Panel>
            </Collapse>
          </div>
        </Col>
        <Col span="12">
          <div>
            <Divider orientation="left">其他信息</Divider>
            <FormItem label="入职时间" prop="entryTime">
              <DatePicker v-model="formData.entryTime"></DatePicker>
            </FormItem>
            <FormItem label="招聘方式" prop="recruitment">
              <Input v-model="formData.recruitment"></Input>
            </FormItem>
            <FormItem label="政治面貌" prop="politicalStatus">
              <Select v-model="formData.politicalStatus">
                <Option v-for="item in politicalStatusTypes" :value="item" :key="item">{{ item }}</Option>
              </Select>
            </FormItem>
            <FormItem label="婚姻状况" prop="marriage">
              <Select v-model="formData.marriage">
                <Option v-for="item in marriages" :value="item" :key="item">{{ item }}</Option>
              </Select>
            </FormItem>
          </div>
        </Col>
      </Row>

      <Divider orientation="left">附件</Divider>
      <Collapse>
        <Panel>
          上传附件
          <div slot="content">
            <template v-for="up in uploads">
              <upload-button
                  :accept="up.accept"
                  :label-text="up.text"
                  :label-width="100"
                  @on-file-ready="up.file=$event"/>
              <br/>
            </template>
          </div>
        </Panel>
      </Collapse>
    </Form>
    <Divider/>
    <Button type="success" @click="onOk">确定</Button>
  </div>
</template>

<script>
  import {obj2form} from "../../../api/common";
  import UploadButton from "../../../components/UploadButton/UploadButton";

  export default {
    name: 'EmployeeImportForm',
    components: {UploadButton},
    props: ['profile'],
    data() {
      return {
        ruleValidate: {
          name: [{ required: true, message: '请输入中文名', trigger: 'blur', min: 2, max: 4 }],
          credential: [
            {required: true, message: '请输入有效的身份证号码', trigger: 'blur'},
            {validator: validateCredential}
          ],
          email: [{ type: 'email', message: '邮箱格式不正确', trigger: 'blur' }],
        },
        formData: { ...this.emptyForm(), ...this.profile},
        marriages: ["已婚", "未婚", "离婚", "丧偶"],
        degrees: ['其它', "学士", '硕士', '博士'],
        educations: ['其它', '小学', '初中', '中专', '高中', '专科', '本科', '硕士研究生', '博士研究生'],
        politicalStatusTypes: ['共青团员', '群众', '党员'],

        uploads: [
          {
            text: '个人照片',
            accept: '.jpg,.jpeg,.png'
          },
          {
            text: '入职通知书',
            accept: '.doc,.docx'
          },
          {
            text: '毕业证书',
            accept: '.doc,.docx'
          },
          {
            text: '入职审批表',
            accept: '.doc,.docx'
          },
          {
            text: '户口本',
            accept: '.doc,.docx'
          },
          {
            text: '结婚证',
            accept: '.doc,.docx'
          },
          {
            text: '资格证书',
            accept: '.doc,.docx'
          },
          {
            text: '身份证',
            accept: '.doc,.docx'
          },
        ],
      }
    },

    methods: {
      onOk() {
        this.$refs.form.validate(valid => {
          if (valid) {
            const formData = obj2form(this.formData);
            this.uploads.forEach(up => {
              if (!!up.file) {
                formData.append('attachmentTypes', up.text);
                formData.append('files', up.file)
              }
            });
            this.$emit('on-form-ready', formData);
          }
        })
      },
      emptyForm() {
        return {
          name: null,
          credential: null,
          gender: null,
          birth: null,

          college: null,
          degree: null,
          education: null,
          major: null,
          graduateTime: null,

          phoneNumbers: [],
          email: null,
          address: null,

          entryTime: new Date(),

          recruitment: null,
          politicalStatus: null,
          marriage: null,
        }
      },
      handleAdd() {
        this.formData.phoneNumbers.push('')
      },
      handleRemove(index) {
        this.formData.phoneNumbers.splice(index, 1)
      }
    }
  }

  const validateCredential = (rule, value, callback) => {
    if (!validateIdCard(value)) {
      callback(new Error("请输入有效的身份证"))
    } else {
      callback()
    }
  };

  function validateIdCard(idCard) {
    const city = {
      11: "北京", 12: "天津", 13: "河北", 14: "山西", 15: "内蒙古",
      21: "辽宁", 22: "吉林", 23: "黑龙江", 31: "上海", 32: "江苏",
      33: "浙江", 34: "安徽", 35: "福建", 36: "江西", 37: "山东", 41: "河南",
      42: "湖北", 43: "湖南", 44: "广东", 45: "广西", 46: "海南", 50: "重庆",
      51: "四川", 52: "贵州", 53: "云南", 54: "西藏", 61: "陕西", 62: "甘肃",
      63: "青海", 64: "宁夏", 65: "新疆", 71: "台湾", 81: "香港", 82: "澳门", 91: "国外"
    };
    //是否为空
    if (idCard === '') {
      return false;
    }
    //校验长度，类型
    if (_isCardNo(idCard) === false) {
      return false;
    }
    //检查省份
    if (_checkProvince(idCard, city) === false) {
      return false;
    }
    //校验生日
    if (_checkBirthday(idCard) === false) {
      return false;
    }
    //检验位的检测
    return _checkParity(idCard) !== false;

  }

  function _isCardNo(card) {
    //身份证号码为15位或者18位，15位时全为数字，18位前17位为数字，最后一位是校验位，可能为数字或字符X
    const reg = /(^\d{15}$)|(^\d{17}(\d|X|x)$)/;
    return reg.test(card) !== false;

  }

  function _checkProvince(card, vcity) {
    const province = card.substr(0, 2);
    return vcity[province] != undefined;

  }

  function _checkBirthday(card) {
    const len = card.length;
    //身份证15位时，次序为省（3位）市（3位）年（2位）月（2位）日（2位）校验位（3位），皆为数字
    if (len == '15') {
      const re_fifteen = /^(\d{6})(\d{2})(\d{2})(\d{2})(\d{3})$/;
      const arr_data = card.match(re_fifteen);
      const year = arr_data[2];
      const month = arr_data[3];
      const day = arr_data[4];
      const birthday = new Date('19' + year + '/' + month + '/' + day);
      return _verifyBirthday('19' + year, month, day, birthday);
    }
    //身份证18位时，次序为省（3位）市（3位）年（4位）月（2位）日（2位）校验位（4位），校验位末尾可能为X
    if (len == '18') {
      const re_eighteen = /^(\d{6})(\d{4})(\d{2})(\d{2})(\d{3})([0-9]|X|x)$/;
      const arr_data = card.match(re_eighteen);
      const year = arr_data[2];
      const month = arr_data[3];
      const day = arr_data[4];
      const birthday = new Date(year + '/' + month + '/' + day);
      return _verifyBirthday(year, month, day, birthday);
    }
    return false;
  }

  function _verifyBirthday(year, month, day, birthday) {
    const now = new Date();
    const now_year = now.getFullYear();
    //年月日是否合理
    if (birthday.getFullYear() == year && (birthday.getMonth() + 1) == month && birthday.getDate() == day) {
      //判断年份的范围（0岁到100岁之间)
      const time = now_year - year;
      return time >= 0 && time <= 100;

    }
    return false;
  }

  function _checkParity(card) {
    //15位转18位
    card = _15To18(card);
    const len = card.length;
    if (len == '18') {
      const arrInt = [7, 9, 10, 5, 8, 4, 2, 1, 6, 3, 7, 9, 10, 5, 8, 4, 2];
      const arrCh = ['1', '0', 'X', '9', '8', '7', '6', '5', '4', '3', '2'];
      let cardTemp = 0, i;
      for (i = 0; i < 17; i++) {
        cardTemp += card.substr(i, 1) * arrInt[i];
      }
      const valnum = arrCh[cardTemp % 11];
      return valnum == card.substr(17, 1).toLocaleUpperCase();

    }
    return false;
  }

  function _15To18(card) {
    if (card.length == '15') {
      const arrInt = [7, 9, 10, 5, 8, 4, 2, 1, 6, 3, 7, 9, 10, 5, 8, 4, 2];
      const arrCh = ['1', '0', 'X', '9', '8', '7', '6', '5', '4', '3', '2'];
      let cardTemp = 0;
      card = card.substr(0, 6) + '19' + card.substr(6, card.length - 6);
      for (let i = 0; i < 17; i++) {
        cardTemp += card.substr(i, 1) * arrInt[i];
      }
      card += arrCh[cardTemp % 11];
      return card;
    }
    return card;
  }
</script>

<style lang="less" scoped>
  .us-basic {
    &__title {
      font-size: 20px;
      color: rgba(0, 0, 0, 0.85);
      line-height: 28px;
      font-weight: 500;
      margin-bottom: 12px;
    }

    &__form {
      .ivu-form-item-label {
        color: rgba(0, 0, 0, 0.85);
        font-size: 14px;

        &::before {
          content: '';
        }
      }
    }
  }
  h4, .ivu-divider {
    color: #2b85e4;
  }
</style>
