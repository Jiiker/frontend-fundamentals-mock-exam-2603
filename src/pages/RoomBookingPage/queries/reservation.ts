import { createReservation } from 'pages/remotes';

export function createReservationMutation() {
  return {
    mutationFn: (data: {
      roomId: string;
      date: string;
      start: string;
      end: string;
      attendees: number;
      equipment: string[];
    }) => createReservation(data),
  };
}
