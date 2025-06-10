pipeline {
    agent any

    environment {
        DOCKER_HOST = 'unix:///var/run/docker.sock'
    }

    stages {

        stage ('Clonar Repositorio'){
            steps {
                git branch: 'staging' , url: 'https://github.com/CristianCastiblanco/IntegraLibros.git'
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