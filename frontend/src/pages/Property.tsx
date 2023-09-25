import React, { useEffect, useState } from 'react'
import {
    Button,
    FormControl,
} from '@mui/material'
import { useNavigate } from 'react-router-dom'
import Backdrop from '../components/SimpleBackdrop'
import Master from '../components/Master'
import Env from '../config/env.config'
import { strings as commonStrings } from '../lang/common'
import { strings } from '../lang/properties'
import * as movininTypes from 'movinin-types'
import * as movininHelper from 'movinin-helper'
import * as PropertyService from '../services/PropertyService'
import * as Helper from '../common/Helper'
import PropertyInfo from '../components/PropertyInfo'
import NoMatch from './NoMatch'
import ImageViewer from '../components/ImageViewer'
import AgencyBadge from '../components/AgencyBadge'
import DatePicker from '../components/DatePicker'
import * as UserService from '../services/UserService'

import '../assets/css/property.css'

const Property = () => {
    const navigate = useNavigate()

    const _minDate = new Date()
    _minDate.setDate(_minDate.getDate() + 1)

    const [loading, setLoading] = useState(false)
    const [noMatch, setNoMatch] = useState(false)
    const [property, setProperty] = useState<movininTypes.Property>()
    const [image, setImage] = useState('')
    const [images, setImages] = useState<string[]>([])
    const [currentIndex, setCurrentIndex] = useState(0)
    const [openImageDialog, setOpenImageDialog] = useState(false)
    const [from, setFrom] = useState<Date>()
    const [to, setTo] = useState<Date>()
    const [minDate, setMinDate] = useState<Date>()
    const [hideAction, setHideAction] = useState(true)

    useEffect(() => {
        const src = (image: string) => movininHelper.joinURL(Env.CDN_PROPERTIES, image)

        if (property) {
            const image = src(property.image)
            setImage(image)
            const _images = property.images ? property.images.map(src) : []
            const images = [image, ..._images]
            setImages(images)
        }
    }, [property])

    const onLoad = async () => {
        let propertyId: string | null = null
        let from: Date | null = null
        let to: Date | null = null
        const params = new URLSearchParams(window.location.search)

        if (params.has('p')) {
            propertyId = params.get('p')
        }

        if (params.has('f')) {
            const val = params.get('f')
            from = val && movininHelper.isInteger(val) ? new Date(Number.parseInt(val)) : null
        }
        if (params.has('t')) {
            const val = params.get('t')
            to = val && movininHelper.isInteger(val) ? new Date(Number.parseInt(val)) : null
        }

        if (!propertyId) {
            setNoMatch(true)
            return
        }

        if (from || to) {
            setHideAction(false)
        }

        setLoading(true)
        setFrom(from || undefined)
        setTo(to || undefined)
        setMinDate(from || undefined)

        try {
            const property = await PropertyService.getProperty(propertyId)

            if (property) {
                setProperty(property)
            } else {
                setNoMatch(true)
            }

        } catch (err) {
            Helper.error(err)
        } finally {
            setLoading(false)
        }

    }

    return (
        <Master onLoad={onLoad}>
            {
                property &&
                <>
                    <div className="main">
                        <div className="property">
                            <div className="images-container">
                                {/* Main image */}
                                <div className="main-image">
                                    <img
                                        className="main-image"
                                        alt=""
                                        src={image}
                                        onClick={() => setOpenImageDialog(true)} />
                                </div>

                                {/* Additional images */}
                                <div className="images">
                                    {
                                        images.map((image, index) => (
                                            <div
                                                key={index}
                                                className={`image${currentIndex === index ? ` selected` : ''}`}
                                                onClick={() => {
                                                    setCurrentIndex(index)
                                                    setImage(image)
                                                }}>
                                                <img alt='' className="image" src={image} />
                                            </div>
                                        ))
                                    }
                                </div>
                            </div>

                            {/* Property info */}
                            <div className="right-panel">
                                <div className="right-panel-header">
                                    <div className="name"><h2>{property.name}</h2></div>
                                    <div className="price">{Helper.priceLabel(property)}</div>
                                </div>
                                <PropertyInfo
                                    property={property}
                                />
                            </div>
                        </div>

                        {/* Property description */}
                        <div className="description">
                            <div dangerouslySetInnerHTML={{ __html: property.description }} />
                        </div>

                        <div className='footer'>
                            <AgencyBadge agency={property.agency} />

                            {
                                !hideAction &&
                                <form
                                    className="action"
                                    onSubmit={(e: React.FormEvent<HTMLFormElement>) => {
                                        e.preventDefault()
                                        const url = `/checkout?p=${property._id}&l=${property.location._id}&f=${from?.getTime()}&t=${to?.getTime()}`
                                        navigate(url)
                                    }}>
                                    <FormControl className="from">
                                        <DatePicker
                                            label={commonStrings.FROM}
                                            value={from}
                                            minDate={new Date()}
                                            variant="outlined"
                                            required
                                            onChange={(date) => {
                                                if (date) {

                                                    if (to && to.getTime() <= date.getTime()) {
                                                        setTo(undefined)
                                                    }

                                                    const minDate = new Date(date)
                                                    minDate.setDate(date.getDate() + 1)
                                                    setMinDate(minDate)
                                                } else {
                                                    setMinDate(_minDate)
                                                }

                                                setFrom(date || undefined)
                                            }}
                                            language={UserService.getLanguage()}
                                        />
                                    </FormControl>
                                    <FormControl className="to">
                                        <DatePicker
                                            label={commonStrings.TO}
                                            value={to}
                                            minDate={minDate}
                                            variant="outlined"
                                            required
                                            onChange={(date) => {
                                                setTo(date || undefined)
                                            }}
                                            language={UserService.getLanguage()}
                                        />
                                    </FormControl>
                                    <Button
                                        type="submit"
                                        variant="contained"
                                        className="btn-action btn-book"
                                    >
                                        {strings.BOOK}
                                    </Button>
                                </form>
                            }

                        </div>

                    </div>

                    {
                        openImageDialog &&
                        <ImageViewer
                            src={images}
                            currentIndex={currentIndex}
                            closeOnClickOutside={true}
                            title={property.name}
                            onClose={() => {
                                setOpenImageDialog(false)
                            }}
                        />
                    }
                </>
            }

            {loading && <Backdrop text={commonStrings.PLEASE_WAIT} />}
            {noMatch && <NoMatch hideHeader />}
        </Master>
    )
}

export default Property
