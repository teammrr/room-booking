"use client";
import BookingStatus from "@/app/components/BookingStatus";
import { useState, useEffect, useCallback } from "react";
import axios from "axios";
import { start } from "repl";

function GetBookings({
  params,
}: {
  params: { id: string; startUnix: any; endUnix: any };
}) {
  const [bookings, setBookings] = useState<any>([]);

  const getBooking = useCallback(
    async (id: string) => {
      try {
        const res = await axios.get(`/api/bookings/`, {
          headers: {
            "Content-Type": "application/json",
          },
        });
        const bookings = res.data;
        if (bookings) {
          const startUnix = params.startUnix;
          const endUnix = params.endUnix;
          setMatchingBooking(bookings, id, startUnix, endUnix);
        }
      } catch (err) {
        console.log(err);
      }
    },
    [params.startUnix, params.endUnix]
  );

  function setMatchingBooking(
    bookings: any[],
    id: string,
    startUnix: number,
    endUnix: number
  ) {
    const matchingBookings = bookings.filter(
      (booking) =>
        booking.roomId === id &&
        booking.startTime >= startUnix &&
        booking.endTime <= endUnix
    );
    matchingBookings.forEach((booking) => {
      if (booking.endTime < booking.startTime) {
        console.log("Invalid booking:", booking);
      }
    });
    // console.log("matching bookings avail", matchingBookings);
    setBookings(matchingBookings);
  }

  useEffect(() => {
    getBooking(params.id);
  }, [getBooking, params.id]);

  useEffect(() => {
    setBookings(bookings);
  }, [bookings]);

  // List of all possible times
  const allTimes = [
    "09:00",
    "10:00",
    "11:00",
    "12:00",
    "13:00",
    "14:00",
    "15:00",
    "16:00",
    "17:00",
    "18:00",
  ];

  // Get the start times of all bookings

  const bookedTimes = bookings.map((booking: any) => {
    const startTime = new Date(booking.startTime * 1000);
    return `${startTime.getHours().toString().padStart(2, "0")}:${startTime
      .getMinutes()
      .toString()
      .padStart(2, "0")}`;
  });

  // Convert booked times to timestamps
  const bookedTimeStamps = bookings.map(
    (booking: { startTime: any; endTime: any }) => ({
      start: booking.startTime,
      end: booking.endTime,
    })
  );

  // Sort booked times
  bookedTimeStamps.sort(
    (a: { start: number }, b: { start: number }) => a.start - b.start
  );

  // Initialize an array to hold the available time ranges
  let availableTimeRanges = [];

  // Get the start of the first available time range
  let startOfRange = timeToTimestamp(allTimes[0]);

  // Iterate over booked times
  for (let i = 0; i < bookedTimeStamps.length; i++) {
    // Add the current range to the array
    availableTimeRanges.push([startOfRange, bookedTimeStamps[i].start]);

    // Update the start of the range
    startOfRange = bookedTimeStamps[i].end;
  }

  // Add the last range to the array
  availableTimeRanges.push([
    startOfRange,
    timeToTimestamp(allTimes[allTimes.length - 1], true),
  ]);

  function timeToTimestamp(time: string, addHour = false) {
    const [hours, minutes] = time.split(":").map(Number);
    const date = new Date();
    date.setHours(hours + (addHour ? 1 : 0), minutes, 0, 0);
    return date.getTime() / 1000;
  }

  return (
    <>
      <div className="mt-4 justify-center align-middle flex flex-col gap-2">
        {availableTimeRanges.map((range, index) => {
          return (
            <BookingStatus
              // date={params.date}
              key={index}
              roomId={params.id}
              startTime={range[0]}
              endTime={range[1]}
              name={undefined}
              status="Available"
              description="Nobody has booked this time yet."
            />
          );
        })}
      </div>
    </>
  );
}

export default GetBookings;
