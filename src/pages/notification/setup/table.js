const employee = {
  text: "员工",
  primary: 'id',
  columns: [
    {
      name: 'id',
      hidden: true
    },
    {
      name: 'name',
      text: '姓名'
    },
    {
      name: 'birth',
      text: '出生日期'
    },
    {
      name: 'main_position_id',
      text: '职务',
      join: {
        table: 'position',
        key: 'id'
      }
    },
    {
      name: 'administration_id',
      text: '所属部门',
      join: {
        table: 'department',
        key: 'id'
      }
    },
    {
      name: 'scale_id',
      text: '薪资级别',
      join: {
        table: 'pay_scale',
        key: 'id'
      }
    },
  ]
};

const position = {
  text: "岗位",
  primary: 'id',
  columns: [
    {
      name: 'id',
      hidden: true
    },
    {
      name: 'name',
      text: '名称'
    },
    {
      name: 'administration_id',
      text: '所属部门',
      join: {
        table: 'department',
        key: 'id'
      }
    },
    {
      name: "expected_count",
      text: "编制人数",
    },
    {
      name: "actual_count",
      text: "当前人数",
    },
    {
      name: "type",
      text: "岗位类型",
    },
    {
      name: "last_normal",
      text: "上次满编时间",
    },
    {
      name: "created_at",
      text: "设立时间",
    }
  ]
};

const pay_scale = {
  text: "薪资级别",
  primary: 'id',
  columns: [
    {
      name: 'id',
      hidden: true
    },
    {
      name: 'grade',
      text: '级别'
    },
    {
      name: 'salary',
      text: '基础薪资',
    }
  ]
};

const contract = {
  text: "合同",
  primary: 'id',
  columns: [
    {
      name: 'id',
      hidden: true
    },
    {
      name: 'employee_id',
      text: '所属员工',
      join: {
        table: 'employee',
        key: 'id'
      }
    },
    {
      name: 'description',
      text: '描述'
    },
    {
      name: 'effective_on',
      text: '起始时间'
    },
    {
      name: 'effective_until',
      text: '到期时间'
    },
  ]
};

const contract_renew = {
  text: "合同续约",
  primary: 'id',
  columns: [
    {
      name: 'original_term',
      text: '原到期时间'
    },
    {
      name: 'renew_term',
      text: '新到期时间'
    },
    {
      name: 'employee_id',
      text: '所属员工',
      join: {
        table: 'employee',
        key: 'id'
      }
    },
    {
      name: 'effective_on',
      text: '生效时间'
    },
    {
      name: 'path',
      text: '审批文件'
    },
  ]
}

const department = {
  text: "部门",
  primary: 'id',
  columns: [
    {
      name: 'id',
      hidden: true
    },
    {
      name: 'name',
      text: '名称'
    },
    {
      name: 'prefix',
      text: '前缀'
    },
    {
      name: 'created_at',
      text: '设立日期'
    },
    {
      name: 'administration_id',
      text: '上级',
      join: {
        table: 'department',
        key: 'id'
      }
    }
  ]
};

const wage_record = {
  text: "薪资记录",
  primary: 'id',
  columns: [
    {
      name: 'id',
      hidden: true
    },
    {
      name: 'period',
      text: '月份',
    },
    {
      name: 'employee_id',
      text: '所有者',
      join: {
        table: 'employee',
        key: 'id'
      }
    },
    {
      name: 'current_scale_id',
      text: '当时薪资级别',
      join: {
        table: 'pay_scale',
        key: 'id'
      }
    },
    {
      name: 'current_position_id',
      text: '时任职务',
      join: {
        table: 'position',
        key: 'id'
      }
    },
  ]
};

const database = {
  employee, position, department, wage_record, pay_scale, contract, contract_renew
};

export const getTables = () => {
  return Object.keys(database).map(name => ({...database[name], name}))
};

export const getDatabase = () => {
  return database
};
