import React, { PureComponent } from "react"
import { connect as reduxConnect } from "react-redux"
import PropTypes from "prop-types"
import { Container } from "reactstrap"
import ToolbarModal from "../../ToolbarModal"
import BasicMap from "../../../../BasicMap"
import Marker from "../../../../Map/Marker"
import { WatchUserLocation } from "../../../../../actions/User"
import "./styles.css"

const { REACT_APP_GOOGLE_LOCATION_API } = process.env

const mapStateToProps = ({ User: { location } }) => ({ UserLocation: location })

const mapDispatchToProps = { WatchUserLocation }

class LocationButtonModal extends PureComponent {
  constructor(props) {
    super(props)
    this.watchId = null
    this.state = {}
  }

  static propTypes = {
    latitude: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
    longitude: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
    onChangeCallback: PropTypes.func.isRequired,
    WatchUserLocation: PropTypes.func.isRequired
  }

  static defaultProps = {
    center: {
      lat: 59.95,
      lng: 30.33
    },
    zoom: 11
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    const { UserLocation, latitude, longitude } = nextProps

    return { UserLocation, latitude, longitude }
  }

  componentDidMount() {}

  getSnapshotBeforeUpdate(prevProps, prevState) {
    return null
  }

  componentDidUpdate(prevProps, prevState, snapshot) {}

  componentWillUnmount() {
    const { WatchUserLocation } = this.props

    WatchUserLocation(this.watchId)
  }

  handleClick = () => {
    const { WatchUserLocation } = this.props
    this.watchId = WatchUserLocation()
  }

  handleCancel = () => {
    const { WatchUserLocation } = this.props
    this.watchId = WatchUserLocation(this.watchId)
  }

  handleSave = () => {
    const { onChangeCallback } = this.props
    const {
      UserLocation: { latitude, longitude }
    } = this.state

    if (latitude && longitude) {
      onChangeCallback({ latitude, longitude })
    }
  }

  render() {
    const { xs, center, zoom } = this.props
    const { UserLocation, latitude, longitude } = this.state

    return (
      <ToolbarModal
        className="p-0"
        modalTitle="Add Location"
        onClickCallback={this.handleClick}
        onCancelCallback={this.handleCancel}
        onSaveCallback={this.handleSave}
        buttonIcon="fas fa-map-marker-alt"
        buttonTitle="Location"
        xs={xs}
        saveDisabled={!UserLocation.latitude || !UserLocation.longitude}
      >
        <Container fluid className="LocationButtonModal p-0">
          <BasicMap renderUserLocation />
        </Container>
      </ToolbarModal>
    )
  }
}
export default reduxConnect(
  mapStateToProps,
  mapDispatchToProps
)(LocationButtonModal)
