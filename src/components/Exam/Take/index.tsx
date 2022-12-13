import React, { useEffect, useRef } from 'react'

import {
  Box,
  Card,
  CardContent,
  Divider,
  FormControlLabel,
  Radio,
  RadioGroup,
  Skeleton,
  Typography,
} from '@mui/material'


interface TakeProps {
  exam: Array<null | ExamJson>
  currentExam: number
  handleChange: (e: React.ChangeEvent<HTMLInputElement>, i: number) => void
}

export interface ExamJson {
  type: string
  level: number
  stem: string
  options: string[]
  standard: number
}


export default ({ exam, currentExam, handleChange }: TakeProps): JSX.Element => {

  const cardRef = useRef<HTMLDivElement>(null)
  const boxRefs = useRef<{ [key: string]: HTMLDivElement }>({})

  useEffect(() => {
    const top = boxRefs.current[currentExam]?.offsetTop

    if (top) cardRef.current?.scrollTo({ top: top - 213, behavior: 'smooth' })

  }, [currentExam])

  return (
    <Card
      ref={cardRef}
      sx={{
        height: 'calc(100vh - 230px)',
        overflowY: 'auto',
        '&::-webkit-scrollbar': {
          width: 10
        },
        '&::-webkit-scrollbar-track': {
          backgroundColor: '#f5f7fa'
        },
        '&::-webkit-scrollbar-thumb': {
          backgroundColor: '#e4e7ed',
          borderRadius: 2
        },
      }}
    >
      <CardContent>
        {exam.map((item, index) => {
          return (
            <Box
              ref={(r: HTMLDivElement) => { boxRefs.current[index] = r }}
              key={index}
              sx={{
                boxSizing: 'border-box',
                p: 3,
              }}
            >
              {
                item
                  ? <Box>
                    <Typography sx={{
                      mb: 4,
                    }}>{index + 1}. {item.stem}</Typography>
                    <RadioGroup onChange={(e) => handleChange(e, index)}>
                      {
                        item.options.map((o, i) => {
                          return (
                            <FormControlLabel key={i} value={i + 1} control={<Radio />} label={o} />
                          )
                        })
                      }
                    </RadioGroup>
                  </Box>
                  : <Box>
                    <Skeleton variant="text" animation="wave" width={600} height={26} sx={{ mb: 4 }} />
                    <Skeleton variant="text" animation="wave" width={300} height={26} sx={{ mb: 1.5 }} />
                    <Skeleton variant="text" animation="wave" width={300} height={26} sx={{ mb: 1.5 }} />
                    <Skeleton variant="text" animation="wave" width={300} height={26} sx={{ mb: 1.5 }} />
                    <Skeleton variant="text" animation="wave" width={300} height={26} sx={{ mb: 1.5 }} />
                  </Box>
              }
              {index < exam.length - 1 && <Divider sx={{ mt: 4 }} />}
            </Box>
          )
        })}
      </CardContent>
    </Card>
  )
}