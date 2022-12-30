import { ref, get, child, onValue, set } from "@firebase/database";
import { ReportGmailerrorred } from "@mui/icons-material";
import React from "react";
import { useList } from "react-firebase-hooks/database";
import { database } from "../../../../firebase/config";

export default function OrderList() {
  const dbRef = ref(database);
  const userRef = ref(database, "users");
  const [orderSnapshots, snLoading, snError] = useList(ref(database, "orders"));
  const [userSnapshot, userLoading, userError] = useList(userRef);

  function writeUserData(userId, name, email, imageUrl) {
    // Gán giá trị trực tiếp cho data theo DataReference, cơ chế replace data
    set(ref(database, "users/" + userId), {
      ...(name && { userName: name }),
      ...(email && { email: email }),
      ...(imageUrl && { profile_picture: imageUrl }),
    });
  }

  if (userSnapshot) {
    userSnapshot.forEach((snapShot) => {
      console.log(snapShot.val());
    });
  }

  const handleClick = () => {
    writeUserData(
      1,
      "Phat 0",
      "phat@gmail.com",
      "https://ichef.bbci.co.uk/news/999/cpsprodpb/15951/production/_117310488_16.jpg"
    );
    // console.log(userSnapshot);
  };
  // console.log(orderSnapshots);
  // Handle with firebase Realtime DB

  // get(child(dbRef, `products/0`))
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

  // onValue(productRef, (snapshot) => {
  //   const data = snapshot.val();
  //   console.log(data);
  // });

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

  return (
    <div>
      <h2 className="order-title art-text">Danh sách đơn hàng</h2>

      <p>OrderList</p>
      <button onClick={handleClick}>Click</button>
    </div>
  );
}
