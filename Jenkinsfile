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
                sh "cp $ENV_FILE .env"
                }
            }
        }
        stage('Docker Build'){
            steps{
                echo "Building Docker images"
                sh "docker compose build"
            }
        }
        stage('Docker Run'){
            steps{
                echo "Starting containers"
                sh "docker compose up -d"
            }
        }
        stage('Docker login'){
            steps{
                dockerlogin("docker-credentials")
            }
        }
        stage('Docker push'){
           steps{
            echo "Pushing images to Docker Hub."
            sh '''
            docker push ruchitbhosle19/lavishescapes-backend:latest
            docker push ruchitbhosle19/lavishescapes-frontend:latest
            '''
           }
        }

    }
}
