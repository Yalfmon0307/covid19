# Covid19
Esta app se puede ver datos del covid19 de distintos paises, utilizando una api de rapidapi.

## Caracteristicas 
- Actualiza los datos desde la api y los guarda en una base de datos.
- Eliminar paises
- Busqueda por un Pais en concreto.

## Instalacion 
Una ves descargador el repo.
1- crea una base de datos de postgre con nombre covid19

2- En la raiz crea un archivo .env con tus variables de entorno.
- PORT = 5100 -> obligatorio
- DB_USER
- DB_NAME = covid19
- DB_PASSWORD
- DB_HOST = localhost
- DB_PORT = 5432

3- npm run db
4- npm run start
