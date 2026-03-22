import { getMyReservations, cancelReservation } from 'pages/remotes';

export const MY_RESERVATIONS_QUERY_KEY = ['myReservations'] as const;

export function getMyReservationsQueryOptions() {
  return {
    queryKey: MY_RESERVATIONS_QUERY_KEY,
    queryFn: getMyReservations,
  };
}

export function cancelReservationMutation() {
  return {
    mutationFn: (id: string) => cancelReservation(id),
  };
}
