resource "aws_codebuild_project" "moneymapweb" {
  service_role = aws_iam_role.codebuild_role.arn
  name         = "moneymapweb"

  artifacts {
    type = "NO_ARTIFACTS"
  }

  environment {
    type                        = "LINUX_CONTAINER"
    image_pull_credentials_type = "CODEBUILD"
    image                       = "aws/codebuild/standard:5.0"
    compute_type                = "BUILD_GENERAL1_SMALL"
  }

  source {
    type     = "GITHUB"
    location = "https://github.com/Anuroy12/PromptOPs_repo.git"
  }
}

resource "aws_iam_role" "codebuild_role" {
  name = "codebuild_role"
  assume_role_policy = jsonencode({
    Version = "2012-10-17"
    Statement = [
      {
        Effect = "Allow"
        Principal = {
          Service = "codebuild.amazonaws.com"
        }
        Action = "sts:AssumeRole"
      }
    ]
  })
}

resource "aws_iam_role_policy" "codebuild_policy" {
  role = aws_iam_role.codebuild_role.id
  policy = jsonencode({
    Version = "2012-10-17"
    Statement = [
      {
        Effect = "Allow"
        Action = [
          "logs:*",
          "s3:*",
          "ssm:GetParameter"
        ]
        Resource = "*"
      }
    ]
  })
  name = "codebuild_policy"
}

