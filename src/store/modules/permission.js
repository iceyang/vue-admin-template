import router from '@/router'
import { asyncRoutes, constantRoutes, NOT_FOUND_ROUTE } from '@/router'

function filterAsyncRoutes(routes, menus) {
  const res = []
  for (const route of routes) {
    const name = route.meta.name
    for (const menu of menus) {
      if (menu.name !== name) continue
      const children = menu.children
      if (children && children.length > 0) {
        route.children = filterAsyncRoutes(route.children, children)
      }
      res.push(route)
      break
    }
  }
  return res
}

const state = {
  routes: [],
  addRoutes: []
}

const mutations = {
  SET_ROUTES: (state, routes) => {
    state.addRoutes = routes
    state.routes = constantRoutes.concat(routes)
    console.log(NOT_FOUND_ROUTE)
    router.addRoutes([].concat(routes, NOT_FOUND_ROUTE))
  }
}

const actions = {
  generateRoutes({ commit }, menus) {
    return new Promise(resolve => {
      const accessedRoutes = filterAsyncRoutes(asyncRoutes, menus)
      commit('SET_ROUTES', accessedRoutes)
      resolve(accessedRoutes)
    })
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
