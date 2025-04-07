output "codebuild_project_name" {
  description = "CodeBuild Project Name"
  value       = aws_codebuild_project.moneymapweb.name
}

output "codebuild_role_arn" {
  description = "CodeBuild Role ARN"
  value       = aws_iam_role.codebuild_role.arn
}
