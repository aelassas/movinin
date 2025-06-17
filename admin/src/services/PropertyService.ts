import * as movininTypes from ':movinin-types'
import axiosInstance from './axiosInstance'
import * as UserService from './UserService'

/**
 * Create a Property.
 *
 * @param {movininTypes.CreatePropertyPayload} data
 * @returns {Promise<movininTypes.Property>}
 */
export const create = (data: movininTypes.CreatePropertyPayload): Promise<movininTypes.Property> =>
  axiosInstance
    .post(
      '/api/create-property',
      data,
      { withCredentials: true }
    )
    .then((res) => res.data)

/**
 * Update a Property.
 *
 * @param {movininTypes.UpdatePropertyPayload} data
 * @returns {Promise<number>}
 */
export const update = (data: movininTypes.UpdatePropertyPayload): Promise<number> =>
  axiosInstance
    .put(
      '/api/update-property',
      data,
      { withCredentials: true }
    )
    .then((res) => res.status)

/**
 * Check if a property is related to a Booking.
 *
 * @param {string} id
 * @returns {Promise<number>}
 */
export const check = (id: string): Promise<number> =>
  axiosInstance
    .get(
      `/api/check-property/${encodeURIComponent(id)}`,
      { withCredentials: true }
    )
    .then((res) => res.status)

/**
 * Delete a Property.
 *
 * @param {string} id
 * @returns {Promise<number>}
 */
export const deleteProperty = (id: string): Promise<number> =>
  axiosInstance
    .delete(
      `/api/delete-property/${encodeURIComponent(id)}`,
      { withCredentials: true }
    )
    .then((res) => res.status)

/**
 * Upload a temporary Property image.
 *
 * @param {Blob} file
 * @returns {Promise<string>}
 */
export const uploadImage = (file: Blob): Promise<string> => {
  const formData = new FormData()
  formData.append('image', file)

  return axiosInstance
    .post(
      '/api/upload-property-image',
      formData,
      {
        withCredentials: true,
        headers: { 'Content-Type': 'multipart/form-data' },
      }
    )
    .then((res) => res.data)
}

/**
 * Delete a Property image.
 *
 * @param {string} id
 * @returns {Promise<number>}
 */
export const deleteImage = (id: string): Promise<number> =>
  axiosInstance
    .post(
      `/api/delete-property-image/${encodeURIComponent(id)}`,
      null,
      { withCredentials: true }
    )
    .then((res) => res.status)

/**
 * Delete a temporary Property image.
 *
 * @param {string} image
 * @returns {Promise<number>}
 */
export const deleteTempImage = (image: string): Promise<number> =>
  axiosInstance
    .post(
      `/api/delete-temp-property-image/${encodeURIComponent(image)}`,
      null,
      { withCredentials: true }
    )
    .then((res) => res.status)

/**
 * Get a Property by ID.
 *
 * @param {string} id
 * @returns {Promise<movininTypes.Property>}
 */
export const getProperty = (id: string): Promise<movininTypes.Property> =>
  axiosInstance
    .get(
      `/api/property/${encodeURIComponent(id)}/${UserService.getLanguage()}`,
      { withCredentials: true }
    )
    .then((res) => res.data)

/**
 * Get Properties.
 *
 * @param {string} keyword
 * @param {movininTypes.GetPropertiesPayload} data
 * @param {number} page
 * @param {number} size
 * @returns {Promise<movininTypes.Result<movininTypes.Property>>}
 */
export const getProperties = (keyword: string, data: movininTypes.GetPropertiesPayload, page: number, size: number): Promise<movininTypes.Result<movininTypes.Property>> =>
  axiosInstance
    .post(
      `/api/properties/${page}/${size}/?s=${encodeURIComponent(keyword)}`,
      data,
      { withCredentials: true }
    )
    .then((res) => res.data)

/**
 * Get Properties by Agency and Location.
 *
 * @param {string} keyword
 * @param {movininTypes.GetBookingPropertiesPayload} data
 * @param {number} page
 * @param {number} size
 * @returns {Promise<movininTypes.Property[]>}
 */
export const getBookingProperties = (keyword: string, data: movininTypes.GetBookingPropertiesPayload, page: number, size: number): Promise<movininTypes.Property[]> =>
  axiosInstance
    .post(
      `/api/booking-properties/${page}/${size}/?s=${encodeURIComponent(keyword)}`,
      data,
      { withCredentials: true }
    )
    .then((res) => res.data)
