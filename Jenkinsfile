pipeline {
    agent any

    environment {
        DOCKER_HOST = 'unix:///var/run/docker.sock'
    }

    stages {
        stage ('Construir Contenedores'){
            steps {
                sh 'sudo apt install docker-compose -y'
                sh 'docker-compose build'
            }
        }

        stage ('Ejecutar Pruebas') {
            steps {
                sh 'docker-compose run npm test'
            }
        }

        stage ('Desplegar') {
            steps {
                sh 'docker-compose up -d'
            }
        }
    }
}