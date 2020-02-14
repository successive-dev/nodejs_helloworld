function helmUpgradeCommand(values, release, chart) {
  let command = "helm upgrade --install \\\n";
  for (i in values) {
    command += `--set ${i}=${values[i]} \\\n`
  }
  command += `${release} ${chart}`
  console.log(command)
}

module.export = helmUpgradeCommand