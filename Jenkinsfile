pipeline {
  agent {
    node {
      label 'master'
    }

  }
  stages {
    stage('build build-scripts') {
      steps {
        sh '''#remove existing agis if it does
rm -rf agis

# clone agis
git pull https://github.com/vishu42/agis.git --allow-unrelated-histories

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