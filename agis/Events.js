const { events } = require("brigadier");

class Events {
  static onPush(fn) {
    events.on("simpleevent", async (e, p) => {
      payload = JSON.parse(e.payload)
      if (payload.event === 'push') {
        await fn(e, p);
      }
    })
  }
  static onDeploy(fn) {
    events.on("simpleevent", async (e, p) => {
      payload = JSON.parse(e.payload)
      if (payload.event === 'deploy') {
        await fn(e, p);
      }
    })
  }
}

module.exports = Events
