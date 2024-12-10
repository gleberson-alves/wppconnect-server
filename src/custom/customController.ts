import './customGlobal';
import { Request, Response } from 'express';
import { exec } from 'child_process';
import CreateSessionUtil from '../util/createSessionUtil';

export async function startBot(req: Request, res: Response) {
  try {
    const client = req.client;
    (client as any).config.webhook = req.body.webhook;
    client.botRun = true
    const sessionUtil = new CreateSessionUtil()
    sessionUtil.listenMessages(client, req)

    res.json({
      status: 'success',
      message: 'Bot iniciado com sucesso',
    });
  } catch (error) {
    req.logger.error(error);
    res.json({
      status: 'error',
      message: 'Erro ao iniciar o bot',
      error: error,
    });
  }
}

export async function stopBot(req: Request, res: Response) {
  try {
    const client = req.client;
    delete (client as any).config.webhook;
    client.botRun = false
    client.customEventDispose('onMessage')
    client.customEventDispose('onAnyMessage')
    client.customEventDispose('onIncomingCall')

    res.json({
      status: 'success',
      message: 'Bot parado com sucesso',
    });
  } catch (error) {
    req.logger.error(error);
    res.json({
      status: 'error',
      message: 'Erro ao parar o bot',
      error: error,
    });
  }
}

export async function forceKillSession(req: Request, res: Response) {
  try {
    const client = req.client;

    const command = `ps aux | grep -- '--user-data-dir=.*/${req.session}' | grep -v grep | awk '{print $2}'`;

    exec(command, (error, stdout, stderr) => {
      if (error) {
        console.error(`Erro ao executar o comando: ${error.message}`);
        return;
      }

      if (stderr) {
        console.error(`Erro: ${stderr}`);
        return;
      }

      const pids = stdout.trim().split('\n');

      if (pids.length === 0 || pids[0] === '') {
        return;
      }

      pids.forEach((pid) => {
        process.kill(Number(pid), 'SIGKILL');
      });
    });

    if (typeof client.close == 'function') {
      await client.close();
    }

    res.json({
      status: 'success',
      message: 'Sessão fechado com sucesso',
    });
  } catch (error) {
    req.logger.error(error);
    res.json({
      status: 'error',
      message: 'Erro ao fechar o Sessão',
      error: error,
    });
  }
}
