import { EntriesActionTypes } from '../types'
import { getReduxEntryId } from '../utils'
import { getStringBytes } from 'utils'

const {
  ENTRY_SET,
  ENTRIES_UPDATE,
  ENTRY_CLEAR,
  ENTRIES_CLEAR,
  ENTRIES_DELETE,
  ENTRIES_SET_TAGS,
  ENTRIES_SET_PEOPLE,
  ENTRIES_PENDING,
  ENTRY_PENDING,
  ENTRIES_ERROR,
  ENTRIES_ERROR_CLEAR,
  ENTRIES_COMPLETE,
  ENTRIES_SET,
  ENTRIES_SEARCH_FILTER,
  ENTRIES_SET_SORT_MAP,
  ENTRIES_SET_FILTER_MAP,
  ENTRIES_RESET_SORT_AND_FILTER_MAP,
  ENTRIES_TOGGLE_SHOW_ONLY_PUBLIC,
} = EntriesActionTypes

const PendingEntries = () => ({ type: ENTRIES_PENDING })

const PendingEntry = () => ({ type: ENTRY_PENDING })

const SetEntriesComplete = () => ({ type: ENTRIES_COMPLETE })

const SetEntriesError = e => {
  const payload = JSON.parse(JSON.stringify(e))
  // console.log(payload)
  return { type: ENTRIES_ERROR, payload }
}

const ClearEntriesErrors = () => ({ type: ENTRIES_ERROR_CLEAR })

const SetEntry = payload => ({
  type: ENTRY_SET,
  payload,
})

const PostReduxEntry = entry => dispatch => {
  const payload = {
    ...entry,
    id: getReduxEntryId(),
    _shouldPost: true,
    _lastUpdated: null,
    date_created: entry.date_created_by_author,
    date_updated: entry.date_created_by_author,
  }
  const size = getStringBytes(payload)

  return dispatch(
    SetEntry({
      ...payload,
      size,
      _size: size,
    }),
  )
}

const UpdateReduxEntries = (id, entries, _lastUpdated = new Date()) => {
  let payload
  if (Array.isArray(entries)) {
    payload = entries
  } else {
    payload = { ...entries, _lastUpdated }
  }
  return {
    type: ENTRIES_UPDATE,
    id,
    payload,
  }
}

const ClearEntry = () => ({ type: ENTRY_CLEAR })

const ClearEntries = () => ({ type: ENTRIES_CLEAR })

const DeleteReduxEntries = (id, entriesToDelete) => ({
  type: ENTRIES_DELETE,
  id,
  payload: entriesToDelete,
})

const SetEntries = payload => ({
  type: ENTRIES_SET,
  payload,
})

const SetEntriesTags = payload => ({
  type: ENTRIES_SET_TAGS,
  payload,
})

const SetEntriesPeople = payload => ({
  type: ENTRIES_SET_PEOPLE,
  payload,
})

const SetSearchEntries = (search, payload = []) => ({
  type: ENTRIES_SEARCH_FILTER,
  payload,
  search,
})

const SetEntriesSortMap = (sortKey, sortUp) => ({
  type: ENTRIES_SET_SORT_MAP,
  payload: { sortKey, sortUp },
})

const SetEntriesFilterMap = (filterKey, searchValue) => ({
  type: ENTRIES_SET_FILTER_MAP,
  payload: { filterKey, searchValue },
})

const ToggleShowOnlyPublic = () => ({
  type: ENTRIES_TOGGLE_SHOW_ONLY_PUBLIC,
})

const ResetEntriesSortAndFilterMaps = () => ({
  type: ENTRIES_RESET_SORT_AND_FILTER_MAP,
})

const ResetSearchEntries = () => dispatch => dispatch(SetSearchEntries(''))

const SearchEntriesFilter = (search, payload) => ({
  type: ENTRIES_SEARCH_FILTER,
  search,
  payload,
})

export {
  PendingEntries,
  PendingEntry,
  SetEntriesComplete,
  SetEntriesError,
  ClearEntriesErrors,
  SetEntry,
  PostReduxEntry,
  UpdateReduxEntries,
  ClearEntry,
  ClearEntries,
  DeleteReduxEntries,
  SetEntries,
  SetEntriesTags,
  SetEntriesPeople,
  SetSearchEntries,
  SetEntriesSortMap,
  SetEntriesFilterMap,
  ToggleShowOnlyPublic,
  ResetEntriesSortAndFilterMaps,
  ResetSearchEntries,
  SearchEntriesFilter,
}
