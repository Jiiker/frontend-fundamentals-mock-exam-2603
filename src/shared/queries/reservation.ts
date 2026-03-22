import { getRooms, getReservations } from 'pages/remotes';

export const ROOMS_QUERY_KEY = ['rooms'] as const;
export const RESERVATIONS_QUERY_KEY = ['reservations'] as const;
export const MY_RESERVATIONS_QUERY_KEY = ['myReservations'] as const;

export function getRoomsQueryOptions() {
  return {
    queryKey: ROOMS_QUERY_KEY,
    queryFn: getRooms,
  };
}

export function getReservationsQueryOptions(date: string) {
  return {
    queryKey: [...RESERVATIONS_QUERY_KEY, date] as const,
    queryFn: () => getReservations(date),
    enabled: !!date,
  };
}
