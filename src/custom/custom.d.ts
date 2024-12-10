//import { Whatsapp } from "@wppconnect-team/wppconnect";
declare module "@wppconnect-team/wppconnect" {
  interface Whatsapp {
    customEventDispose: (event: string) => void;
    botRun: boolean
    /*registerEvent(event: string | symbol, listener: (...args: any[]) => void): {
      dispose: () => void;
    };*/
  }
}

export { };