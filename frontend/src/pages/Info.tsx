import React from 'react'
import { Link } from '@mui/material'
import { strings as commonStrings } from '../lang/common'

interface InfoProps {
  className?: string,
  message: string,
  style?: React.CSSProperties
}

function Info({
  className,
  message,
  style
}: InfoProps) {
  return (
    <div style={style} className={`${className ? `${className} ` : ''}msg`}>
      <p>{message}</p>
      <Link href="/">{commonStrings.GO_TO_HOME}</Link>
    </div>
  )
}

export default Info
