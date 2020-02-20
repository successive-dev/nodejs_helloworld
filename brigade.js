const { events, Job } = require("brigadier");
const { BuildTask, PackageJob, DeployJob, Events } = require("./agis")

class Pipeline {

  constructor(e, p) {
    this.e = e;
    this.p = p;
  }

  build() {
    var buildJob = new Job("build", "localhost:5000/node");
    buildJob.storage.enabled = true;
    buildJob.shell = '/bin/bash';
    buildJob.tasks = [
      "cd src",
      "ls -lart",
      "git tag -l",
      "git config --global credential.helper 'store --file .git-credentials'",
      `echo 'https://vishu42:VC,,%,{nNUeY3&2U@github.com' > .git-credentials`,
      `git remote add origin ${this.p.repo.cloneURL}`,
      "git config user.name 'vishu42'",
      "git config user.email 'vishal.tewatia@successive.tech'",
      "git config --list",
      BuildTask.fetchTagBumpItAndPushIt(),
      BuildTask.tarBuild(),
      BuildTask.moveTarsToSharedDir(),
    ];
    return buildJob
  }

  deployTo(deployEnv) {
    // Deployment envs
    values = {
      node_env: 'dev',
      image: {
        repository: `localhost:5000/${this.p.secrets.appName}`,
        tag: `$APP_VER`,
      }
    }
    return new DeployJob(this.e, this.p).deploy(deployEnv, values);
  }
}

Events.onPush(async (e, p) => {
  const pipeline = new Pipeline(e, p)
  await pipeline.build().run()
  await PackageJob.pack('localhost:5000', p.secrets.appName).run();
  await pipeline.deployTo(`kube-ecosystem01-dev`).run();
})

// Events.onDeploy(async (e, p) => {
//   await deployTo(e, p, `kube-ecosystem01-test`).run();
// })


