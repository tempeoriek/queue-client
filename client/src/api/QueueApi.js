import Api from '@/api/Api'

export default {
  bookVip(param) {
    return Api().post('Queue/book_vip', param)
  },
  bookGuest(param) {
    return Api().post('Queue/book_guest', param)
  },
  fetch(param) {
    return Api().post('Queue/fetch', param)
  },
  pickDay(param) {
    return Api().post('Queue/pick_day', param)
  }/* ,
  testApi(param) {
    return Api().post('Queue/test_api', param)
  } */
}