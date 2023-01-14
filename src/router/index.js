import { createRouter, createWebHashHistory } from 'vue-router'
import store from '@/store/index'
import { AUTH_LOGOUT } from '@/store/actions/auth'

// import Login from '../views/Login'
const ifNotAuthenticated = (to, from, next) => {
  if (!store.getters.isAuthenticated) {
    next()
    console.log('Router. ifNotAuthenticated. OK. Route to: ', to)
    return
  }
  if (to.query.source) {
    if (to.query.source === 'registration') {
      store.dispatch(AUTH_LOGOUT)
    }
  }
  // console.log('Router. ifNotAuthenticated. Redirect. to:', to, 'from', from, 'next', next)
  next('/notifications-panel')
}

const ifAuthenticated = (to, from, next) => {
  if (store.getters.isAuthenticated) {
    next()
    console.log('Router. ifAuthenticated. Redirect. Route to: ', to)
    return
  }
  console.log('Router. ifAuthenticated. Redirect. Route to: /login')
  next('/login')
}

const routes = [
  {
    path: '/',
    name: 'Home',
    meta: {
      layout: 'main'
    },
    component: () => import('../views/Home.vue'),
    beforeEnter: ifAuthenticated,
    redirect: { name: 'Notifications' }
  },
  {
    path: '/login',
    name: 'login',
    meta: {
      layout: 'empty'
    },
    component: () => import('../views/Login.vue'),
    beforeEnter: ifNotAuthenticated

  },
  {
    path: '/user-registration',
    name: 'Registration',
    meta: {
      layout: 'empty'
    },
    component: () => import('../views/userRegistration')

  },
  {
    path: '/user-password-reset',
    name: 'Password reset',
    meta: {
      layout: 'empty'
    },
    component: () => import('../views/resetPassword')

  },
  {
    path: '/login-',
    name: 'Login single app',
    meta: {
      layout: 'empty'
    },
    component: () => import('../views/LoginSingleOrg')

  },
  {
    path: '/forgot-password',
    name: 'Forgot password',
    meta: {
      layout: 'empty'
    },
    component: () => import('../views/forgotPassword')

  },
  {
    path: '/notifications-panel',
    name: 'Notifications',
    meta: {
      auth: true,
      layout: 'main'
    },
    // component: Home
    component: () => import('../views/mainNotifications.vue'),
    beforeEnter: ifAuthenticated
  },
  {
    path: '/reports',
    name: 'Reports',
    meta: {
      auth: true,
      layout: 'main'
    },
    // component: Home
    component: () => import('../views/ReportsView.vue'),
    beforeEnter: ifAuthenticated
  },
  {
    path: '/status-page',
    name: 'StatusPage',
    meta: {
      auth: true,
      layout: 'main'
    },
    // component: Home
    component: () => import('../views/StatusPageView.vue'),
    beforeEnter: ifAuthenticated
  },
  {
    path: '/profile',
    name: 'Profile',
    meta: {
      auth: true,
      layout: 'main'
    },
    // component: Home
    component: () => import('../views/UserProfile_toRemove.vue'),
    beforeEnter: ifAuthenticated
  },
  {
    path: '/org-settings',
    name: 'Settings',
    meta: {
      auth: true,
      layout: 'main'
    },
    // component: Home
    component: () => import('../views/OrgSettings.vue'),
    beforeEnter: ifAuthenticated
  },
  {
    path: '/bots',
    name: 'Bots',
    meta: {
      auth: true,
      layout: 'main'
    },
    // component: Home
    component: () => import('../components/bots/botsDialog.vue'),
    beforeEnter: ifAuthenticated
  },
  {
    path: '/scenarios',
    name: 'Scenarios',
    meta: {
      auth: true,
      layout: 'main'
    },
    component: () => import('../views/scenariosMain'),
    beforeEnter: ifAuthenticated
  },
  {
    path: '/scenario-edit/:scenarioId',
    name: 'Scenario edit',
    meta: {
      auth: true,
      layout: 'main'
    },
    component: () => import('../components/scenarios/editScenario'),
    beforeEnter: ifAuthenticated
  }
]

const router = createRouter({
  // history: createWebHistory('home'),
  history: createWebHashHistory(),
  routes
})

export default router
