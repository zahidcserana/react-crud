import PropTypes from 'prop-types'
import React from 'react'
import { CTabContent, CTabPane } from '@coreui/react'

const Layout = (props) => {
  const { children } = props

  return (
    <div className="example">
      <CTabContent className="rounded-bottom">
        <CTabPane className="p-3 preview" visible>
          {children}
        </CTabPane>
      </CTabContent>
    </div>
  )
}

Layout.propTypes = {
  children: PropTypes.node,
  href: PropTypes.string,
}

export default React.memo(Layout)
