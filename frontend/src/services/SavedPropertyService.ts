import * as movininTypes from ':movinin-types'
import axiosInstance from './axiosInstance'

interface SavedPropertiesResponse {
  savedProperties: string[]
}

/**
 * Fetch the current customer's saved properties.
 *
 * @param {string} language
 * @returns {Promise<movininTypes.Property[]>}
 */
export const getSavedProperties = (language: string): Promise<movininTypes.Property[]> =>
  axiosInstance
    .get(`/api/saved-properties/${encodeURIComponent(language)}`, { withCredentials: true })
    .then((res) => res.data)

/**
 * Save a property to the current customer's list.
 */
export const saveProperty = (propertyId: string): Promise<SavedPropertiesResponse> =>
  axiosInstance
    .put(`/api/saved-properties/${encodeURIComponent(propertyId)}`, null, { withCredentials: true })
    .then((res) => res.data)

/**
 * Remove a property from the current customer's list.
 */
export const removeSavedProperty = (propertyId: string): Promise<SavedPropertiesResponse> =>
  axiosInstance
    .delete(`/api/saved-properties/${encodeURIComponent(propertyId)}`, { withCredentials: true })
    .then((res) => res.data)
