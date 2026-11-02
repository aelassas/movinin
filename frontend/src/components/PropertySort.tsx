import React from 'react'
import {
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  SelectChangeEvent,
} from '@mui/material'
import * as movininTypes from ':movinin-types'
import { strings } from '@/lang/properties'

import '@/assets/css/property-sort.css'

interface PropertySortProps {
  value?: movininTypes.PropertySortType
  onChange: (value: movininTypes.PropertySortType) => void
  className?: string
}

const PropertySort: React.FC<PropertySortProps> = ({
  value = movininTypes.PropertySortType.Default,
  onChange,
  className,
}) => {
  const handleChange = (e: SelectChangeEvent<string>) => {
    onChange(e.target.value as movininTypes.PropertySortType)
  }

  return (
    <div className={`property-sort ${className || ''}`.trim()}>
      <FormControl size="small" variant="outlined" className="sort-control">
        <InputLabel id="property-sort-label">{strings.SORT_BY}</InputLabel>
        <Select
          labelId="property-sort-label"
          id="property-sort-select"
          value={value}
          label={strings.SORT_BY}
          onChange={handleChange}
        >
          <MenuItem value={movininTypes.PropertySortType.Default}>
            {strings.SORT_DEFAULT}
          </MenuItem>
          <MenuItem value={movininTypes.PropertySortType.PriceAsc}>
            {strings.SORT_PRICE_ASC}
          </MenuItem>
          <MenuItem value={movininTypes.PropertySortType.PriceDesc}>
            {strings.SORT_PRICE_DESC}
          </MenuItem>
        </Select>
      </FormControl>
    </div>
  )
}

export default PropertySort
