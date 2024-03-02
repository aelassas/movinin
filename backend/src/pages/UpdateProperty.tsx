import React, { useEffect, useRef, useState } from 'react'
import {
  Input,
  InputLabel,
  FormControl,
  Button,
  Paper,
  FormControlLabel,
  Switch,
  TextField,
  FormHelperText
} from '@mui/material'
import { useNavigate } from 'react-router-dom'
import { Editor } from 'react-draft-wysiwyg'
import { EditorState, convertToRaw, ContentState } from 'draft-js'
import draftToHtml from 'draftjs-to-html'
import htmlToDraft from 'html-to-draftjs'
import * as movininTypes from 'movinin-types'
import * as movininHelper from 'movinin-helper'
import Master from '../components/Master'
import env from '../config/env.config'
import { strings as commonStrings } from '../lang/common'
import { strings as csStrings } from '../lang/properties'
import { strings } from '../lang/create-property'
import * as PropertyService from '../services/PropertyService'
import * as helper from '../common/helper'
import Error from '../components/Error'
import Backdrop from '../components/SimpleBackdrop'
import AgencySelectList from '../components/AgencySelectList'
import LocationSelectList from '../components/LocationSelectList'
import PropertyTypeList from '../components/PropertyTypeList'
import ImageEditor from '../components/ImageEditor'
import RentalTermList from '../components/RentalTermList'

import '../assets/css/create-property.css'
import '../assets/css/update-property.css'

const UpdateProperty = () => {
  const navigate = useNavigate()
  const [user, setUser] = useState<movininTypes.User>()
  const [loading, setLoading] = useState(false)
  const [noMatch, setNoMatch] = useState(false)
  const [error, setError] = useState(false)
  const [visible, setVisible] = useState(false)

  const [image, setImage] = useState('')
  const [images, setImages] = useState<string[]>([])
  const [tempImages, setTempImages] = useState<string[]>([])
  const [imageError, setImageError] = useState(false)
  const [imageRequired, setImageRequired] = useState(false)
  const [imageUpdated, setImageUpdated] = useState(false)

  const [property, setProperty] = useState<movininTypes.Property>()
  const [name, setName] = useState('')
  const [agency, setAgency] = useState<movininTypes.Option>()
  const [location, setLocation] = useState<movininTypes.Option>()
  const [address, setAddress] = useState('')
  const [type, setType] = useState('')
  const [price, setPrice] = useState('')
  const [minimumAge, setMinimumAge] = useState(String(env.MINIMUM_AGE))
  const [minimumAgeValid, setMinimumAgeValid] = useState(true)
  const [available, setAvailable] = useState(false)
  const [description, setDescription] = useState('')
  const [descriptionError, setDescriptionError] = useState(false)
  const [bedrooms, setBedrooms] = useState('1')
  const [bathrooms, setBathrooms] = useState('1')
  const [kitchens, setKitchens] = useState('1')
  const [parkingSpaces, setParkingSpaces] = useState('1')
  const [size, setSize] = useState('')
  const [aircon, setAircon] = useState(false)
  const [furnished, setFurnished] = useState(false)
  const [petsAllowed, setPetsAllowed] = useState(false)
  const [cancellation, setCancellation] = useState('')
  const [hidden, setHidden] = useState(false)
  const [formError, setFormError] = useState(false)
  const [imageViewerOpen, setImageViewerOpen] = useState(false)
  const [editorState, setEditorState] = useState<EditorState>()
  const [rentalTerm, setRentalTerm] = useState('')

  const createPropertyRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (createPropertyRef.current) {
      createPropertyRef.current.onwheel = (e: globalThis.WheelEvent) => {
        if (imageViewerOpen) {
          e.preventDefault()
        }
      }
    }
  }, [imageViewerOpen])

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value)
  }

  const handleAgencyChange = (values: movininTypes.Option[]) => {
    setAgency(values.length > 0 ? values[0] : undefined)
  }

  const handleLocationChange = (locations: movininTypes.Option[]) => {
    setLocation(locations[0])
  }

  const handleAddressChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setAddress(e.target.value)
  }

  const handlePropertyTypeChange = (value: string) => {
    setType(value)
  }

  const handleRentalTermChange = (value: string) => {
    setRentalTerm(value)
  }

  const handlePriceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPrice(e.target.value)
  }

  const validateMinimumAge = (age: string, updateState = true) => {
    if (age) {
      const _age = Number.parseInt(age, 10)
      const _minimumAgeValid = _age >= env.MINIMUM_AGE && _age <= 99
      if (updateState) {
        setMinimumAgeValid(_minimumAgeValid)
      }
      if (_minimumAgeValid) {
        setFormError(false)
      }
      return _minimumAgeValid
    }
    setMinimumAgeValid(true)
    setFormError(false)
    return true
  }

  const handleMinimumAgeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setMinimumAge(e.target.value)

    const _minimumAgeValid = validateMinimumAge(e.target.value, false)
    if (_minimumAgeValid) {
      setMinimumAgeValid(true)
      setFormError(false)
    }
  }

  const handleAvailableChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setAvailable(e.target.checked)
  }

  const handleEditorStateChange = (state: EditorState) => {
    setEditorState(state)
    const content = draftToHtml(convertToRaw(state.getCurrentContent()))
    const desc = movininHelper.trimCarriageReturn(content).trim() === '<p></p>' ? '' : content
    setDescription(desc)
    if (desc) {
      setDescriptionError(false)
    }
  }

  const handlBedroomsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setBedrooms(e.target.value)
  }

  const handlBathroomsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setBathrooms(e.target.value)
  }

  const handlKitchensChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setKitchens(e.target.value)
  }

  const handlParkingSpacesChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setParkingSpaces(e.target.value)
  }

  const handSizeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSize(e.target.value)
  }

  const handleAirconChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setAircon(e.target.checked)
  }

  const handleFurnishedChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFurnished(e.target.checked)
  }

  const handlePetsAllowedChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPetsAllowed(e.target.checked)
  }

  const handleCancellationChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCancellation(e.target.value)
  }

  const handleHiddenChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setHidden(e.target.checked)
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    try {
      e.preventDefault()

      if (!property || !agency) {
        helper.error()
        return
      }

      const _minimumAgeValid = validateMinimumAge(minimumAge)
      if (!_minimumAgeValid) {
        setFormError(true)
        setImageError(false)
        return
      }

      if (!image) {
        setImageError(true)
        return
      }

      if (!description) {
        setDescriptionError(true)
        setFormError(false)
        setImageError(false)
        return
      }

      const data = {
        _id: property._id,
        name,
        agency: agency._id,
        type,
        description,
        image,
        images,
        bedrooms: Number.parseInt(bedrooms, 10),
        bathrooms: Number.parseInt(bathrooms, 10),
        kitchens: Number.parseInt(kitchens, 10),
        parkingSpaces: Number.parseInt(parkingSpaces, 10),
        size: size ? Number(size) : undefined,
        petsAllowed,
        furnished,
        aircon,
        minimumAge: Number.parseInt(minimumAge, 10),
        location: location?._id,
        address,
        price: Number(price),
        hidden,
        cancellation: movininHelper.extraToNumber(cancellation),
        available,
        rentalTerm
      }

      const status = await PropertyService.update(data)

      if (status === 200) {
        helper.info(commonStrings.UPDATED)
      } else {
        helper.error()
      }
    } catch (err) {
      helper.error(err)
    }
  }

  const onLoad = async (_user?: movininTypes.User) => {
    if (_user && _user.verified) {
      setLoading(true)
      setUser(_user)

      const params = new URLSearchParams(window.location.search)
      if (params.has('p')) {
        const id = params.get('p')
        if (id && id !== '') {
          try {
            const _property = await PropertyService.getProperty(id)

            if (_property) {
              if (_user.type === movininTypes.RecordType.Agency && _user._id !== _property.agency._id) {
                setLoading(false)
                setNoMatch(true)
                return
              }

              const _agency = {
                _id: _property.agency._id as string,
                name: _property.agency.fullName,
                image: _property.agency.avatar,
              }

              setProperty(_property)
              setImageRequired(!_property.image)
              setName(_property.name)
              setAgency(_agency)
              setDescription(_property.description)
              const contentBlock = htmlToDraft(_property.description)
              const contentState = ContentState.createFromBlockArray(contentBlock.contentBlocks)
              const _editorState = EditorState.createWithContent(contentState)
              setEditorState(_editorState)
              setType(_property.type)
              setRentalTerm(_property.rentalTerm)
              setImage(_property.image)
              setImages(_property.images || [])
              setTempImages([])
              setBedrooms(_property.bedrooms.toString())
              setBathrooms(_property.bathrooms.toString())
              setKitchens(_property.kitchens.toString())
              setParkingSpaces(_property.parkingSpaces.toString())
              setSize(_property.size?.toString() || '')
              setPetsAllowed(_property.petsAllowed)
              setFurnished(_property.furnished)
              setAircon(_property.aircon)
              setMinimumAge(_property.minimumAge.toString())
              setLocation({ _id: _property.location._id, name: _property.location.name })
              setAddress(_property.address || '')
              setPrice(_property.price.toString())
              setHidden(_property.hidden)
              setCancellation(movininHelper.extraToString(_property.cancellation))
              setAvailable(_property.available)

              setVisible(true)
              setLoading(false)
            } else {
              setLoading(false)
              setNoMatch(true)
            }
          } catch (err) {
            helper.error(err)
            setLoading(false)
            setError(true)
            setVisible(false)
          }
        } else {
          setLoading(false)
          setNoMatch(true)
        }
      } else {
        setLoading(false)
        setNoMatch(true)
      }
    }
  }

  const admin = helper.admin(user)

  return (
    <Master onLoad={onLoad} strict>
      {!error && !noMatch && property && (
        <div className="update-property">
          <Paper className="property-form property-form-wrapper" elevation={10} style={visible ? {} : { display: 'none' }}>
            <form onSubmit={handleSubmit}>
              <ImageEditor
                title={strings.IMAGES}
                onMainImageUpsert={(img) => {
                  setImage(img.filename)
                  setImageUpdated(true)
                }}
                onAdd={(img) => {
                  images.push(img.filename)
                  tempImages.push(img.filename)
                  setImages(images)
                }}
                onDelete={(img) => {
                  images.splice(images.indexOf(img.filename), 1)
                  tempImages.splice(tempImages.indexOf(img.filename), 1)
                  setImages(images)
                }}
                onImageViewerOpen={() => setImageViewerOpen(true)}
                onImageViewerClose={() => setImageViewerOpen(false)}
                image={{ filename: property?.image || '', temp: false }}
                images={property?.images?.map((_image) => ({ filename: _image || '', temp: false }))}
              />

              <FormControl fullWidth margin="dense">
                <InputLabel className="required">{strings.NAME}</InputLabel>
                <Input
                  type="text"
                  required
                  value={name}
                  autoComplete="off"
                  onChange={handleNameChange}
                />
              </FormControl>

              {admin && (
                <FormControl fullWidth margin="dense">
                  <AgencySelectList
                    label={strings.AGENCY}
                    required
                    variant="standard"
                    value={agency}
                    onChange={handleAgencyChange}
                  />
                </FormControl>
              )}

              <FormControl fullWidth margin="dense">
                <LocationSelectList
                  label={strings.LOCATION}
                  required
                  variant="standard"
                  value={location}
                  onChange={handleLocationChange}
                />
              </FormControl>

              <FormControl fullWidth margin="dense">
                <InputLabel>{strings.ADDRESS}</InputLabel>
                <Input
                  type="text"
                  value={address}
                  autoComplete="off"
                  onChange={handleAddressChange}
                />
              </FormControl>

              <FormControl fullWidth margin="dense">
                <PropertyTypeList
                  label={strings.PROPERTY_TYPE}
                  variant="standard"
                  value={type}
                  required
                  onChange={handlePropertyTypeChange}
                />
              </FormControl>

              <FormControl fullWidth margin="dense">
                <RentalTermList
                  label={strings.RENTAL_TERM}
                  variant="standard"
                  value={rentalTerm}
                  required
                  onChange={handleRentalTermChange}
                />
              </FormControl>

              <FormControl fullWidth margin="dense">
                <TextField
                  label={`${strings.PRICE} ${`(${commonStrings.CURRENCY}/${helper.rentalTermUnit(rentalTerm as movininTypes.RentalTerm)})`}`}
                  // eslint-disable-next-line
                  inputProps={{ inputMode: 'numeric', pattern: '^\\d+(.\\d+)?$' }}
                  onChange={handlePriceChange}
                  required
                  variant="standard"
                  autoComplete="off"
                  value={price}
                />
              </FormControl>

              <FormControl fullWidth margin="dense">
                <InputLabel className="required">{strings.MINIMUM_AGE}</InputLabel>
                <Input
                  type="text"
                  required
                  error={!minimumAgeValid}
                  value={minimumAge}
                  autoComplete="off"
                  onChange={handleMinimumAgeChange}
                  inputProps={{ inputMode: 'numeric', pattern: '^\\d{2}$' }}
                />
                <FormHelperText error={!minimumAgeValid}>
                  {(!minimumAgeValid && strings.MINIMUM_AGE_NOT_VALID) || ''}
                </FormHelperText>
              </FormControl>

              <FormControl fullWidth margin="dense" className="checkbox-fc">
                <FormControlLabel
                  control={(
                    <Switch
                      checked={available}
                      onChange={handleAvailableChange}
                      color="primary"
                    />
                  )}
                  label={strings.AVAILABLE}
                  className="checkbox-fcl"
                />
              </FormControl>

              <FormControl fullWidth margin="dense" className="editor-field">
                <span className="label required">{strings.DESCRIPTION}</span>
                <Editor
                  editorState={editorState}
                  editorClassName="editor"
                  onEditorStateChange={handleEditorStateChange}
                  localization={{
                    locale: user?.language
                  }}
                  stripPastedStyles
                />
              </FormControl>

              <FormControl fullWidth margin="dense">
                <InputLabel className="required">{strings.BEDROOMS}</InputLabel>
                <Input
                  type="text"
                  required
                  value={bedrooms}
                  autoComplete="off"
                  onChange={handlBedroomsChange}
                  inputProps={{ inputMode: 'numeric', pattern: '^\\d{1,2}$' }}
                />
              </FormControl>

              <FormControl fullWidth margin="dense">
                <InputLabel className="required">{strings.BATHROOMS}</InputLabel>
                <Input
                  type="text"
                  required
                  value={bathrooms}
                  autoComplete="off"
                  onChange={handlBathroomsChange}
                  inputProps={{ inputMode: 'numeric', pattern: '^\\d{1,2}$' }}
                />
              </FormControl>

              <FormControl fullWidth margin="dense">
                <InputLabel className="required">{strings.KITCHENS}</InputLabel>
                <Input
                  type="text"
                  required
                  value={kitchens}
                  autoComplete="off"
                  onChange={handlKitchensChange}
                  inputProps={{ inputMode: 'numeric', pattern: '^\\d{1,2}$' }}
                />
              </FormControl>

              <FormControl fullWidth margin="dense">
                <InputLabel className="required">{strings.PARKING_SPACES}</InputLabel>
                <Input
                  type="text"
                  required
                  value={parkingSpaces}
                  autoComplete="off"
                  onChange={handlParkingSpacesChange}
                  inputProps={{ inputMode: 'numeric', pattern: '^\\d{1,2}$' }}
                />
              </FormControl>

              <FormControl fullWidth margin="dense">
                <InputLabel>{`${strings.SIZE} (${env.SIZE_UNIT})`}</InputLabel>
                <Input
                  type="text"
                  value={size}
                  autoComplete="off"
                  onChange={handSizeChange}
                  inputProps={{ inputMode: 'numeric', pattern: '^\\d+(.\\d+)?$' }}
                />
              </FormControl>

              <FormControl fullWidth margin="dense">
                <TextField
                  label={`${csStrings.CANCELLATION} (${commonStrings.CURRENCY})`}
                  // eslint-disable-next-line
                  inputProps={{ inputMode: 'numeric', pattern: '^\\d+(.\\d+)?$' }}
                  onChange={handleCancellationChange}
                  variant="standard"
                  autoComplete="off"
                  value={cancellation}
                />
              </FormControl>

              <FormControl fullWidth margin="dense" className="checkbox-fc">
                <FormControlLabel
                  label={strings.AIRCON}
                  control={(
                    <Switch
                      checked={aircon}
                      onChange={handleAirconChange}
                      color="primary"
                    />
                  )}
                  className="checkbox-fcl"
                />
              </FormControl>

              <FormControl fullWidth margin="dense" className="checkbox-fc">
                <FormControlLabel
                  label={strings.FURNISHED}
                  control={(
                    <Switch
                      checked={furnished}
                      onChange={handleFurnishedChange}
                      color="primary"
                    />
                  )}
                  className="checkbox-fcl"
                />
              </FormControl>

              <FormControl fullWidth margin="dense" className="checkbox-fc">
                <FormControlLabel
                  label={strings.PETS_ALLOWED}
                  control={(
                    <Switch
                      checked={petsAllowed}
                      onChange={handlePetsAllowedChange}
                      color="primary"
                    />
                  )}
                  className="checkbox-fcl"
                />
              </FormControl>

              <FormControl fullWidth margin="dense" className="checkbox-fc">
                <FormControlLabel
                  label={strings.HIDDEN}
                  control={(
                    <Switch
                      checked={hidden}
                      onChange={handleHiddenChange}
                      color="primary"
                    />
                  )}
                  className="checkbox-fcl"
                />
              </FormControl>

              <div className="buttons">
                <Button type="submit" variant="contained" className="btn-primary btn-margin-bottom" size="small">
                  {commonStrings.SAVE}
                </Button>
                <Button
                  variant="contained"
                  className="btn-secondary btn-margin-bottom"
                  size="small"
                  onClick={async () => {
                    try {
                      if (imageUpdated && image) {
                        await PropertyService.deleteTempImage(image)
                      }
                      for (const tempImage of tempImages) {
                        await PropertyService.deleteTempImage(tempImage)
                      }
                    } catch (err) {
                      helper.error(err)
                    }
                    navigate('/properties')
                  }}
                >
                  {commonStrings.CANCEL}
                </Button>
              </div>

              <div className="form-error">
                {imageRequired && <Error message={commonStrings.IMAGE_REQUIRED} />}
                {imageError && <Error message={commonStrings.IMAGE_REQUIRED} />}
                {descriptionError && <Error message={strings.DESCRIPTION_REQUIRED} />}
                {formError && <Error message={commonStrings.FORM_ERROR} />}
              </div>
            </form>
          </Paper>
        </div>
      )}
      {loading && <Backdrop text={commonStrings.PLEASE_WAIT} />}
    </Master>
  )
}

export default UpdateProperty
