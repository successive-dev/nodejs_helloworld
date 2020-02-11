const { events, Job } = require("brigadier");
const agis = require("./agis")

events.on("simpleevent", async (e, p) => {

  var buildJob = new Job("build", "localhost:5000/node");
  buildJob.storage.enabled = true;
  buildJob.defaultShell = '/bin/bash';
  buildJob.tasks = [
    "cd src",
    agis.fetchTagBumpItAndPushIt(),
    agis.tarSharedDir(),
  ];

  await buildJob.run();
  await agis.packageJob('localhost:5000', 'helloworldapp').run()
});