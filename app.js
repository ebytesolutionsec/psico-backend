import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import { fileURLToPath } from 'url';
import swaggerUi from 'swagger-ui-express';
import swaggerSpec from "./app/helper/swagger.js"
import path from 'path';
import routerUser from './app/router/user/user.router.js';
import routerCategori from './app/router/categori/categori.router.js';
import routerAuth from './app/router/user/auth.router.js';
import routerCourse from './app/router/course/course.router.js';
import moduleCourseRouter from './app/router/modul/modul.router.js';

dotenv.config();

const app = express();
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

/**
 * Conection MongoDB
*/
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => console.log('Conectado a la base de datos'))
  .catch(err => console.log("Error al conectar a Mongo DB", err));

/**
 * Middleware
*/
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

/**
 * Cors
*/
app.use(cors({
  origin: 'http://localhost:4200',
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS', 'PATCH'],
  allowedHeaders: ['Content-Type', 'Authorization', 'x-api-key'],
}));

/**
 * Swagger
*/
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

/**
 * Routes
*/
app.use(`/api/${process.env.API_VERSION}`, routerAuth)
app.use(`/api/${process.env.API_VERSION}`, routerUser)
app.use(`/api/${process.env.API_VERSION}`, routerCategori)
app.use(`/api/${process.env.API_VERSION}`, routerCourse)
app.use(`/api/${process.env.API_VERSION}`, moduleCourseRouter)


export default app;