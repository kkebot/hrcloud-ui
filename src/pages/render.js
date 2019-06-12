export const entityText = (e) => {
  return !!e ? `${e.name}(${e.id})` : '/';
}

export const scaleText = (scale) => {
  return !!scale ? `￥${scale.salary}(${scale.id})` : '/'
};

export const employeeStatusText = (status) => {
  return !!status ? '在职' : '离职'
};

export const departmentStatusText = (status) => {
  return !!status ? '正在生效' : '已撤销'
};

export const contractStatusText = (status) => {
  return !!status ? '正在生效' : '已终止'
}

export const positionStatusText = departmentStatusText;

export const dateText = (ds) => {
  return new Date(ds).toLocaleString()
};

export const monthText = (ds) => {
  const dateObj = new Date(ds);
  const month = dateObj.getUTCMonth() + 1; //months from 1-12
  const year = dateObj.getUTCFullYear();

  return year + "年 " + month + "月"
};

export const genderText = (g) => {
  return g === 'M' ? '男' : '女'
};
