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

    var package = new Job("package", "docker");
    package.tasks = [
      "dockerd-entrypoint.sh &",
      "sleep 20",
      "docker ps",
    ];

    package.run()
  } catch (e) {
    console.log(e)
  }
});