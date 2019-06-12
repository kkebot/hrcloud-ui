import Login from '@/pages/login'
import MainView from '@/layouts/MainView'
import RouteView from '@/layouts/RouteView'
import {hasAuthorities} from "../utils";

/**
 * configurable parameters under the routing '/'
 * hidden: true                        if `hidden:true` will not show in the sidebar, default is false
 * name:'router-name'                  must set and globally unique
 * meta : {
    auths: ['super_admin','admin']     set multiple roles, default is null
    title: 'title'                     the name show in submenu and breadcrumb, must set
    icon: 'icon-name'                  the icon show in the sidebar, must set
    href: 'url'                        redirect url
  }
 **/

const routes = [
  {
    path: '/login',
    name: 'Login',
    component: Login,
    meta: {title: '登陆'}
  },
  {
    path: "/",
    name: "Home",
    component: MainView,
    redirect: () => ({name: hasAuthorities(['ADMIN']) ? 'Dashboard' : 'UserPage'}),
    children: [
      {
        path: 'dashboard',
        name: 'Dashboard',
        component: () => import('@/pages/dashboard'),
        meta: {title: '快捷入口', icon: 'md-speedometer', authorities: ['ADMIN']},
      },
      {
        path: 'search',
        name: 'Search',
        redirect: 'search/home',
        component: RouteView,
        meta: {title: '搜索信息', icon: 'md-search'},
        children: [
          {
            name: 'SearchResult',
            path: 'result',
            component: () => import('@/pages/search/result'),
            meta: {title: '结果', icon: 'md-search'},
            hidden: true
          },
          {
            name: 'SearchHome',
            path: 'home',
            component: () => import('@/pages/search/home'),
            meta: {title: '搜索页面', icon: 'md-search'},
            hidden: true
          }
        ]
      },
      {
        path: 'organization',
        component: RouteView,
        name: 'Organization',
        redirect: 'organization/management',
        meta: {title: '行政管理', icon: 'md-people'},
        children: [
          {
            path: 'management',
            name: 'Management',
            component: () => import('@/pages/organization'),
            meta: {title: '公司架构', icon: 'md-people'},
          },
          {
            path: "department",
            name: "Department",
            component: RouteView,
            meta: {title: '部门管理', authorities: ['ADMIN']},
            hidden: true,
            children: [
              {
                path: "setup",
                name: "DepartmentSetup",
                component: () => import("@/pages/organization/department/setup"),
                meta: {title: '添加部门', authorities: ['ADMIN']},
              },
              {
                path: "update",
                name: "DepartmentUpdate",
                component: () => import("@/pages/organization/department/update"),
                meta: {title: '编辑部门', authorities: ['ADMIN']},
              },
              {
                path: ":id",
                name: "DepartmentDetails",
                component: () => import("@/pages/organization/department/details"),
                meta: {title: '部门详情'},
              }
            ]
          },
          {
            path: "position",
            name: "Position",
            component: RouteView,
            meta: {title: '岗位管理', authorities: ['ADMIN']},
            hidden: true,
            children: [
              {
                path: "setup",
                name: "PositionSetup",
                component: () => import("@/pages/organization/position/setup"),
                meta: {title: '添加岗位', authorities: ['ADMIN']},
              },
              {
                path: "update",
                name: "PositionUpdate",
                component: () => import("@/pages/organization/position/update"),
                meta: {title: '编辑岗位', authorities: ['ADMIN']},
                hidden: true,
              },
              {
                path: ":id",
                name: "PositionDetails",
                component: () => import("@/pages/organization/position/details"),
                meta: {title: '岗位详情'},
                hidden: true,
              },
            ]
          }
        ]
      },
      {
        path: 'employee',
        component: RouteView,
        redirect: 'employee/search',
        meta: {title: '员工管理', icon: 'md-person', authorities: ['ADMIN']},
        children: [
          {
            path: 'import',
            name: 'EmployeeImport',
            component: () => import('@/pages/employee/import'),
            meta: {title: '添加员工', icon: 'md-person-add', authorities: ['ADMIN']},
          },
          {
            path: 'search',
            name: 'EmployeeSearch',
            redirect: "/search/home",
            meta: {title: '搜索员工', icon: 'ios-search', authorities: ['ADMIN']},
          },
          {
            path: 'update',
            name: 'EmployeeUpdate',
            component: () => import('@/pages/employee/update'),
            meta: {title: '更新资料'},
            hidden: true,
          },
          {
            path: 'adjust',
            name: 'EmployeeAdjustment',
            component: () => import('@/pages/employee/adjustment'),
            meta: {title: '调整', authorities: ['ADMIN']},
            hidden: true,
          },
          {
            path: 'sign',
            name: 'SignContract',
            component: () => import('@/pages/employee/sign'),
            meta: {title: '签约', authorities: ['ADMIN']},
            hidden: true,
          },
          {
            path: ':id', // not /:id
            name: 'EmployeePanel',
            component: () => import('@/pages/employee/panel'),
            meta: {title: `员工面板`, authorities: ['ADMIN']},
            hidden: true
          }
        ]
      },
      {
        path: 'wage',
        component: RouteView,
        redirect: 'wage/department',
        meta: {title: '薪资管理', icon: 'ios-cash', authorities: ['ADMIN']},
        children: [
          {
            path: 'upload',
            component: RouteView,
            meta: { title: '上传薪资', icon: 'ios-cloud-upload', authorities: ['ADMIN']},
            children: [
              {
                path: 'current',
                name: 'WageUpload',
                component: () => import('@/pages/wage/month-upload'),
                meta: {title: '当月薪资', icon: 'md-document', authorities: ['ADMIN']},
              },
              {
                path: 'raw',
                name: 'RawWageUpload',
                component: () => import('@/pages/wage/raw-upload'),
                meta: {title: '原始数据', icon: 'md-hammer', authorities: ['ADMIN']},
              },
            ]
          },
          {
            path: 'department',
            name: 'WageDepartment',
            component: () => import('@/pages/wage/department'),
            meta: {title: '部门薪资', icon: 'ios-stats', authorities: ['ADMIN']},
          },
          {
            path: 'statistic',
            name: 'Statistic',
            component: RouteView,
            meta: {title: '统计数据'},
            hidden: true,
            children: [
              {
                path: 'month',
                name: 'MonthStatistic',
                component: () => import('@/pages/wage/month-statistic'),
                meta: {title: '月份统计', authorities: ['ADMIN']},
                hidden: true
              }
            ]
          },
        ]
      },
      {
        path: 'notification',
        component: RouteView,
        redirect: 'notification/list',
        meta: {title: '消息规则', icon: 'md-notifications', authorities: ['ADMIN']},
        children: [
          {
            path: 'list',
            name: 'NotificationList',
            component: () => import('@/pages/notification/notify-list'),
            meta: {title: '消息列表', icon: 'md-notifications-outline', authorities: ['ADMIN']},
          },
          {
            path: 'rules',
            name: 'RulesList',
            component: () => import('@/pages/notification/rules-list'),
            meta: {title: '规则列表', icon: 'md-notifications-outline', authorities: ['ADMIN']},
          },
          {
            path: 'setup',
            name: 'NotificationSetup',
            component: () => import('@/pages/notification/setup'),
            meta: {title: '配置规则', icon: 'md-create', authorities: ['ADMIN']},
          },
        ]
      },
      {
        path: 'user',
        component: () => import('@/pages/user-page'),
        name: 'UserPage',
        redirect: {name: 'UserProfile'},
        meta: {title: '用户页面', icon: 'md-person', authorities: ['USER']},
        children: [
          {
            path: 'profile',
            name: 'UserProfile',
            component: () => import('@/pages/user-page/Profile'),
            meta: {title: '个人资料', icon: 'md-person', authorities: ['USER']},
          },
          {
            path: 'contract',
            name: 'UserContract',
            component: () => import('@/pages/user-page/Contract'),
            meta: {title: '个人合同', icon: 'ios-create', authorities: ['USER']},
          },
          {
            path: 'adjustment',
            name: 'UserAdjustment',
            component: () => import('@/pages/user-page/Adjustment'),
            meta: {title: '历任职务', icon: 'md-book', authorities: ['USER']},
          },
          {
            path: 'wage',
            name: 'UserWage',
            component: () => import('@/pages/user-page/Wage'),
            meta: {title: '个人薪资', icon: 'md-cash', authorities: ['USER']},
          },
          {
            path: 'password',
            name: 'Password',
            component: () => import('@/pages/user-page/Password'),
            meta: {title: '重置密码', icon: 'md-lock', authorities: ['USER']},
          }
        ]
      }
      // {
      //   path: '/debug',
      //   name: 'DEBUG',
      //   component: Debug,
      //   meta: { title: 'DEBUG'},
      // },
    ]
  },
  {
    path: '/unauthorized',
    name: 'Unauthorized',
    component: () => import('@/pages/unauthorized'),
    meta: {title: '权限不足'},
    hidden: true
  },
  {
    path: '/404',
    name: '404',
    component: () => import('@/pages/404'),
    meta: {title: '404', icon: 'md-list'},
    hidden: true,
  },
  {
    path: '*',
    redirect: '/404'
  },
];

export default routes
