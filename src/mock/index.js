// import Mock from 'mockjs'
// import login from './login'
// import dashboard from './dashboard'
// import department from './department'
// import employee from './employee'
// import position from './position'
//
// // configure the Ajax request latency
// Mock.setup({
//   timeout: 200
// });
//
// // login
// Mock.mock(/\/login\/login/, 'post', login.login);
// Mock.mock(/\/login\/logout/, 'post', login.logout);
// Mock.mock(/\/login\/info\.*/, 'get', login.getUserInfo);
//
// Mock.mock(/\/api\/department$/, 'get', department.getHeadOfficeApi);
// Mock.mock(/\/api\/department\/[0-9]+/, 'get', department.getDepartmentApi);
// Mock.mock(/\/api\/department\/[0-9]+/, 'post', department.setupDepartmentApi);
// Mock.mock(/\/api\/department\/[0-9]+/, 'put', department.updateDepartmentApi);
// Mock.mock(/\/api\/department\/[0-9]+/, 'delete', department.shutdownDepartmentApi);
//
// Mock.mock(/\/api\/employee\?/, 'get', employee.queryEmployeesApi);
//
// Mock.mock(/\/api\/position$/, 'post', position.setupPositionApi);
// Mock.mock(/\/api\/position\/[0-9]+/, 'put', position.updatePositionApi);
// Mock.mock(/\/api\/position\/[0-9]+/, 'delete', position.cancelPositionApi);
//
// // dashboard
// Mock.mock(/\/sys\/log\/count/, 'get', dashboard.sysLogCount);
//
// export default Mock
