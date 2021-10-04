const { events, Job } = require("brigadier")


events.on("push", () => {

  var job = new Job("job1", "node:12")
  job.tasks = [
    "echo hello-world"
  ]

  job.run()
})