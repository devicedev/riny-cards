import React from 'react'
import { Formik } from 'formik'
import * as Yup from 'yup'
import { toast } from 'react-toastify'

import authService from '../../services/authService'

import {
  Auth,
  ContentWrapper,
  TitleWrapper,
  SubTitle,
  LinkWrapper,
  FormWrapper
} from '../../components/Auth'
import {
  FullButton,
  FormInput
} from '../../components'

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
  const handleSubmit = (credentials, { setSubmitting }) => {
    const apiCall = async () => {
      try {
        await authService.login(credentials)
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
      onSubmit={handleSubmit}
      validationSchema={validationSchema}
    >
      {({ isValid, isSubmitting }) => (
        <FormWrapper>
          <FormInput
            type={'email'}
            name={'email'}
            placeholder={'Enter email...'}
            margin={{ marginBottom: '2rem' }}
          />
          <FormInput
            type={'password'}
            name={'password'}
            placeholder={'Enter password...'}
            margin={{ marginBottom: '2rem' }}
          />
          <LinkWrapper to={'/forgot'} style={{ marginTop: '1rem' }}>
            Forgot Password?
          </LinkWrapper>
          <FullButton type={'submit'} disabled={!isValid || isSubmitting}>
            Log In
          </FullButton>
        </FormWrapper>
      )}
    </Formik>
  </ContentWrapper>
  return Auth(authContent)
}