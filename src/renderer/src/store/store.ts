import { create } from 'zustand'
import { ExtraConfig } from "../../../main/Globals";
import { io } from 'socket.io-client'

interface CarplayStore {
  settings: null | ExtraConfig,
  saveSettings: (settings: ExtraConfig) => void
  getSettings: () => void
}

interface StatusStore {
  lights: boolean,
  isPlugged: boolean,
  setPlugged: (plugged: boolean) => void
}

export const useCarplayStore = create<CarplayStore>()((set) =>({
  settings: null,
  saveSettings: (settings) => {
    set(() => ({settings: settings}))
    socket.emit('saveSettings', settings)
  },
  getSettings: () => {
    socket.emit('getSettings')
  },
  stream: (stream) => {
    socket.emit('stream', stream)
  }
}))

export const useStatusStore = create<StatusStore>()((set) => ({
  lights: false,
  isPlugged: false,
  setPlugged: (plugged) => {
    set(() => ({isPlugged: plugged}))
  }
}))

const URL = 'http://localhost:4000'
const socket = io(URL)

socket.on('settings', (settings: ExtraConfig) => {
  console.log("received settings", settings)
  useCarplayStore.setState(() => ({settings: settings}))
})
