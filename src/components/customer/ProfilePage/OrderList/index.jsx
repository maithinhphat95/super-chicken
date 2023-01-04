import { ref, get, child, onValue, set, push } from "@firebase/database";
import { ReportGmailerrorred } from "@mui/icons-material";
import React from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { useList } from "react-firebase-hooks/database";
import { auth, database } from "../../../../firebase/config";

export default function OrderList() {
  const dbRef = ref(database);
  const userRef = ref(database, "users");
  const orderRef = ref(database, "orders");

  const [userSnapshots, userLoading, userError] = useList(userRef);
  const [orderSnapshots, orderLoading, orderError] = useList(orderRef);

  const [user, loading] = useAuthState(auth);

  if (!orderLoading || orderSnapshots) {
    orderSnapshots.forEach((snapshot) => {
      console.log(snapshot.key, ": ", snapshot.val());
    });
  }

  function writeDataToFirebase(data) {
    set(ref(database, "orders/" + 1), data);
  }

  const handleClick = () => {};

  return (
    <div>
      <h2 className="order-title art-text">Danh sách đơn hàng</h2>

      <p>OrderList</p>
      <button onClick={handleClick}>Add Order To DB</button>
    </div>
  );
}
