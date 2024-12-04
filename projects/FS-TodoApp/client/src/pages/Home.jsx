import React, { useEffect, useState } from "react";
import axios from "axios";
import BilgiList from "../components/BilgiList";
import AddBilgi from "../components/AddBilgi";
const Home = () => {
  const [tutorials, setTutorials] = useState([]);

  // const url = "https://tutorial-api.fullstack.clarusway.com/tutorials/";
  const url = "http://127.0.0.1:8000/todo/";

  //!GET- READ

  const getBilgiler = async () => {
    const res = await axios.get(url);
    console.log(res.data);
    setTutorials(res.data.data);
  };

  useEffect(() => {
    getBilgiler();
  }, []);

  //! delete
  const deleteBilgi = async (id) => {
    await axios.delete(`${url}${id}/`);
    getBilgiler();
  };

  //!post veri gönderme

  const postBilgi = async (yeniVeri) => {
    await axios.post(url, yeniVeri);
    getBilgiler();
  };

  //!put update işlemi

  const putBilgiler = async (editItem) => {
    await axios.put(`${url}${editItem.id}/`, editItem);

    getBilgiler();
  };

  return (
    <div>
      <AddBilgi postBilgi={postBilgi} />
      <BilgiList
        tutorials={tutorials}
        deleteBilgi={deleteBilgi}
        putBilgiler={putBilgiler}
      />
    </div>
  );
};

export default Home;
