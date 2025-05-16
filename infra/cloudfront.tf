############################################################
# CloudFront para distribución CDN
############################################################

# Identity de Acceso a Origen para CloudFront -> S3 (Legacy OAI)
resource "aws_cloudfront_origin_access_identity" "frontend" {
  comment = "${var.project_name} frontend OAI"
}

# Distribución CloudFront
resource "aws_cloudfront_distribution" "frontend" {
  enabled             = true
  is_ipv6_enabled     = true
  default_root_object = "index.html"
  price_class         = var.price_class
  comment             = "${var.project_name} frontend distribution - ${var.environment}"

  # S3 origen para los archivos estáticos (usando Legacy OAI)
  origin {
    domain_name = aws_s3_bucket.frontend.bucket_regional_domain_name
    origin_id   = "S3-${aws_s3_bucket.frontend.id}"

    s3_origin_config {
      origin_access_identity = aws_cloudfront_origin_access_identity.frontend.cloudfront_access_identity_path
    }
  }

  # Comportamiento por defecto
  default_cache_behavior {
    allowed_methods        = ["GET", "HEAD", "OPTIONS"]
    cached_methods         = ["GET", "HEAD"]
    target_origin_id       = "S3-${aws_s3_bucket.frontend.id}"
    viewer_protocol_policy = "redirect-to-https"

    forwarded_values {
      query_string = false

      cookies {
        forward = "none"
      }
    }

    compress = true
  }

  # Configuración para SPA Routing
  custom_error_response {
    error_code            = 403
    response_code         = 200
    response_page_path    = "/index.html"
    error_caching_min_ttl = 10
  }

  custom_error_response {
    error_code            = 404
    response_code         = 200
    response_page_path    = "/index.html"
    error_caching_min_ttl = 10
  }

  # Restricciones geográficas (ninguna)
  restrictions {
    geo_restriction {
      restriction_type = "none"
    }
  }

  # Certificado SSL (por defecto de CloudFront)
  viewer_certificate {
    cloudfront_default_certificate = true
    # Si se configura un dominio personalizado, descomentar lo siguiente
    # acm_certificate_arn = var.acm_certificate_arn
    # ssl_support_method = "sni-only"
    # minimum_protocol_version = "TLSv1.2_2021"
  }
}
