import React from 'react'
import {
  Tooltip
} from '@mui/material'
import {
  House as PropertyTypeIcon,
  SingleBed as BedroomsIcon,
  Shower as BathroomsIcon,
  AcUnit as AirconIcon,
  Countertops as KitchensIcon,
  DirectionsCar as ParkingSpacesIcon,
  Chair as FurnishedIcon,
  Pets as PetsAllowedIcon,
  Check as CheckIcon,
  Clear as UncheckIcon,
  Info as InfoIcon,
  Person as MinimumAgeIcon,
  LocationOn as LocationIcon,
  AttachMoney as RentalTermIcon,
  PhotoSizeSelectSmall as SizeIcon
} from '@mui/icons-material'
import * as movininTypes from 'movinin-types'
import * as movininHelper from 'movinin-helper'
import * as helper from '../common/helper'
import { strings } from '../lang/properties'
import { strings as cpStrings } from '../lang/create-property'
import Hidden from './Hidden'
import Available from './Available'
import env from '../config/env.config'

import '../assets/css/property-info.css'

interface PropertyInfoProps {
  property: movininTypes.Property
  user?: movininTypes.User,
  booking?: movininTypes.Booking
  description?: boolean
  className?: string
}

const PropertyInfo = ({
  property,
  user,
  booking,
  description,
  className,
}: PropertyInfoProps) => {
  const fr = movininHelper.fr(user)
  const edit = helper.admin(user) || (user?._id === property.agency._id)

  const getExtraIcon = (option: string, extra: number) => {
    let available = false
    if (booking) {
      if (option === 'cancellation' && booking.cancellation && extra > 0) {
        available = true
      }
    }

    return extra === -1
      ? <UncheckIcon className="unavailable" />
      : extra === 0 || available
        ? <CheckIcon className="available" />
        : <InfoIcon className="extra-info" />
  }

  const size = `${property.size} ${env.SIZE_UNIT}`

  return (
    (property && user
      && (
        <div className={`property-info${className ? ` ${className}` : ''}`}>
          <ul className="property-info-list">
            <li className="property-type">
              <Tooltip title={helper.getPropertyType(property.type)} placement="top">
                <div className="property-info-list-item">
                  <PropertyTypeIcon />
                  <span className="property-info-list-text">{helper.getPropertyType(property.type)}</span>
                </div>
              </Tooltip>
            </li>
            <li className="bedrooms">
              <Tooltip title={helper.getBedroomsTooltip(property.bedrooms, fr)} placement="top">
                <div className="property-info-list-item">
                  <BedroomsIcon />
                  <span className="property-info-list-text">{property.bedrooms}</span>
                </div>
              </Tooltip>
            </li>
            <li className="bathrooms">
              <Tooltip title={helper.getBathroomsTooltip(property.bathrooms, fr)} placement="top">
                <div className="property-info-list-item">
                  <BathroomsIcon />
                  <span className="property-info-list-text">{property.bathrooms}</span>
                </div>
              </Tooltip>
            </li>
            <li className="kitchens">
              <Tooltip title={helper.getKitchensTooltip(property.kitchens)} placement="top">
                <div className="property-info-list-item">
                  <KitchensIcon />
                  <span className="property-info-list-text">{property.kitchens}</span>
                </div>
              </Tooltip>
            </li>
            <li className="parking-spaces">
              <Tooltip title={helper.getKParkingSpacesTooltip(property.parkingSpaces, fr)} placement="top">
                <div className="property-info-list-item">
                  <ParkingSpacesIcon />
                  <span className="property-info-list-text">{property.parkingSpaces}</span>
                </div>
              </Tooltip>
            </li>
            {
              property.furnished && (
                <li className="aircon">
                  <Tooltip title={strings.FURNISHED_TOOLTIP} placement="top">
                    <div className="property-info-list-item">
                      <FurnishedIcon />
                    </div>
                  </Tooltip>
                </li>
              )
            }
            {
              property.aircon && (
                <li className="aircon">
                  <Tooltip title={strings.AIRCON_TOOLTIP} placement="top">
                    <div className="property-info-list-item">
                      <AirconIcon />
                    </div>
                  </Tooltip>
                </li>
              )
            }
            {
              property.petsAllowed && (
                <li className="aircon">
                  <Tooltip title={strings.PETS_ALLOWED_TOOLTIP} placement="top">
                    <div className="property-info-list-item">
                      <PetsAllowedIcon />
                    </div>
                  </Tooltip>
                </li>
              )
            }
          </ul>
          <ul className="extras-list">
            {
              property.size
              && (
                <li>
                  <Tooltip title={size} placement="left">
                    <div className="property-info-list-item">
                      <SizeIcon />
                      <span className="property-info-list-text">{size}</span>
                    </div>
                  </Tooltip>
                </li>
              )
            }
            <li>
              <Tooltip title={booking ? '' : property.cancellation > -1 ? strings.CANCELLATION_TOOLTIP : helper.getCancellation(property.cancellation, fr)} placement="left">
                <div className="property-info-list-item">
                  {getExtraIcon('cancellation', property.cancellation)}
                  <span className="property-info-list-text">{helper.getCancellation(property.cancellation, fr)}</span>
                </div>
              </Tooltip>
            </li>
            {property.location.name && (
              <li>
                <Tooltip title={property.location.name} placement="left">
                  <div className="property-info-list-item">
                    <LocationIcon />
                    <span className="property-info-list-text">{property.location.name}</span>
                  </div>
                </Tooltip>
              </li>
            )}
            {edit && (
              <li>
                <Tooltip title={cpStrings.MINIMUM_AGE} placement="left">
                  <div className="property-info-list-item">
                    <MinimumAgeIcon />
                    <span className="property-info-list-text">{`${property.minimumAge} ${strings.YEARS}`}</span>
                  </div>
                </Tooltip>
              </li>
            )}
            <li>
              <Tooltip title={cpStrings.RENTAL_TERM} placement="left">
                <div className="property-info-list-item">
                  <RentalTermIcon />
                  <span className="property-info-list-text">{helper.rentalTerm(property.rentalTerm)}</span>
                </div>
              </Tooltip>
            </li>
            {edit && property.hidden && (
              <li>
                <div className="property-info-list-item">
                  <Hidden />
                </div>
              </li>
            )}
            {edit && (
              <li>
                <div className="property-info-list-item">
                  <Available available={property.available} />
                </div>
              </li>
            )}
            {description && (
              <li>
                <div className="property-info-list-item">
                  <div
                    className="property-info-description"
                    dangerouslySetInnerHTML={{ __html: property.description }}
                  />
                </div>
              </li>
            )}
          </ul>
        </div>
      ))
    || <></>
  )
}

export default PropertyInfo
