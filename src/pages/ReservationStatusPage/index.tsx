import { css } from '@emotion/react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { Top, Spacing, Border, Button, Text } from '_tosslib/components';
import { colors } from '_tosslib/constants/colors';
import { getRooms, getReservations, getMyReservations } from 'pages/remotes';
import { formatDate } from 'shared/utils/common';

import { ReservationTimeline } from './components/ReservationTimeline';
import { MyReservationList } from './components/MyReservationList';

import { useLocationMessage } from './hooks/useLocationMessage';
import { useCancelReservation } from './hooks/useCancelReservation';

export function ReservationStatusPage() {
  const navigate = useNavigate();
  const [date, setDate] = useState(formatDate(new Date()));
  const { message, setMessage } = useLocationMessage();

  const { data: rooms = [] } = useQuery(['rooms'], getRooms);
  const { data: reservations = [] } = useQuery(['reservations', date], () => getReservations(date), {
    enabled: !!date,
  });
  const { data: myReservationList = [] } = useQuery(['myReservations'], getMyReservations);

  const { cancel } = useCancelReservation({
    onSuccess: () => setMessage({ type: 'success', text: '예약이 취소되었습니다.' }),
    onError: () => setMessage({ type: 'error', text: '취소에 실패했습니다.' }),
  });

  return (
    <div css={css`background: ${colors.white}; padding-bottom: 40px;`}>
      <Top.Top03 css={css`padding-left: 24px; padding-right: 24px;`}>회의실 예약</Top.Top03>

      <Spacing size={24} />

      {/* 날짜 선택 */}
      <div css={css`padding: 0 24px;`}>
        <Text typography="t5" fontWeight="bold" color={colors.grey900}>
          날짜 선택
        </Text>
        <Spacing size={16} />
        <div css={css`display: flex; flex-direction: column; gap: 6px;`}>
          <input
            type="date"
            value={date}
            min={formatDate(new Date())}
            onChange={e => setDate(e.target.value)}
            aria-label="날짜"
            css={css`box-sizing: border-box; font-size: 16px; font-weight: 500; line-height: 1.5; height: 48px; background-color: ${colors.grey50}; border-radius: 12px; color: ${colors.grey800}; width: 100%; border: 1px solid ${colors.grey200}; padding: 0 16px; outline: none; transition: border-color 0.15s; &:focus { border-color: ${colors.blue500}; }`}
          />
        </div>
      </div>

      <Spacing size={24} />
      <Border size={8} />
      <Spacing size={24} />

      {/* 예약 현황 타임라인 */}
      <div css={css`padding: 0 24px;`}>
        <Text typography="t5" fontWeight="bold" color={colors.grey900}>
          예약 현황
        </Text>
        <Spacing size={16} />
        <ReservationTimeline rooms={rooms} reservations={reservations} />
      </div>

      <Spacing size={24} />
      <Border size={8} />
      <Spacing size={24} />

      {/* 메시지 배너 */}
      {message && (
        <div css={css`padding: 0 24px;`}>
          <div
            css={css`padding: 10px 14px; border-radius: 10px; background: ${
              message.type === 'success' ? colors.blue50 : colors.red50
            }; display: flex; align-items: center; gap: 8px;`}
          >
            <Text
              typography="t7"
              fontWeight="medium"
              color={message.type === 'success' ? colors.blue600 : colors.red500}
            >
              {message.text}
            </Text>
          </div>
          <Spacing size={12} />
        </div>
      )}

      {/* 내 예약 목록 */}
      <div css={css`padding: 0 24px;`}>
        <div css={css`display: flex; align-items: baseline; gap: 6px;`}>
          <Text typography="t5" fontWeight="bold" color={colors.grey900}>
            내 예약
          </Text>
          {myReservationList.length > 0 && (
            <Text typography="t7" fontWeight="medium" color={colors.grey500}>
              {myReservationList.length}건
            </Text>
          )}
        </div>
        <Spacing size={16} />
        <MyReservationList reservations={myReservationList} rooms={rooms} onCancel={cancel} />
      </div>

      <Spacing size={24} />
      <Border size={8} />
      <Spacing size={24} />

      {/* 예약하기 버튼 */}
      <div css={css`padding: 0 24px;`}>
        <Button display="full" onClick={() => navigate('/booking')}>
          예약하기
        </Button>
      </div>
      <Spacing size={24} />
    </div>
  );
}
