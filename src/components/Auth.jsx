import React from 'react'
import styled from 'styled-components'
import { Link } from 'react-router-dom'
import { Form } from 'formik'

import { Root } from './'

export const Auth = (authContent) => {
  const content =
    <Wrapper>
      {authContent}
    </Wrapper>
  return Root(content)
}

const Wrapper = styled.div`
  flex: 1;
  padding: 0 35rem;
  text-align: center;
  height: 70vh; 
`
export const ContentWrapper = styled.div`
  border-radius: 25px;
  background-color: #fff;
  display: flex;
  flex-direction: column;
  padding: 5rem 5rem;
  justify-content: center;
  font-size: 1.5rem;
`
export const TitleWrapper = styled.div`
  font-weight: 500;
  font-size: 2.5rem;
  margin-bottom: 2rem;
  color: ${({ theme }) => theme.colors.textColor};
`
export const SubTitle = styled.div`
  color: ${({ theme }) => theme.colors.menuTextColor};
  letter-spacing: .1rem;
  margin-bottom: 3rem;
`
export const LinkWrapper = styled(Link)`
  text-decoration: none;
  font-weight: bold;
  color: ${({ theme }) => theme.colors.primaryColor};
  text-transform: uppercase;
  cursor: pointer;
`
export const FormWrapper = styled(Form)`
  display: flex;
  flex-direction: column;
`