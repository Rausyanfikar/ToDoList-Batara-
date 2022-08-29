import React from 'react';
import Layout from '../components/Layout';
import '../styles/App.css';
import { FiPlus } from 'react-icons/fi';
import Card from '../components/Card';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const HomePage = () => {
  const [data, setData] = useState([]);
  const [remove, setRemove] = useState();
  const navigate = useNavigate();

  useEffect(() => {
    fetchApi();
  }, []);

  const fetchApi = async () => {
    await axios({
      method: 'get',
      url: `https://todo.api.devcode.gethired.id/activity-groups?email=rauzyanfikar@gmail.com`,
    })
      .then((res) => {
        const result = res.data.data;
        setData(result);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const postActivity = async () => {
    await axios({
      method: 'post',
      url: `https://todo.api.devcode.gethired.id/activity-groups?email=rauzyanfikar@gmail.com`,
      data: {
        title: 'new_title',
        email: 'rauzyanfikar@gmail.com',
      },
    })
      .then((res) => {
        fetchApi();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const deleteActivity = async (id) => {
    console.log(id);
    await axios({
      method: 'delete',
      url: `https://todo.api.devcode.gethired.id/activity-groups/${id}`,
    })
      .then((res) => {
        const result = res.data;
        setRemove(result);
        fetchApi();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <Layout>
      {/* activity */}
      <div className="w-full h-full flex justify-center mt-3   ">
        <div className="w-full max-w-4xl p-5  text-black flex justify-between  " onClick={() => postActivity()}>
          <div className="text-3xl font-bold">Activity</div>
          <div className="bg-[#16ABF8] rounded-lg text-white flex justify-center cursor-pointer p-3 items-center ">
            <div className="mr-1">
              <FiPlus className="w-6 h-6 " />
            </div>
            <div className="text-xl text-bold">Tambah</div>
          </div>
        </div>
      </div>
      {/* akhir */}

      {/* card */}
      <div className="w-full h-full flex justify-center">
        <div className="w-full  max-w-4xl p-5">
          <div className="grid grid-flow-row grid-cols-1 md:grid-cols-4 m-2 gap-3 ">
            {data && data.map((item) => <Card key={item.id} title={item.title} create={item.created_at} onClick={() => deleteActivity(item.id)} onClickCard={() => navigate(`activity/${item.id}`)} />)}
          </div>
        </div>
      </div>
      {/* akhir card */}
    </Layout>
  );
};

export default HomePage;
