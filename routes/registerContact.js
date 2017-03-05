
export default ({ router, dataStore }) => {
  router.post(`/registerContact`, async ctx => {
    let { userId, contact } = ctx.request.body
    if (!userId || !contact) {
      ctx.body = { success: false, error: `missing required parameters` }
      return
    }
    if (!dataStore.users[userId]) {
      ctx.body = { success: false, error: `user does not exist yet` }
      return
    }
    let contacts = [...dataStore.users[userId].contacts, contact]
    dataStore.users[userId] = { ...dataStore.users[userId], contacts }
    console.log(`/registerContact :: userId: ${userId}, user: `, dataStore.users[userId])
    ctx.body = { success: true }
  })
}
