import React, { useState } from 'react'

import IntroduceDialog from './IntroduceDialog'

export default (): JSX.Element => {

  const [open, setOpen] = useState(false)

  return (
    <>
      <button onClick={() => setOpen(true)}>dialog</button>
      <IntroduceDialog open={open} setOpen={setOpen} />
    </>
  )
}