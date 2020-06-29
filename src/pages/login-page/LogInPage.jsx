import React from 'react'
import styled from 'styled-components'
import { Formik, ErrorMessage } from 'formik'
import * as Yup from 'yup'
import { toast } from 'react-toastify'

import authService from '../../services/authService'

import {
  Auth,
  ContentWrapper,
  TitleWrapper,
  SubTitle,
  LinkWrapper,
  FormWrapper,
  FormControl,
  Input,
  ErrorWrapper,
  Button
} from '../../components/Auth'

const initialValues = {
  email: '',
  password: ''
}
const validationSchema = Yup.object({
  email: Yup.string()
    .email('Invalid email format')
    .required('Email field is required'),
  password: Yup.string().required('Password field is required')
})

export const LogInPage = ({ history }) => {
  const onSubmit = ({ email, password }, { setSubmitting }) => {
    const apiCall = async () => {
      try {
        await authService.login(email, password)
        history.replace('/')
        toast.success('You have successfully logged in')
      } catch ({ response }) {
        if (response && response.data) {
          toast.error(response.data)
        }
      }
    }
    apiCall()
    setSubmitting(false)
  }
  const authContent = <ContentWrapper>
    <TitleWrapper>Log in</TitleWrapper>
    <SubTitle>
      Don't have an account?
      <LinkWrapper to={'/signup'}> Sign Up</LinkWrapper>
    </SubTitle>
    <Formik
      initialValues={initialValues}
      onSubmit={onSubmit}
      validationSchema={validationSchema}
    >
      {({ isValid, isSubmitting }) => (
        <FormWrapper>
          <FormControl>
            <Input
              type={'email'}
              name={'email'}
              placeholder={'Enter email...'}
            />
            <ErrorMessage name={'email'} component={ErrorWrapper}/>
          </FormControl>
          <FormControl>
            <Input
              type={'password'}
              name={'password'}
              placeholder={'Enter password...'}
            />
            <ErrorMessage name={'password'} component={ErrorWrapper}/>
          </FormControl>
          <ForgotLinkWrapper to={'/forgot'}>
            Forgot Password?
          </ForgotLinkWrapper>
          <Button type={'submit'} disabled={!isValid || isSubmitting}>
            Log In
          </Button>
        </FormWrapper>
      )}
    </Formik>
  </ContentWrapper>
  return Auth(authContent)
}
export const ForgotLinkWrapper = styled(LinkWrapper)`
  margin-top: 1rem;
`