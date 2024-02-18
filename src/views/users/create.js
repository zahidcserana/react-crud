import React, { useState } from 'react'
import {
  CButton,
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CForm,
  CFormInput,
  CFormLabel,
  CFormTextarea,
  CRow,
  CSpinner,
} from '@coreui/react'
import { Layout } from 'src/components'
import { Link, useNavigate } from 'react-router-dom'
import { validateEmail } from 'src/user'
import { addUser } from 'src/api/user'

const FormControl = () => {
  const navigate = useNavigate()
  const [params, setParams] = useState({})
  const [errors, setErrors] = useState({})
  const [loading, setLoading] = useState(false)

  const handleChange = (e) => {
    const { name, value } = e.target

    setParams((prev) => {
      return {
        ...prev,
        [name]: value,
      }
    })

    setError(name, '')

    if (name === 'email') {
      setError('registered', '')
      setError('invalid_email', '')
    }
  }

  const setError = (name, value) => {
    setErrors((prev) => {
      return {
        ...prev,
        [name]: value,
      }
    })
  }

  const add = () => {
    setLoading(true)
    const validate = ['name', 'email', 'password']
    let errs = {}
    for (let i = 0; i < validate.length; i++) {
      if (!params[validate[i]]) {
        errs = { ...errs, [validate[i]]: `${validate[i]} is required` }
      }
    }

    if (params?.email && !validateEmail(params.email)) {
      errs = { ...errs, invalid_email: 'Invalid Email' }
    }

    setErrors((prev) => {
      return {
        ...prev,
        ...errs,
      }
    })

    if (!Object.keys(errs).length) {
      save()
    } else {
      setLoading(false)
    }
  }

  const save = () => {
    addUser(params)
      .then((response) => {
        navigate('/users')
      })
      .catch((err) => {
        setLoading(false)
        setError('registered', err.response.data.message)
        console.log(err)
      })
  }
  return (
    <CRow>
      <CCol xs={12}>
        <CCard className="mb-4">
          <CCardHeader>
            <strong>Add User</strong>
            <Link to="/users" className="btn-add">
              <CButton color="primary" className="mt-3" active tabIndex={-1}>
                User List
              </CButton>
            </Link>
          </CCardHeader>
          <CCardBody>
            <Layout>
              <CForm>
                {!!errors.registered && <span className="mandatory">{errors.registered}</span>}
                <div className="mb-3">
                  <CFormLabel htmlFor="name">Name</CFormLabel>
                  <CFormInput
                    type="text"
                    name="name"
                    id="name"
                    value={params.name || ''}
                    onChange={handleChange}
                    placeholder="Name"
                    autoComplete="name"
                  />
                  {!!errors.name && <span className="mandatory">{errors.name}</span>}
                </div>
                <div className="mb-3">
                  <CFormLabel htmlFor="email">Email</CFormLabel>
                  <CFormInput
                    placeholder="Email"
                    autoComplete="email"
                    type="email"
                    name="email"
                    id="email"
                    value={params.email || ''}
                    onChange={handleChange}
                  />
                  {!!errors.email && <span className="mandatory">{errors.email}</span>}
                  {!!errors.invalid_email && (
                    <span className="mandatory">{errors.invalid_email}</span>
                  )}
                </div>
                <div className="mb-3">
                  <CFormLabel htmlFor="password">Password</CFormLabel>
                  <CFormInput
                    type="password"
                    placeholder="Password"
                    autoComplete="new-password"
                    name="password"
                    id="password"
                    value={params.password || ''}
                    onChange={handleChange}
                  />
                  {!!errors.password && <span className="mandatory">{errors.password}</span>}
                </div>
                <div className="mb-3">
                  <CFormLabel htmlFor="password_confirmation">Confirm password</CFormLabel>
                  <CFormInput
                    type="password"
                    placeholder="Confirm password"
                    autoComplete="new-password"
                    name="password_confirmation"
                    id="password_confirmation"
                    value={params.password_confirmation || ''}
                    onChange={handleChange}
                  />
                  {!!errors.password_confirmation && (
                    <span className="mandatory">{errors.password_confirmation}</span>
                  )}
                </div>
                <div className="mb-3">
                  <CFormLabel htmlFor="about">About</CFormLabel>
                  <CFormTextarea
                    name="about"
                    id="about"
                    rows="3"
                    value={params.about || ''}
                    onChange={handleChange}
                  ></CFormTextarea>
                </div>
                <div className="mb-3">
                  {loading ? (
                    <CButton disabled>
                      <CSpinner component="span" size="sm" aria-hidden="true" />
                      Loading...
                    </CButton>
                  ) : (
                    <CButton onClick={() => add()} color="success" className="mb-3">
                      Save
                    </CButton>
                  )}
                </div>
              </CForm>
            </Layout>
          </CCardBody>
        </CCard>
      </CCol>
    </CRow>
  )
}

export default FormControl
