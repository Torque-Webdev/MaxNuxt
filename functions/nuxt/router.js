import Vue from 'vue'
import Router from 'vue-router'
import { normalizeURL, decode } from 'ufo'
import { interopDefault } from './utils'
import scrollBehavior from './router.scrollBehavior.js'

const _0eedc512 = () => interopDefault(import('../pages/dashboard.vue' /* webpackChunkName: "pages/dashboard" */))
const _6d516eba = () => interopDefault(import('../pages/dashboard/index.vue' /* webpackChunkName: "pages/dashboard/index" */))
const _51967086 = () => interopDefault(import('../pages/dashboard/calendar.vue' /* webpackChunkName: "pages/dashboard/calendar" */))
const _6514ad8c = () => interopDefault(import('../pages/dashboard/gallery.vue' /* webpackChunkName: "pages/dashboard/gallery" */))
const _2ec8dc3d = () => interopDefault(import('../pages/dashboard/gallery/index.vue' /* webpackChunkName: "pages/dashboard/gallery/index" */))
const _72fe5c8f = () => interopDefault(import('../pages/dashboard/gallery/circuits.vue' /* webpackChunkName: "pages/dashboard/gallery/circuits" */))
const _2107427d = () => interopDefault(import('../pages/dashboard/gallery/videos.vue' /* webpackChunkName: "pages/dashboard/gallery/videos" */))
const _862e7ba2 = () => interopDefault(import('../pages/dashboard/pages/index.vue' /* webpackChunkName: "pages/dashboard/pages/index" */))
const _4a9f8c8c = () => interopDefault(import('../pages/dashboard/Pages.vue' /* webpackChunkName: "pages/dashboard/Pages" */))
const _15e1593b = () => interopDefault(import('../pages/dashboard/posts.vue' /* webpackChunkName: "pages/dashboard/posts" */))
const _5828b811 = () => interopDefault(import('../pages/dashboard/profile.vue' /* webpackChunkName: "pages/dashboard/profile" */))
const _2633443a = () => interopDefault(import('../pages/dashboard/video.vue' /* webpackChunkName: "pages/dashboard/video" */))
const _cec5a1fa = () => interopDefault(import('../pages/dashboard/pages/marketing.vue' /* webpackChunkName: "pages/dashboard/pages/marketing" */))
const _6c9f3041 = () => interopDefault(import('../pages/dashboard/pages/media.vue' /* webpackChunkName: "pages/dashboard/pages/media" */))
const _e772a044 = () => interopDefault(import('../pages/dashboard/pages/partners.vue' /* webpackChunkName: "pages/dashboard/pages/partners" */))
const _4d70f4ba = () => interopDefault(import('../pages/f3.vue' /* webpackChunkName: "pages/f3" */))
const _8c945528 = () => interopDefault(import('../pages/fanclub.vue' /* webpackChunkName: "pages/fanclub" */))
const _6eca8d4c = () => interopDefault(import('../pages/login.vue' /* webpackChunkName: "pages/login" */))
const _07d7e409 = () => interopDefault(import('../pages/marketing.vue' /* webpackChunkName: "pages/marketing" */))
const _54d95847 = () => interopDefault(import('../pages/media.vue' /* webpackChunkName: "pages/media" */))
const _7561a280 = () => interopDefault(import('../pages/news.vue' /* webpackChunkName: "pages/news" */))
const _13fe4218 = () => interopDefault(import('../pages/partners.vue' /* webpackChunkName: "pages/partners" */))
const _3ced7e68 = () => interopDefault(import('../pages/profile.vue' /* webpackChunkName: "pages/profile" */))
const _132214f0 = () => interopDefault(import('../pages/post/_slug.vue' /* webpackChunkName: "pages/post/_slug" */))
const _b5ba2b96 = () => interopDefault(import('../pages/index.vue' /* webpackChunkName: "pages/index" */))

const emptyFn = () => {}

Vue.use(Router)

export const routerOptions = {
  mode: 'history',
  base: '/',
  linkActiveClass: 'nuxt-link-active',
  linkExactActiveClass: 'nuxt-link-exact-active',
  scrollBehavior,

  routes: [{
    path: "/dashboard",
    component: _0eedc512,
    children: [{
      path: "",
      component: _6d516eba,
      name: "dashboard"
    }, {
      path: "calendar",
      component: _51967086,
      name: "dashboard-calendar"
    }, {
      path: "gallery",
      component: _6514ad8c,
      children: [{
        path: "",
        component: _2ec8dc3d,
        name: "dashboard-gallery"
      }, {
        path: "circuits",
        component: _72fe5c8f,
        name: "dashboard-gallery-circuits"
      }, {
        path: "videos",
        component: _2107427d,
        name: "dashboard-gallery-videos"
      }]
    }, {
      path: "pages",
      component: _862e7ba2,
      name: "dashboard-pages"
    }, {
      path: "Pages",
      component: _4a9f8c8c,
      name: "dashboard-Pages"
    }, {
      path: "posts",
      component: _15e1593b,
      name: "dashboard-posts"
    }, {
      path: "profile",
      component: _5828b811,
      name: "dashboard-profile"
    }, {
      path: "video",
      component: _2633443a,
      name: "dashboard-video"
    }, {
      path: "pages/marketing",
      component: _cec5a1fa,
      name: "dashboard-pages-marketing"
    }, {
      path: "pages/media",
      component: _6c9f3041,
      name: "dashboard-pages-media"
    }, {
      path: "pages/partners",
      component: _e772a044,
      name: "dashboard-pages-partners"
    }]
  }, {
    path: "/f3",
    component: _4d70f4ba,
    name: "f3"
  }, {
    path: "/fanclub",
    component: _8c945528,
    name: "fanclub"
  }, {
    path: "/login",
    component: _6eca8d4c,
    name: "login"
  }, {
    path: "/marketing",
    component: _07d7e409,
    name: "marketing"
  }, {
    path: "/media",
    component: _54d95847,
    name: "media"
  }, {
    path: "/news",
    component: _7561a280,
    name: "news"
  }, {
    path: "/partners",
    component: _13fe4218,
    name: "partners"
  }, {
    path: "/profile",
    component: _3ced7e68,
    name: "profile"
  }, {
    path: "/post/:slug?",
    component: _132214f0,
    name: "post-slug"
  }, {
    path: "/",
    component: _b5ba2b96,
    name: "index"
  }],

  fallback: false
}

export function createRouter (ssrContext, config) {
  const base = (config._app && config._app.basePath) || routerOptions.base
  const router = new Router({ ...routerOptions, base  })

  // TODO: remove in Nuxt 3
  const originalPush = router.push
  router.push = function push (location, onComplete = emptyFn, onAbort) {
    return originalPush.call(this, location, onComplete, onAbort)
  }

  const resolve = router.resolve.bind(router)
  router.resolve = (to, current, append) => {
    if (typeof to === 'string') {
      to = normalizeURL(to)
    }
    return resolve(to, current, append)
  }

  return router
}
