import React, { useState, useEffect, useMemo, memo } from "react"
import PropTypes from "prop-types"
import { Container, Row, Col, Input } from "reactstrap"
import { connect as reduxConnect } from "react-redux"
import ToolbarModal from "../../ToolbarModal"
import TagsContainer from "../../../../TagsContainer"
import { GetUserEntryTags } from "../../../../../redux/Entries/actions"
import { TopKFrequentStrings } from "../../../../../helpers"
import { validatedString } from "../utlis"
import memoizeProps from "../../../../../helpers/memoizeProps"
import {
  EntriesPropTypes,
  EntryTagsProps,
} from "../../../../../redux/Entries/propTypes"

const mapStateToProps = ({
  User: { id },
  Entries: { items, filteredItems, EntryTags },
}) => ({ items, filteredItems, UserId: id, EntryTags })

const mapDispatchToProps = { GetUserEntryTags }

const getInitialState = (tags) => ({
  tagsAsString: tags.map((tag) => tag.name).join(" "),
  typing: false,
})

const TagsButtonModal = ({
  UserId,
  GetUserEntryTags,
  items,
  filteredItems,
  EntryTags,
  tags,
  xs,
  onChangeCallback,
}) => {
  useEffect(() => {
    if (UserId) GetUserEntryTags()
  }, [])

  const [state, setState] = useState(getInitialState(tags))

  const { tagsAsString, typing } = state

  const splitTagsAsString = tagsAsString.split(" ")
  const lastTagAsString = splitTagsAsString[splitTagsAsString.length - 1]

  const entryTags = useMemo(
    () =>
      Object.values(
        items
          .concat(filteredItems)
          .map((entry) => entry.tags)
          .flat(1)
          .concat(EntryTags)
      ),
    [items, filteredItems, EntryTags, splitTagsAsString]
  )

  let sortedTags = useMemo(
    () =>
      TopKFrequentStrings(entryTags, "name")
        .filter((tag) => {
          if (splitTagsAsString.length > 0 && splitTagsAsString.includes(tag))
            return false
          else return true
        })
        .map((name) => ({ name })),
    [entryTags]
  )

  if (typing && lastTagAsString) {
    sortedTags = sortedTags.filter((entryTag) =>
      entryTag.name.toUpperCase().includes(lastTagAsString.toUpperCase())
    )
  }

  const handleTagClick = (name) => {
    let nextState = {}

    if (!state.tagsAsString) {
      nextState = {
        tagsAsString: validatedString(state.tagsAsString.concat(`${name} `)),
        typing: false,
      }
    } else if (state.typing) {
      let splitTagsAsStrings = state.tagsAsString.split(" ")
      splitTagsAsStrings[splitTagsAsStrings.length - 1] = `${name} `
      nextState = {
        tagsAsString: validatedString(splitTagsAsStrings.join(" ")),
        typing: false,
      }
    } else {
      nextState = {
        tagsAsString: validatedString(state.tagsAsString.concat(` ${name}`)),
        typing: false,
      }
    }

    setState((prevState) => ({ ...prevState, ...nextState }))
  }

  const handleTagsInputChange = (e) => {
    const { value } = e.target

    // Replace commas
    const string = value.replace(",", " ")
    // Remove double spaces and periods
    const validatedTagsAsString = validatedString(string)

    setState((prevState) => ({
      ...prevState,
      tagsAsString: validatedTagsAsString,
      typing: true,
    }))
  }

  const handleSave = () => {
    const newTags = tagsAsString
      .split(" ")
      .filter((string) => string)
      .map((tag) => (tag = { name: tag }))
    onChangeCallback({ tags: newTags })
  }

  const handleCancel = () => setState(getInitialState(tags))

  return (
    <ToolbarModal
      title="Add Tags"
      onSaveCallback={handleSave}
      onCancelCallback={handleCancel}
      ButtonIcon="fas fa-tags"
      buttonTitle="Add Tags"
      xs={xs}
    >
      <Container className="TagsButtonModal Container">
        <Row>
          <TagsContainer
            tags={sortedTags}
            height={200}
            flexWrap="wrap"
            onClickCallback={handleTagClick}
            hoverable
          />
        </Row>
        <Row className="my-1">
          <Col className="px-1" xs={12}>
            <Input
              onChange={handleTagsInputChange}
              type="text"
              id="tagTitle"
              name="tagTitle"
              value={tagsAsString}
              placeholder="Family Friends Health Vacation"
            />
          </Col>
        </Row>
      </Container>
    </ToolbarModal>
  )
}

TagsButtonModal.propTypes = {
  UserId: PropTypes.number,
  items: EntriesPropTypes,
  filteredItems: EntriesPropTypes,
  EntryTags: EntryTagsProps.isRequired,
  tags: EntryTagsProps.isRequired,
  GetUserEntryTags: PropTypes.func.isRequired,
  onChangeCallback: PropTypes.func.isRequired,
}

TagsButtonModal.defaultProps = {
  tags: [],
}

const isEqual = (prevProps, nextProps) =>
  memoizeProps(prevProps, nextProps, [
    "UserId",
    "items",
    "filteredItems",
    "EntryTags",
    "tags",
    "xs",
  ])

export default reduxConnect(
  mapStateToProps,
  mapDispatchToProps
)(memo(TagsButtonModal, isEqual))
