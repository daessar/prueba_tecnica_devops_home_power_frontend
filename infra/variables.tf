variable "aws_region" {
  description = "AWS Region where resources will be created"
  type        = string
  default     = "us-east-1"
}

variable "environment" {
  description = "Environment name (dev, staging, prod)"
  type        = string
  default     = "testing"
}

variable "project_name" {
  description = "Project name for resource naming"
  type        = string
  default     = "home-power"
}

variable "frontend_dist_path" {
  description = "Path to frontend dist directory containing built static files"
  type        = string
  default     = "../dist"
}

variable "price_class" {
  description = "CloudFront distribution price class"
  type        = string
  default     = "PriceClass_All"
}
