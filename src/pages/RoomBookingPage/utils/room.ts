export function getAvailableRooms(
  rooms: { id: string; name: string; floor: number; capacity: number; equipment: string[] }[],
  reservations: { roomId: string; date: string; start: string; end: string }[],
  filter: {
    date: string;
    startTime: string;
    endTime: string;
    attendees: number;
    preferredFloor: number | null;
    equipment: string[];
  }
) {
  return rooms
    .filter(room => {
      if (room.capacity < filter.attendees) return false;
      if (!filter.equipment.every(eq => room.equipment.includes(eq))) return false;
      if (filter.preferredFloor !== null && room.floor !== filter.preferredFloor) return false;
      const hasConflict = reservations.some(
        r => r.roomId === room.id && r.date === filter.date && r.start < filter.endTime && r.end > filter.startTime
      );
      if (hasConflict) return false;
      return true;
    })
    .sort((a, b) => {
      if (a.floor !== b.floor) return a.floor - b.floor;
      return a.name.localeCompare(b.name);
    });
}
