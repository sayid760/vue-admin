const getters = {
  user: state => state.user.user,
  name: state => state.user.name,
  avatar: state => state.user.avatar,
  roles: state => state.user.roles,
  permission_routers: state => state.permission.routers,
  addRouters: state => state.permission.addRouters,
  dateList: state => state.common.dateList
}
export default getters
