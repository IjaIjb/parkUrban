"use client";
import Button from "@/app/components/button";
import Dropdown from "@/app/components/dropdowns/dropdown";
import SubHeader from "@/app/components/headers/sub-header";
import { useFormik } from "formik";
import { Suspense, useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import driverOBJs from "@/common/classes/driver.class";
import tripOBJs from "@/common/classes/trip.class";
import { ClipLoader } from "react-spinners";
import useUserTypeRouter from "@/common/hooks/useUserTypeRouter";

export default function Assign() {
  const { pushWithUserTypePrefix } = useUserTypeRouter();
  
  const [selectedPark, setSelectedPark] = useState<string | null>(null);
  const [selectedDriver, setSelectedDriver] = useState<string | null>(null);
  const [drivers, setDrivers] = useState<any[]>([]);
  const [trips, setTrips] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  useEffect(() => {
    const searchParams = new URLSearchParams(window.location.search);
    const params: { [key: string]: string } = {};

    searchParams.forEach((value, key) => {
      params[key] = value;
    });

    if (params?.tripCode) {
      setSelectedPark(params.tripCode);
    }
  }, []);

  useEffect(() => {
    // Fetching Drivers and Trips
    const fetchData = async () => {
      try {
        const driversData = await driverOBJs.getAll();
        const tripsData = await tripOBJs.getAll();
        setDrivers(driversData);
        setTrips(tripsData);
      } catch (error) {
        toast.error("Error loading data. Please try again.");
      }
    };

    fetchData();
  }, []);

  const formik = useFormik({
    initialValues: {},
    onSubmit: async (values) => {
      setIsLoading(true);
      if (selectedPark && selectedDriver) {
        values = { driverId: selectedDriver };
        try {
          await tripOBJs.assignVechicle(values, selectedPark);
          toast.success("Successfully assigned vehicle");
          pushWithUserTypePrefix("/manage-trips");
        } catch (err:any) {
          toast.error(err?.message || "Assignment failed");
        } finally {
          setIsLoading(false);
        }
      } else {
        toast.error("Please fill all the form fields");
        setIsLoading(false);
      }
    },
  });

  const driverOptions = drivers.length
    ? drivers.map((driver) => ({
        value: driver.id,
        label: driver.fullName,
      }))
    : [{ value: null, label: "No Driver found" }];

  const tripOptions = trips.length
    ? trips.map((trip) => ({
        value: trip.id,
        label: trip.tripCode,
      }))
    : [{ value: null, label: "No Trip found" }];

  return (
    <Suspense>
      <SubHeader header="Assign Vehicle & Driver" hideRight />
      <form className="mt-10" onSubmit={formik.handleSubmit}>
        <div className="w-[510px]">
          {!selectedPark && (
            <Dropdown
              options={tripOptions}
              placeholder="Select Trip"
              label="Select Trip"
              onSelect={(e) => setSelectedPark(e)}
              className="w-[510px]"
            />
          )}
          <Dropdown
            options={driverOptions}
            placeholder="Select Driver"
            label="Select Driver"
            onSelect={(e) => setSelectedDriver(e)}
            className="w-[510px] mr-4"
          />
          <ToastContainer />
        </div>
        <div className="w-[510px]">
          <Button
            disabled={!selectedDriver || !selectedPark}
            type="submit"
            className="w-full mt-20 text-white"
          >
            {isLoading ? <ClipLoader color="#ffffff" /> : "Assign"}
          </Button>
        </div>
      </form>
    </Suspense>
  );
}



// "use client";
// import Button from "@/app/components/button";
// import Dropdown from "@/app/components/dropdowns/dropdown";
// import SubHeader from "@/app/components/headers/sub-header";
// import { getAll } from "@/common/hooks/fireStore";
// import useUserTypeRouter from "@/common/hooks/useUserTypeRouter";
// import { useFormik } from "formik";
// import { Suspense, useEffect, useState } from "react";
// import { ToastContainer, toast } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";

// import driverOBJs from "@/common/classes/driver.class";
// import tripOBJs from "@/common/classes/trip.class";
// import { ClipLoader } from "react-spinners";

// export default function Assign() {
//   const { pushWithUserTypePrefix, goBack } = useUserTypeRouter();
//   // const lugage = [
//   //   { value: "normal", label: "Normal Luggage" },
//   //   { value: "extra", label: "Extra Luggage" },
//   // ];
//   // const [search, setSearch] = useState("");
//   const [selectedPark, setSelectedPark]: any = useState();
//   const [selectedDriver, setSelectedDriver] = useState();

//   const [Driver, setDriver] = useState<any[]>([]);
//   const [Trip, setTrip] = useState<any[]>([]);
//   const [isLoading, setIsLoading] = useState<boolean>(false);
//   const getAllDriver = async () => {
//     driverOBJs.getAll().then((res) => {
//       console.log(res, "driver");
//       setDriver(res);
//     });
//   };
//   useEffect(() => {
//     const searchParams = new URLSearchParams(window.location.search);

//     // Convert the searchParams to a plain object
//     const params: any = {};
//     searchParams.forEach((value, key) => {
//       params[key] = value;
//     });
//     if (params?.tripCode) {
//       setSelectedPark(params?.tripCode);
//     }
//     console.log(params?.tripCode, "trip info from link");
//   }, []);
//   const getAllTrips = async () => {
//     tripOBJs.getAll().then((res) => {
//       console.log(res, "trips");
//       setTrip(res);
//     });
//   };
//   useEffect(() => {
//     getAllDriver();
//     getAllTrips();
//   }, [getAll]);
//   console.log(Trip, "Trip");

//   let DriverOption: { value: any; label: any }[];

//   if (Driver && Driver?.length >= 1) {
//     DriverOption = Driver?.map((a: any) => ({
//       value: a?.id,
//       label: a?.fullName,
//     }));
//   } else {
//     DriverOption = [
//       {
//         value: null,
//         label: "no Driver found",
//       },
//     ];
//   }

//   let TripOption: any = [];

//   if (Trip && Trip?.length >= 1) {
//     TripOption = Trip?.map((a: any) => ({
//       value: a?.id,
//       label: a?.tripCode,
//     }));
//   } else {
//     TripOption = [
//       {
//         value: null,
//         label: "no Trip found",
//       },
//     ];
//   }

//   const formik = useFormik({
//     initialValues: {},
//     onSubmit: async (values: any) => {
//       setIsLoading(true);
//       if (selectedPark && selectedDriver) {
//         values = {
//           driverId: selectedDriver,
//         };
//         tripOBJs
//           .assignVechicle(values, selectedPark)
//           .then(() => {
//             toast.success("successfully assigned vechicle");
//             pushWithUserTypePrefix("/manage-trips");
//             setIsLoading(false);
//           })
//           .catch((err) => {
//             toast.error(err?.message);
//             setIsLoading(false);
//           });
//       } else {
//         toast.error("fill all the form fields");
//         setIsLoading(false);
//       }
//       // openModal()
//     },
//   });

//   // const [isToggled, setIsToggled] = useState<boolean>(false);

//   // const handleToggle = (isChecked: boolean) => {
//   //   setIsToggled(isChecked);
//   // };

//   return (
//     <Suspense>
//       <SubHeader header="Assign Vehicle & Driver" hideRight />
//       <form className="mt-10" onSubmit={formik.handleSubmit}>
//         <div className=" w-[510px]">
//           {!selectedPark && (
//             <Dropdown
//               options={TripOption}
//               placeholder="Option"
//               label="Select Trip"
//               onSelect={(e: any) => setSelectedPark(e)}
//               className="w-[510px]"
//               // error={formik.touched.departurePark && formik.errors.departurePark}
//             />
//           )}

//           <Dropdown
//             options={DriverOption}
//             placeholder="Option"
//             label="Select Driver"
//             onSelect={(e: any) => setSelectedDriver(e)}
//             className="w-[510px] mr-4"
//           />
//           {/*<Input*/}
//           {/*  containerStyle={`mt-8`}*/}
//           {/*  inputStyle={`bg-gray-100 border-0 pl-10 w-[510px]`}*/}
//           {/*  placeholder={"Search Driver"}*/}
//           {/*  type={"text"}*/}
//           {/*  id="search"*/}
//           {/*  name="search"*/}
//           {/*  value={search}*/}
//           {/*  onChange={(e) => setSearch(e.target.value)}*/}
//           {/*  // onBlur={formik.handleBlur}*/}
//           {/*  // error={formik.touched.password && formik.errors.password}*/}
//           {/*/>*/}
//           <ToastContainer />
//         </div>
//         <div className=" w-[510px]">
//           <Button
//             disabled={
//               !selectedDriver &&
//               !selectedPark &&
//               selectedDriver === null &&
//               selectedPark === null
//             }
//             type="submit"
//             className="w-full mt-20 text-white"
//           >
//             {isLoading ? <ClipLoader color="#ffffff" /> : "Assign"}
//           </Button>
//         </div>
//       </form>
//     </Suspense>
//   );
// }
