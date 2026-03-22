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
