import { useMutation, useQueryClient } from '@tanstack/react-query';
import { cancelReservationMutation, MY_RESERVATIONS_QUERY_KEY } from '../queries/reservation';
import { RESERVATIONS_QUERY_KEY } from 'shared/queries/reservation';

interface UseCancelReservationOptions {
  onSuccess: () => void;
  onError: () => void;
}

export function useCancelReservation({ onSuccess, onError }: UseCancelReservationOptions) {
  const queryClient = useQueryClient();

  const mutation = useMutation(cancelReservationMutation().mutationFn, {
    onSuccess: () => {
      queryClient.invalidateQueries(RESERVATIONS_QUERY_KEY);
      queryClient.invalidateQueries(MY_RESERVATIONS_QUERY_KEY);
      onSuccess();
    },
    onError,
  });

  return { cancel: mutation.mutateAsync, isLoading: mutation.isLoading };
}
