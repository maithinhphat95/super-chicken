import { ref, get, child, onValue, set } from "@firebase/database";
import { ReportGmailerrorred } from "@mui/icons-material";
import React from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { useList } from "react-firebase-hooks/database";
import { auth, database } from "../../../../firebase/config";

const payedOrder = {
  address: "Số 293 Âu Cơ, Hòa Khánh Bắc, Liên Chiểu, Đà Nẵng",
  email: "maithinhphat.tdh@gmail.com",
  name: "Mai Thịnh Phát",
  note: "",
  paymentMethod: "VISA",
  phone: "+84964084330",
  products: [
    {
      category: "combo",
      description:
        "01 MIẾNG GÀ GIÒN VUI VẺ + 01 MỲ Ý SỐT BÒ BẰM + 01 NƯỚC NGỌT (VỪA)",
      id: "1",
      image: "https://jollibee.com.vn/uploads/dish/62c5020053e891-70.jpg",
      name: "combo 1",
      price: "65000",
      quantity: 1,
      subPrice: "65000",
    },
    {
      category: "friedChicken",
      description: "4 MIẾNG GÀ GIÒN",
      id: "6",
      image:
        "https://jollibee.com.vn/uploads/dish/427e7a3136f84a-4mingggin.png",
      name: "gà giòn vui vẻ 2",
      price: "116000",
      quantity: 1,
      subPrice: "116000",
    },
  ],
  shipFee: 25000,
  shippingAgent: "grapFood",
};

export default function OrderList() {
  const dbRef = ref(database);
  const userRef = ref(database, "users");
  const orderRef = ref(database, "orders");

  const [orderSnapshots, snLoading, snError] = useList(ref(database, "orders"));

  const [userSnapshot, userLoading, userError] = useList(userRef);
  const [orderSnapshot, orderLoading, orderError] = useList(orderRef);

  const [user, loading] = useAuthState(auth);

  function writeDataToFirebase(data) {
    // Gán giá trị trực tiếp cho data theo DataReference, cơ chế replace data
    set(ref(database, "orders/" + 1), data);
  }

  if (!orderLoading) {
    console.log(orderSnapshot);
  }

  const handleClick = () => {
    writeDataToFirebase(payedOrder);
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
