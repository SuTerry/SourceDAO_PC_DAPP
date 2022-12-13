import React from 'react'

import {
  Box,
  Dialog,
  DialogTitle,
  DialogContent,
  IconButton,
  Slide,
} from '@mui/material'

import { TransitionProps } from '@mui/material/transitions'

import { dateTimeConversion } from '@utils/index'

import Title from '@components/Exam/Title'
import ScoreGrade from '@components/Exam/ScoreGrade'

import CloseIcon from '@mui/icons-material/Close'

import { SourceDaoReward } from '@api/reward'


const Transition = React.forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement;
  },
  ref: React.Ref<unknown>,
) {
  return <Slide direction="up" ref={ref} {...props} />
})

interface DialogProps {
  open: boolean
  record: SourceDaoReward
  setOpen: (open: boolean) => void
}

export default ({ open, record, setOpen }: DialogProps): JSX.Element => {

  return (
    <div>
      <Dialog
        fullScreen
        open={open}
        TransitionComponent={Transition}
      >
        <DialogTitle
          sx={{
            display: 'flex',
            justifyContent: 'end',
            pt: 0,
            pb: 0,
            backgroundColor: '#f0f2f5'
          }}
        >
          <IconButton
            edge="end"
            color="inherit"
            onClick={() => setOpen(false)}
            aria-label="close"
          >
            <CloseIcon />
          </IconButton>
        </DialogTitle>
        <DialogContent
          sx={{
            pt: 0,
            backgroundColor: '#f0f2f5'
          }}
        >
          {record && <Box sx={{ display: 'flex' }}>
            <Box sx={{ flex: 1, mr: 6 }}>
              <Title
                title='1234'
                level={record.qlevel}
                time={dateTimeConversion(
                  parseInt(record.time.toString()) * 1000,
                  'YYYY-MM-DD HH:mm:ss'
                )}
              />
              {/* <Take exam={exam} currentExam={currentExam} handleChange={handleChange} /> */}
            </Box>
            <Box sx={{ width: 360 }}>
              <ScoreGrade score={record.score} />
              {/* <Navigate answers={answers} setCurrentExam={setCurrentExam} /> */}
              {/* <Submit answers={answers} timeout={timeout} submit={submit} /> */}
            </Box>
          </Box>}
        </DialogContent>
      </Dialog>
    </div>
  )
}
