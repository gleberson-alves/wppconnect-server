import verifyToken from '../middleware/auth';
import routes from '../routes/index';
import * as CustomController from '../custom/customController';
import statusConnection from '../middleware/statusConnection';

export function setRoutes() {
  routes.post(
    '/api/:session/force-kill-session',
    verifyToken,
    //statusConnection,
    CustomController.forceKillSession
  );

  routes.post(
    '/api/:session/start-bot',
    verifyToken,
    statusConnection,
    CustomController.startBot
  );

  routes.post(
    '/api/:session/stop-bot',
    verifyToken,
    statusConnection,
    CustomController.stopBot
  );

  console.log('*** Custom Routes Adicionado ***');
}
