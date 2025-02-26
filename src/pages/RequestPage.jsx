// // // import React from "react";
// // // import { Card, CardContent } from "@/components/ui/card";
// // // import { Button } from "@/components/ui/button";

// // // const foodItems = [
// // //   {
// // //     id: 1,
// // //     type: "Fresh Food",
// // //     description: "Freshly cooked rice and curry, enough for 5 people.",
// // //   },
// // //   {
// // //     id: 2,
// // //     type: "Packaged Food",
// // //     description: "Sealed biscuits pack.",
// // //     expiryDate: "2025-03-15",
// // //   },
// // //   {
// // //     id: 3,
// // //     type: "Fresh Food",
// // //     description: "Vegetable salad, good for 3 servings.",
// // //   },
// // //   {
// // //     id: 4,
// // //     type: "Packaged Food",
// // //     description: "Canned beans, ready to eat.",
// // //     expiryDate: "2025-06-20",
// // //   },
// // // ];

// // // const RequestPage = () => {
// // //   return (
// // //     <div className="p-8">
// // //       <h1 className="text-2xl font-bold mb-6">Available Food Donations</h1>
// // //       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
// // //         {foodItems.map((item) => (
// // //           <Card key={item.id} className="w-[350px] p-4 shadow-lg">
// // //             <CardContent>
// // //               <h2 className="text-xl font-semibold">{item.type}</h2>
// // //               <p className="mt-2 text-gray-700">{item.description}</p>
// // //               {item.type === "Packaged Food" && (
// // //                 <p className="text-sm text-gray-500 mt-1">Expiry Date: {item.expiryDate}</p>
// // //               )}
// // //               <Button className="mt-4 w-full">Accept Request</Button>
// // //             </CardContent>
// // //           </Card>
// // //         ))}
// // //       </div>
// // //     </div>
// // //   );
// // // };

// // // export default RequestPage;

// // import React from "react";

// // const foodItems = [
// //   { id: 1, type: "Fresh Food", description: "Fresh cucumbers, 10kgs." },
// //   { id: 2, type: "Packaged Food", description: "Sealed biscuits pack.", expiryDate: "2025-03-15" },
// //   { id: 3, type: "Packaged Food", description: "Sealed biscuits pack.", expiryDate: "2025-03-15" },
// //   { id: 4, type: "Fresh Food", description: "Fresh tomatoes, 5kgs."},
// // ];

// // const FoodRequestPage = () => {
// //   return (
// //     <div className="p-8 bg-amber-50" >
// //       <h1 className="text-6xl text-center mx-auto font-bold mb-7">Available Food Donations</h1>
// //       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
// //         {foodItems.map((item) => (
// //           <div key={item.id} className="w-[350px] p-4 shadow-lg bg-white rounded-lg">
// //             <h2 className="text-xl font-semibold">{item.type}</h2>
// //             <p className="mt-2 text-gray-700">{item.description}</p>
// //             {item.expiryDate && <p className="text-sm text-gray-500 mt-1">Expiry Date: {item.expiryDate}</p>}
// //             <button className="mt-4 w-full bg-blue-500 text-white p-2 rounded">Accept Request</button>
// //           </div>
// //         ))}
// //       </div>
// //     </div>
// //   );
// // };

// // export default FoodRequestPage;

// import React from "react";

// const foodItems = [
//   { id: 1, type: "Fresh Food", description: "Fresh cucumbers, 10kgs." },
//   { id: 2, type: "Packaged Food", description: "Sealed biscuits pack.", expiryDate: "2025-03-15" },
//   { id: 3, type: "Packaged Food", description: "Canned beans.", expiryDate: "2025-06-20" },
//   { id: 4, type: "Fresh Food", description: "Fresh tomatoes, 5kgs." },
// ];

// const FoodRequestPage = () => {
//   return (
//     <div className="p-8 bg-amber-50 min-h-screen">
//       <h1 className="text-6xl text-center mx-auto font-bold mb-7">Available Food Donations</h1>
//       <div className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//         {foodItems.map((item) => (
//           <div key={item.id} className="w-full p-4 shadow-lg bg-white rounded-lg">
//             <h2 className="text-xl font-semibold">{item.type}</h2>
//             <p className="mt-2 text-gray-700">{item.description}</p>
//             {item.expiryDate && <p className="text-sm text-gray-500 mt-1">Expiry Date: {item.expiryDate}</p>}
//             <button className="mt-4 w-full bg-blue-500 text-white p-2 rounded">Accept Request</button>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default FoodRequestPage;

import React, { useEffect, useState } from "react";
import axios from "axios";

const FoodRequestPage = () => {
  const [foodItems, setFoodItems] = useState([]);

  // Fetch available requests from the backend
  const fetchRequests = async () => {
    try {
      const response = await axios.get("/ngo/getRequests");
      console.log("API Response:", response.data); // Debugging
  
      // Assuming the backend sends an object like { data: [...] }
      setFoodItems(response.data.items || []); // Adjust based on actual structure
    } catch (error) {
      console.error("Error fetching requests:", error);
    }
  };
  

  useEffect(() => {
    fetchRequests();
  }, []);

  // Handle Accept Request
  const handleAccept = async (requestId) => {
    try {
      await axios.post("/api/accept-request", { requestId });
      // Remove the accepted request from state
      setFoodItems((prevItems) => prevItems.filter((item) => item._id !== requestId));
    } catch (error) {
      console.error("Error accepting request:", error);
    }
  };

  return (
    <div className="p-8 bg-amber-50 min-h-screen">
      <h1 className="text-6xl text-center mx-auto font-bold mb-7">Available Food Donations</h1>
      <div className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {foodItems.length > 0 ? (
          foodItems.map((item) => (
            <div key={item._id} className="w-full p-4 shadow-lg bg-white rounded-lg">
              <h2 className="text-xl font-semibold">{item.type}</h2>
              <p className="mt-2 text-gray-700">{item.description}</p>
              <p className="text-sm text-gray-500 mt-1">Distance: {item.distance / 1000} km</p>
              {item.expiryDate && <p className="text-sm text-gray-500 mt-1">Expiry Date: {item.expiryDate}</p>}
              <button
                className="mt-4 w-full bg-blue-500 text-white p-2 rounded"
                onClick={() => handleAccept(item._id)}
              >
                Accept Request
              </button>
            </div>
          ))
        ) : (
          <p>No food donations available at the moment.</p>
        )}
      </div>
    </div>
  );
};

export default FoodRequestPage;