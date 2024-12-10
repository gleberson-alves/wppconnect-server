import { ServerOptions } from './types/ServerOptions';
import { config } from 'dotenv'

config({ override: true })

export default {
  secretKey: process.env.SECRET_KEY,
  host: process.env.HOST,
  port: process.env.PORT,
  deviceName: process.env.DEVICE_NAME,
  poweredBy: process.env.POWERED_BY,
  startAllSession: false,
  tokenStoreType: 'file',
  maxListeners: 0,
  customUserDataDir: process.env.CUSTOM_USER_DADA_DIR,
  webhook: {
    url: null,
    autoDownload: false,
    uploadS3: false,
    readMessage: false,
    allUnreadOnStart: false,
    listenAcks: false,
    onPresenceChanged: false,
    onParticipantsChanged: true,
    onReactionMessage: true,
    onPollResponse: true,
    onRevokedMessage: true,
    onLabelUpdated: true,
    onSelfMessage: true,
    ignore: [
      'status@broadcast',
      'onPresenceChanged',
      'onUpdateLabel',
      'onAnyMessage',
      'onack'
    ],
  },
  websocket: {
    autoDownload: false,
    uploadS3: false,
  },
  chatwoot: {
    sendQrCode: true,
    sendStatus: true,
  },
  archive: {
    enable: false,
    waitTime: 10,
    daysToArchive: 45,
  },
  log: {
    level: 'info',//'silly', // Before open a issue, change level to silly and retry a action
    logger: ['console', 'file'],
  },
  createOptions: {
    disableWelcome: true,
    autoClose: 180000, //6 minutos
    waitForLogin: true,
    useChrome: process.env.USE_CHROME?.toLocaleLowerCase() == 'true',
    //whatsappVersion: process.env.WHATSAPP_VERSION,
    browserArgs: [
      //'--proxy-server=144.91.73.88:3101',
      //'--proxy-auth=robozap:bm@23J6n$cm7',
      '--disable-web-security',
      '--no-sandbox',
      '--disable-web-security',
      '--aggressive-cache-discard',
      '--disable-cache',
      '--disable-application-cache',
      '--disable-offline-load-stale-cache',
      '--disk-cache-size=0',
      '--disable-background-networking',
      '--disable-default-apps',
      '--disable-extensions',
      '--disable-sync',
      '--disable-translate',
      '--hide-scrollbars',
      '--metrics-recording-only',
      '--mute-audio',
      '--no-first-run',
      '--safebrowsing-disable-auto-update',
      '--ignore-certificate-errors',
      '--ignore-ssl-errors',
      '--ignore-certificate-errors-spki-list',
    ],
    /**
     * Example of configuring the linkPreview generator
     * If you set this to 'null', it will use global servers; however, you have the option to define your own server
     * Clone the repository https://github.com/wppconnect-team/wa-js-api-server and host it on your server with ssl
     *
     * Configure the attribute as follows:
     * linkPreviewApiServers: [ 'https://www.yourserver.com/wa-js-api-server' ]
     */
    linkPreviewApiServers: null,
  },
  mapper: {
    enable: false,
    prefix: 'tagone-',
  },
  db: {
    mongodbDatabase: 'tokens',
    mongodbCollection: '',
    mongodbUser: '',
    mongodbPassword: '',
    mongodbHost: '',
    mongoIsRemote: true,
    mongoURLRemote: '',
    mongodbPort: 27017,
    redisHost: 'localhost',
    redisPort: 6379,
    redisPassword: '',
    redisDb: 0,
    redisPrefix: 'docker',
  },
  aws_s3: {
    region: 'sa-east-1' as any,
    access_key_id: null,
    secret_key: null,
    defaultBucketName: null,
    endpoint: null,
    forcePathStyle: null,
  },
} as unknown as ServerOptions;
