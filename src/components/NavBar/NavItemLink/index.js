import React, { useMemo, memo } from 'react'
import PropTypes from 'prop-types'
import { NavItem, NavLink, DropdownItem } from 'reactstrap'
import { NavLink as RouterNavLink } from 'react-router-dom'
import { RouterLinkPush } from '../../../redux/router/actions'
import './styles.css'

const NavItemLink = ({ dropdownItem, route, title, icon, onClick, render }) => {
  const renderNavLink = useMemo(
    () =>
      render || (
        <NavItem key={title} tag={'div'}>
          <NavLink
            activeClassName='active'
            className='Navlink'
            tag={RouterNavLink}
            to={RouterLinkPush(route)}
            onClick={onClick}
          >
            {icon}
            <span className='NavBarLink'>{title}</span>
          </NavLink>
        </NavItem>
      ),
    [icon, render, route, title],
  )

  return dropdownItem ? (
    <DropdownItem className='Navlink'>{renderNavLink}</DropdownItem>
  ) : (
    renderNavLink
  )
}

NavItemLink.propTypes = {
  dropdownItem: PropTypes.bool.isRequired,
  route: PropTypes.string,
  title: PropTypes.string,
  icon: PropTypes.node,
  onClick: PropTypes.func,
  render: PropTypes.node,
}

NavItemLink.defaultProps = { dropdownItem: false }

export default memo(NavItemLink)
