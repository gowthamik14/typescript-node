import express, { Application, Router } from 'express';
import mongoose from 'mongoose';
import compression from 'compression';
import cors from 'cors';
import morgan from 'morgan';
import ErrorMiddleware from '@middleware/error.middleware';
import helmet from 'helmet';
import SwaggerUI, { SwaggerOptions } from 'swagger-ui-express';
import swaggerJSDoc from 'swagger-jsdoc';
import router from '@resources/post/post.route';

class App {
    public express: Application;
    public port: number;

    constructor( port: number) {
        this.express = express();
        this.port = port;

        this.initialiseDatabaseConnection();
        this.initialiseMiddleWare();
        this.InitialiseSwagger();
        this.initialiseControllers();
        this.initialiseErrorHandling();
        
        this.express.use(express.static("public"));
    }

    private initialiseMiddleWare(): void {
        this.express.use(helmet());
        this.express.use(cors());
        this.express.use(morgan('dev'));
        this.express.use(express.json());
        this.express.use(express.urlencoded({ extended: false }));
        this.express.use(compression());
    }

    private initialiseControllers(): void {  
        this.express.use('/api',router);
    }

    private initialiseErrorHandling(): void {
        this.express.use(ErrorMiddleware);
    }

    private initialiseDatabaseConnection(): void {
        const { MONGO_USER, MONGO_PASSWORD, MONGO_PATH } = process.env;

        mongoose.connect(`mongodb://localhost:27017/blogNode`);
    }

    public listen(): void {
        this.express.listen(this.port, () => {
            console.log(`App listening on port ${this.port}`);
        });
    }

    private InitialiseSwagger(): void {
        this.express.use(
            '/docs',
            SwaggerUI.serve,
            SwaggerUI.setup(undefined, {
                swaggerOptions: {
                    url: '/swagger.json',
                },
            })
        );
    }
}

export default App;
