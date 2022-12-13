import React, { useState, useEffect, useCallback } from 'react'

import { useAppSelector } from '@store/index'

import { rewardApi } from '@api/index'

import MyAddress from './MyAddress'
import TestRecord from './TestRecord'
import Dialog from './Dialog'

import { SourceDaoReward } from '@api/reward'


export default (): JSX.Element => {

  const { accountAddress } = useAppSelector(state => state.wallet)

  const [rows, setRows] = useState<SourceDaoReward[]>([])

  const [currentRecord, setCurrentRecord] = useState<SourceDaoReward>()

  const [open, setOpen] = useState(false)

  const handleRecord = useCallback((_currentRecord: SourceDaoReward) => {
    setCurrentRecord(_currentRecord)
    setOpen(true)
  }, [])

  const init = async () => {
    const _sbts = await rewardApi.getTokensByUser(accountAddress)

    const promiseSbt: Promise<SourceDaoReward>[] = []

    _sbts.forEach(sbt => {
      promiseSbt.push(rewardApi.getSBTMeta(parseInt(sbt.toString())))
    })

    const sbts = await Promise.all(promiseSbt)

    setRows(sbts)
  }

  useEffect(() => {
    init()
  }, [])

  return (
    <>
      <MyAddress />
      <TestRecord rows={rows} handleRecord={handleRecord} />
      <Dialog open={open} record={currentRecord!} setOpen={setOpen} />
      {/* <button onClick={handleConnect}>connect</button> */}
    </>
  )
}