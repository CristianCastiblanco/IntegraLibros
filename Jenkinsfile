pipeline {
    agent any

    environment {
        DOCKER_HOST = 'unix:///var/run/docker.sock'
    }

    stages {

        stage ('Clonar Repositorio'){
            steps {
                git branch: 'feature/update_pipeline' , url: 'https://github.com/CristianCastiblanco/IntegraLibros.git'
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

        
    }
}