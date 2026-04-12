@Library('Jenkins-Shared-Library') _
pipeline{
    agent {label "local"}
    stages{
        stage('Checkout'){
            steps{
                echo "Cloning repo from GitHub"
                git url: 'https://github.com/ruchitb19/LavishEscapes.git', branch: 'main'
                echo " Cloning Successful"
            }
        }
        stage('Setup Env'){
            steps{
                echo "Setting Up env file."
                withCredentials([file(credentialsId:"lavishescapes-env", variable:"ENV_FILE")]){
                sh 'em -f backend/.env && cp $ENV_FILE backend/.env'
                }
                echo " ENV file setup Successful"
            }
        }
        stage('Docker Build'){
            steps{
                echo "Building Docker images"
                sh "docker compose build"
                echo " Docker Build Successful"
            }
        }
        stage('Docker Run'){
            steps{
                echo "Starting containers"
                sh "docker compose up -d"
                echo " Docker Containers Running"
            }
        }
        stage('Docker login'){
            steps{
                dockerlogin("docker-credentials")
                echo " Docker Login Successful"
            }
        }
        stage('Docker push'){
           steps{
            echo "Pushing images to Docker Hub."
            sh '''
            docker push ruchitbhosle19/lavishescapes-backend:latest
            docker push ruchitbhosle19/lavishescapes-frontend:latest
            '''
                echo " Docker Push Successful"
           }
        }

    }
}
