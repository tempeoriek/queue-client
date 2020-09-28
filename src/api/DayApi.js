import Api from '@/api/Api'

export default {
  fetch() {
    return Api().get('Day/fetch')
  },
  fetchAdmin() {
    return Api().get('Day/fetch_admin')
  }
}
