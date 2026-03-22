import { useMutation, useQueryClient } from '@tanstack/react-query';
import { cancelReservation } from 'pages/remotes';

interface UseCancelReservationOptions {
  onSuccess: () => void;
  onError: () => void;
}

export function useCancelReservation({ onSuccess, onError }: UseCancelReservationOptions) {
  const queryClient = useQueryClient();

  const mutation = useMutation((id: string) => cancelReservation(id), {
    onSuccess: () => {
      queryClient.invalidateQueries(['reservations']);
      queryClient.invalidateQueries(['myReservations']);
      onSuccess();
    },
    onError,
  });

  return { cancel: mutation.mutateAsync, isLoading: mutation.isLoading };
}
