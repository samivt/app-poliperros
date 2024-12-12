# Usar una imagen base de Nginx
FROM nginx:stable-alpine

# Copiar los archivos build de React al directorio de Nginx
COPY build /usr/share/nginx/html

# Copiar un archivo de configuración personalizada de Nginx si es necesario (opcional)
# COPY nginx.conf /etc/nginx/conf.d/default.conf

# Exponer el puerto 80
EXPOSE 80

# Comando para ejecutar Nginx
CMD ["nginx", "-g", "daemon off;"]
