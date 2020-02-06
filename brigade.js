const { events, Job } = require("brigadier");

events.on("simpleevent", (e, p) => {  // handler for a SimpleEvent
  var echo = new Job("build", "alpine:3.8");
  echo.tasks = [
    "ls -lart"
  ];
  echo.env = {
    "EVENT_TYPE": e.type
  };
  echo.run();
});