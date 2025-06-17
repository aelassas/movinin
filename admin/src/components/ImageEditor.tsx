import React, { useRef, useState } from 'react'
import {
  Delete as DeleteIcon,
  PhotoCamera as ImageIcon
} from '@mui/icons-material'
import * as movininHelper from ':movinin-helper'
import { strings as commonStrings } from '@/lang/common'
import { strings } from '@/lang/image-editor'
import ImageViewer from './ImageViewer'
import env from '@/config/env.config'
import * as helper from '@/common/helper'
import * as PropertyService from '@/services/PropertyService'

import Property from '@/assets/img/property.png'

import '@/assets/css/image-editor.css'

interface ImageEditorProps {
  title?: string
  image?: ImageItem
  images?: ImageItem[]
  onMainImageUpsert?: (image: ImageItem) => void
  onAdd?: (image: ImageItem) => void
  onDelete?: (image: ImageItem, index?: number) => void
  onImageViewerOpen?: () => void
  onImageViewerClose?: () => void
}

const ImageEditor = ({
  title,
  image: mainImage,
  images: ieImages,
  onMainImageUpsert,
  onAdd,
  onDelete,
  onImageViewerOpen,
  onImageViewerClose
}: ImageEditorProps) => {
  const [currentImage, setCurrentImage] = useState(0)
  const [openImageDialog, setOpenImageDialog] = useState(false)
  const [image, setImage] = useState<ImageItem | undefined>(mainImage)
  const [images, setImages] = useState<ImageItem[]>(ieImages || [])
  const [filenames, setFilenames] = useState<string[]>([])

  const uploadImageRef = useRef<HTMLInputElement>(null)
  const uploadImagesRef = useRef<HTMLInputElement>(null)

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const reader = new FileReader()
    const file = e.target.files && e.target.files[0]

    if (file) {
      reader.onloadend = async () => {
        try {
          if (image?.temp) {
            const status = await PropertyService.deleteTempImage(image.filename)

            if (status !== 200) {
              helper.error()
            }
          }
          const filename = await PropertyService.uploadImage(file)
          const mainImg = movininHelper.clone(image) as ImageItem
          mainImg.filename = filename
          mainImg.temp = true
          setImage(mainImg)
          if (onMainImageUpsert) {
            onMainImageUpsert(mainImg)
          }
        } catch (err) {
          helper.error(err)
        }
      }

      reader.readAsDataURL(file)
    }
  }

  const handleImagesChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { files } = e.target

    if (files) {
      for (const file of files) {
        const reader = new FileReader()

        reader.onloadend = async () => {
          try {
            if (!filenames.includes(file.name)) {
              const filename = await PropertyService.uploadImage(file)
              filenames.push(file.name)
              const imgItem = { temp: true, filename }
              images.push(imgItem)
              setImages(movininHelper.cloneArray(images) as ImageItem[])
              setFilenames(movininHelper.cloneArray(filenames) as string[])
              if (onAdd) {
                onAdd(imgItem)
              }
            }
          } catch {
            helper.error()
          }
        }

        reader.readAsDataURL(file)
      }
    }
  }

  const src = (_image: ImageItem) =>
    movininHelper.joinURL(
      _image.temp ? env.CDN_TEMP_PROPERTIES : env.CDN_PROPERTIES,
      _image.filename
    )

  return (
    <div className="image-editor">
      {/* Main image thumbnail */}
      <div className="main-image">
        <img
          className="main-image"
          alt=""
          src={
            image
              ? image.temp
                ? movininHelper.joinURL(env.CDN_TEMP_PROPERTIES, image.filename)
                : movininHelper.joinURL(env.CDN_PROPERTIES, image.filename)
              : Property
          }
        />
      </div>

      {/* Add/Update main image & Add additional images buttons */}
      <div className="image-control">
        <button
          type="button"
          onClick={() => {
            if (uploadImageRef.current) {
              uploadImageRef.current.value = ''

              setTimeout(() => {
                uploadImageRef.current?.click()
              }, 0)
            }
          }}
          className="action"
        >
          <ImageIcon className="icon" />
          <span>{image ? strings.UPDATE_IMAGE : strings.ADD_IMAGE}</span>
        </button>
        <input ref={uploadImageRef} type="file" accept="image/*" hidden onChange={handleImageChange} />
        <button
          type="button"
          onClick={() => {
            if (uploadImagesRef.current) {
              uploadImagesRef.current.value = ''

              setTimeout(() => {
                uploadImagesRef.current?.click()
              }, 0)
            }
          }}
          className="action"
        >
          <ImageIcon className="icon" />
          <span>{strings.ADD_IMAGES}</span>
        </button>
        <input ref={uploadImagesRef} type="file" accept="image/*" hidden multiple onChange={handleImagesChange} />
      </div>

      {/* Additional images */}
      <div className="images">
        {
          images.map((_image, index) => (
            <div key={_image.filename} className="container">
              <div
                className="image"
                onClick={() => {
                  setCurrentImage(index)
                  setOpenImageDialog(true)
                  if (onImageViewerOpen) {
                    onImageViewerOpen()
                  }
                }}
                role="button"
                tabIndex={0}
                aria-label="image"
              >
                <img alt="" className="image" src={src(_image)} />
              </div>
              <div className="ai-action">
                <span
                  className="button"
                  title={commonStrings.DELETE}
                  role="button"
                  tabIndex={0}
                  aria-label="action"
                  onClick={async () => {
                    try {
                      let status = 200
                      try {
                        if (_image.temp) {
                          status = await PropertyService.deleteTempImage(_image.filename)
                        }
                      } catch (err) {
                        helper.error(err)
                      }

                      if (status === 200) {
                        const _images = movininHelper.cloneArray(images) || []
                        _images.splice(index, 1)
                        setImages(_images)

                        const _filenames = movininHelper.cloneArray(filenames) || []
                        _filenames.splice(index, 1)
                        setFilenames(_filenames)

                        if (onDelete) {
                          onDelete(_image)
                        }
                      } else {
                        helper.error()
                      }
                    } catch (err) {
                      helper.error(err)
                    }
                  }}
                >
                  <DeleteIcon className="button" />
                </span>
              </div>
            </div>
          ))
        }
      </div>

      {/* ImageViewer */}
      {
        openImageDialog
        && (
          <ImageViewer
            src={images.map(src)}
            currentIndex={currentImage}
            title={title}
            closeOnClickOutside
            onClose={() => {
              setOpenImageDialog(false)
              setCurrentImage(0)
              if (onImageViewerClose) {
                onImageViewerClose()
              }
            }}
          />
        )
      }

    </div>
  )
}

export default ImageEditor
