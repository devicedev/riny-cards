import React from 'react'
import { Formik } from 'formik'
import * as Yup from 'yup'
import { toast } from 'react-toastify'

import userService from '../../services/userService'
import authService from '../../services/authService'

import { Auth, ContentWrapper, FormWrapper, LinkWrapper, SubTitle, TitleWrapper } from '../../components/Auth'
import { FormInput, FullButton } from '../../components'

export const SignUpPage = ({ history }) => {
  const handleSubmit = ({ name, email, password }, { setSubmitting }) => {
    const apiCall = async () => {
      try {
        const { headers } = await userService.register({ name, email, password })
        authService.loginJwt(headers['x-auth-token'])
        history.replace('/')
        toast.success('You have successfully signed up')
      } catch ({ response }) {
        if (response && response.data)
          toast.error(response.data)
      }
    }
    apiCall()
    setSubmitting(false)
  }
  const authContent = <ContentWrapper>
    <TitleWrapper>Create a rinycards account</TitleWrapper>
    <SubTitle> Already have an account? <LinkWrapper to={'/login'}> Log In</LinkWrapper> </SubTitle>
    <Formik
      initialValues={initialValues}
      onSubmit={handleSubmit}
      validationSchema={validationSchema}
    >
      {({ isValid, isSubmitting }) => (<FormWrapper>
          <FormInput
            type={'text'}
            name={'name'}
            placeholder={'Enter name...'}
            margin={{ marginBottom: '2rem' }}
          />
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
          <FullButton type={'submit'} disabled={!isValid || isSubmitting}>Sign Up</FullButton>
        </FormWrapper>
      )}
    </Formik>
  </ContentWrapper>
  return Auth(authContent)
}

const initialValues = {
  name: '',
  email: '',
  password: ''
}
const validationSchema = Yup.object({
  name: Yup
    .string()
    .min(1, 'The name field must have at least 1 character')
    .max(50, 'The name can not be longer than 50 characters')
    .required('Name field is required'),
  email: Yup.string()
    .email('Invalid email format')
    .min(5, 'The email field must have at least 5 characters')
    .max(50, 'The email can not be longer than 255 characters')
    .required('Email field is required'),
  password: Yup.string()
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d_@./#&+-]{5,50}$/,
      'Must contain between 5 and 50 characters, 1 uppercase, 1 lowercase and 1 number'
    )
    .required('Password field is required')
})