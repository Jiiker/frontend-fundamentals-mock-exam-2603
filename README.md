# 토스 Frontend Developer 면접 과제 🔥

## Getting started

```sh
yarn start
```

## Testing

아래 명령어로 더미 데이터에 기반한 구현을 테스트할 수 있습니다.

```sh
yarn test
```

## 프로젝트 구조

```
src/
├── pages/
│   ├── RoomBookingPage/          # 회의실 예약 페이지
│   │   ├── index.tsx
│   │   ├── components/           # 이 페이지에서만 사용하는 컴포넌트
│   │   ├── hooks/                # 이 페이지에서만 사용하는 훅
│   │   ├── constants/            # 이 페이지에서만 사용하는 상수
│   │   └── utils/                # 이 페이지에서만 사용하는 순수 함수
│   │
│   └── ReservationStatusPage/    # 예약 현황 페이지
│       ├── index.tsx
│       ├── components/           # 이 페이지에서만 사용하는 컴포넌트
│       ├── hooks/                # 이 페이지에서만 사용하는 훅
│       ├── constants/            # 이 페이지에서만 사용하는 상수
│       └── utils/                # 이 페이지에서만 사용하는 순수 함수
│
└── shared/                       # 공통으로 사용되는 코드
    ├── components/               # 공통 컴포넌트
    ├── hooks/                    # 공통 훅
    ├── constants/                # 공통 상수
    │   ├── reservation.ts        # 예약 도메인 상수
    │   └── common.ts             # 범용 상수
    └── utils/                    # 공통 유틸 함수
        └── common.ts             # 범용 유틸 함수
```

## 개선 사항

### 1. 폴더 구조 설계 - 사용 범위에 따른 코드 배치

- **페이지 폴더 내부 (`pages/PageName/`)** — 특정 페이지에서만 사용되는 코드는 해당 페이지 폴더 안에 `components/`, `hooks/`, `constants/`, `utils/`로 역할에 따라 분리했습니다.

- **공유 폴더 (`shared/`)** — 공통으로 사용되는 코드는 `shared/`로 분리했습니다. `pages/`와 동일하게 `components/`, `hooks/`, `constants/`, `utils/` 구조를 가집니다.

### 2. 예약 현황 타임라인(ReservationTimeline) 컴포넌트 분리 - 인지 부하 해소의 관점에서

- 페이지를 읽는 사람이 구현 세부사항을 파악하지 않아도 되도록 타임라인 렌더링에 필요한 상수(`TIMELINE_START`, `TOTAL_MINUTES` 등)와 툴팁 활성화 상태(`activeReservation`)를 `ReservationTimeline` 컴포넌트 내부로 이동했습니다. 페이지에서는 `rooms`와 `reservations`만 전달하면 되도록 인터페이스를 단순화했습니다.

### 3. 내 예약 목록(MyReservationList) 컴포넌트 분리 - 인지 부하 해소의 관점에서

- 내 예약 목록 UI 코드와 `getRoomName`을 컴포넌트 내부로 이동해 페이지에서 목록 렌더링 세부사항을 파악하지 않아도 되도록 했습니다.
- `reservations`, `rooms`, `onCancel`은 페이지에서 props로 명시적으로 전달했습니다. 데이터 fetch와 취소 로직을 컴포넌트 안으로 숨기면 페이지에서 데이터 흐름을 추적하기 어려워지기 때문입니다.

### 4. ReservationStatusPage 훅 분리 - 구현 세부사항 은닉의 관점에서

- `useLocationMessage` — `location.state` 처리, `message` 상태 관리, 메시지 초기화 로직을 훅 내부로 이동했습니다. 페이지에서는 메시지를 읽고 업데이트하는 인터페이스만 드러납니다.
- `useCancelReservation` — mutation 설정과 `queryClient.invalidateQueries` 로직을 훅 내부로 이동했습니다. 페이지에서는 `cancelReservation`을 받아 `handleCancel`에서 메시지 처리와 함께 사용합니다.

### 5. 쿼리 옵션 분리 - 확장성과 유지보수의 관점에서

- `queryKey`와 `queryFn`을 함께 정의한 쿼리 옵션 함수를 `queries/` 폴더로 분리했습니다. 두 페이지에서 공통으로 사용하는 쿼리는 `shared/queries/`에, 특정 페이지에서만 사용하는 쿼리는 페이지 폴더 내 `queries/`에 두었습니다.
- `queryKey`를 상수로 분리해 `invalidateQueries` 호출 시 하드코딩된 키 대신 상수를 참조하도록 했습니다. 키가 변경될 때 한 곳만 수정하면 되고, 오타나 불일치로 인한 버그를 방지할 수 있습니다.

### 6. RoomBookingPage 훅 분리 - 구현 세부사항 은닉의 관점에서

- `useCreateReservation` — mutation 설정과 `queryClient.invalidateQueries` 로직을 훅 내부로 이동했습니다. 페이지에서는 `createReservation`을 받아 `handleBook`에서 검증, 에러 처리, 페이지 이동 로직과 함께 사용합니다.

### 7. DatePicker 공통 컴포넌트 분리 - 사용 범위에 따른 코드 배치의 관점에서

- 두 페이지에서 동일한 스타일과 동작으로 사용되는 날짜 선택 UI를 `DatePicker` 컴포넌트로 분리해 `shared/components/`에 두었습니다.
- `type="date"`와 `min={formatDate(new Date())}`는 일반적으로 현재 시점부터 선택 가능한 경우가 많을 것으로 판단돼 컴포넌트 내부에서 처리하도록 했고, 나머지 props는 `...props`로 확장성을 열어두었습니다.

### 8. 예약 가능 회의실 필터링 및 유효성 검사 로직 분리 - 인지 부하 해소의 관점에서

- 페이지 본문에 인라인으로 있던 필터링 + 정렬 로직을 `getAvailableRooms` 함수로 분리해 `RoomBookingPage/utils/room.ts`에 두었습니다. 페이지에서는 필터링 세부사항을 파악하지 않아도 되고, 순수 함수라 독립적으로 테스트할 수 있습니다.
- 유효성 검사 로직을 `validateBookingFilter` 함수로 분리했습니다. 시간 범위, 참석 인원 등 검증 규칙을 한 곳에서 관리할 수 있습니다.

### 9. RoomBookingPage 훅 분리 - 구현 세부사항 은닉의 관점에서

- `useBookingFilter` — 필터 상태 6개(`date`, `startTime`, `endTime`, `attendees`, `equipment`, `preferredFloor`)와 URL 쿼리 파라미터 동기화 로직을 훅 내부로 이동했습니다. 페이지에서는 필터 상태를 읽고 업데이트하는 인터페이스만 드러납니다.
