pipeline {
    agent any

    environment {
        DOCKER_HOST = 'unix:///var/run/docker.sock'
    }

    stages {

        stage ('Clonar Repositorio'){
            steps {
                git branch: 'feature/*' , url: 'https://github.com/CristianCastiblanco/IntegraLibros.git'
            }
        }

        stage ('Construir Contenedores'){
            steps {
                sh 'docker-compose up -d --build'
            }
        }

        stage ('Ejecutar Pruebas') {
            steps {
                dir('test') {
                    sh 'node test.js'
                }
            }
        }

        stage ('Desplegar') {
            steps {
                sh 'docker-compose up -d'
            }
        }
    }
}