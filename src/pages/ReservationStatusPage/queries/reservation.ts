import { getMyReservations, cancelReservation } from 'pages/remotes';
import { MY_RESERVATIONS_QUERY_KEY } from 'shared/queries/reservation';

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
