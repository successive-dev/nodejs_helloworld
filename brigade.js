const { events, Job } = require("brigadier");

events.on("simpleevent", (e, p) => {

  // var deployJob = new Job("build", "alpine");
  // deployJob.tasks = [
  //   "cd src",
  //   "ls -lart"
  // ];
  // deployJob.env = {
  //   "EVENT_TYPE": e.type
  // };
  // deployJob.run();
  try {

    var packageJob = new Job("package", "docker:dind");
    packageJob.privileged = true;
    // packageJob.env = {
    //   DOCKER_DRIVER: "overlay"
    // }
    packageJob.tasks = [
      "dockerd-entrypoint.sh &",
      "sleep 20",
      "docker --help",
    ];

    packageJob.run()
  } catch (e) {
    console.log(e)
  }
});