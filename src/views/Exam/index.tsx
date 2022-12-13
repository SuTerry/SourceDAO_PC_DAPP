import React, { ChangeEvent, useEffect, useState, useCallback } from 'react'

import { useParams, useLocation, useNavigate } from 'react-router-dom'

import { Box } from '@mui/material'

import { create } from 'ipfs-core'

import Title from '@components/Exam/Title'
import Take, { ExamJson } from '@components/Exam/Take'
import CountDown from '@components/Exam/CountDown'
import Navigate from '@components/Exam/Navigate'
import Submit from '@components/Exam/Submit'
import Dialog from './Dialog'

import { examApi, rewardApi } from '@api/index'

import { utf8ArrayToStr } from '@utils/index'

const cids = [
  'QmNm13eMJ5XEmVsaZuTV4KbWDcq8yWKjEhdq7ve72XDXQp',
  'Qmcwu35bFSWwgYwpJcShfjZeMLy3avTQRsuxBfg6gf85Lj',
  'QmXHQ79oRR2mRf4EEL8ohrqZFswYBea52NqCP62RWMbBm1',
  'QmcxzQ2JVbZzTfaWrLQQdEpG6Gfw5F78UxUefPQE3Vgp8K',
  'Qma98TGWTDa6u72vFRXGrXxoHMN69WjaS5uhJKVpjwkqSo',
  'QmS3CEXaZKADpSrias5XgqhciQhW9Mvq9XhXS2ri8SDAXu',
  'Qmf51hRRujyZJu1V9Vbf4YxnRRk62biPqwrVCaF2Jah44Z',
  'QmRZ59ihC5UWNV8twSrvQpUpLKxxSJxH8SpYSPLyJuZ7t6',
]

export default (): JSX.Element => {

  const { id = '' } = useParams()

  const { state } = useLocation()

  const navigate = useNavigate()

  const beforeunload = (event: BeforeUnloadEvent) => {
    event.returnValue = ''
  }

  const [exam, setExam] = useState<Array<null | ExamJson>>([])

  const [answers, setAnswers] = useState<number[]>([])

  const [duration, setDuration] = useState(-1)

  const [currentExam, setCurrentExam] = useState(0)

  const [timeout, setTimeout] = useState(false)

  const [open, setOpen] = useState(false)

  const [sbt, setSbt] = useState('')

  const handleChange = useCallback((event: ChangeEvent<HTMLInputElement>, index: number) => {
    const _answers = [...answers]
    _answers.splice(index, 1, parseInt(event.target.value))
    setAnswers(_answers)
  }, [answers])

  const submit = async () => {
    const { type, level } = state
    // const result = await rewardApi.checkAndTryReward(id, answers, type, parseInt(level))
    const result = await rewardApi.checkAndTryReward(id, [1, 2], type, parseInt(level))

    setOpen(true)
    
    await result.wait()

    // const examSbt = await rewardApi.getSBTMetaByExam(id)
    

    setSbt('1234')
  }

  const init = async () => {

    if (!state) return navigate('/certificationCenter')

    addEventListener('beforeunload', beforeunload)

    document.onkeydown = (e) => { if (e.keyCode === 116) return false }

    document.oncontextmenu = () => false

    // const exams = await examApi.getExam(id)
    // console.log(exams, 'exams')
    

    const _duration = await examApi.getExaminationDuration(state.type, state.level)
    setDuration(_duration)

    setExam(new Array(cids.length).fill(null))
    setAnswers(new Array(cids.length).fill(0))

    const ipfs = await create()

    const examJson: Promise<ExamJson>[] = []

    cids.forEach(cid => {
      examJson.push(new Promise(async (resolve) => {
        const cated = await ipfs.cat(cid)
        for await (const current of cated) {
          resolve(JSON.parse(utf8ArrayToStr(current)))
        }
      }))
    })

    const exam = await Promise.all(examJson)

    setExam(exam)

  }

  useEffect(() => {
    init()
    return () => {
      removeEventListener('beforeunload', beforeunload)
      document.onkeydown = (e) => { if (e.keyCode === 116) return true }
      document.oncontextmenu = () => true
    }
  }, [])

  return (
    state && duration > -1 && <>
      <Box sx={{ display: 'flex' }}>
        <Box sx={{ flex: 1, mr: 6 }}>
          <Title {...state} duration={duration} total={exam.length} />
          <Take exam={exam} currentExam={currentExam} handleChange={handleChange} />
        </Box>
        <Box sx={{ width: 360 }}>
          <CountDown duration={duration} setTimeout={setTimeout} />
          <Navigate answers={answers} setCurrentExam={setCurrentExam} />
          <Submit answers={answers} timeout={timeout} submit={submit} />
        </Box>
      </Box>
      <Dialog open={open} sbt={sbt} />
    </>
  )
}
