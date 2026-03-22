import { useMutation, useQueryClient } from '@tanstack/react-query';
import { createReservationMutation } from '../queries/reservation';
import { RESERVATIONS_QUERY_KEY, MY_RESERVATIONS_QUERY_KEY } from 'shared/queries/reservation';

export function useCreateReservation() {
  const queryClient = useQueryClient();

  const mutation = useMutation(createReservationMutation().mutationFn, {
    onSuccess: (_data, variables) => {
      queryClient.invalidateQueries([...RESERVATIONS_QUERY_KEY, variables.date]);
      queryClient.invalidateQueries(MY_RESERVATIONS_QUERY_KEY);
    },
  });

  return { createReservation: mutation.mutateAsync, isLoading: mutation.isLoading };
}
