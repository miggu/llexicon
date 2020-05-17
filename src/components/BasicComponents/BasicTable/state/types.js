import PropTypes from "prop-types"

const BasicTableActionTypes = {
  BASIC_TABLE_SORT: "BASIC_TABLE_SORT",
  BASIC_TABLE_FILTER: "BASIC_TABLE_FILTER",
  BASIC_TABLE_SET_PAGE: "BASIC_TABLE_SET_PAGE",
  BASIC_TABLE_SET_PAGE_SIZE: "BASIC_TABLE_SET_PAGE_SIZE",
}

const ColumnPropType = PropTypes.shape({
  title: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
    PropTypes.object,
    PropTypes.func,
  ]),
  key: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  width: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  render: PropTypes.func,
  footer: PropTypes.func,
  sort: PropTypes.oneOfType([PropTypes.func, PropTypes.oneOf(["string"])]),
  defaultSortValue: PropTypes.bool,
  filter: PropTypes.oneOfType([
    PropTypes.func,
    PropTypes.oneOf(["string", "number", "date"]),
  ]),
  defaultFilterValue: PropTypes.string,
  filterPlaceholder: PropTypes.string,
  onRowClick: PropTypes.func,
})

const ColumnsPropType = PropTypes.arrayOf(ColumnPropType)

const DataPropType = PropTypes.arrayOf(PropTypes.object).isRequired

export { BasicTableActionTypes, ColumnPropType, ColumnsPropType, DataPropType }