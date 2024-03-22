# Descripción

## Correr en dev

1. Clonar repositorio
2. Crear una copia del ```.env.template``` y renombrar a ```.env``` y cambiar las variables de entorno
3. Instalar dependencias ```npm i```
4. Levantar Base de datos ```docker compose up -d```
5. Correr las migraciones de Prisma ```npx prisma migrate dev```
6. Ejecutar seed ```npx run seed```
7. Correr proyecto ```npm run dev```

## Correr en prod