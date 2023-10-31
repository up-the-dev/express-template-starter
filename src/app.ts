/*
Author :  Umesh Pawar
Date Created: 27-10-23
Ticket № :  http://172.16.0.36/browse/SIM-2
Reviewed by : 
Date Reviewed : 
Objectives : This code creates an instance of the Express.js framework. This instance is created in a separate file to promote modularity and reusability, allowing it to be imported in other parts of the application where server capabilities are needed.,
*/

import express, { Express, NextFunction, Request, Response } from "express";
import logger from "./config/logger";
import { HttpError } from "http-errors";

// Creating an instance of the express application.
const App: Express = express();

// eslint-disable-next-line @typescript-eslint/no-unused-vars, @typescript-eslint/require-await
App.get("/", async (req: Request, res: Response, next: NextFunction) => {
    /*     const error = createHttpError(401, "user access not allowed");
    next(error); */
    res.status(200).send("welcome to techorizon");
});

// eslint-disable-next-line @typescript-eslint/no-unused-vars
App.use((err: HttpError, req: Request, res: Response, next: NextFunction) => {
    logger.error(err.message);
    const statusCode = err.statusCode || 500;
    res.status(statusCode).json({
        errors: [{ type: err.name, msg: err.message, path: "", location: "" }],
    });
});

// Exporting the App so it can be used in other modules.
export default App;
