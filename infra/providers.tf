terraform {
  required_providers {
    aws = {
      source  = "hashicorp/aws"
      version = "~> 5.0"
    }
  }

  required_version = ">= 1.2.0"

  backend "s3" {
    bucket       = "terraform-state-home-power-dsanchez-testing"
    key          = "home-power/frontend/terraform.tfstate"
    region       = "us-east-1"
    encrypt      = true
    use_lockfile = true
  }
}

provider "aws" {
  region = var.aws_region

  default_tags {
    tags = {
      Project     = "Home Power Testing"
      Environment = var.environment
      ManagedBy   = "Terraform"
    }
  }
}
