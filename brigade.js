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

    var package = new Job("package", "localhost:5000/docker");
    package.docker.enabled = true

    package.tasks = [
      "docker images",
    ];

    package.run()
  } catch (e) {
    console.log(e)
  }
});