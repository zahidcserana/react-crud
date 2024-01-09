import React, { useEffect, useState } from 'react'
import {
  CButton,
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
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
import { useNavigate } from 'react-router-dom'
import { getUsers } from 'src/api/user'
import CIcon from '@coreui/icons-react'
import { cilPencil } from '@coreui/icons'

// let [last, setLast] = useState()
let lastPage = 1
let number = 1
let size = 2

const Users = () => {
  let query = {
    page: {
      number: number,
      size: size,
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
        lastPage = response.meta.page.lastPage
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

  return (
    <CRow>
      <CCol xs={12}>
        <CCard className="mb-4">
          <CCardHeader>
            <strong>User List</strong>
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
            </Layout>

            <CPagination aria-label="Page navigation example">
              <CPaginationItem
                aria-label="Previous"
                onClick={() => previous()}
                title={number - 1}
                disabled={1 === query.page.number}
              >
                <span aria-hidden="true">&laquo;</span>
              </CPaginationItem>
              <CPaginationItem
                aria-label="Next"
                onClick={() => next()}
                title={number + 1}
                disabled={lastPage === query.page.number}
              >
                <span aria-hidden="true">&raquo;</span>
              </CPaginationItem>
            </CPagination>
          </CCardBody>
        </CCard>
      </CCol>
    </CRow>
  )
}

export default Users
