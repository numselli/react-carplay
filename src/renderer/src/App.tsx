import { useEffect, useState } from "react";
import { HashRouter as Router, Route, Routes } from "react-router-dom";
import Settings from "./components/Settings";
import './App.css'
import Home from "./components/Home";
import Nav from "./components/Nav";
import Carplay from './components/Carplay'
import { useCarplayStore } from "./store/store";
import { ThemeProvider, createTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';

// rm -rf node_modules/.vite; npm run dev


const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  height: '95%',
  width: '95%',
  boxShadow: 24,
  display: "flex"
};

function App() {
  const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)');

  const theme = createTheme({
    palette: {
      mode: prefersDarkMode ? 'dark': "light",
    }
  });
  
  const [receivingVideo, setReceivingVideo] = useState(false)
  const [commandCounter, setCommandCounter] = useState(0)
  const [keyCommand, setKeyCommand] = useState('')
  const settings = useCarplayStore((state) => state.settings)



  useEffect(() => {
    document.addEventListener('keydown', onKeyDown)

    return () => document.removeEventListener('keydown', onKeyDown)
  }, [settings]);


  const onKeyDown = (event: KeyboardEvent) => {
    if(Object.values(settings!.bindings).includes(event.code)) {
      let action = Object.keys(settings!.bindings).find(key =>
        settings!.bindings[key] === event.code
      )
      console.log(action)
      if(action !== undefined) {
        setKeyCommand(action)
        setCommandCounter(prev => prev +1)
        if(action === 'selectDown') {
          console.log('select down')
          setTimeout(() => {
            setKeyCommand('selectUp')
            setCommandCounter(prev => prev +1)
          }, 200)
        }
      }
    }
  }

  return (
    <ThemeProvider theme={theme}>
      <Router>
        <div
          style={{ height: '100%', touchAction: 'none' }}
          id={'main'}
          className="App"

        >
          <Nav receivingVideo={receivingVideo} settings={settings}/>
          {settings ? <Carplay  receivingVideo={receivingVideo} setReceivingVideo={setReceivingVideo} settings={settings} command={keyCommand} commandCounter={commandCounter}/> : null}
          <Routes>
            <Route path={"/"} element={<Home />} />
            <Route path={"/settings"} element={<Settings settings={settings!}/>} />
          </Routes>
        </div>
      </Router>
    </ThemeProvider>
  )
}

export default App
