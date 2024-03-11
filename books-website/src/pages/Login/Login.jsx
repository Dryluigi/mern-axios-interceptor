import { useState } from "react"
import {
  Button,
  Card,
  CardBody,
  CardHeader,
  Container,
  Form,
  FormControl,
  FormGroup,
  FormLabel,
} from "react-bootstrap"
import { useNavigate } from "react-router-dom"

import App from "../../layouts/app"

import axiosInstance from '../../utils/axios/instance'

import './login.css'

function Login() {
  const navigate = useNavigate()
  const [emailInput, setEmailInput] = useState('')
  const [passwordInput, setPasswordInput] = useState('')
  const submitHandler = async (e) => {
    try {
      e.preventDefault()

      const res = await axiosInstance.post('http://localhost:3001/auth/login', {
        email: emailInput,
        password: passwordInput,
      })

      if (res.data.success) {
        localStorage.setItem('access_token', res.data.data.access_token)
        localStorage.setItem('refresh_token', res.data.data.refresh_token)

        navigate('/books')
      }

    } catch (e) {
      console.error(e)
    }
  }

  return (
    <App>
      <Container className="mt-5">
        <Card className="login-form mx-auto">
          <CardHeader>Login</CardHeader>
          <CardBody>
            <Form onSubmit={submitHandler}>
              <FormGroup className="mb-2">
                <FormLabel>Email</FormLabel>
                <FormControl type="email" name="email" onChange={(e) => setEmailInput(e.target.value)} value={emailInput} />
              </FormGroup>
              <FormGroup className="mb-3">
                <FormLabel>Password</FormLabel>
                <FormControl type="password" name="password" onChange={(e) => setPasswordInput(e.target.value)} value={passwordInput} />
              </FormGroup>
              <Button type="submit">Login</Button>
            </Form>
          </CardBody>
        </Card>
      </Container>
    </App>
  )
}

export default Login