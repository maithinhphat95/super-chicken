import { child, get, onValue, ref } from "firebase/database";
import React from "react";
import PageContainer from "../../components/common/PageContainer/index.jsx";
import PageCover from "../../components/common/PageCover/index.jsx";
import PageTitle from "../../components/common/PageTitle/index.jsx";
import { database } from "../../firebase/config";

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

  return (
    <PageCover className="orders-page">
      <PageContainer className="orders-container container">
        <PageTitle title="Đơn hàng của bạn" />
        <div className="orders-page-content">
          <h3>Hiện tại chưa có chương trình tuyển dụng.</h3>
          <h3>Chúng tôi sẽ thông báo sớm nhất khi có vị trí tuyển dụng.</h3>
        </div>
      </PageContainer>
    </PageCover>
  );
}

export default OrdersPage;
