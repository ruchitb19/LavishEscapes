@Library('jenkins-shared-library') _
pipeline{
    agent {label "local"}
    
    triggers {
        githubPush()
    }
    
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
                sh '''
                rm -f backend/.env && cp $ENV_FILE backend/.env
                sed -i 's/\r//' backend/.env
                '''
                echo " ENV file setup Successful"
                }
            }
        }
        stage('Docker Build'){
            steps{
                echo "Building Docker images"
                sh "docker compose build"
                echo "Docker build Successful"
            }
        }
        stage('Docker login'){
            steps{
                dockerLogin("docker-credentials")
                echo "Docker login successful"
            }
        }
        stage('Docker push'){
           steps{
            echo "Pushing images to Docker Hub."
            sh '''
            docker push ruchitbhosle19/lavishescapes-backend:latest
            docker push ruchitbhosle19/lavishescapes-frontend:latest
            '''
            echo "Docker Images pushed successfully"
           }
        }
        stage('Docker Run'){
            steps{
                echo "Starting containers"
                sh "docker compose up -d"
                echo "Containers are running"
            }
        }
        stage('Health Check') {
            steps {
                sh 'curl -f http://localhost:3000 || exit 1'
            }
        }
        stage('Cleanup') {
            steps {
                sh 'docker system prune -f'
            }
        }
    }
}
