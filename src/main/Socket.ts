import { ExtraConfig } from "./Globals";
import { Server } from 'socket.io'
import { EventEmitter } from 'events'

export enum MessageNames {
  Connection = 'connection',
  GetSettings = 'getSettings',
  SaveSettings = 'saveSettings',
}

export class Socket extends EventEmitter {
  config: ExtraConfig
  io: Server
  saveSettings: (settings: ExtraConfig) => void
  constructor(config: ExtraConfig, saveSettings: (settings: ExtraConfig) => void) {
    super()
    this.config = config
    this.saveSettings = saveSettings
    this.io = new Server({
      cors: {
        origin: '*'
      }
    })

    this.io.on(MessageNames.Connection, (socket) => {
      this.sendSettings()

      socket.on(MessageNames.GetSettings, () => {
        this.sendSettings()
      })

      socket.on(MessageNames.SaveSettings, (settings: ExtraConfig) => {
        this.saveSettings(settings)
      })

      socket.on(MessageNames.Stream, (stream: Stream) => {
        this.emit(MessageNames.Stream, stream)
      })
    })

    this.io.listen(4000)
  }

  sendSettings() {
    this.io.emit('settings', this.config)
  }

  sendLights(lights: boolean) {
    this.io.emit('lights', lights)
  }
}
