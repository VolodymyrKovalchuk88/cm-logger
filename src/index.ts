import * as express from 'express';
import {Request, Response, Express} from 'express';
import {LoggerFactory} from './lib/logger-factory';

const {PORT = 3000} = process.env;

const app: Express = express();

app.get('/', (req: Request, res: Response) => {
    // Sample of usage of our logger. We use factory to get one and use it with a familiar interface e.g. info, error, verbose, warn.
    const logger = LoggerFactory.getLogger('app');
    logger.verbose('Start "/"');
    logger.verbose('process.env {}', JSON.stringify(process.env));
    logger.info('Template hello from endpoint with "{}"', req.headers['user-agent']);
    try {
        const obj: {level: number} = null;
        logger.warning('Exception about to be thrown!');
        const variable: number = obj.level;
        logger.info('Will not get here, wanted to log variable "{}"', variable);
    } catch(e: any) {
        if (e instanceof Error) {
            logger.error('Error Name: {}', e.name);
            logger.error('Error Message: {}', e.message);
            logger.error('Error Stack: {}', e.stack);
        } else {
            logger.error('Error:', e.toString());
        }
    }
    res.send('Hello world!');
    logger.verbose('Stop "/"');
});

app.listen(PORT, () => {
    console.log('server started at http://localhost:' + PORT);
});