const { events, Job } = require("brigadier");
const BuildTask = require("./BuildTask");

class PackageJob {
  static pack(reg, name, file = 'Dockerfile') {
    var packageJob = new Job("package", "localhost:5000/docker");
    packageJob.docker.enabled = true;
    packageJob.storage.enabled = true;
    packageJob.tasks = [
      `mkdir /app && cd /app`, // set /app as working dir
      BuildTask.restoreBuild(),
      BuildTask.exportTag(),
      "echo $APP_SEM_VER",
      `docker build -f ${file} . -t ${reg}/${name}:$APP_SEM_VER`,
      `docker push ${reg}/${name}:APP_SEM_VER`,
    ];
    return packageJob;
  }
}

module.exports = PackageJob