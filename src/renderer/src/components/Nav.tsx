import * as React from 'react';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import PhoneIcon from '@mui/icons-material/Phone';
import SettingsIcon from '@mui/icons-material/Settings';
import { Link, useLocation } from "react-router-dom";
import ExitToApp from '@mui/icons-material/ExitToApp';
import { useStatusStore } from "../store/store";

export default function Nav() {
  const [value, setValue] = React.useState(0);
  const [isPlugged] = useStatusStore(state => [state.isPlugged])
  const { pathname } = useLocation()
  const handleChange = (_: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  const quit = () => {
    window.api.quit()
  }

  return (
    <Tabs value={value} onChange={handleChange} aria-label="icon label tabs example" centered sx={pathname === '/' && isPlugged ? {minHeight: '0px', height: '0px'} : {}}>
      <Tab icon={<PhoneIcon />} to={'/'} component={Link}/>
      <Tab icon={<SettingsIcon />} to={'/settings'}  component={Link}/>
      <Tab icon={<ExitToApp />} onClick={() => quit()} />
    </Tabs>
  );
}
