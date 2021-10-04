const { events } = require("brigadier")


events.on("push", () => {
  console.log(" **** I'm a GitHub 'push' handler")
})