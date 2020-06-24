import React from 'react'
import styled from 'styled-components'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faShareSquare, faCog } from '@fortawesome/free-solid-svg-icons'

import { LeftTab } from '../../../../'

import authService from '../../../../../services/authService'

import profile from '../../../../../res/profile.jpg'

export const ProfileTab = () => {
  const { name } = authService.getCurrentUser()
  const followers = 5
  const following = 6
  const content = <Wrapper>
    <ProfileImgWrapper src={profile} alt={'Profile image'}/>
    <NameWrapper>{name}</NameWrapper>
    <FollowersContainer>
      <span>Followers: {followers}</span>
      <span>Following: {following}</span>
    </FollowersContainer>
    <DividerLine/>
    <ButtonsContainer>
      <SettingsButton>
        <SettingsIcon icon={faCog}/>
        <SettingsText>Settings</SettingsText>
      </SettingsButton>
      <ShareButton>
        <ShareIcon icon={faShareSquare}/>
      </ShareButton>
    </ButtonsContainer>
  </Wrapper>
  return LeftTab(content)
}
const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
`
const ProfileImgWrapper = styled.img`
  height: 15rem;
  border-radius: 50%;
  border: .5rem solid #FFF;
`
const NameWrapper = styled.div`
  font-size: 2.5rem;
  font-weight: 500;
  margin-top: 3rem;
  color:${({ theme }) => theme.colors.textColor}
`
const FollowersContainer = styled.div`
  display: flex;
  margin-top: 1.5rem;
  font-size: 1.5rem;
  justify-content: space-evenly;
  align-items: flex-start;
  color: ${({ theme }) => theme.colors.primaryColor};
  font-weight: 500;
  text-align: center;
  width: 100%;
`
const DividerLine = styled.div`
  margin: 2rem 0;
  height: 1px;
  width: 100%;
  background-color: ${({ theme }) => theme.colors.borderColor};
`
const ButtonsContainer = styled.div`
  display: flex;
  width: 100%;
  height: 4.2rem;
`
const Button = styled.button`
  border: 2px solid ${({ theme }) => theme.colors.primaryColor};
  border-radius: 8px;
  background-color: inherit;
  color: ${({ theme }) => theme.colors.primaryColor};
  cursor: pointer;
  outline: none;
  &:hover{
    filter: brightness(95%);
  }
`
const SettingsIcon = styled(FontAwesomeIcon)`
  font-size: 2rem;
`
const SettingsButton = styled(Button)`
  flex: 5;
  display: flex;
  justify-content: center;
  align-items: center;
`
const SettingsText = styled.span`
  font-size: 1.5rem;
  font-weight: 600;
  margin-left: .5rem;
`
const ShareIcon = styled(FontAwesomeIcon)`
  font-size: 1.8rem;
`
const ShareButton = styled(Button)`
  flex: 1;
  margin-left: 1rem;
`
