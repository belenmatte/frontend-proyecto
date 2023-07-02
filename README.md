# DOCUMENTACIÓN ENTREGA 3 MEMORY CHALLENGE

## Instrucciones para construir entorno de desarrollo.

Para comenzar, abrir una terminal en la carpeta frontend del proyecto y asegurarse de instalar las dependencias ejecutando el comando **yarn install** (De no funcionar, seguir las instrucciones del SetUp inicial del curso). Esto permitirá que se puedan utilizar todas la dependencias del proyecto incluidas en el archivo package.json, como axios y react Para corre el servidor del juego se debe correr **yarn dev**.

## Instrucciones para levantar interfaz.

Se debe correr primero **yarn dev** en la terminal del backend, una vez que el servidor esta escuchando se corre el mismo comando en la terminal del frontend.

Para poder conectarse a las rutas del backend, se debe crear en la carpeta src un archivo .env que contenga el siguiente dato:

- VITE_BACKEND_URL= http://localhost:3000