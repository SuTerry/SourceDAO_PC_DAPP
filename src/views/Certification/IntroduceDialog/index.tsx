import React, { ChangeEvent, useState } from 'react'

import { useNavigate } from 'react-router-dom'

import {
  Dialog,
  DialogContent,
  DialogActions,
  Box,
  RadioGroup,
  FormControlLabel,
  Radio,
} from '@mui/material'

import LoadingButton from '@mui/lab/LoadingButton'

import DialogTitle from './DialogTitle'

import { examApi } from '@api/index'

import { randomExamId } from '@utils/index'

import langHook from '@hooks/localHook'

import { examLang } from '@langs/index'

import { LEVEL } from '@constants/exam'


interface IntroduceDialogProps {
  open: boolean
  setOpen: (state: boolean) => void
}


export default ({ open, setOpen }: IntroduceDialogProps): JSX.Element => {

  const navigate = useNavigate()

  const local = langHook()

  const [level, setLevel] = useState('1')

  const [loading, setLoading] = useState(false)

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setLevel(event.target.value)
  }

  const handleClose = () => {
    if (!loading) setOpen(false)
  }

  const handleStart = async () => {

    const examId = randomExamId()

    setLoading(true)

    try {
      const type = 1
      const exam = await examApi.genExam(examId, type, parseInt(level))
      await exam.wait()
      navigate(`/exam/${examId}`, {
        state: {
          type,
          level,
          title: 'Blockchain Basic Test',
        }
      })
    } catch (error) {
      setLoading(false)
    }
  }

  return (
    <Dialog
      onClose={handleClose}
      aria-labelledby="customized-dialog-title"
      open={open}
      maxWidth="md"
      fullWidth={true}
    >
      <DialogTitle onClose={handleClose}>
        Modal title
      </DialogTitle>

      <DialogContent sx={{
        display: 'flex',
        height: 200,
      }}>
        <Box sx={{
          width: 140,
          border: '1px solid #868686',
          borderRadius: 2,
          mr: 10,
        }}></Box>
        <Box>
          <RadioGroup
            aria-labelledby="demo-radio-buttons-group-label"
            name="radio-buttons-group"
            value={level}
            onChange={handleChange}
            row
          >
            <FormControlLabel value={LEVEL.primary} control={<Radio />} label={local(examLang.primary)} />
            <FormControlLabel value={LEVEL.intermediate} control={<Radio />} label={local(examLang.intermediate)} />
            <FormControlLabel value={LEVEL.advanced} control={<Radio />} label={local(examLang.advanced)} />
          </RadioGroup>
        </Box>
      </DialogContent>

      <DialogActions>
        <LoadingButton
          sx={{
            width: 260,
            margin: '0 auto 10px'
          }}
          autoFocus
          loading={loading}
          variant="outlined"
          onClick={handleStart}
        >
          {local(examLang.startNow)}
        </LoadingButton>
      </DialogActions>
    </Dialog>
  )
}
