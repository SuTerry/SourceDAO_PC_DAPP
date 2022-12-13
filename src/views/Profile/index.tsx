import React from 'react'

import { useAppSelector } from '@store/index'

import NotConnected from './NotConnected'
import Connected from './Connected'

export default (): JSX.Element => {

  const { accountAddress } = useAppSelector((state) => state.wallet)

  return (
    <>
      {
        accountAddress
          ? <Connected />
          : <NotConnected />
      }
    </>
  )
}
