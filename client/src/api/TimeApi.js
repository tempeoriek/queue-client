import Api from '@/api/Api'

export default {
  fetch(param) {
    return Api().post('Time/fetch', param)
  }
}
