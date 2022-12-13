import React from 'react'

import { Box, Card, CardContent, Typography } from '@mui/material'

import langHook from '@hooks/localHook'

import { examLang } from '@langs/index'

import { CSTLEVEL } from '@constants/exam'

export interface TitleProps {
  title: string
  level: keyof typeof CSTLEVEL
  duration?: number
  total?: string
  time?: string
}

export default ({ title, duration, total, level, time }: TitleProps): JSX.Element => {

  const local = langHook()

  const examSubtitle = (
    <Box>
      <Typography component="span" sx={{ mr: 4 }}>考试时长</Typography>
      <Typography component="span" sx={{ mr: 12 }}>{duration} 分钟</Typography>
      <Typography component="span" sx={{ mr: 4 }}>题目数量</Typography>
      <Typography component="span">{total} 题</Typography>
    </Box>
  )

  const examDetailsSubtitle = (
    <Box>
      <Typography component="span" sx={{ mr: 4 }}>提交时间</Typography>
      <Typography component="span" sx={{ mr: 12 }}>{time}</Typography>
      <Typography component="span" sx={{ mr: 4 }}>费用</Typography>
      <Typography component="span"></Typography>
    </Box>
  )

  return (
    <Card sx={{ mb: 6 }}>
      <CardContent>
        <Box sx={{
          display: 'flex',
          mb: 3.6,
        }}>
          <Typography>
            {title}
          </Typography>
          <Box sx={{
            ml: 2,
            p: 0.5,
            pl: 1.5,
            pr: 1.5,
            backgroundColor: '#ccc',
            fontSize: 12,
          }}>{local(examLang[(CSTLEVEL[(level)] as unknown) as keyof typeof examLang])}</Box>
        </Box>
        {
          (duration && total)
            ? examSubtitle
            : examDetailsSubtitle
        }
      </CardContent>
    </Card>
  )
}