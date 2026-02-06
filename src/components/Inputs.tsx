import styled from "@emotion/styled"
import { colors, Flex, Text } from "../design-token"

interface IInputsType {
  label?: string,
  placeholder: string,
  onChange: (value : string) => void,
  value: string,
  isBlocked?: boolean
  type?: "number" | "text"
}

export const Inputs = ({type = "text", isBlocked = false, label, placeholder, onChange, value} : IInputsType) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const nextValue = e.target.value;

    if (type === "number") {
      // 숫자만 허용 (빈 문자열은 허용 → 삭제 가능)
      if (!/^\d*$/.test(nextValue)) return;
    }

    onChange(nextValue);
  };

  return (
    <Flex isColumn gap={4} width="100%">
      {label && (
        <Text fontSize={12} fontWeight={400} color={colors.gray[900]}>
          {label}
        </Text>
      )}
      <Input type={type} isBlocked={isBlocked} readOnly={isBlocked} onChange={handleChange} value={value} placeholder={placeholder} />
    </Flex>
  )
}

const Input = styled.input<Pick<IInputsType, "isBlocked">>`
  width: 100%;
  padding: 12px 16px;
  border-radius: 10px;
  border: 1px solid ${colors.gray[100]};
  background-color: ${colors.gray[0]};
  font-size: 12px;
  font-weight: 400;
  color: ${colors.gray[900]};
  opacity: ${({isBlocked}) => isBlocked ? 0.7 : 1};
  &::placeholder {
    color: ${colors.gray[200]};
    font-size: 12px;
    font-weight: 400;
  }
`