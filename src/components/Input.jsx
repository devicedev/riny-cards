import { ErrorMessage, Field } from 'formik'
import styled from 'styled-components'
import React from 'react'

export const FormInput = (props) => {
  const { type, name, placeholder, margin, fontSize } = props
  return <FormControl {...margin}>
    <Input
      type={type}
      name={name}
      placeholder={placeholder}
      style={{ fontSize }}
    />
    <ErrorMessage name={name} component={ErrorWrapper}/>
  </FormControl>
}

const FormControl = styled.div`
  margin-bottom: ${props => props.marginBottom};
  margin-top: ${props => props.marginTop};
  margin-left: ${props => props.marginLeft};
  margin-right: ${props => props.marginRight};
`
const Input = styled(Field)`
  outline: none;
  border: none;
  padding: 0.7rem 0;
  font-size: inherit;
  font-family: inherit;
  width: 100%;
  font-weight: bold;
  color: ${({ theme }) => theme.colors.textColor};
  border-bottom: 2px ${({ theme }) => theme.colors.menuTextColor} solid;
  &:focus {
    border-bottom: 2px ${({ theme }) => theme.colors.primaryColor} solid;
    transition: all 0.2s ease;
  }
  &::placeholder {
    color: ${({ theme }) => theme.colors.menuTextColor};
  }
`
const ErrorWrapper = styled.div`
  font-weight: bold;
  color: red;
  text-align: left;
  margin-top: 0.5rem;
  font-size: 1.4rem;
`