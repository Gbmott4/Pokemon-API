import express, { NextFunction, Request, Response } from 'express';
import { pokemonRoutes } from '../infrastructure/http/routes/pokemon-routes';
import { swaggerUi, swaggerDocument } from './config/swagger';
import { errorHandler } from '@infrastructure/http/middlewares/error-handler';
import { trainerRoutes } from '../infrastructure/http/routes/trainer-routes';
import { pokedexRoutes } from '../infrastructure/http/routes/pokedex-routes';
import { captureRoutes } from '../infrastructure/http/routes/capture-routes';
import { teamRoutes } from '../infrastructure/http/routes/team-routes';

const app = express();

app.use((req: Request, res: Response, next: NextFunction) => {
  console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`);
  next();
});

app.use(express.json());

app.use('/api/v1/pokemons', pokemonRoutes);
app.use('/api/v1/trainers', trainerRoutes);
app.use('/api/v1/pokedex', pokedexRoutes);
app.use('/api/v1/trainers', captureRoutes);
app.use('/api/v1/trainers', teamRoutes);

app.use('/api/docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.use(errorHandler);

const PORT = Number(process.env.PORT) || 3333;

app.listen(PORT, '0.0.0.0', () => {
  console.log(`⚡️ [server]: API rodando na porta ${PORT}`);
});
