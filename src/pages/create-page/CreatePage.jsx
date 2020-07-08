import React from 'react'
import styled, { css } from 'styled-components'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faLayerGroup,
  faCog,
  faMountain,
  faExclamationCircle,
  faTrashAlt,
  faPlusCircle
} from '@fortawesome/free-solid-svg-icons'
import { ErrorMessage, Field, Form, Formik, FieldArray } from 'formik'
import * as Yup from 'yup'

import { FullButton, Root, FormInput } from '../../components'
import { toast } from 'react-toastify'

const initialValues = {
  deckTitle: '',
  deckDescription: '',
  cards: [{ front: '', back: '' }]
}
const validationSchema = Yup.object({
  deckTitle: Yup.string().min('1').max('255').required('The deck title is required'),
  deckDescription: Yup.string().min('1').max('500'),
  cards: Yup.array().of(
    Yup.object().shape({
      front: Yup.string().min('1').max('255').required('The front side cannot be empty'),
      back: Yup.string().min('1').max('255').required('The back side cannot be empty')
    })
  ).required()
})

export const CreatePage = () => {
  const handleSubmit = (values, props) => {
    const { deckTitle, deckDescription, cards } = values
    const { setSumbitting } = props

  }

  const content = <Wrapper>
    <Formik
      initialValues={initialValues}
      onSubmit={handleSubmit}
      validationSchema={validationSchema}
      validateOnMount
    >
      {({ isSubmitting }) =>
        <Form autoComplete={'off'}>
          <Header isSubmitting={isSubmitting}/>
          <Body/>
        </Form>
      }
    </Formik>
  </Wrapper>
  return Root(content)
}
const Wrapper = styled.div`
  width: 100%;
  height: auto;
  border-radius: 15px;
  background-color: #FFF;
  box-shadow: 1px 1px 5px rgba(0, 0, 0, 0.1), 0 0 25px 0 rgba(0, 0, 0, 0.04);
  padding: 3.5rem 3rem;
`

const Header = ({ isSubmitting }) => {
  return <HeaderWrapper>
    <SettingsContainer>
      <IconContainer>
        <FontAwesomeIcon icon={faLayerGroup}/>
      </IconContainer>
      <IconContainer>
        <FontAwesomeIcon icon={faCog}/>
      </IconContainer>
    </SettingsContainer>
    <MainContainer>
      <CoverInput>
        <CoverInputIcon icon={faMountain}/>
        Choose cover image
      </CoverInput>
      <TextInputContainer>
        <DeckTitleFormInputWrapper>
          <FormInput
            type={'text'}
            name={'deckTitle'}
            placeholder={'Enter title'}
          />
        </DeckTitleFormInputWrapper>
        <DeckDescriptionFormInputWrapper>
          <FormInput
            type={'text'}
            name={'deckDescription'}
            placeholder={'Enter description (optional)'}
          />
        </DeckDescriptionFormInputWrapper>
      </TextInputContainer>
    </MainContainer>
    <CreateContainer>
      <FullButtonWrapper>
        <FullButton type={'submit'} disabled={isSubmitting}>Create</FullButton>
      </FullButtonWrapper>
    </CreateContainer>
  </HeaderWrapper>
}
const HeaderWrapper = styled.div`
  width: 100%;
  height: 20vh;
  display: flex;
  align-items: flex-start;
`
const SettingsContainer = styled.div`
  flex: 1;
  display: flex;
  color: ${({ theme }) => theme.colors.primaryColor};
`
const IconContainer = styled.div`
  border: 2px solid ${({ theme }) => theme.colors.primaryColor};
  padding: .5rem;
  margin-right: 1rem;
  border-radius: 10px;
  font-size: 2.5rem;
  cursor: pointer;
  &:hover {
    filter: brightness(95%);
  }
`
const MainContainer = styled.div`
  flex: 4;
  padding: 0 5rem;
  display: flex;
`
const CoverInput = styled.div`
  flex-basis: 20%;
  display: flex;
  flex-direction: column;
  text-transform: uppercase;
  justify-content: center;
  align-items: center;
  border-radius: 15px;
  box-shadow: 0 3px 10px 0 rgba(0,0,0,.18);
  padding: 1rem;
  height: 15rem;
  font-size: 1.5rem;
  margin-right: 2rem;
  color: ${({ theme }) => theme.colors.menuTextColor};
  text-align: center;
  font-weight: bold;
`
const CoverInputIcon = styled(FontAwesomeIcon)`
  margin-bottom: 1rem;
`
const TextInputContainer = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
  font-size: 1.5rem;
`
const DeckTitleFormInputWrapper = styled.div`
  font-size: 2.2rem;
  margin-bottom: .5rem;
`
const DeckDescriptionFormInputWrapper = styled.div`
  margin-top: .5rem;
`
const CreateContainer = styled.div`
  flex: 1;
  font-size: 1.5rem;
`
const FullButtonWrapper = styled.div`
  margin-top: -2rem;
`

const Body = () => {
  return <BodyWrapper>
    <Table>
      <thead>
      <tr>
        <th/>
        <th>Front</th>
        <th>Back</th>
        <th/>
      </tr>
      </thead>
      <tbody>
      <FieldArray name={'cards'}>
        {({ form: { values: { cards } }, push, remove }) => {
          return cards.map((element, index) =>
            <BodyRow
              key={index}
              index={index}
              length={cards.length}
              remove={remove}
              push={push}
            />)
        }}
      </FieldArray>
      </tbody>
    </Table>
  </BodyWrapper>
}
const BodyWrapper = styled.div`
  height: auto;
  width: 100%;
  margin-top: 5rem;
`
const Table = styled.table`
  height: 100%;
  width: 100%;
  text-align: left;
  font-size: 1.5rem;
  border-collapse: separate;
  border-spacing: 0;
  
  td,th {
    border: 1px solid ${({ theme }) => theme.colors.borderColor};
    padding: 0;
    position: relative;
  }
  thead tr{
    font-size: 2rem;
    color: ${({ theme }) => theme.colors.menuTextColor};
    font-weight: bold;
    background-color: ${({ theme }) => theme.colors.backGroundColor};
    th {
      padding: 1rem; 
    }
  }
  tr td:first-child,tr td:last-child {
    width: 4%;
    font-size: 1.5rem;
    color: ${({ theme }) => theme.colors.menuTextColor};
    font-weight: bold;
    text-align: center;
    background-color: ${({ theme }) => theme.colors.backGroundColor};
    padding: 1rem; 
  }
  tbody tr:last-child td:first-child {
    padding-bottom: 1.5rem;
  }
  
  tr:first-child th:first-child { border-top-left-radius: 10px; }
  tr:first-child th:last-child { border-top-right-radius: 10px; }
  thead tr th {
    border-top: 2px solid ${({ theme }) => theme.colors.borderColor};
  }
  tr th:first-child, tr td:first-child {
    border-left: 2px solid ${({ theme }) => theme.colors.borderColor};
  }
  tbody tr:last-child td{
    border-bottom: 2px solid ${({ theme }) => theme.colors.borderColor};
  }
  tr th:last-child, tr td:last-child {
    border-right: 2px solid ${({ theme }) => theme.colors.borderColor};
  }
`

const BodyRow = ({ index, length, push, remove }) => {
  const deleteAble = length > 1
  const handleRemove = () => deleteAble && remove(index)
  const handleKeyDown = (e) => {
    if (e.keyCode === 9) {
      pushNewItem()
    }
  }
  const pushNewItem = () => {
    push({ front: '', back: '' })
  }
  return <tr>
    <td>
      {index + 1}
      {index + 1 === length && <AddIcon onAdd={pushNewItem}/>}
    </td>
    <td>
      <CardInput type="text" name={`cards[${index}].front`}/>
      <ErrorMessage name={`cards[${index}].front`} component={ErrorIcon}/>
    </td>
    <td>
      <CardInput
        type="text"
        name={`cards[${index}].back`}
        onKeyDown={length === index + 1 ? handleKeyDown : undefined}
      />
      <ErrorMessage name={`cards[${index}].back`} component={ErrorIcon}/>
    </td>
    <td>
      <DeleteIcon index={index} deleteAble={deleteAble} onRemove={handleRemove}/>
    </td>
  </tr>
}
const CardInput = styled(Field)`
  border: none;
  outline-color: ${({ theme }) => theme.colors.primaryColor};
  font-size: inherit;
  font-family: inherit;
  width: 100%;
  height: 100%;
  color: ${({ theme }) => theme.colors.textColor};
  padding-left: 1rem;
  padding-right: 1rem;
`
const ErrorIcon = ({ children }) => {
  const displayErrorToast = () => toast.error(children, { autoClose: 2000 })
  return <ErrorIconWrapper icon={faExclamationCircle} onClick={displayErrorToast}/>
}
const ErrorIconWrapper = styled(FontAwesomeIcon)`
  font-size: 2rem;
  color: red;
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  right: .5rem;
`
const DeleteIcon = ({ deleteAble, onRemove }) => {
  return <DeleteIconWrapper
    icon={faTrashAlt}
    deleteable={deleteAble ? 1 : 0}
    onClick={onRemove}
  />
}
const DeleteIconWrapper = styled(FontAwesomeIcon)`
  font-size: 2rem;
  color: ${({ theme }) => theme.colors.menuTextColor};
  ${(props) => props.deleteable
  && css`&:hover{
    color: ${({ theme }) => theme.colors.primaryColor};
  }`}
`
const AddIcon = ({ onAdd }) => {
  return <AddIconWrapper
    icon={faPlusCircle}
    onClick={onAdd}
  />
}
const AddIconWrapper = styled(FontAwesomeIcon)`
  font-size: 2.5rem;
  color: ${({ theme }) => theme.colors.primaryColor};
  background-color: #FFF;
  position: absolute;
  bottom: -19%;
  left: 50%;
  transform: translateY(19%) translateX(-50%);
  overflow: hidden;
  border-radius: 50%;
`