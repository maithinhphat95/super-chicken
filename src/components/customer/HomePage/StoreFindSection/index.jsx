import React, { useEffect, useState } from "react";
import axios from "axios";
import "./style.scss";
StoreFindSection.propTypes = {};

function StoreFindSection(props) {
  const [cityList, setCityList] = useState([]);
  const config = {
    url: "https://raw.githubusercontent.com/kenzouno1/DiaGioiHanhChinhVN/master/data.json",
    method: "GET",
    responseType: "application/json",
  };

  //   Get list of Cities
  useEffect(() => {
    const getCity = async () => {
      await axios
        .get(config.url)
        .then((result) => {
          setCityList(result.data);
        })
        .catch((error) => {
          console.log(error);
        });
    };
    getCity();
  }, []);
  const handleChangeCity = (e) => {
    console.log(e.target);
  };
  return (
    <div className="store-find-section">
      <div className="store-find-section-title">Tìm cửa hàng</div>
      <form className="store-find-section-form">
        <div>
          <select
            onChange={(e) => {
              handleChangeCity(e);
            }}
          >
            {cityList.length > 0 &&
              cityList.map((item) => (
                <option key={item.Id} value={item.Id}>
                  {item.Name}
                </option>
              ))}
          </select>
        </div>
      </form>
    </div>
  );
}

export default StoreFindSection;
