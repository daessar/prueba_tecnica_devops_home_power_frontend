# Home Power - Frontend de Clientes

Esta aplicación frontend consume la API Gateway + Lambda + Nest.js para mostrar un listado de clientes en una tabla.

## Estructura del Proyecto

```
.
├── public/
│   └── index.html        # Plantilla HTML base
├── src/
│   ├── components/
│   │   └── ClientTable.js # Componente tabla de clientes
│   ├── App.js            # Componente principal
│   ├── api.js            # Servicios para conectar con la API
│   ├── index.js          # Punto de entrada
│   └── styles.css        # Estilos CSS
├── infra/               # Infraestructura como código (Terraform)
│   ├── s3.tf            # Configuración del bucket S3
│   ├── cloudfront.tf    # Configuración de CloudFront
│   └── ...              # Otros archivos de infraestructura
├── .github/
│   └── workflows/        # Flujos de trabajo de CI/CD
│       ├── frontend-deploy.yml  # Workflow para la aplicación
│       └── infra.yml     # Workflow para la infraestructura
├── package.json          # Dependencias y scripts
└── webpack.config.js     # Configuración de webpack
```

## Variables de Entorno

La aplicación utiliza las siguientes variables de entorno:

| Variable | Descripción | Obligatoria |
|----------|-------------|-------------|
| API_URL | URL base de la API Gateway | Sí |

### Configuración Local

Para desarrollo local, puedes crear un archivo `.env` en la raíz del proyecto:

```
API_URL=https://tu-api-id.execute-api.tu-region.amazonaws.com/Prod
```

### Variables en GitHub Actions

El pipeline de CI/CD utiliza las siguientes variables configuradas en el repositorio:

| Variable | Descripción | Tipo |
|----------|-------------|------|
| API_URL | URL base de la API Gateway | Secret |
| S3_BUCKET_NAME | Nombre del bucket S3 para despliegue | Secret |
| CLOUDFRONT_DISTRIBUTION_ID | ID de la distribución CloudFront | Secret |
| AWS_ACCESS_KEY_ID | ID de clave de acceso AWS | Secret |
| AWS_SECRET_ACCESS_KEY | Clave secreta de acceso AWS | Secret |
| AWS_REGION | Región AWS | Secret |
| INFRACOST_API_KEY | Clave de API para Infracost | Secret |

## Instalación

```bash
# Instalar dependencias
npm install
```

## Desarrollo Local

```bash
# Iniciar servidor de desarrollo
npm start
```

La aplicación se abrirá automáticamente en [http://localhost:3000](http://localhost:3000).

## Compilación para Producción

```bash
# Crear build para producción
npm run build
```

Esto generará los archivos optimizados en la carpeta `dist/`.

## CI/CD

El proyecto implementa dos pipelines de CI/CD usando GitHub Actions:

### Frontend Pipeline (frontend-deploy.yml)

1. **CI (Integración Continua)**: Se activa con cada push a las ramas `feature/*` y `master`, o al crear un PR a `master`.
   - Construye la aplicación
   - Verifica que la compilación sea exitosa

2. **CD (Despliegue Continuo)**: Se ejecuta después de CI sólo en la rama `master`.
   - Despliega la aplicación en AWS S3
   - Invalida la caché de CloudFront para actualizar la distribución

### Infraestructura Pipeline (infra.yml)

1. **Pre-commit**: Se ejecuta en cada cambio en el directorio `infra/`
   - Verifica el formato del código Terraform
   - Valida la sintaxis de Terraform
   - Genera y actualiza la documentación

2. **Terraform CI**: Se ejecuta después del pre-commit
   - Inicializa Terraform
   - Valida la configuración de Terraform
   - Genera un plan de Terraform
   - Calcula y analiza los costos con Infracost
   - Sube los resultados de costos al dashboard de Infracost

3. **Terraform CD**: Se ejecuta después del CI sólo en la rama `master`
   - Aplica los cambios de infraestructura
   - Requiere aprobación manual en el entorno de producción

## Gestión de Infraestructura

La infraestructura está definida como código usando Terraform en el directorio `infra/`. Incluye:

- Bucket S3 configurado para alojar una aplicación web estática
- Distribución CloudFront para entregar el contenido a través de CDN
- Políticas de acceso y configuraciones de seguridad

Para gestionar la infraestructura localmente:

```bash
# Ir al directorio de infraestructura
cd infra

# Inicializar Terraform
terraform init

# Planificar cambios
terraform plan

# Aplicar cambios
terraform apply
```

## Características

- Listado de clientes en tabla
- Diseño responsive con Bootstrap
- Manejo de estados de carga y error
- Integración con API Gateway
- Pipeline de CI/CD automatizado
- Infraestructura como código (IaC)
- Análisis de costos de infraestructura
