import { Button, Container, Table } from "react-bootstrap"
import { useNavigate } from "react-router-dom"
import App from "../../layouts/app"
import { useEffect, useState } from "react"

import useApi from "../../hooks/useApi"

function Books() {
  const [books, setBooks] = useState([])
  const navigate = useNavigate()
  const api = useApi()
  const logoutHandler = () => {
    localStorage.clear('access_token')
    localStorage.clear('refresh_token')
    navigate('/login')
  }

  useEffect(() => {
    const getData = async () => {
      try {
        const res = await api.execute('http://localhost:3001/books', 'GET')

        setBooks(res.data.data.books)
      } catch (e) {
        console.log(e)
      }
    }

    getData()
  }, [api.execute])

  return (
    <App>
      <Container className="mt-5">
        <Table striped hover bordered>
          <thead>
            <tr>
              <th>No</th>
              <th>Judul</th>
              <th>Penulis</th>
              <th>Jumlah Halaman</th>
            </tr>
          </thead>
          <tbody>
            {books.map((book, i) => (
              <tr key={book.id}>
                <td>{i + 1}</td>
                <td>{book.title}</td>
                <td>{book.author}</td>
                <td>{book.pages}</td>
              </tr>
            ))}
          </tbody>
        </Table>
        <Button size="sm" variant="danger" onClick={logoutHandler}>Logout</Button>
      </Container>
    </App>
  )
}

export default Books