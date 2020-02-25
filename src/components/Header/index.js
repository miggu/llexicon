import React, { memo } from "react"
import PropTypes from "prop-types"
import "./styles.css"

const Header = ({ children, filled, color, ...restOfProps }) => {
  const styles = {
    backgroundColor: filled ? "var(--accentColor)" : "inherit",
    color: filled ? "var(---secondaryColor)" : color,
    ...restOfProps
  }

  return (
    <div className="Header  p-2" style={styles}>
      {children}
    </div>
  )
}
Header.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
    PropTypes.object
  ]),
  filled: PropTypes.bool.isRequired,
  color: PropTypes.string.isRequired,
  fontSize: PropTypes.oneOfType([PropTypes.number, PropTypes.string])
}

Header.defaultProps = {
  children: <h1>Header</h1>,
  filled: false,
  color: "var(--accentColor)",
  fontSize: "3em"
}

export default memo(Header)
