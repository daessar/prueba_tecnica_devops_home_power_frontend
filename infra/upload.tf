# # Define los proveedores necesarios para la sincronización de archivos
# terraform {
#   required_providers {
#     aws = {
#       source  = "hashicorp/aws"
#       version = "~> 5.0"
#     }
#     null = {
#       source  = "hashicorp/null"
#       version = "~> 3.1"
#     }
#   }
# }

# # Recurso para invalidar la caché de CloudFront después de desplegar nuevos archivos
# resource "null_resource" "invalidate_cache" {
#   triggers = {
#     always_run = "${timestamp()}"  # Siempre se ejecutará
#   }

#   # Carga los archivos estáticos a S3
#   provisioner "local-exec" {
#     command = <<EOF
#       echo "Uploading files to S3 bucket..."
#       aws s3 sync ${var.frontend_dist_path}/ s3://${aws_s3_bucket.frontend.id}/ --delete

#       echo "Invalidating CloudFront cache..."
#       aws cloudfront create-invalidation --distribution-id ${aws_cloudfront_distribution.frontend.id} --paths "/*"
#     EOF
#   }

#   depends_on = [
#     aws_s3_bucket.frontend,
#     aws_s3_bucket_policy.frontend,
#     aws_cloudfront_distribution.frontend
#   ]
# }
