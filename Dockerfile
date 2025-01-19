# Fase 1: Construcción de la aplicación
FROM node:alpine as build

# Establecer el directorio de trabajo
WORKDIR /app

# Copiar los archivos necesarios
COPY package.json package-lock.json ./
COPY .env ./

# Instalar dependencias
RUN npm install

# Copiar el código fuente
COPY . .

# Construir la aplicación React
RUN npm run build

# Fase 2: Servir la aplicación con Nginx
FROM nginx:alpine

# Copiar el build al servidor Nginx
COPY --from=build /app/build /usr/share/nginx/html

# Exponer el puerto 80
EXPOSE 80

# Comando por defecto para iniciar Nginx
CMD ["nginx", "-g", "daemon off;"]
