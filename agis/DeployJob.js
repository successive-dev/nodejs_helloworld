const { events, Job } = require("brigadier");
const helmUpgradeCommand = require('./HelmUpgradeCommand');

class DeployJob {
  static deploy(deployEnvironment, values) {
    var deployJob = new Job(`deploy-to-${deployEnvironment}`, 'localhost:5000/deployment-stage')
    deployJob.storage.enabled = true
    deployJob.tasks = [
      // TODO: there should be a cluster login function here - skipping this as of now
      helmUpgradeCommand(values, 'rel', 'chart', )
    ]
  }
}