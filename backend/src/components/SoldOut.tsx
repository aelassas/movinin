
import React from 'react'
import { strings } from '../lang/sold-out'
import { Block as SoldOutIcon } from '@mui/icons-material'

import '../assets/css/sold-out.css'

const SoldOut = (
    {
        className
    }: {
        className?: string
    }
) => (
    <div className={`label sold-out${className ? ` ${className}` : ''}`} title={strings.SOLD_OUT_INFO} >
        <SoldOutIcon className="label-icon" />
        <span> {strings.SOLD_OUT} </span>
    </div>
)

export default SoldOut
