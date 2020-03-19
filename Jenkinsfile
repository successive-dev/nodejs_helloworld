pipeline {
  agent {
    node {
      label 'master'
    }

  }
  stages {
    stage('build build-scripts') {
      steps {
        nodejs 'node'
        sh '''#list dir contents
ls -lart

##set git config
#git config user.name \'vishu42\'
#git config user.email \'vishal.tewatia@successive.tech\'

# clone agis
git submodule add https://github.com/vishu42/agis.git

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