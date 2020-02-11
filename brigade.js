const { events, Job } = require("brigadier");
const agis = require("./agis")

events.on("simpleevent", async (e, p) => {

  var buildJob = new Job("build", "localhost:5000/node");
  buildJob.storage.enabled = true;
  buildJob.shell = '/bin/bash';
  buildJob.tasks = [
    "cd src",
    "ls -lart",
    "git tag -l",
    "git config --global credential.helper 'store --file .git-credentials'",
    `echo 'https://vishu42:b35008611262b3a693ba36d992c62b3625a3e971@gitea-tooling.az.devops.gdpdentsu.net' > .git-credentials`,
    "git remote -v",
    agis.fetchTagBumpItAndPushIt(),
    agis.tarSharedDir(),
  ];

  await buildJob.run();
  await agis.packageJob('localhost:5000', 'helloworldapp').run()
});