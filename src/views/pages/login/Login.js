import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import {
  CButton,
  CCard,
  CCardBody,
  CCardGroup,
  CCol,
  CContainer,
  CForm,
  CFormInput,
  CInputGroup,
  CInputGroupText,
  CRow,
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import { cilLockLocked, cilUser } from '@coreui/icons'
import { getUser } from '../../../user'

const Login = () => {
  const navigate = useNavigate()
  const [params, setParams] = useState({})
  const [errors, setErrors] = useState({})
  const handleChange = (e) => {
    const { name, value } = e.target

    setParams((prev) => {
      return {
        ...prev,
        [name]: value,
      }
    })

    setError(name, '')
    setError('not_registered', '')
    if (name === 'password') {
      setError('incorrect_password', '')
    }
  }

  useEffect(() => {
    const user = getUser()

    if (user) {
      navigate('/dashboard')
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const setError = (name, value) => {
    setErrors((prev) => {
      return {
        ...prev,
        [name]: value,
      }
    })
  }

  const login = () => {
    const { email, password } = params

    if (!email) {
      setError('email', 'email is required')
    }

    if (!password) {
      setError('password', 'password is required')
    }

    if (email && password) {
      const users = []

      users.push(...(JSON.parse(localStorage.getItem('users')) || []))

      const exist = users.find((u) => u?.email === params.email)
      if (exist) {
        if (exist.password !== params.password) {
          setError('incorrect_password', 'Incorrect Password')
        } else {
          localStorage.setItem('user', JSON.stringify(exist))
          exist.login = true
          localStorage.setItem('users', JSON.stringify(users))
          navigate('/dashboard')
          setParams({})
        }
      } else {
        setError('not_registered', 'User not Registered')
      }
    }
  }

  return (
    <div className="bg-light min-vh-100 d-flex flex-row align-items-center">
      <CContainer>
        <CRow className="justify-content-center">
          <CCol md={8}>
            <CCardGroup>
              <CCard className="p-4">
                <CCardBody>
                  <CForm>
                    <h1>Login</h1>
                    <p className="text-medium-emphasis">Sign In to your account</p>
                    <div className="space"></div>
                    <CInputGroup className="mb-3">
                      <CInputGroupText>
                        <CIcon icon={cilUser} />
                      </CInputGroupText>
                      <CFormInput
                        type="text"
                        name="email"
                        value={params.email || ''}
                        onChange={handleChange}
                        placeholder="Email"
                        autoComplete="email"
                      />
                      {!!errors.email && <span className="mandatory">{errors.email}</span>}
                    </CInputGroup>
                    <CInputGroup className="mb-4">
                      <CInputGroupText>
                        <CIcon icon={cilLockLocked} />
                      </CInputGroupText>
                      <CFormInput
                        name="password"
                        value={params.password || ''}
                        onChange={handleChange}
                        type="password"
                        placeholder="Password"
                        autoComplete="current-password"
                      />
                    </CInputGroup>
                    <CRow>
                      <CCol xs={6}>
                        <CButton color="primary" className="px-4" onClick={() => login()}>
                          Login
                        </CButton>
                      </CCol>
                      <CCol xs={6} className="text-right">
                        <CButton color="link" className="px-0">
                          Forgot password?
                        </CButton>
                      </CCol>
                    </CRow>
                  </CForm>
                </CCardBody>
              </CCard>
              <CCard className="text-white bg-primary py-5" style={{ width: '44%' }}>
                <CCardBody className="text-center">
                  <div>
                    <h2>Sign up</h2>
                    <p>
                      Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod
                      tempor incididunt ut labore et dolore magna aliqua.
                    </p>
                    <Link to="/register">
                      <CButton color="primary" className="mt-3" active tabIndex={-1}>
                        Register Now!
                      </CButton>
                    </Link>
                  </div>
                </CCardBody>
              </CCard>
            </CCardGroup>
          </CCol>
        </CRow>
      </CContainer>
    </div>
  )
}

export default Login
