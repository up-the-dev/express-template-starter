/*
Author :  Umesh Pawar
Date Created: 26-10-23
Ticket №:  http://172.16.0.36/browse/SIM-2
Reviewed by : 
Date Reviewed : 
Objectives : This code sets up the environment configuration for the application
*/

import { config } from "dotenv";

// Invoking 'config' method to load the .env file content into process.env
config();

// Destructuring environmental variables from process.env
const { PORT, NODE_ENV, LOG_FILE_SIZE, LOG_LEVEL } = process.env;

// Exporting 'Config' object, which includes environment variable values.
// Config can be used in other modules and files of the project.
export const Config = {
    PORT,
    NODE_ENV,
    LOG_FILE_SIZE,
    LOG_LEVEL,
};
