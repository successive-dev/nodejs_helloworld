const { events, Job } = require("brigadier");

events.on("simpleevent", (e, p) => {

  var deployJob = new Job("build", "alpine");
  deployJob.storage.enabled = true;
  deployJob.tasks = [
    "cd src",
    "cp helloworld.js mnt/brigade/share/"
  ];
  deployJob.env = {
    "EVENT_TYPE": e.type
  };
  deployJob.run();


  var package = new Job("package", "localhost:5000/docker");
  package.docker.enabled = true;
  package.storage.enabled = true;

  package.tasks = [
    "cat /mnt/brigade/share/helloworld.js",
  ];

  package.run()

});