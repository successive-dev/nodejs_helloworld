const { events, Job } = require("brigadier");
const helmUpgradeCommand = require('./HelmUpgradeCommand');
const BuildTask = require('./BuildTask');

class DeployJob {

  constructor(e, p) {
    this.e = e;
    this.p = p;
  }

  deploy(deployEnvironment, values) {
    var deployJob = new Job(`deploy-to-${deployEnvironment}`, 'localhost:5000/deployment-stage')
    deployJob.storage.enabled = true
    deployJob.tasks = [
      // TODO: there should be a cluster login function here - skipping this as of now
      "cd src",
      BuildTask.exportTag(),
      helmUpgradeCommand(values, this.p.secrets.app-name, `./helm/${this.p.secrets.app-name}`, deployEnvironment)
    ]
    return deployJob;
  }
}

module.exports = DeployJob