
export default ({ router, dataStore }) => {
  router.get(`/listContacts/:userId`, async ctx => {
    let { userId } = ctx.params
    if (!userId) {
      ctx.body = { success: false, error: `missing userId` }
      return
    }
    if (!dataStore.users[userId]) {
      ctx.body = { success: false, error: `user does not exist` }
      return
    }
    let { contacts } = dataStore.users[userId]
    console.log(`/listContacts :: userId: ${userId}, contacts: ${contacts}`)
    ctx.body = { contacts }
  })
}
