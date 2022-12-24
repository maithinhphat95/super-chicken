import { child, get, onValue, ref } from "firebase/database";
import React from "react";

import { database } from "../../firebase.js";
function OrdersPage(props) {
  const dbRef = ref(database);
  const productRef = ref(database, "products/1");

  get(child(dbRef, `products/0`))
    .then((snapshot) => {
      if (snapshot.exists()) {
        console.log(snapshot.val());
      } else {
        console.log("No data available");
      }
    })
    .catch((error) => {
      console.error(error);
    });

  onValue(productRef, (snapshot) => {
    const data = snapshot.val();
    console.log(data);
  });

  // get(child(productRef, "1"))
  //   .then((snapshot) => {
  //     if (snapshot.exists()) {
  //       console.log(snapshot.val());
  //     } else {
  //       console.log("No data available");
  //     }
  //   })
  //   .catch((error) => {
  //     console.error(error);
  //   });

  return <div className="orders-page"></div>;
}

export default OrdersPage;
