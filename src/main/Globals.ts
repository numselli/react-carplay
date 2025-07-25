import { DongleConfig } from 'node-carplay/node'

export type ExtraConfig = DongleConfig & {
  kiosk: boolean,
  microphone: string,
  canbus: boolean,
  bindings: KeyBindings,
  canConfig?: CanConfig
}

export interface KeyBindings {
  'left': string,
  'right': string,
  'selectDown': string,
  'back': string,
  'down': string,
  'home': string,
  'play': string,
  'pause': string,
  'next': string,
  'prev': string
}

export interface CanMessage {
  canId: number,
  byte: number,
  mask: number
}

export interface CanConfig {
  reverse?: CanMessage,
  lights?: CanMessage
}
