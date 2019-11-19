import React, { memo } from "react"
import QuillSelect from ".."

const Sizes = () => (
  <QuillSelect
    options={["small", "normal", "large", "huge"]}
    className="size"
  />
)

export default memo(Sizes)