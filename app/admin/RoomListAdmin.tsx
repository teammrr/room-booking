import { useState, useEffect } from "react";
import axios from "axios";
import Room from "./Rooms";

interface Room {
  id: number;
  picture: string;
  roomName: string;
  description: string;
  roomFloor: string;
  roomCapacity: number;
}

type RoomListProps = {
  rooms: Room[];
  deleteRoom: (id: string) => void;
};

export default function RoomList({ rooms, deleteRoom }: RoomListProps) {
  type RoomListProps = {
    rooms: Room[];
    deleteRoom: (id: string) => void;
  };

  async function getRooms() {
    const localUrl = "http://127.0.0.1:3000/api/rooms";
    const prodUrl = "https://bookit.teamrr.live/api/rooms";
    const headers = {
      "Content-Type": "application/json",
    };
    console.log("fetching");
    const res = await axios.get(prodUrl, { headers });
    const data = res.data;
    console.log(data);
    setRooms(data);
  }

  const [roomss, setRooms] = useState<Room[]>([]);

  useEffect(() => {
    getRooms();
  }, []); // Pass an empty dependency array here

  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {roomss.map((room) => (
        <Room key={room.id} room={room} deleteRoom={deleteRoom} />
      ))}
    </div>
  );
}
