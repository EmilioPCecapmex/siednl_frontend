


import { Box } from '@mui/material';
import React, { useState } from 'react'
import { sessionUntil } from '../../funcs/validation';

export const TimerCounter = () => {
    const session = new Date(sessionUntil);
const [actualDate, setActualDate] = useState(new Date())
const [rest, setRest] = useState(0)

setTimeout(() => {
  setActualDate(new Date())
  setRest(session.getTime()  - actualDate.getTime())
}, 1000);
  return (
    <Box sx={{fontFamily: 'MontserratMedium', fontSize: '.5vw', width: '95%', height: '100%', display:'flex', alignItems: 'center', justifyContent: 'flex-end', color: '#B70000'}}>
    {Math.round((rest / 1000 / 60 )).toString() + ":" + Math.round((rest / 1000 % 60)).toString()} minutos restantes.
  </Box>
  )
}
