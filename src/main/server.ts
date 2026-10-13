
import express, { NextFunction, Request, Response } from 'express';
import { pokemonRoutes } from '../infrastructure/http/routes/pokemon-routes';
import { swaggerUi, swaggerDocument } from './config/swagger';
import { errorHandler } from '@infrastructure/http/middlewares/error-handler';

const app = express();

app.use((req: Request, res: Response, next: NextFunction) => {
  console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`);
  next();
});

app.use(express.json());

app.use('/api/v1/pokemons', pokemonRoutes);

app.use('/api/docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.use(errorHandler);

const PORT = Number(process.env.PORT) || 3333;

app.listen(PORT, '0.0.0.0', () => {
  console.log(`⚡️ [server]: API rodando na porta ${PORT}`);
});
