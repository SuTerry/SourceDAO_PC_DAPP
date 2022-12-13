import React from 'react'

import { useNavigate } from 'react-router-dom'

import {
  Box,
  Button,
  Dialog,
  Slide,
  Typography,
} from '@mui/material'

import { TransitionProps } from '@mui/material/transitions'

import langHook from '@hooks/localHook'

import { examLang } from '@langs/index'

import CheckBoxIcon from '@mui/icons-material/CheckBox'

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
  sbt: string
}

export default ({ open, sbt }: DialogProps): JSX.Element => {

  const navigate = useNavigate()

  const local = langHook()

  const handle = () => navigate('/certificationCenter')

  return (
    <div>
      <Dialog
        fullScreen
        open={open}
        TransitionComponent={Transition}
      >
        <Box sx={{
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
        }}>
          {
            sbt
              ? <>
                <CheckBoxIcon sx={{
                  mb: 1
                }} />
                <Typography variant="h6" component="h6">{local(examLang.congratulations)}</Typography>
                <Button
                  variant="outlined"
                  sx={{
                    width: 260,
                  }}
                  onClick={handle}
                >{local(examLang.confirm)}</Button>
              </>
              : <>
                <Typography>{local(examLang.examResult)}</Typography>
              </>
          }
        </Box>
      </Dialog>
    </div>
  )
}
