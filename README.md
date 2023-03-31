
# Joke App

This is a small application as part of technical interview. The project backend is over-engineered a lot to showcase different desings and patterns.

## Backend
Backend of this project lives in `api` folder. I love NestJs, so a lot of the backend code is inspired by that (like use of `dto`, `controller` and `service`).
I tried to use dependnecy injection to show case its advantages for testing.

### running backend
The API by default will run listening on port 3000. Can change it by setting `PORT` environment variable.

```bash
cd api
npm i

## to build and run in dev
npm run dev 

## to build and run in dev in watch mode
npm run dev:watch

## to run in production mode
npm run build
npm run start:prod

## to run tests
npm run test
```
you also can run it with docker using the provided `Dockerfile` and `docker-compose.yml` files.

open http://localhost:3000/jokes/list to test it.

## Frontend
Frontend is developed with vite+svelte, used SvelteUI as UI library. source codes are in `api` folder. I am by no means a frontend expert, so the code is not clean and good. But works :)
### Running
you need to run backend first.
```bash
cd app
npm i
npm run dev 
```
you also can run it with docker using the provided `Dockerfile` and `docker-compose.yml` files.

## Running both app and api with docker
You can run both using `docker-compose.yml` file easily
```bash
docker-compose up
```
and then visit http://localhost:4137.

**Note**: this is a preview build and not suitable for production. To make it suitable for production one needs to configure a web server like nginx to serve the frontend.
