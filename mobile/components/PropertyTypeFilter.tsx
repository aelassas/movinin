import React, { useState } from 'react'
import { StyleSheet, View } from 'react-native'
import * as movininTypes from ':movinin-types'
import * as movininHelper from ':movinin-helper'

import i18n from '@/lang/i18n'
import Accordion from './Accordion'
import Link from './Link'
import Switch from './Switch'

interface PropertyTypeFilterProps {
  visible?: boolean
  style?: object
  onChange?: (values: movininTypes.PropertyType[]) => void
}

const allPropertyTypes = movininHelper.getAllPropertyTypes()

const PropertyTypeFilter = ({
  visible,
  style,
  onChange
}: PropertyTypeFilterProps) => {
  const [values, setValues] = useState<movininTypes.PropertyType[]>([])
  const [house, setHouse] = useState(false)
  const [apartment, setApartment] = useState(false)
  const [plot, setPlot] = useState(false)
  const [farm, setFarm] = useState(false)
  const [commercial, setCommercial] = useState(false)
  const [industrial, setIndustrial] = useState(false)
  const [townHouse, setTownHouse] = useState(false)

  const [allChecked, setAllChecked] = useState(false)

  const handleOnChange = (_values: movininTypes.PropertyType[]) => {
    if (onChange) {
      onChange(_values.length === 0 ? allPropertyTypes : movininHelper.clone(_values))
    }
  }

  const onValueChangeHouse = (checked: boolean) => {
    if (checked) {
      values.push(movininTypes.PropertyType.House)

      if (values.length === 7) {
        setAllChecked(true)
      }
    } else {
      values.splice(
        values.findIndex((v) => v === movininTypes.PropertyType.House),
        1,
      )

      if (values.length === 0) {
        setAllChecked(false)
      }
    }

    setHouse(checked)
    setValues(values)
    handleOnChange(values)
  }

  const onValueChangeApartment = (checked: boolean) => {
    if (checked) {
      values.push(movininTypes.PropertyType.Apartment)

      if (values.length === 7) {
        setAllChecked(true)
      }
    } else {
      values.splice(
        values.findIndex((v) => v === movininTypes.PropertyType.Apartment),
        1,
      )

      if (values.length === 0) {
        setAllChecked(false)
      }
    }

    setApartment(checked)
    setValues(values)
    handleOnChange(values)
  }

  const onValueChangePlot = (checked: boolean) => {
    if (checked) {
      values.push(movininTypes.PropertyType.Plot)

      if (values.length === 7) {
        setAllChecked(true)
      }
    } else {
      values.splice(
        values.findIndex((v) => v === movininTypes.PropertyType.Plot),
        1,
      )

      if (values.length === 0) {
        setAllChecked(false)
      }
    }

    setPlot(checked)
    setValues(values)
    handleOnChange(values)
  }

  const onValueChangeFarm = (checked: boolean) => {
    if (checked) {
      values.push(movininTypes.PropertyType.Farm)

      if (values.length === 7) {
        setAllChecked(true)
      }
    } else {
      values.splice(
        values.findIndex((v) => v === movininTypes.PropertyType.Farm),
        1,
      )

      if (values.length === 0) {
        setAllChecked(false)
      }
    }

    setFarm(checked)
    setValues(values)
    handleOnChange(values)
  }

  const onValueChangeCommercial = (checked: boolean) => {
    if (checked) {
      values.push(movininTypes.PropertyType.Commercial)

      if (values.length === 7) {
        setAllChecked(true)
      }
    } else {
      values.splice(
        values.findIndex((v) => v === movininTypes.PropertyType.Commercial),
        1,
      )

      if (values.length === 0) {
        setAllChecked(false)
      }
    }

    setCommercial(checked)
    setValues(values)
    handleOnChange(values)
  }

  const onValueChangeIndustrial = (checked: boolean) => {
    if (checked) {
      values.push(movininTypes.PropertyType.Industrial)

      if (values.length === 7) {
        setAllChecked(true)
      }
    } else {
      values.splice(
        values.findIndex((v) => v === movininTypes.PropertyType.Industrial),
        1,
      )

      if (values.length === 0) {
        setAllChecked(false)
      }
    }

    setIndustrial(checked)
    setValues(values)
    handleOnChange(values)
  }

  const onValueChangeTownHouse = (checked: boolean) => {
    if (checked) {
      values.push(movininTypes.PropertyType.Townhouse)

      if (values.length === 7) {
        setAllChecked(true)
      }
    } else {
      values.splice(
        values.findIndex((v) => v === movininTypes.PropertyType.Townhouse),
        1,
      )

      if (values.length === 0) {
        setAllChecked(false)
      }
    }

    setTownHouse(checked)
    setValues(values)
    handleOnChange(values)
  }

  return (
    visible && (
      <View style={{ ...styles.container, ...style }}>
        <Accordion style={styles.accordion} title={i18n.t('PROPERTY_TYPE')}>
          <View style={styles.contentContainer}>
            <Switch
              style={styles.component}
              textStyle={styles.text}
              value={house}
              label={i18n.t('HOUSE')}
              onValueChange={onValueChangeHouse}
            />
            <Switch
              style={styles.component}
              textStyle={styles.text}
              value={apartment}
              label={i18n.t('APARTMENT')}
              onValueChange={onValueChangeApartment}
            />
            <Switch
              style={styles.component}
              textStyle={styles.text}
              value={plot}
              label={i18n.t('PLOT')}
              onValueChange={onValueChangePlot}
            />
            <Switch
              style={styles.component}
              textStyle={styles.text}
              value={farm}
              label={i18n.t('FARM')}
              onValueChange={onValueChangeFarm}
            />
            <Switch
              style={styles.component}
              textStyle={styles.text}
              value={commercial}
              label={i18n.t('COMMERCIAL')}
              onValueChange={onValueChangeCommercial}
            />
            <Switch
              style={styles.component}
              textStyle={styles.text}
              value={industrial}
              label={i18n.t('INDUSTRIAL')}
              onValueChange={onValueChangeIndustrial}
            />
            <Switch
              style={styles.component}
              textStyle={styles.text}
              value={townHouse}
              label={i18n.t('TOWN_HOUSE')}
              onValueChange={onValueChangeTownHouse}
            />
          </View>
          <Link
            style={styles.link}
            textStyle={styles.linkText}
            label={allChecked ? i18n.t('UNCHECK_ALL') : i18n.t('CHECK_ALL')}
            onPress={() => {
              if (allChecked) {
                setHouse(false)
                setApartment(false)
                setPlot(false)
                setFarm(false)
                setCommercial(false)
                setIndustrial(false)
                setTownHouse(false)
                setValues([])
                setAllChecked(false)
              } else {
                setHouse(true)
                setApartment(true)
                setPlot(true)
                setFarm(true)
                setCommercial(true)
                setIndustrial(true)
                setTownHouse(true)
                setValues(allPropertyTypes)
                setAllChecked(true)
                if (onChange) {
                  onChange(movininHelper.clone(allPropertyTypes))
                }
              }
            }}
          />
        </Accordion>
      </View>
    )
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
  },
  contentContainer: {
    width: '100%',
    alignItems: 'flex-start',
    marginTop: 10,
  },
  accordion: {
    width: '100%',
    maxWidth: 480,
  },
  component: {
    marginTop: 0,
  },
  text: {
    fontSize: 12,
  },
  link: {
    marginTop: 10,
  },
  linkText: {
    fontSize: 12,
  },
})

export default PropertyTypeFilter
