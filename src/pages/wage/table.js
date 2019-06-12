const terms = [
  {
    key: 'allowance',
    name: '津贴',
  },
  {
    key: 'salary',
    name: '基础工资',
  },
  {
    key: 'bonus',
    name: '奖金',
  },
  {
    key: 'overtimePay',
    name: '加班工资',
  },
  {
    key: 'backPay',
    name: '欠发工资',
  },
  {
    key: 'payRaise',
    name: '加薪',
  },
  {
    key: 'payCut',
    name: '减薪',
  },
]

export const getWageTerms = () => {
  return terms;
}