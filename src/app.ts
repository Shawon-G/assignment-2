import express, { Application, Request, Response } from 'express';
import cors from 'cors';

const app: Application = express();

// Parsers:
app.use(express.json());
// cors:
app.use(cors());

app.get('/', (req: Request, res: Response) => {
  res.send('Hello Assignment - 2!');
});

export default app;
