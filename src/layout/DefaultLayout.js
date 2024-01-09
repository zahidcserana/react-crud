import React, { useEffect, useState } from 'react'
import { AppContent, AppSidebar, AppFooter, AppHeader } from '../components/index'
import { RingLoader } from 'react-spinners'

const DefaultLayout = () => {
  const [spinner, setSpinner] = useState(true)

  useEffect(() => {
    setTimeout(() => setSpinner(false), 1000)
  }, [])

  return (
    <div>
      <AppSidebar />
      <div className="wrapper d-flex flex-column min-vh-100 bg-light">
        <AppHeader />
        <div className="body flex-grow-1 px-3">
          {spinner ? (
            <div className="divLoader">
              <RingLoader size="80px" color="#00cca3" />
            </div>
          ) : (
            <AppContent />
          )}
        </div>
        <AppFooter />
      </div>
    </div>
  )
}

export default DefaultLayout
