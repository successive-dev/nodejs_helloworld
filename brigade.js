const { events, Job } = require("brigadier");
const { BuildTask, PackageJob } = require("./agis")

events.on("simpleevent", async (e, p) => {

  var buildJob = new Job("build", "localhost:5000/node");
  buildJob.storage.enabled = true;
  buildJob.shell = '/bin/bash';
  buildJob.tasks = [
    "cd src",
    "ls -lart",
    "git tag -l",
    "git config --global credential.helper 'store --file .git-credentials'",
    `echo 'https://vishu42:VC,,%,{nNUeY3&2U@github.com' > .git-credentials`,
    `git remote add origin ${p.repo.cloneURL}`,
    "git config user.name 'vishu42'",
    "git config user.email 'vishal.tewatia@successive.tech'",
    "git config --list",
    BuildTask.fetchTagBumpItAndPushIt(),
    BuildTask.tarBuild(),
    BuildTask.moveTarsToSharedDir(),
  ];

  var deployJob = new Job('deploy', 'localhost:5000/deployment-stage');
  deployJob.storage.enabled = true;
  deployJob.tasks = [
    "helm ls",
  ]
  await buildJob.run();
  await PackageJob.pack('localhost:5000', 'helloworldapp').run();
  await deployJob.run();
});