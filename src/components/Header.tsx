import styled from "@emotion/styled"
import { LOGO, ALARM } from "../assets"
import { colors, Flex } from "../design-token"

export const Header = () => {
  return (
    <HeaderWrapper>
    <Flex alignItems="center" justifyContent="space-between" paddingLeft="20px" paddingRight="20px" height="60px" width="100vw">
      <LOGO width={83} height={22}/>
      <ALARM/>
    </Flex>
    </HeaderWrapper>
  )
}

const HeaderWrapper = styled.header `
  position: fixed;
  top: 0;
  left: 0;
  background-color: ${colors.gray[0]};
`