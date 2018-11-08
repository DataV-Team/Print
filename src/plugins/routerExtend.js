import Vue from 'vue'
import router from '../router'
import store from '../store'

import { Loading } from 'element-ui'

import { baseInfo } from '../config'

/**
 * @description           auto login
 * @return     {Promise}  Async Promise
 */
async function autoLogin () {
  const res = await sendAutoLoginReq()

  if (!res.status) return res.msg

  dealLoginReqRes(res.res)

  return true
}

/**
 * @description           send auto login request
 * @return     {Promise}  request promise
 */
function sendAutoLoginReq () {
  const { autoLoginPath } = baseInfo

  return Vue.prototype.$http.post(autoLoginPath)
}

/**
 * @description             deal login request response
 * @param      {Response}   request response
 * @return     {undefined}  no return
 */
function dealLoginReqRes (res) {
  const { _mutations: { setUserBaseInfo, updateLoginTime } } = store

  setUserBaseInfo[0](res.data)

  Vue.prototype.$notify('Success', res.msg, 'success')

  updateLoginTime[0]()
}

router.beforeEach(async ({ name }, from, next) => {
  const { state: { userBaseInfo } } = store

  if (name === 'main') {
    next()

    return
  }

  let nextStatus = true

  if (!userBaseInfo) {
    const loading = Loading.service({
      fullscreen: true,
      text: 'Loading...',
      spinner: 'el-icon-loading',
      background: 'rgba(0, 0, 0, 0.1)',
      customClass: 'loading'
    })

    nextStatus = await autoLogin()

    loading.close()
  }

  if (nextStatus === true) {
    next()
  } else {
    Vue.prototype.$notify('warn', nextStatus, 'warning')

    next('/main')
  }
})

export default function (Vue) {
  Vue.prototype.autoLogin = autoLogin
  Vue.prototype.dealLoginReqRes = dealLoginReqRes
}
