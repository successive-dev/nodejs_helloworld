const { events, Job } = require("brigadier");
const { BuildTask, PackageJob, DeployJob, Events } = require("./agis")

Events.onPush(async (e, p) => {
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

  // Deployment envs
  values = {
    node_env: 'dev',
    image: {
      repository: `localhost:5000/${p.secrets.appName}`,
      tag: `$APP_VER`,
    }
  }

  await buildJob.run();
  await PackageJob.pack('localhost:5000', p.secrets.appName).run();
  await new DeployJob(e, p).deploy(`kube-ecosystem01-dev`, values).run();
})

events.on("simpleevent", async (e, p) => {
  payload = JSON.parse(e.payload);
  if (payload.event == 'deploy') {
    await new DeployJob(e, p).deploy(e.payload.deployTo, values).run()
  }
})

