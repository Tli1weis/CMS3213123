import { TOKEN } from '@/types/constants';
import { myLocalStorage } from '@/utils/MyStorage';
import { firstMenu } from '@/utils/mapMenuToRoute';
import { createRouter, createWebHashHistory } from 'vue-router';

const router = createRouter({
  history: createWebHashHistory(),
  routes: [
    {
      path: '/',
      redirect: '/main',
    },
    {
      path: '/main',
      name: 'main',
      component: () => import('../views/Main/index.vue'),
    },
    {
      path: '/login',
      component: () => import('../views/Login/index.vue'),
    },
    {
      path: '/:pathMatch(.*)',
      component: () => import('../views/NotFound/index.vue'),
    },
  ],
});

router.beforeEach((to) => {
  const token = myLocalStorage.get(TOKEN);
  if (to.path.startsWith('/main') && !token) return '/login';
  if (to.path === '/main') return firstMenu?.url;
});
export default router;
