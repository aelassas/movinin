import React, { useEffect, useState } from 'react'
import { Image, StyleSheet, View } from 'react-native'
import * as movininTypes from ':movinin-types'
import * as movininHelper from ':movinin-helper'

import * as helper from '@/common/helper'
import * as env from '@/config/env.config'
import i18n from '@/lang/i18n'
import * as AgencyService from '@/services/AgencyService'
import Link from './Link'
import Switch from './Switch'
import Accordion from './Accordion'

interface AgencyFilterProps {
  visible?: boolean
  style?: object
  onLoad?: (checkedAgencies: string[]) => void
  onChange?: (checkedAgencies: string[]) => void
}

const AgencyFilter = ({
  visible,
  style,
  onLoad,
  onChange
}: AgencyFilterProps) => {
  const [agencies, setAgencies] = useState<movininTypes.User[]>([])
  const [checkedAgencies, setCheckedAgencies] = useState<string[]>([])
  const [allChecked, setAllChecked] = useState(false)

  const init = async () => {
    try {
      const allAgencies = await AgencyService.getAllAgencies()
      if (allAgencies) {
        const _agencies = allAgencies.map((agency: movininTypes.User) => ({
          ...agency,
          checked: false,
        }))
        setAgencies(_agencies)
        if (onLoad) {
          onLoad(movininHelper.flattenAgencies(_agencies))
        }
      } else {
        helper.error()
      }
    } catch (err) {
      helper.error(err)
    }
  }

  useEffect(() => {
    init()
  }, []) // eslint-disable-line react-hooks/exhaustive-deps

  return (
    visible && agencies.length > 1 && (
      <View style={{ ...styles.container, ...style }}>
        <Accordion style={styles.accordion} title={i18n.t('AGENCY')}>
          <View style={styles.agencies}>
            {agencies.map((agency) => (
              agency._id && typeof agency.checked !== 'undefined'
              && (
                <View key={agency._id} style={styles.agency}>
                  <Switch
                    value={agency.checked}
                    onValueChange={(checked) => {
                      if (checked) {
                        agency.checked = true
                        setAgencies(movininHelper.clone(agencies))
                        checkedAgencies.push(agency._id as string)

                        if (checkedAgencies.length === agencies.length) {
                          setAllChecked(true)
                        }
                      } else {
                        agency.checked = false
                        setAgencies(movininHelper.clone(agencies))
                        const index = checkedAgencies.indexOf(agency._id as string)
                        checkedAgencies.splice(index, 1)

                        if (checkedAgencies.length === 0) {
                          setAllChecked(false)
                        }
                      }

                      if (onChange) {
                        onChange(checkedAgencies.length === 0 ? movininHelper.flattenAgencies(agencies) : movininHelper.clone(checkedAgencies))
                      }
                    }}
                  >
                    <Image
                      style={styles.image}
                      source={{
                        uri: movininHelper.joinURL(env.CDN_USERS, agency.avatar),
                      }}
                    />
                  </Switch>
                </View>
              )
            ))}
          </View>
          <Link
            style={styles.link}
            textStyle={styles.linkText}
            label={allChecked ? i18n.t('UNCHECK_ALL') : i18n.t('CHECK_ALL')}
            onPress={() => {
              let _checkedAgencies: string[] = []
              if (allChecked) {
                agencies.forEach((agency) => {
                  agency.checked = false
                })
                setAllChecked(false)
                setAgencies(movininHelper.clone(agencies))
                setCheckedAgencies(_checkedAgencies)
              } else {
                agencies.forEach((agency) => {
                  agency.checked = true
                })
                setAllChecked(true)
                setAgencies(movininHelper.clone(agencies))
                _checkedAgencies = movininHelper.clone(movininHelper.flattenAgencies(agencies))
                setCheckedAgencies(_checkedAgencies)

                if (onChange) {
                  onChange(_checkedAgencies)
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
  accordion: {
    width: '100%',
    maxWidth: 480,
  },
  agencies: {
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'center',
    width: 300,
  },
  agency: {
    width: '50%',
    marginBottom: 7,
  },
  image: {
    width: env.AGENCY_IMAGE_WIDTH,
    height: env.AGENCY_IMAGE_HEIGHT,
    flex: 1,
    resizeMode: 'contain',
  },
  link: {
    marginTop: 10,
  },
  linkText: {
    fontSize: 12,
  },
})

export default AgencyFilter
