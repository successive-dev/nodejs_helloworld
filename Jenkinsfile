pipeline {
  agent {
    node {
      label 'master'
    }

  }
  stages {
    stage('build build-scripts') {
      steps {
        sh '''# clone agis
git pull https://github.com/vishu42/agis.git

# install agis deps in its dir
cd agis
npm i
cd ..

# execute jenkins.js to build shell script
node jenkinsfile.js

# see the resulting script file
cat script.sh
 '''
      }
    }

  }
}