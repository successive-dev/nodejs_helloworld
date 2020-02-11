const { events, Job } = require("brigadier");
const agis = require("./agis")

events.on("simpleevent", async (e, p) => {

  var buildJob = new Job("build", "alpine");
  buildJob.storage.enabled = true;
  buildJob.tasks = [
    "cd src",
    agis.fetchTagBumpItAndPushIt(),
    agis.tarSharedDir(),
  ];

  await deployJob.run();
  await agis.packageJob('localhost:5000').run()
});