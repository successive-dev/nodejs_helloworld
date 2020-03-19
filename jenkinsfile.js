var { Scriptor, BuildTask } = require('./agis/src')

const buildTasks = new BuildTask("e", "p")

new Scriptor([
  "ls", 
  "pwd",
  buildTasks.addAndPushExportedTag()
]).script()
