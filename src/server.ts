/* 
Author : Umesh Pawar
Date Created: 30-10-23 
Ticket №: http://jira.sysnik.com/browse/SIM-2
Reviewed by : 
Date Reviewed : 
Objectives : start a server.
*/

// Import necessary modules from respective files
import { Config } from "./config";
import App from "./app";
import logger from "./config/logger";

// Function to start the server
const startServer = () => {
    // Fetch port number from config
    const PORT = Config.PORT;

    try {
        // Attempt to listen on the provided PORT
        App.listen(PORT, () => {
            // Log a success message when listening on the given PORT
            logger.info("server listening at " + PORT);
        });
    } catch (error: unknown) {
        // If error is of instance Error
        if (error instanceof Error) {
            // Log error message
            logger.error("server init failed" + error.message);

            // Exit the process after waiting for 1 sec
            setTimeout(() => {
                process.exit(1);
            }, 1000);
        }
    }
};

// Call function to start the server
startServer();
