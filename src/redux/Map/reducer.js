import { MapActionTypes } from "./types"

const CENTER_OF_US = [39.8097343, -98.5556199]

const DEFAULT_STATE_MAP = {
  center: CENTER_OF_US,
  bounds: {
    nw: {
      lat: 63.35282888490272,
      lng: -144.61030739999998,
    },
    se: {
      lat: 4.391784211865868,
      lng: -52.50093239999998,
    },
    sw: {
      lat: 4.391784211865868,
      lng: -144.61030739999998,
    },
    ne: {
      lat: 63.35282888490272,
      lng: -52.50093239999998,
    },
  },
  zoom: 4,
}

const Map = (state = DEFAULT_STATE_MAP, action) => {
  const { type, payload } = action

  switch (type) {
    case MapActionTypes.MAP_SET_BOUNDS_CENTER_ZOOM:
      if (payload.bounds) {
        // Clean
        if (!payload.bounds.ne.lat) payload.bounds.ne = { lat: 0, lng: 0 }
        if (!payload.bounds.sw.lat) payload.bounds.sw = { lat: 0, lng: 0 }
      }
      return { ...state, ...payload }

    case MapActionTypes.MAP_RESET:
      return DEFAULT_STATE_MAP

    default:
      return state
  }
}

export { DEFAULT_STATE_MAP, Map }
