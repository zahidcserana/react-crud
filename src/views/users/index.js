import React, { useEffect, useState } from 'react'
import {
  CButton,
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CFormSelect,
  CPagination,
  CPaginationItem,
  CRow,
  CTable,
  CTableBody,
  CTableDataCell,
  CTableHead,
  CTableHeaderCell,
  CTableRow,
} from '@coreui/react'
import { Layout } from 'src/components'
import { Link, useNavigate } from 'react-router-dom'
import { getUsers } from 'src/api/user'
import CIcon from '@coreui/icons-react'
import { cilPencil } from '@coreui/icons'
import { page } from 'src/utils/config'

const Users = () => {
  let number = 1
  const [hasNext, setHasNext] = useState(false)
  const [hasPrev, setHasPrev] = useState(false)
  let query = {
    page: {
      number: page.number,
      size: page.size,
    },
  }
  const navigate = useNavigate()
  const [users, setUsers] = useState([])

  useEffect(() => {
    get()
  }, [])

  const get = () => {
    getUsers(query)
      .then((response) => {
        setUsers(response.data)
        setHasNext(response.links.next ? true : false)
        setHasPrev(response.links.prev ? true : false)
      })
      .catch((err) => {
        console.log(err)
      })
  }

  const next = () => {
    number += 1
    query.page.number = number
    get()
  }

  const previous = () => {
    number -= 1
    query.page.number = number
    get()
  }

  const reset = (e) => {
    query.page.number = 1
    query.page.size = e.target.value
    get()
  }

  return (
    <CRow>
      <CCol xs={12}>
        <CCard className="mb-4">
          <CCardHeader>
            <strong>User List</strong>
            <Link to="/users/create" className="btn-add">
              <CButton color="primary" className="mt-3" active tabIndex={-1}>
                Add User
              </CButton>
            </Link>
          </CCardHeader>
          <CCardBody>
            <p className="text-medium-emphasis small">filter...</p>
            <Layout href="components/table">
              <CTable>
                <CTableHead>
                  <CTableRow>
                    <CTableHeaderCell scope="col">#</CTableHeaderCell>
                    <CTableHeaderCell scope="col">Name</CTableHeaderCell>
                    <CTableHeaderCell scope="col">Email</CTableHeaderCell>
                    <CTableHeaderCell scope="col">About</CTableHeaderCell>
                  </CTableRow>
                </CTableHead>
                <CTableBody>
                  {users?.map((item, i) => (
                    <CTableRow key={i}>
                      <CTableHeaderCell scope="row">
                        <CButton onClick={() => navigate(`/users/edit/${item.id}`)}>
                          <CIcon icon={cilPencil} title={item.id} />
                        </CButton>
                      </CTableHeaderCell>
                      <CTableDataCell>{item.attributes.name}</CTableDataCell>
                      <CTableDataCell>{item.attributes.email}</CTableDataCell>
                      <CTableDataCell>{item.attributes.createdAt}</CTableDataCell>
                    </CTableRow>
                  ))}
                </CTableBody>
              </CTable>

              <div>
                <CPagination aria-label="Page navigation example" className="pagination">
                  <CPaginationItem
                    aria-label="Previous"
                    onClick={() => previous()}
                    title={'page: ' + (number - 1)}
                    disabled={!hasPrev}
                  >
                    <span aria-hidden="true">&laquo;</span>
                  </CPaginationItem>
                  <CPaginationItem
                    aria-label="Next"
                    onClick={() => next()}
                    title={'page: ' + (number + 1)}
                    disabled={!hasNext}
                  >
                    <span aria-hidden="true">&raquo;</span>
                  </CPaginationItem>
                </CPagination>

                <CFormSelect
                  className="page-size"
                  onChange={reset}
                  aria-label="Default select example"
                  options={[
                    { label: '5', value: '5' },
                    { label: '10', value: '10' },
                    { label: '100', value: '100' },
                  ]}
                />
              </div>
            </Layout>
          </CCardBody>
        </CCard>
      </CCol>
    </CRow>
  )
}

export default Users
