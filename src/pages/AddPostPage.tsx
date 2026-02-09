import { useState } from 'react';
import { ADDICON } from '../assets';
import { Content, Inputs, SmallButton, SubTitleField } from '../components';
import { colors, Flex, Text } from '../design-token';
import styled from '@emotion/styled';
import { ShipperInfo, TransportInfo } from '../types';
import DaumPostcode from 'react-daum-postcode';
import { useNavigate } from 'react-router-dom';

export const AddPostPage = () => {
  const [transportInfo, setTransportInfo] = useState<TransportInfo>({
    receivedAmount: 0,
    expenses: [],
    loadingLocation: {
      address: '',
      detailAddress: '',
      postalAddress: '',
    },
    unloadingLocation: {
      address: '',
      detailAddress: '',
      postalAddress: '',
    },
  });

  const [shipperInfo, setShipperInfo] = useState<ShipperInfo>({
    companyName: '',
    businessRegistrationNumber: '',
    name: '',
    phoneNumber: '',
  });

  const [expensesValue, setExpensesValue] = useState<string>('');

  const [showPostcode, setShowPostcode] = useState<{
    show: boolean;
    type: 'loadingLocation' | 'unloadingLocation' | null;
  }>({ show: false, type: null });

  const navigate = useNavigate();

  const handleTransportChange = (
    key: 'receivedAmount' | 'loadingLocation' | 'unloadingLocation',
    value: string,
  ) => {
    setTransportInfo((prev) => ({ ...prev, [key]: value }));
  };

  const handleShipperChange = (
    key: 'companyName' | 'businessRegistrationNumber' | 'name' | 'phoneNumber',
    value: string,
  ) => {
    setShipperInfo((prev) => ({ ...prev, [key]: value }));
  };

  const handleExpensesAddClick = () => {
    const expensesName = expensesValue.split('/')[0].trim();
    const expensesAmount = expensesValue.split('/')[1].trim();
    setTransportInfo((prev) => ({
      ...prev,
      expenses: [
        ...(prev.expenses ?? []),
        { title: expensesName, amount: Number(expensesAmount) },
      ],
    }));
    setExpensesValue('');
  };

  const handleExpensesDelClick = (index: number) => {
    setTransportInfo((prev) => ({
      ...prev,
      expenses: prev.expenses.filter((_, i) => i !== index),
    }));
  };

  const handleAddressButtonClick = (
    type: 'loadingLocation' | 'unloadingLocation',
  ) => {
    setShowPostcode({ show: true, type });
  };

  const handleAddressComplete = (data: any) => {
    if (showPostcode.type) {
      setTransportInfo((prev) => ({
        ...prev,
        [showPostcode.type!]: {
          address: data.roadAddress || data.jibunAddress,
          detailAddress: data.buildingName || '',
          postalAddress: data.zonecode,
        },
      }));
    }
    setShowPostcode({ show: false, type: null });
  };

  const handleCreateClick = () => {
    //생성 api
    navigate('/main/home');
  };

  return (
    <Flex paddingTop="20px" isColumn gap={32} width="100%">
      <Flex width="100%" justifyContent="space-between" alignItems="center">
        <Text fontSize={20} fontWeight={600}>
          배달 기록 생성하기
        </Text>
        <Flex alignItems="center" gap={8}>
          <SmallButton
            backgroundColor={colors.blue[500]}
            color={colors.gray[0]}
            onClick={handleCreateClick}
          >
            생성하기
          </SmallButton>
          <SmallButton
            backgroundColor={colors.gray[50]}
            color={colors.gray[700]}
            borderColor={colors.gray[100]}
            onClick={() => navigate(-1)}
          >
            이전으로
          </SmallButton>
        </Flex>
      </Flex>
      <Flex width="100%" isColumn gap={24}>
        <SubTitleField title="운송 정보" />
        <Inputs
          onChange={(value) => handleTransportChange('receivedAmount', value)}
          value={transportInfo.receivedAmount}
          placeholder="받은 금액을 입력하세요"
          label="받은 금액"
        />
        <Flex isColumn gap={20} width="100%">
          <Flex gap={8} alignItems="end" width="100%">
            <Inputs
              onChange={(value) => setExpensesValue(value)}
              value={expensesValue}
              placeholder="지출 금액을 입력하세요 (지출명 / 금액) "
              label="지출 금액"
            />
            <Button onClick={handleExpensesAddClick}>
              <ADDICON />
            </Button>
          </Flex>
          <Flex isColumn gap={10} width="100%">
            {transportInfo.expenses.map((data, index) => (
              <Content
                key={index}
                isEdit
                delClick={() => handleExpensesDelClick(index)}
                title={data.title}
                amount={data.amount}
              />
            ))}
          </Flex>
        </Flex>
        <Flex gap={8} alignItems="end" width="100%">
          <Inputs
            value={transportInfo.loadingLocation.address}
            placeholder="위치를 입력하세요 "
            isBlocked
            label="상차 위치"
          />
          <Button onClick={() => handleAddressButtonClick('loadingLocation')}>
            {transportInfo.loadingLocation.address ? '위치 수정' : '위치 추가'}
          </Button>
        </Flex>
        <Flex gap={8} alignItems="end" width="100%">
          <Inputs
            value={transportInfo.unloadingLocation.address}
            placeholder="위치를 입력하세요 "
            isBlocked
            label="하차 위치"
          />
          <Button onClick={() => handleAddressButtonClick('unloadingLocation')}>
            {transportInfo.unloadingLocation.address
              ? '위치 수정'
              : '위치 추가'}
          </Button>
        </Flex>
      </Flex>
      <Flex width="100%" isColumn gap={24}>
        <SubTitleField title="화주 정보" />
        <Inputs
          onChange={(value) => handleShipperChange('companyName', value)}
          value={shipperInfo.companyName}
          placeholder="상호명을 입력하세요"
          label="상호명"
        />
        <Inputs
          onChange={(value) =>
            handleShipperChange('businessRegistrationNumber', value)
          }
          value={shipperInfo.businessRegistrationNumber}
          placeholder="사업자 등록 번호를 입력하세요"
          label="사업자 등록 번호"
        />
        <Inputs
          onChange={(value) => handleShipperChange('name', value)}
          value={shipperInfo.name}
          placeholder="이름을 입력하세요"
          label="이름"
        />
        <Inputs
          onChange={(value) => handleShipperChange('phoneNumber', value)}
          value={shipperInfo.phoneNumber}
          placeholder="연락처를 입력하세요"
          label="연락처"
        />
      </Flex>

      {showPostcode.show && (
        <PostcodeModal>
          <PostcodeWrapper>
            <CloseButton
              onClick={() => setShowPostcode({ show: false, type: null })}
            >
              ✕
            </CloseButton>
            <DaumPostcode onComplete={handleAddressComplete} />
          </PostcodeWrapper>
        </PostcodeModal>
      )}
    </Flex>
  );
};

const Button = styled.button`
  color: ${colors.gray[0]};
  background-color: ${colors.blue[500]};
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 10px;
  border-radius: 10px;
  font-size: 16px;
  flex-shrink: 0;
  font-weight: 400;
  cursor: pointer;
`;

const PostcodeModal = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
`;

const PostcodeWrapper = styled.div`
  position: relative;
  width: 500px;
  height: 600px;
  background-color: white;
  border-radius: 10px;
  padding: 20px;
`;

const CloseButton = styled.button`
  position: absolute;
  top: 10px;
  right: 10px;
  background: none;
  border: none;
  font-size: 24px;
  cursor: pointer;
  z-index: 1001;
`;
