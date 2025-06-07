pipeline {
    agent any

    enviroments {
        DOCKER_HOST = 'unix:///var/run/docker.sock'
    }

    stages['Construir Contenedores'] {
        steps {
            sh 'docker-compose build'
        }
    }

    stages['Ejecutar Pruebas'] {
        steps {
            sh 'docker-compose run --rm web_jenkins npm test'
        }
    }

    stages['Desplegar'] {
        steps {
            sh 'docker-compose up -d'
        }
    }
}