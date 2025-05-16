# Infraestructura para Frontend con Terraform

Esta configuración de Terraform despliega la aplicación frontend como un sitio web estático en AWS utilizando S3 y CloudFront.

## Arquitectura

![Arquitectura](https://d2908q01vomqb2.cloudfront.net/1b6453892473a467d07372d45eb05abc2031647a/2018/09/13/s3-cf.png)

* **S3**: Almacena los archivos estáticos del frontend
* **CloudFront**: Distribuye el contenido globalmente con baja latencia
* **OAC (Origin Access Control)**: Asegura que el bucket S3 solo sea accesible a través de CloudFront

## Pre-requisitos

* [Terraform](https://www.terraform.io/downloads.html) >= 1.2.0
* [AWS CLI](https://aws.amazon.com/cli/) configurado con acceso a tu cuenta
* Frontend construido en la carpeta `../dist`

## Archivos de Configuración

* `providers.tf`: Configuración de proveedores AWS
* `variables.tf`: Variables configurables
* `main.tf`: Recursos principales (S3, CloudFront)
* `outputs.tf`: Valores de salida importantes
* `upload.tf`: Lógica para subir archivos e invalidar caché

## Uso

1. Construir la aplicación frontend:
   ```bash
   cd ..
   npm run build
   ```

2. Inicializar Terraform:
   ```bash
   cd infra
   terraform init
   ```

3. Ver el plan de despliegue:
   ```bash
   terraform plan
   ```

4. Aplicar los cambios:
   ```bash
   terraform apply
   ```

5. Después del despliegue, obtener la URL de CloudFront:
   ```bash
   terraform output cloudfront_url
   ```

## Limpieza

Para eliminar todos los recursos creados:
```bash
terraform destroy
```

## Configuración Personalizada

Editar `variables.tf` para personalizar:
* Región de AWS
* Entorno (dev, staging, prod)
* Nombre del proyecto
* Configuración de precios de CloudFront
* Rutas de los archivos
