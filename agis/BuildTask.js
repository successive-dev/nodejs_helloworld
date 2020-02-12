class BuildTask {

  static tarSharedDir() {
    return `tar -cf sharedDir.tar ${SHARED_DIR}\n`
  }

  static tarBuild(exclusion = ".git", tarName = 'build.tar') {
    return `tar --exclude="${exclusion}" -cf ${tarName} *\n`
  }

  static moveTarsToSharedDir() {
    return `mv *.tar ${SHARED_DIR}`
  }

  static restoreBuild(tarName = 'build.tar') {
    return `tar -xf ${SHARED_DIR}/${tarName}\n`
  }

  static fetchLatestGitTag() {
    return [
      `git tag -l | tail -n 1 > echo > ${SHARED_DIR}/APP_SEM_VER.txt`,
      `echo Current Tag is && cat ${SHARED_DIR}/APP_SEM_VER.txt`
    ].join('\n')
  }

  static exportTag() {
    return `export APP_VER=$(cat ${SHARED_DIR}/APP_SEM_VER.txt)\n`
  }

  static bumpTag(VERSION_INDEX = 2) {
    return [
      `IFS='.' read -ra APP_VER_TOKENIZED <<<"$APP_VER"`,
      `APP_VER_TOKENIZED[${VERSION_INDEX}]=$(( APP_VER_TOKENIZED[${VERSION_INDEX}] + 1))`,
      'APP_VER=${APP_VER_TOKENIZED[0]}.${APP_VER_TOKENIZED[1]}.${APP_VER_TOKENIZED[2]}',
      `echo $APP_VER > ${SHARED_DIR}/APP_SEM_VER.txt`,
      `echo Bumped Tag is && cat ${SHARED_DIR}/APP_SEM_VER.txt`
    ].join("\n")
  }

  static addAndPushExportedTag() {
    return [
      `git tag $APP_VER`,
      `git push --tags`,
    ].join("\n")
  }

  static fetchTagBumpItAndPushIt() {
    return [
      this.fetchLatestGitTag(),
      this.exportTag(),
      this.bumpTag(),
      this.addAndPushExportedTag()
    ].join("\n")
  }
}

BuildTask.SHARED_DIR = '/mnt/brigade/share';

module.exports = BuildTask