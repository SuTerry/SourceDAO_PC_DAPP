import React from 'react'

import { Outlet } from 'react-router-dom'

import { Box } from '@mui/material'

import Header from '@components/Header'
import Sider from '@components/Sider'

import { useAppSelector } from '@store/index'


export default (): JSX.Element => {

  const { isHeader, isSider } = useAppSelector((state) => state.router)

  return (
    <Box
      sx={{
        display: 'flex'
      }}
    >
      {isSider && <Sider />}
      <Box
        sx={{
          flex: 1
        }}
      >
        {isHeader && <Header />}
        <Box sx={{
          padding: 4,
        }}>
          <Outlet />
        </Box>
      </Box>
    </Box>
  )
}
