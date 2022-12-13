import React from 'react'

import { Card, CardContent, Typography } from '@mui/material'

import { scoreGrade } from '@utils/index'

interface ScoreGradeProps {
  score: number
}

export default ({ score }: ScoreGradeProps): JSX.Element => {
  return (
    <Card sx={{ mb: 6 }}>
      <CardContent>
        <Typography sx={{ fontSize: 14 }} color="text.secondary">
          考试成绩
        </Typography>
        <Typography variant="h3" sx={{
          textAlign: 'center',
          fontWeight: 700,
        }} >
          {scoreGrade(score)}
        </Typography>
      </CardContent>
    </Card>
  )
}