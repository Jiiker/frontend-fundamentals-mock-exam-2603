import { useMutation, useQueryClient } from '@tanstack/react-query';
import { cancelReservationMutation, MY_RESERVATIONS_QUERY_KEY } from '../queries/reservation';
import { RESERVATIONS_QUERY_KEY } from 'shared/queries/reservation';

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
