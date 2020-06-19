import React, { useState } from 'react'
import styled from 'styled-components'
import { Link } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faDoorOpen, faDoorClosed } from '@fortawesome/free-solid-svg-icons'

export const LogIn = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [open, setOpen] = useState(false)

  const handleSubmit = () => {}

  const handleChangeEmail = (e) => {
    const value = e.currentTarget.value
    setEmail(value)
    if (value && password) setOpen(true)
    else setOpen(false)
  }
  const handleChangePassword = (e) => {
    const value = e.currentTarget.value
    setPassword(value)
    if (value && email) setOpen(true)
    else setOpen(false)
  }

  return (
    <Wrapper>
      <TitleWrapper>Log in</TitleWrapper>
      <SignUpWrapper>
        Don't have an account?
        <LinkWrapper to={'/signup'}> Sign Up</LinkWrapper>
      </SignUpWrapper>
      <LoginIcon icon={open ? faDoorOpen : faDoorClosed} />
      <form onSubmit={handleSubmit} autoComplete={'off'}>
        <EmailInput
          onChange={handleChangeEmail}
          value={email}
          type={'email'}
          name={'email'}
          placeholder={'Enter email...'}
          required
        />
        <PasswordInput
          onChange={handleChangePassword}
          value={password}
          type={'password'}
          name={'password'}
          placeholder={'Enter password...'}
          required
        />
      </form>
      <LinkWrapper to={'/forgot'}>Forgot Password?</LinkWrapper>
      <LogInButton type={'submit'}> Log In </LogInButton>
    </Wrapper>
  )
}
const Wrapper = styled.div`
  border-radius: 25px;
  background-color: #fff;
  display: flex;
  flex-direction: column;
  padding: 5rem 5rem;
  justify-content: center;
  font-size: 1.5rem;
`
const TitleWrapper = styled.div`
  font-weight: 500;
  letter-spacing: normal;
  font-size: 3rem;
  margin-bottom: 2rem;
  color: ${({ theme }) => theme.colors.textColor};
`
const SignUpWrapper = styled.div`
  color: ${({ theme }) => theme.colors.menuTextColor};
  margin-bottom: 5rem;
`
const LinkWrapper = styled(Link)`
  text-decoration: none;
  font-weight: bold;
  color: ${({ theme }) => theme.colors.primaryColor};
  text-transform: uppercase;
  cursor: pointer;
`
const LoginIcon = styled(FontAwesomeIcon)`
  font-size: 5rem;
  color: ${({ theme }) => theme.colors.primaryColor};
  margin-bottom: 5rem;
  align-self: center;
`
const LoginInput = styled.input`
  outline: none;
  border: none;
  padding: 0.7rem 1.5rem;
  font-size: 1.5rem;
  width: 100%;
  border-bottom: 2px ${({ theme }) => theme.colors.menuTextColor} solid;
  &:hover {
    border-bottom: 2px ${({ theme }) => theme.colors.primaryColor} solid;
    transition: all 0.2s ease;
  }
`
const EmailInput = styled(LoginInput)`
  margin-bottom: 2rem;
`
const PasswordInput = styled(LoginInput)`
  margin-bottom: 5rem;
`
const LogInButton = styled.div`
  text-transform: uppercase;
  color: #fff;
  background-color: ${({ theme }) => theme.colors.primaryColor};
  border-radius: 10px;
  font-weight: 500;
  margin-top: 2rem;
  padding: 0.7rem 0;
  cursor: pointer;
  &:hover {
    filter: brightness(95%);
  }
`
