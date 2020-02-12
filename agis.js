const SHARED_DIR = '/mnt/brigade/share'

function tarSharedDir() {
  return `tar -cf sharedDir.tar ${SHARED_DIR}\n`
}

function tarCurrentDir() {
  return `tar -cf currentDir.tar *\n`
}

function moveTarsToSharedDir() {
  return `mv *.tar ${SHARED_DIR}`
}

function restoreSharedDir() {
  return `tar -xf ${SHARED_DIR}\n`
}

function fetchLatestGitTag() {
  return [
    `git tag -l | tail -n 1 > echo > ${SHARED_DIR}/APP_SEM_VER.txt`,
    `echo Current Tag is && cat ${SHARED_DIR}/APP_SEM_VER.txt`
  ].join('\n')
}

function exportTag() {
  return `export APP_VER=$(cat ${SHARED_DIR}/APP_SEM_VER.txt)\n`
}

function bumpTag(VERSION_INDEX = 2) {
  return [
    `IFS='.' read -ra APP_VER_TOKENIZED <<<"$APP_VER"`,
    `APP_VER_TOKENIZED[${VERSION_INDEX}]=$(( APP_VER_TOKENIZED[${VERSION_INDEX}] + 1))`,
    'APP_VER=${APP_VER_TOKENIZED[0]}.${APP_VER_TOKENIZED[1]}.${APP_VER_TOKENIZED[2]}',
    `echo $APP_VER > ${SHARED_DIR}/APP_SEM_VER.txt`,
    `echo Bumped Tag is && cat ${SHARED_DIR}/APP_SEM_VER.txt`
  ].join("\n")
}

function addAndPushExportedTag() {
  return [
    `git tag $APP_VER`,
    `git push --tags`,
  ].join("\n")
}

function fetchTagBumpItAndPushIt() {
  return [
    fetchLatestGitTag(),
    exportTag(),
    bumpTag(),
    addAndPushExportedTag()
  ].join("\n")
}

function packageJob(reg, name) {

  var packageJob = new Job("package", "localhost:5000/docker");
  packageJob.docker.enabled = true;
  packageJob.storage.enabled = true;

  packageJob.tasks = [
    "cd src",
    restoreSharedDir(),
    `docker build . -t ${reg}:${name}`,
    `docker push ${reg}:${name}`,
  ];

  return packageJob;
}

module.exports = {
  tarSharedDir,
  restoreSharedDir,
  packageJob,
  fetchTagBumpItAndPushIt,
  fetchLatestGitTag,
  bumpTag
}
