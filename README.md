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
├── .github/
│   └── workflows/        # Flujos de trabajo de CI/CD
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
| API_URL | URL base de la API Gateway | Variable |
| S3_BUCKET_NAME | Nombre del bucket S3 para despliegue | Variable |
| CLOUDFRONT_DISTRIBUTION_ID | ID de la distribución CloudFront | Variable |
| AWS_ACCESS_KEY_ID | ID de clave de acceso AWS | Secret |
| AWS_SECRET_ACCESS_KEY | Clave secreta de acceso AWS | Secret |
| AWS_REGION | Región AWS | Secret |

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

El proyecto implementa un pipeline de CI/CD usando GitHub Actions:

1. **CI (Integración Continua)**: Se activa con cada push a las ramas `feature/*` y `master`, o al crear un PR a `master`.
   - Construye la aplicación
   - Verifica que la compilación sea exitosa

2. **CD (Despliegue Continuo)**: Se ejecuta después de CI sólo en la rama `master`.
   - Despliega la aplicación en AWS S3
   - Invalida la caché de CloudFront para actualizar la distribución

## Características

- Listado de clientes en tabla
- Diseño responsive con Bootstrap
- Manejo de estados de carga y error
- Integración con API Gateway
- Pipeline de CI/CD automatizado
