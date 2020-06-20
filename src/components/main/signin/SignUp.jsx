import React from 'react'
import { Redirect } from 'react-router-dom'
import { Formik, ErrorMessage } from 'formik'
import * as Yup from 'yup'
import { toast } from 'react-toastify'

import userService from '../../../services/userService'
import authService from '../../../services/authService'

import {
  ContentWrapper,
  TitleWrapper,
  SubTitle,
  LinkWrapper,
  FormWrapper,
  FormControl,
  Input,
  ErrorWrapper,
  Button
} from '../Authentication'

const initialValues = {
  name: '',
  email: '',
  password: ''
}
const onSubmit = async ({ name, email, password }, { setSubmitting }) => {
  try {
    const { headers } = await userService.register({ name, email, password })
    authService.loginJwt(headers['x-auth-token'])
    toast.success('You have successfully signed up')
    window.location = '/'
  } catch ({ response }) {
    if (response && response.data)
      toast.error(response.data)
  } finally {
    setSubmitting(false)
  }
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
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{5,50}$/,
      'Must contain between 5 and 50 characters, 1 uppercase, 1 lowercase and 1 number'
    )
    .required('Password field is required')
})
export const SignUp = () => {
  const user = authService.getCurrentUser()
  if (user) return <Redirect to={'/'}/>
  return (<ContentWrapper>
      <TitleWrapper>Create a rinycards account</TitleWrapper>
      <SubTitle> Already have an account? <LinkWrapper to={'/login'}> Log In</LinkWrapper> </SubTitle>
      <Formik
        initialValues={initialValues}
        onSubmit={onSubmit}
        validationSchema={validationSchema}
        validateOnMount
      >
        {({ isValid, isSubmitting }) => (<FormWrapper>
            <FormControl>
              <Input
                type={'text'}
                name={'name'}
                placeholder={'Enter name...'}
              />
              <ErrorMessage name={'name'} component={ErrorWrapper}/>
            </FormControl>
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
            <Button disabled={!isValid || isSubmitting}>Sign Up</Button>
          </FormWrapper>
        )}
      </Formik>
    </ContentWrapper>
  )
}
