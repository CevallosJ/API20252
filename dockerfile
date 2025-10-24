# Imagen base
FROM node:20-alpine

# Crear directorio de la app
WORKDIR /app

# Copiar package.json y package-lock.json
COPY package*.json ./

# Instalar dependencias
RUN npm install

# Copiar el resto del código
COPY . .

# Exponer el puerto desde la variable de entorno (por Dokploy)
EXPOSE ${PORT}

# Comando de inicio
CMD ["npm", "start"]
