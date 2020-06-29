import styled from 'styled-components'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

export const LoadingIcon = styled(FontAwesomeIcon)`
  align-self: center;
  font-size: 5rem;
  color: ${({ theme }) => theme.colors.primaryColor};
`