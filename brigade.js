const { events, Job } = require("brigadier");

events.on("simpleevent", (e, p) => {

  var packageJob = new Job("package", "docker:dind");
  packageJob.privileged = true;
  packageJob.env = {
    DOCKER_DRIVER: "overlay"
  }
  packageJob.tasks = [
    "dockerd-entrypoint.sh &",
    "sleep 20",
    "docker --help",
  ];

  docker.run()

  // var deployJob = new Job("build", "alpine/helm");
  // deployJob.tasks = [
  //   "cd src",
  //   "ls -lart"
  // ];
  // deployJob.env = {
  //   "EVENT_TYPE": e.type
  // };
  // deployJob.run();
});