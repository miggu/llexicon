import React, { memo } from 'react'
import PropTypes from 'prop-types'
import { FormGroup, Label, Input, Media, FormText, Button } from 'reactstrap'
import './styles.css'

const FileUpload = ({ title, value, onChange }) => {
  const handleButtonClick = () => document.getElementById('fileUpload').click()

  return (
    <FormGroup
      className='FileUploadContainer m-0'
      color='accent'
      tag={Button}
      onClick={handleButtonClick}
    >
      <FormText color='white'>
        <Label className='FileUpload mr-1' for='fileUpload'>
          {!value ? <i className='fas fa-file-import' /> : <Media src={value} />}
          <Input
            hidden
            type='file'
            name={value}
            id='fileUpload'
            onChange={onChange}
            accept='.json'
            multiple={false}
          />
        </Label>
        {title}
      </FormText>
    </FormGroup>
  )
}

FileUpload.propTypes = {
  title: PropTypes.string,
  value: PropTypes.string,
  onChange: PropTypes.func.isRequired,
}

FileUpload.defaultProps = {
  title: 'Import',
}

export default memo(FileUpload)
