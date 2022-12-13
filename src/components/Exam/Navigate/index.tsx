import React from 'react'

import {
  Box,
  Button,
  Card,
  CardContent,
  Divider,
  List,
  Typography,
} from '@mui/material'

import langHook from '@hooks/localHook'

import { examLang } from '@langs/index'

interface NavigateProps {
  answers: number[]
  setCurrentExam: (num: number) => void
}


export default ({ answers, setCurrentExam }: NavigateProps): JSX.Element => {

  const local = langHook()

  return (
    <Card sx={{ mb: 6 }}>
      <CardContent>
        <List sx={{
          display: 'flex',
          flexDirection: 'row',
          flexWrap: 'wrap',
        }}>
          {
            answers.map((answer, index) => {
              return (
                <Button
                  sx={{
                    minWidth: 24,
                    height: 24,
                    p: 0,
                    m: 0.55,
                  }}
                  key={index}
                  variant={answer > 0 ? 'contained' : 'outlined'}
                  onClick={() => setCurrentExam(index)}
                >{index + 1}</Button>
              )
            })
          }
        </List>
        <Divider component="li" sx={{ mb: 2 }} />
        <Box sx={{
          width: '100%',
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'space-around',
        }}>
          <Box sx={{
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center'
          }}>
            <Box sx={{
              width: 22,
              height: 22,
              m: 0.55,
              border: '1px solid rgba(0, 0, 0, 0.5)',
              borderRadius: 1,
            }}></Box>
            <Typography>{local(examLang.tbc)}</Typography>
          </Box>
          <Box sx={{
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center'
          }}>
            <Box sx={{
              width: 24,
              height: 24,
              m: 0.55,
              backgroundColor: '#000',
              borderRadius: 1,
            }}></Box>
            <Typography>{local(examLang.completed)}</Typography>
          </Box>
        </Box>
      </CardContent>
    </Card>
  )
}