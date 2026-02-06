import styled from "@emotion/styled"
import { colors } from "../design-token"
import { ADDPOST } from "../assets/ADDPOST"
import { HOME } from "../assets/HOME"
import { CALENDAR } from "../assets/CALENDAR"
import { MYPAGE } from "../assets/MYPAGE"
import { useLocation, useNavigate } from "react-router-dom"

const navContent = [
  {Icon: ADDPOST, path: "/"},
  {Icon: HOME, path: "/"},
  {Icon: CALENDAR, path: "/"},
  {Icon: MYPAGE, path: "/"}
]

export const TabBar = () => {
  const navigate = useNavigate()
  const location = useLocation()
  return (
    <NavWrapper>
      {navContent.map(({Icon,path}) => (
        <Nav onClick={() => navigate(path)}>
          <Icon isNav={location.pathname === path}/>
        </Nav>
      ))}
    </NavWrapper>
  )
}

const Nav = styled.button `
  background-color: transparent;
  width: 24px;
  cursor: pointer;
`

const NavWrapper = styled.nav `
  position: fixed;
  bottom: 0;
  left: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 60px;
  width: 100%;
  height: 60px;
  border-top: 1px solid ${colors.gray[100]};
  background-color: ${colors.gray[0]};
`