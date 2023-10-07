import 'dotenv/config'
import app from './configs/express';
import logger from './utils/logger';
import './configs/mysql';

function startServerApp() {
    const serverPort = process.env.PORT || 3000;
    app.listen(serverPort, async () => {
        logger.info(`Server started on port ${serverPort}`);
    })
}

startServerApp();