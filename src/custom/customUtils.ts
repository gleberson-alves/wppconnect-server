import puppeteer from 'puppeteer';
import * as ChromeLauncher from 'chrome-launcher';
import ServerOptions from '../config';
import { WhatsAppServer } from '../types/WhatsAppServer';

const executablePath = (ServerOptions.createOptions as any).useChrome
  ? ChromeLauncher.Launcher.getFirstInstallation()
  : undefined

export async function getBrowser(
  browserArgs: any,
  userDataDir: string,
  proxy?: {
    host: string;
    port: number;
    username: string;
    password: string;
  }
) {
  const proxyUrl = proxy ? `--proxy-server=${proxy.host}:${proxy.port}` : null;
  const browser = await puppeteer.launch({
    args: [...browserArgs, proxyUrl],
    userDataDir: userDataDir,
    timeout: 10000,
    executablePath
  });

  const page = (await browser.pages())[0];
  if (page != null && proxy?.username && proxy.password) {
    await page.authenticate({
      username: proxy.username,
      password: proxy.password,
    });
  }

  return browser;
}

export async function chatIsOpen(client: WhatsAppServer, message: any): Promise<boolean> {
  await new Promise((resolve) => {
    setTimeout(() => {
      resolve('')
    }, 600);
  })

  const chat = await client.getChatById(message.chatId)
  return chat.unreadCount == 0
}