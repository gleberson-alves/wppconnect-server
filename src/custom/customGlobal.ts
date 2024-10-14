import CreateSessionUtil from '../util/createSessionUtil';
import { getBrowser } from './customUtils';
import config from '../config';
import api from 'axios';
import { setRoutes } from './customRoute';
import { callWebHook } from '../util/functions';
import axios from 'axios';

export { };

function setBrowserProxy() {
  console.log('*** Proxy Browser Configurado ***');
  const originalCreateSession = CreateSessionUtil.prototype.createSessionUtil;

  CreateSessionUtil.prototype.createSessionUtil = async function (
    req: any,
    clientsArray: any,
    session: string,
    res?: any
  ) {
    if (req.serverOptions.customUserDataDir) {
      req.serverOptions.createOptions.puppeteerOptions = {
        userDataDir: req.body.userDataDir || req.serverOptions.customUserDataDir + session,
      };
    }

    req.serverOptions.createOptions.browser = await getBrowser(
      req.serverOptions.createOptions.browserArgs,
      req.serverOptions.createOptions.puppeteerOptions.userDataDir,
      req?.body?.proxy
    );

    return await originalCreateSession.call(
      this,
      req,
      clientsArray,
      session,
      res
    );
  };
}

function changeGetClient() {
  console.log('*** getClient Modificado ***');
  const originalGetClient = CreateSessionUtil.prototype.getClient;

  CreateSessionUtil.prototype.getClient = function (session: any) {

    let client = originalGetClient.call(CreateSessionUtil, session);
    (client as any).session ??= session;

    return client
  }
}

function setAxiosAuthentication() {
  console.log('*** Autenticação Axios Configurada ***');

  api.interceptors.request.use((axiosConfig) => {

    if (axiosConfig.data?.['event'] == null) return axiosConfig;

    axiosConfig.headers['Authorization'] = `Bearer ${config.secretKey}`;
    axiosConfig.data.serverId = process.env.SERVER_ID

    return axiosConfig;
  });
}

(global as any).onSystemStart = (async () => {
  console.log(`*** Server ID:${process.env.SERVER_ID} ***`)
  setBrowserProxy();
  setAxiosAuthentication();
  setRoutes();
  changeGetClient();

  setTimeout(() => {
    process.env.UP_WEBHOOKS?.split(';').forEach(webhook => {
      axios.post(
        webhook,
        {
          status: 'OK',
          serverId: process.env.SERVER_ID
        },
        {
          headers: { Authorization: `Bearer ${config.secretKey}` }
        }
      )
        .then((res) => {
          console.log(
            `up send to ${webhook}\n`
            + `-> status:${res.status} statusText:${res.statusText} data:`, res.data, '\n'
          )
        })
        .catch((error) => {
          console.error(`filed to send up to ${webhook}\n`, `${error.message}\n`)
        })
    })
  }, 1000);

})();
