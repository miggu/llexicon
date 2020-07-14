import React, { memo } from "react"
import "../styles.css"

const PhoneLaptop = ({ className, ...styles }) => (
  <svg
    aria-hidden="true"
    focusable="false"
    viewBox="0 0 640 512"
    className={className}
    style={styles}
  >
    <path
      fill="currentColor"
      d="M608 128H416a32 32 0 0 0-32 32v320a32 32 0 0 0 32 32h192a32 32 0 0 0 32-32V160a32 32 0 0 0-32-32zm0 352H416V160h192zM96 32h384v64h32V32a32 32 0 0 0-32-32H96a32 32 0 0 0-32 32v256H16a16 16 0 0 0-16 16v16a64.14 64.14 0 0 0 63.91 64H352v-32H63.91A32 32 0 0 1 32 320h320v-32H96z"
      className=""
    ></path>
  </svg>
)

PhoneLaptop.defaultProps = {
  className: "DefaultSvgClass",
}

export default memo(PhoneLaptop)
