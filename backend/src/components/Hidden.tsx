
import React from 'react'
import { strings } from '../lang/hidden'
import { VisibilityOff as HiddenIcon } from '@mui/icons-material'

import '../assets/css/hidden.css'

const Hidden = (
    {
        className
    }: {
        className?: string
    }
) => (
    <div className={`label hidden${className ? ` ${className}` : ''}`} title={strings.HIDDEN_INFO} >
        <HiddenIcon className="label-icon" />
        <span> {strings.HIDDEN} </span>
    </div>
)

export default Hidden
