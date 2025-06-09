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
                sh '''RANDOM_NUMBER=$(shuf -i 1-10000 -n 1 | head -c 4)
                export CONTAINER_NAME_SUFFIX=$RANDOM_NUMBER
                docker-compose up -d --build'''
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