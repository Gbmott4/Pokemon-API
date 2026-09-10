import express, { NextFunction, Request, Response } from 'express';
import { pokemonRoutes } from '../infrastructure/http/routes/pokemon-routes';
import { swaggerUi, swaggerDocument } from './config/swagger';

const app = express();

app.use((req: Request, res: Response, next: NextFunction) => {
  console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`);
  next();
});

app.use(express.json());

app.use('/api/v1/pokemons', pokemonRoutes);

app.use('/api/docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

const PORT = 3333;

app.listen(PORT, () => {
  console.log(`⚡️ [server]: API rodando em http://localhost:${PORT}`);
});
