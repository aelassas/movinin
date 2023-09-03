import { Schema, model } from 'mongoose'
import * as env from '../config/env.config'
import * as movininTypes from 'movinin-types'

const MINIMUM_AGE: number = Number.parseInt(String(process.env.MI_MINIMUM_AGE), 10)

const propertySchema = new Schema<env.Property>(
    {
        name: {
            type: String,
            required: [true, "can't be blank"],
        },
        type: {
            type: String,
            enum: [
                movininTypes.PropertyType.House,
                movininTypes.PropertyType.Apartment,
                movininTypes.PropertyType.Townhouse,
                movininTypes.PropertyType.Plot,
                movininTypes.PropertyType.Farm,
                movininTypes.PropertyType.Commercial,
                movininTypes.PropertyType.Industrial
            ],
            required: [true, "can't be blank"],
        },
        agency: {
            type: Schema.Types.ObjectId,
            required: [true, "can't be blank"],
            ref: 'User',
        },
        description: {
            type: String,
            required: [true, "can't be blank"],
        },
        image: {
            type: String
        },
        images: {
            type: [String]
        },
        bedrooms: {
            type: Number,
            required: [true, "can't be blank"],
            validate: {
                validator: Number.isInteger,
                message: '{VALUE} is not an integer value',
            },
        },
        bathrooms: {
            type: Number,
            required: [true, "can't be blank"],
            validate: {
                validator: Number.isInteger,
                message: '{VALUE} is not an integer value',
            },
        },
        kitchens: {
            type: Number,
            default: 1,
            validate: {
                validator: Number.isInteger,
                message: '{VALUE} is not an integer value',
            },
        },
        parkingSpaces: {
            type: Number,
            default: 0,
            validate: {
                validator: Number.isInteger,
                message: '{VALUE} is not an integer value',
            },
        },
        size: {
            type: Number,
            required: [true, "can't be blank"],
            validate: {
                validator: Number.isInteger,
                message: '{VALUE} is not an integer value',
            },
        },
        petsAllowed: {
            type: Boolean,
            required: [true, "can't be blank"],
        },
        furnished: {
            type: Boolean,
            required: [true, "can't be blank"],
        },
        minimumAge: {
            type: Number,
            required: [true, "can't be blank"],
            min: MINIMUM_AGE,
            max: 99,
        },
        location: {
            type: Schema.Types.ObjectId,
            ref: 'Location',
            required: [true, "can't be blank"],
        },
        address: {
            type: String,
        },
        price: {
            type: Number,
            required: [true, "can't be blank"],
        },
        soldOut: {
            type: Boolean,
            default: false
        },
        hidden: {
            type: Boolean,
            default: false
        },
        cancellation: {
            type: Boolean,
            default: false,
        },
    },
    {
        timestamps: true,
        strict: true,
        collection: 'Property',
    },
)

const Property = model<env.Property>('Property', propertySchema)

Property.on('index', (err) => {
    if (err) {
        console.error('Property index error: %s', err)
    } else {
        console.info('Property indexing complete')
    }
})

export default Property
