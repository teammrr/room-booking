import Image from "next/image";
import StatusIndicator from "./StatusIndicator";
import BookedUser from "./BookedUser";
import BookingModal from "./BookingModal";

export default function BookingStatus(Bookings: any) {
  const startTime = new Date(Bookings.startTime);
  const endTime = new Date(Bookings.endTime);
  return (
    <div className="flex items-center space-x-3 w-screen pt-2 pb-2 pr-4 pl-4 rounded-lg shadow shadow-black/8">
      {" "}
      {/* Add your desired width and height here */}
      <div className="flex-shrink-0">
        <Image
          height={32}
          width={32}
          className="w-8 h-8 rounded-full"
          src="/img/logo-black.png"
          alt="Neil image"
        />
      </div>
      <div className="flex-1 min-w-0">
        <p className="font-semibold text-md text-gray-900 truncate dark:text-white">
          {startTime.toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
          })}{" "}
          -{" "}
          {endTime.toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
          })}
        </p>
        <span>
          <BookedUser name={Bookings.name} />
        </span>
      </div>
      <StatusIndicator
        description={Bookings.description}
        status={Bookings.status}
      />
    </div>
  );
}
