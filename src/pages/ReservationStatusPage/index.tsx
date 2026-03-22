import { css } from '@emotion/react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { Top, Spacing, Border, Button, Text } from '_tosslib/components';
import { colors } from '_tosslib/constants/colors';

import { getRoomsQueryOptions, getReservationsQueryOptions } from 'shared/queries/reservation';
import { getMyReservationsQueryOptions } from './queries/reservation';

import { formatDate } from 'shared/utils/common';

import { ReservationTimeline } from './components/ReservationTimeline';
import { MyReservationList } from './components/MyReservationList';
import { DatePicker } from 'shared/components/DatePicker';

import { useLocationMessage } from './hooks/useLocationMessage';
import { useCancelReservation } from './hooks/useCancelReservation';

export function ReservationStatusPage() {
  const navigate = useNavigate();
  const [date, setDate] = useState(formatDate(new Date()));
  const { message, setMessage } = useLocationMessage();

  const { data: rooms = [] } = useQuery(getRoomsQueryOptions());
  const { data: reservations = [] } = useQuery(getReservationsQueryOptions(date));
  const { data: myReservationList = [] } = useQuery(getMyReservationsQueryOptions());

  const { cancelReservation } = useCancelReservation();

  const handleCancel = async (id: string) => {
    try {
      await cancelReservation(id);
      setMessage({ type: 'success', text: '예약이 취소되었습니다.' });
    } catch {
      setMessage({ type: 'error', text: '취소에 실패했습니다.' });
    }
  };

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
          <DatePicker value={date} onChange={e => setDate(e.target.value)} aria-label="날짜" />
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
        <MyReservationList reservations={myReservationList} rooms={rooms} onCancel={handleCancel} />
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
