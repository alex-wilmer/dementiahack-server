
export default ({ router, dataStore }) => {
  router.post(`/registerContact`, async ctx => {
    let { userId, contact } = ctx.request.body
    if (!userId || !contact) {
      ctx.body = { success: false, error: `missing required parameters` }
      return
    }
    if (!dataStore.contacts[userId]) {
      dataStore.contacts[userId] = []
    }
    dataStore.contacts[userId] = [...dataStore.contacts[userId], contact]
    console.log(`/registerContact :: userId: ${userId}, contact: `, contact)
    ctx.body = { success: true }
  })
}
