import React, { useCallback, useEffect, useState } from 'react'
import { Box, Dialog, DialogContent, DialogTitle, IconButton } from '@mui/material'
import { Close as CloseIcon } from '@mui/icons-material'
import * as movininTypes from ':movinin-types'
import env from '@/config/env.config'
import Map from '@/components/Map'

import '@/assets/css/map-dialog.css'

interface MapDialogProps {
  location?: movininTypes.Location
  openMapDialog: boolean
  onClose: () => void
}

const MapDialog = ({
  location,
  openMapDialog: openMapDialogProp,
  onClose,
}: MapDialogProps) => {
  const [openMapDialog, setOpenMapDialog] = useState(openMapDialogProp)

  useEffect(() => {
    setOpenMapDialog(openMapDialogProp)
  }, [openMapDialogProp])

  const close = useCallback(() => {
    setOpenMapDialog(false)
    if (onClose) {
      onClose()
    }
  }, [onClose])

  return (
    <Dialog
      fullWidth={env.isMobile}
      maxWidth={false}
      open={openMapDialog}
      onClose={() => {
        close()
      }}
      sx={{
        '& .MuiDialog-container': {
          '& .MuiPaper-root': {
            width: '95%',
            height: '95%',
          },
          '& .MuiDialogTitle-root': {
            padding: 0,
            backgroundColor: '#1a1a1a',
          },
          '& .MuiDialogContent-root': {
            padding: 0,
          }
        },
      }}
    >
      <DialogTitle>
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'flex-end',
          }}
        >
          <Box>
            <IconButton
              className="close-btn"
              onClick={() => {
                close()
              }}
            >
              <CloseIcon className="close-icon" />
            </IconButton>
          </Box>
        </Box>
      </DialogTitle>
      <DialogContent className="map-dialog-content">
        {location && (
          <Map
            position={[location.latitude || env.MAP_LATITUDE, location.longitude || env.MAP_LONGITUDE]}
            initialZoom={location.latitude && location.longitude ? 10 : 2.5}
            locations={[location]}
            className="map"
          />
        )}
      </DialogContent>
    </Dialog>
  )
}

export default MapDialog
