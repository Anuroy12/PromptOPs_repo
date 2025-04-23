pipeline {
    agent any

    environment {
        AWS_REGION = 'ap-south-1'
        CODEBUILD_PROJECT_NAME = 'moneymapweb'
    }

    stages {
        stage('Trigger AWS CodeBuild') {
            steps {
                echo "Starting AWS CodeBuild project: ${CODEBUILD_PROJECT_NAME} in region ${AWS_REGION}"
                script {
                    def response = sh(
                        script: """
                            aws codebuild start-build \
                                --region ${AWS_REGION} \
                                --project-name ${CODEBUILD_PROJECT_NAME} \
                                --output json
                        """,
                        returnStdout: true
                    ).trim()
                    echo "Build trigger response: ${response}"
                }
            }
        }
    }

    post {
        success {
            echo '✅ AWS CodeBuild build triggered successfully.'
        }
        failure {
            echo '❌ Failed to trigger AWS CodeBuild.'
        }
    }
}
