"use client";
import Layout from "../../components/layout";
import { useSearchParams } from "next/navigation";
import ConfirmBookingModal from "@/app/components/ConfirmBookingModal";
import { useState, useEffect } from "react";
import { PropagateLoader } from "react-spinners";
import GetBookings from "@/app/components/AvailableBookings";
import SelectStartTime from "@/app/components/SelectStartTime";
import SelectEndTime from "@/app/components/SelectEndTime";
import ShowBookingModal from "@/app/components/ShowBookingModal";
import axios from "axios";

function Booking({ params }: { params: { id: string; name: string } }) {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [bookings, setBookings] = useState<any>();
  const [selectedStartTime, setSelectedStartTime] = useState([0]);
  const [selectedEndTime, setSelectedEndTime] = useState([0]);
  const searchParams = useSearchParams();
  const name = searchParams.get("name");
  const monthNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  const currentDate = new Date();
  const dateString = `${currentDate.getDate()} ${
    monthNames[currentDate.getMonth()]
  } ${currentDate.getFullYear()}`;

  async function getBooking(id: string) {
    try {
      const res = await axios.get(`/api/bookings/`, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      setBookings(res.data);
      setIsLoading(false);
    } catch (err) {
      console.log(err);
    }
  }

  useEffect(() => {
    getBooking(params.id);
  }, [params.id]);

  return (
    <>
      <main className="bg-gray-50">
        <Layout>
          <div className="mt-5 mb-5">
            <h1 className="text-3xl font-semibold text-gray-800 mt-8 mx-auto lg:px-32 px-4">
              {name}
            </h1>
          </div>
          {isLoading ? ( // Render a loading spinner if isLoading is true
            <div className="flex justify-center items-center min-h-screen">
              <PropagateLoader color="#3676d6" />
            </div>
          ) : (
            <div className="mt-4 rounded-lg shadow shadow-black/10 ml-2 mr-2 pt-3 pb-4 ">
              <div className="flex font-medium pl-4 pr-6 relative"></div>
              <div className="flex pb-4 pr-4 pl-4 gap-4">
                <div className="col col-span-1">
                  <span className="">Start Time</span>
                  <SelectStartTime
                    selectedTime={selectedStartTime}
                    setSelectedTime={setSelectedStartTime}
                  />
                </div>
                <span className="flex align-bottom items-end pb-1 ">👉</span>
                <div className="col col-span-1">
                  <span className=" ">End Time</span>
                  <SelectEndTime
                    selectedTime={selectedEndTime}
                    setSelectedTime={setSelectedEndTime}
                  />
                </div>
              </div>
              <div className="flex justify-between pl-4 pr-4 pt-2">
                <ShowBookingModal />
                <ConfirmBookingModal
                  startTime={selectedStartTime}
                  endTime={selectedEndTime}
                />
              </div>
              <div className="flex pt-4 font-medium justify-between pl-4 pr-6">
                <p>
                  Room Schedule :{" "}
                  <span className="text-gray-700 text-sm">{dateString}</span>
                </p>
              </div>
              <div className="justify-center align-middle flex flex-col gap-2 mr-2 ml-2">
                <GetBookings params={{ id: "1", name: "Team" }} />
              </div>
            </div>
          )}
        </Layout>
      </main>
    </>
  );
}

export default Booking;
