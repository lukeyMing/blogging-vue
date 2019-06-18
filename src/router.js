import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'
import HeaderNav from './components/HeaderNav.vue'
import BackNav from './components/BackNav.vue'

Vue.use(Router);

const CategoryPost = () => import('./views/CategoryPost.vue');
const TagPost = () => import('./views/TagPost.vue');
const UserProfile = () => import('./views/UserProfile.vue');
const Search = () => import('./views/Search.vue');
const Login = () => import('./views/Login.vue');


// admin
const AdminHome = () => import('./views/admin/Home.vue')


const routes = [
    {
      path: '/',
      name: 'home',
      components: {nav:HeaderNav, body:Home},
      meta: {
        title: 'WeedingJKL'
      }
    },
    {
        path: '/login',
        name: 'login',
        components: {body:Login},
        meta: {
            title: 'sign in'
        }
    },
    {
        path: '/search',
        name: 'search',
        components: {nav:BackNav, body:Search},
        meta: {
            title: 'search'
        }
    },
    {
      path: '/category/post',
      name: 'categoryPost',
      components: {nav:HeaderNav, body:CategoryPost},
      meta: {
        title: 'category post'
      }
    },
    {
      path: '/tag/post',
      name: 'tagPost',
      components: {nav:HeaderNav, body:TagPost},
      meta: {
        title: 'tag post'
      }
    },
    {
      path: '/user/profile',
      name: 'userProfile',
      components: {nav:HeaderNav, body:UserProfile},
      meta: {
        title: 'user profile'
      }
    },
    {
        path: '/admin',
        name: 'admin',
        components: {nav:HeaderNav, body:AdminHome},
        meta: {
            title: 'Admin manage'
        }
    },
];



const router = new Router({
    mode: 'history',
    routes
});

router.beforeEach((to, from, next) => {
  const title = to.meta && to.meta.title;
  if (title) {
    document.title = title
  }
  next();
});

export {
  router
};