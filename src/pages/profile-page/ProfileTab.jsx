import React from 'react'
import styled from 'styled-components'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCog, faShareSquare } from '@fortawesome/free-solid-svg-icons'

import authService from '../../services/authService'

import { LeftTab } from '../../components'

import profile from '../../res/profile.jpg'

export const ProfileTab = () => {
  const { name } = authService.getCurrentUser()
  const followers = 5
  const following = 6
  const content = <Wrapper>
    <ProfileImgTxtWrapper>
      <ProfileImgWrapper src={profile} alt={'Profile image'}/>
      <TextContainer>
        <NameWrapper>{name}</NameWrapper>
        <FollowersContainer>
          <FollowerSpan>Followers: {followers}</FollowerSpan>
          <FollowerSpan>Following: {following}</FollowerSpan>
        </FollowersContainer>
      </TextContainer>
    </ProfileImgTxtWrapper>
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
  justify-content: flex-start;
  align-items: center;
  flex-direction: column;
`
const ProfileImgTxtWrapper = styled.div`
  width: 100%;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  @media (min-width: 768px) {
    flex-direction: column;
  }
`
const ProfileImgWrapper = styled.img`
  height: 12.5rem;
  border-radius: 50%;
  border: .5rem solid #FFF;
  margin-right: 2rem;
  @media (min-width: 768px) {
    height: 15rem;
    margin-right: 0;
  }
`
const TextContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 100%;
  align-items: flex-start;
  @media (min-width: 768px) {
    align-items: center;
  }
`
const NameWrapper = styled.div`
  font-size: 2.5rem;
  font-weight: 500;
  color: ${({ theme }) => theme.colors.textColor};
  margin-top: 1rem;
  @media (min-width: 768px) {
    margin-top: 3rem;
  }
`
const FollowersContainer = styled.div`
  display: flex;
  margin-top: 1.5rem;
  font-size: 1.5rem;
  flex-wrap: wrap;
  align-items: flex-start;
  color: ${({ theme }) => theme.colors.primaryColor};
  font-weight: 500;
  text-align: center;
  width: 100%;
  @media (min-width: 768px) {
    justify-content: space-evenly;
  }
`
const FollowerSpan = styled.span`
  margin-right: 2rem;
  @media (min-width: 768px) {
    margin-right: 0;
  }
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
  &:hover {
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
