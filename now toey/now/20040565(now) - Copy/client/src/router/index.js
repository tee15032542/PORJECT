import { createRouter, createWebHistory } from 'vue-router'

const routes = [
  {
    path: '/',
    redirect: '/login-page',
    beforeEnter: userAuthority,
  },
  {
    path: '/home',
    beforeEnter: userAuthority,
    name: 'Home Page',
    component: () => import('../views/Home.vue'),
  },
  {
    path: '/login-page',
    name: 'Login Page',
    component: () => import('../views/LoginPage.vue'),
  },
  {
    path: '/register-page',
    name: 'Register Page',
    beforeEnter: getPath,
    component: () => import('../views/RegisterPage.vue'),
  },
]

const router = createRouter({
  history: createWebHistory('/geo-web-app'),
  routes,
})

function getPath(to, from, next) {
  console.log(from.path)
  sessionStorage.setItem('backPath', from.path)
  next()
}

function userAuthority(to, from, next) {
  console.log(from.path)
  console.log('router: ', from.userProfile)
  next()
}

router.beforeEach((to, from, next) => {
  document.title = to.name
  next()
})

export default router
