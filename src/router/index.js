import { createRouter, createWebHashHistory } from 'vue-router'
import Home from '../views/Home.vue'
import Signup from '../views/Signup.vue'
import Logs from '../views/Logs.vue'
import Pairing from '../views/Pairing.vue'


const router = createRouter({
  history: createWebHashHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home,
      meta: {
        title: 'Home'
      }
    },
    {
      path: '/pairing',
      name: 'Pairing',
      component: Pairing,
      meta: {
        title: 'Pairing'
      }
    },
    {
      path: '/signup',
      name: 'Signup',
      component: Signup,
      meta: {
        title: 'Signup'
      }
    },
    {
      path: '/logs',
      name: 'Logs',
      component: Logs,
      meta: {
        title: 'Logs'
      },
    },
  ]
})

const DEFAULT_TITLE = 'TITLE';

router.afterEach((to) => {
  document.title = to.meta.title ?? DEFAULT_TITLE
})

export default router
