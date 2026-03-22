import { useMutation, useQueryClient } from '@tanstack/react-query';
import { cancelReservationMutation } from '../queries/reservation';
import { MY_RESERVATIONS_QUERY_KEY, RESERVATIONS_QUERY_KEY } from 'shared/queries/reservation';

export function useCancelReservation() {
  const queryClient = useQueryClient();

  const mutation = useMutation(cancelReservationMutation().mutationFn, {
    onSuccess: () => {
      queryClient.invalidateQueries(RESERVATIONS_QUERY_KEY);
      queryClient.invalidateQueries(MY_RESERVATIONS_QUERY_KEY);
    },
  });

  return { cancelReservation: mutation.mutateAsync, isLoading: mutation.isLoading };
}
