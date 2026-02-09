import { useState } from 'react';
import { colors, Flex, Text } from '../design-token';
import { ShipperInfo, TransportInfo } from '../types';
import {
  AmountContent,
  CircleButton,
  MapContent,
  SubTitleField,
} from '../components';
import styled from '@emotion/styled';
import {
  CHECKICON,
  CLOSEICON,
  MONEYICON,
  NOMONEYICON,
  PENICON,
  TRASH,
} from '../assets';
import { useNavigate, useParams } from 'react-router-dom';
import { Modal } from '../components/Modal';

export const PostDetailPage = () => {
  const [transportInfo, setTransportInfo] = useState<TransportInfo>({
    isPaymentCompleted: true,
    isTransportCompleted: false,
    netProfit: 100000, // 순수익
    receivedAmount: 100000, // 받은 금액
    expenses: [
      { title: '세금', amount: 100000 },
      { title: '기타', amount: 1000 },
    ], // 지출 금액 목록
    totalExpenseAmount: 100000, // 총 지출 금액
    loadingLocation: {
      address: '대전시장', // 상차 주소
      detailAddress: '대전광역시 유성구', // 상차 상세 주소
      postalAddress: '10020', //우편 주소
    },
    unloadingLocation: {
      address: '세종시장', // 하차 주소
      detailAddress: '세종특별시', // 하차 상세 주소
      postalAddress: '30202', //우편주소
    },
    dateAndTime: { startDateAndTime: '10:00', endDateAndTime: '20:00' }, //상차, 하차 시간
  });

  const [shipperInfo] = useState<ShipperInfo>({
    companyName: '김가네 김치찜', // 상호명
    businessRegistrationNumber: '1234502-3393', // 사업자 등록 번호
    name: '박김치', // 화주 이름
    phoneNumber: '010-1234-1234', // 연락처
  });

  const [isDelModal, setIsDelModal] = useState<boolean>(false);
  const [isCompleteTransport, setIsCompleteTransport] =
    useState<boolean>(false); //운송 완료
  const [isCancelTransport, setIsCancelTransport] = useState<boolean>(false); //운송 완료 취소
  const [isCompletePayment, setIsCompletePayment] = useState<boolean>(false); //수금완료
  const [isCancelPayment, setIsCancelPayment] = useState<boolean>(false); //수금 완료 취소

  const navigate = useNavigate();
  const { id } = useParams();

  const handleDelClick = () => {
    //삭제 api
    setIsDelModal(false);
  };

  const handlePaymentClick = () => {
    if (transportInfo.isPaymentCompleted) {
      setIsCancelPayment(true);
    } else {
      setIsCompletePayment(true);
    }
    // setTransportInfo((prev) => ({
    //   ...prev,
    //   isPaymentCompleted: !transportInfo.isPaymentCompleted,
    // }));
  };

  const handleTransportClick = () => {
    if (transportInfo.isTransportCompleted) {
      setIsCancelTransport(true);
    } else {
      setIsCompleteTransport(true);
    }
    // setTransportInfo((prev) => ({
    //   ...prev,
    //   isTransportCompleted: !transportInfo.isTransportCompleted,
    // }));
  };

  return (
    <div>
      <Flex paddingTop="24px" gap={36} isColumn width="100%">
        <Flex gap={12} alignItems="center" width="100%">
          <Text fontSize={20} fontWeight={600}>
            {transportInfo.loadingLocation.address}
          </Text>
          <Text fontSize={16} fontWeight={400} color={colors.gray[600]}>
            {transportInfo.dateAndTime?.startDateAndTime} ~{' '}
            {transportInfo.dateAndTime?.endDateAndTime}
          </Text>
        </Flex>
        <Flex isColumn gap={20} width="100%">
          <SubTitleField title="운송 정보" />
          <StatusContent>
            <Text fontSize={12} fontWeight={600} color={colors.gray[800]}>
              수금 완료 : {transportInfo.isPaymentCompleted ? '완료' : '미완료'}
            </Text>
            <Text fontSize={12} fontWeight={600} color={colors.gray[800]}>
              운송 완료 :{' '}
              {transportInfo.isTransportCompleted ? '완료' : '미완료'}
            </Text>
          </StatusContent>
          <AmountContent title="순수익" amount={transportInfo.netProfit} />
          <AmountContent
            title="받은 금액"
            amount={transportInfo.receivedAmount}
          />
          <AmountContent
            title="지출 금액"
            amount={transportInfo.totalExpenseAmount}
            subContent={transportInfo.expenses}
          />
          <MapContent
            address={transportInfo.loadingLocation.address}
            detailAddress={transportInfo.loadingLocation.detailAddress}
            postalAddress={transportInfo.loadingLocation.postalAddress}
            label="상차 위치"
          />
          <MapContent
            address={transportInfo.unloadingLocation.address}
            detailAddress={transportInfo.unloadingLocation.detailAddress}
            postalAddress={transportInfo.unloadingLocation.postalAddress}
            label="하차 위치"
          />
        </Flex>

        <Flex isColumn gap={20} width="100%">
          <SubTitleField title="화주 정보" />
          <AmountContent
            title="상호명"
            content={shipperInfo.companyName}
            isString
          />
          <AmountContent
            title="사업자 등록 번호"
            content={shipperInfo.businessRegistrationNumber}
            isString
          />
          <AmountContent title="이름" content={shipperInfo.name} isString />
          <AmountContent
            title="연락처"
            content={shipperInfo.phoneNumber}
            isString
          />
        </Flex>
      </Flex>
      <BtnWrapper>
        <CircleButton
          onClick={handleTransportClick}
          backgroundColor={
            transportInfo.isTransportCompleted
              ? colors.blue[300]
              : colors.red[400]
          }
          borderColor={
            transportInfo.isTransportCompleted
              ? colors.blue[300]
              : colors.red[400]
          }
        >
          {transportInfo.isTransportCompleted ? <CHECKICON /> : <CLOSEICON />}
        </CircleButton>
        <CircleButton
          onClick={handlePaymentClick}
          backgroundColor={
            transportInfo.isPaymentCompleted
              ? colors.blue[300]
              : colors.red[400]
          }
          borderColor={
            transportInfo.isPaymentCompleted
              ? colors.blue[300]
              : colors.red[400]
          }
        >
          {transportInfo.isPaymentCompleted ? <MONEYICON /> : <NOMONEYICON />}
        </CircleButton>
        <CircleButton onClick={() => navigate(`/main/edit/post/${id}`)}>
          <PENICON />
        </CircleButton>
        <CircleButton onClick={() => setIsDelModal(true)}>
          <TRASH />
        </CircleButton>
      </BtnWrapper>
      {isDelModal && (
        <Modal
          setIsOpen={setIsDelModal}
          isOpen={isDelModal}
          isError
          onClick={handleDelClick}
          title="정말 삭제하시겠습니까?"
          subTitle="삭제하시면 다시 되돌릴 수 없습니다"
          btnTitle="삭제하기"
        />
      )}
      {isCompleteTransport && (
        <Modal
          setIsOpen={setIsCompleteTransport}
          isOpen={isCompleteTransport}
          onClick={() => {
            setTransportInfo((prev) => ({
              ...prev,
              isTransportCompleted: true,
            }));
            setIsCompleteTransport(false); // 모달 닫기
          }}
          title="운송 완료하시겠습니까?"
          subTitle="운송 완료 처리와 동시에 완료 시간이 자동 저장됩니다"
          btnTitle="완료하기"
        />
      )}

      {isCancelTransport && (
        <Modal
          setIsOpen={setIsCancelTransport}
          isOpen={isCancelTransport}
          onClick={() => {
            setTransportInfo((prev) => ({
              ...prev,
              isTransportCompleted: false,
            }));
            setIsCancelTransport(false); // 모달 닫기
          }}
          title="운송 취소하시겠습니까?"
          subTitle="취소 시 운송 완료가 처리되지 않습니다"
          btnTitle="취소하기"
          isError
        />
      )}

      {isCompletePayment && (
        <Modal
          setIsOpen={setIsCompletePayment}
          isOpen={isCompletePayment}
          onClick={() => {
            setTransportInfo((prev) => ({
              ...prev,
              isPaymentCompleted: true,
            }));
            setIsCompletePayment(false);
          }}
          title="수금 완료하시겠습니까?"
          subTitle="수금이 완료되면 해당 내역이 저장됩니다"
          btnTitle="완료하기"
        />
      )}
      {isCancelPayment && (
        <Modal
          setIsOpen={setIsCancelPayment}
          isOpen={isCancelPayment}
          onClick={() => {
            setTransportInfo((prev) => ({
              ...prev,
              isPaymentCompleted: false,
            }));
            setIsCancelPayment(false); // 모달 닫기
          }}
          title="수금 취소하시겠습니까?"
          subTitle="취소 시 수금 완료가 처리되지 않습니다"
          btnTitle="취소하기"
          isError
        />
      )}
    </div>
  );
};

const BtnWrapper = styled.div`
  position: fixed;
  bottom: 70px;
  right: 12px;
  display: flex;
  flex-direction: column;
  gap: 12px;
  z-index: 10;
`;

const StatusContent = styled.div`
  width: 100%;
  border: 1px solid ${colors.gray[100]};
  background-color: ${colors.gray[50]};
  display: flex;
  gap: 16px;
  align-items: center;
  padding: 6px 8px;
  border-radius: 12px;
`;
