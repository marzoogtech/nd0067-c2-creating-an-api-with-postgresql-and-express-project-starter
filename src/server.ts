import express, { Request, Response } from 'express';
import bodyParser from 'body-parser';
import router from './routes'

const app: express.Application = express();
const address: string = "0.0.0.0:3000";

app.use(bodyParser.json());

app.get('/', function (req: Request, res: Response) {
    res.send('Hello World!');
})

app.use('/api', router);


app.listen(3000, function () {
    console.log(`starting app on: ${address}`);
})


export default app;