import React from 'react'
import { VisibilityOff as HiddenIcon } from '@mui/icons-material'
import { strings } from '../lang/hidden'

import '../assets/css/hidden.css'

function Hidden({
        className
    }: {
        className?: string
    }) {
  return (
    <div className={`label hidden${className ? ` ${className}` : ''}`} title={strings.HIDDEN_INFO}>
      <HiddenIcon className="label-icon" />
      <span>
        {' '}
        {strings.HIDDEN}
        {' '}
      </span>
    </div>
  )
}

export default Hidden
