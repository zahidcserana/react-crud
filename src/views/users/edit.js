import React, { useEffect, useState } from 'react'
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
} from '@coreui/react'
import { Layout } from 'src/components'
import { useNavigate, useParams } from 'react-router-dom'
import { validateEmail } from 'src/user'
import { editUser, getUser } from 'src/api/user'

const FormControl = () => {
  const navigate = useNavigate()
  const [user, setUser] = useState({})
  const [errors, setErrors] = useState({})
  const params = useParams()

  useEffect(() => {
    console.log(params.id)
    if (params.id) {
      getUser(params.id)
        .then((response) => {
          let res = response.data
          let data = {
            id: res.id,
            name: res.attributes.name,
            email: res.attributes.email,
          }
          setUser(data)
          console.log('response')
          console.log(response)
        })
        .catch((err) => {
          console.log(err)
        })
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const handleChange = (e) => {
    const { name, value } = e.target

    setUser((prev) => {
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

  const register = () => {
    const validate = ['name', 'email']
    let errs = {}
    for (let i = 0; i < validate.length; i++) {
      if (!user[validate[i]]) {
        errs = { ...errs, [validate[i]]: `${validate[i]} is required` }
      }
    }

    if (user?.email && !validateEmail(user.email)) {
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
    }
  }

  const save = () => {
    editUser(user)
      .then((response) => {
        navigate('/users')
      })
      .catch((err) => {
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
          </CCardHeader>
          <CCardBody>
            <Layout>
              <CForm>
                <div className="mb-3">
                  <CFormLabel htmlFor="name">Name</CFormLabel>
                  <CFormInput
                    type="text"
                    name="name"
                    id="name"
                    value={user.name || ''}
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
                    value={user.email || ''}
                    onChange={handleChange}
                  />
                  {!!errors.email && <span className="mandatory">{errors.email}</span>}
                  {!!errors.invalid_email && (
                    <span className="mandatory">{errors.invalid_email}</span>
                  )}
                  {!!errors.registered && <span className="mandatory">{errors.registered}</span>}
                </div>
                <div className="mb-3">
                  <CFormLabel htmlFor="about">About</CFormLabel>
                  <CFormTextarea
                    name="about"
                    id="about"
                    rows="3"
                    value={user.about || ''}
                    onChange={handleChange}
                  ></CFormTextarea>
                </div>
                <div className="mb-3">
                  <CButton onClick={() => register()} color="success" className="mb-3">
                    Save
                  </CButton>
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
