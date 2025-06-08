pipeline {
    agent any

    enviroments {
        DOCKER_HOST = 'unix:///var/run/docker.sock'
    }

    stages {
        stage ('Construir Contenedores'){
            steps {
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