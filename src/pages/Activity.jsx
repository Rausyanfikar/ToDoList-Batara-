import React from 'react';
import Layout from '../components/Layout';
import { FiPlus } from 'react-icons/fi';
import { FaChevronLeft } from 'react-icons/fa';
import { TbPencil } from 'react-icons/tb';
import images from '../assets/todo.png';
import { Link } from 'react-router-dom';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import { CgClose } from 'react-icons/cg';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { FiTrash2 } from 'react-icons/fi';
import { FiAlertTriangle } from 'react-icons/fi';
import { BiSortAlt2 } from 'react-icons/bi';
import { TbSortDescending, TbSortAscending, TbSortAscendingLetters, TbSortDescendingLetters } from 'react-icons/tb';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 450,
  height: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

const Activity = () => {
  const params = useParams();
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [data, setData] = useState([]);
  const [titleItem, setTitleItems] = useState('');
  const [updateTitleItem, setUpdateTitleItems] = useState('');
  const [openMenuDropdown, setOpenMenuDropdown] = useState(false);
  const [selectUser, setSelectUser] = useState(false);
  const [choosePriority, setChoosePriority] = useState('very-high');
  const [priorityTitle, setPriorityTitle] = useState('VeryHigh');
  const [openModalDelete, setOpenModalDelete] = useState(false);
  const [openModalUpdate, setOpenModalUpdate] = useState(false);
  const [titleDelete, setTitleDelete] = useState('');
  const [toDoId, setToDoId] = useState(null);
  const [isEdit, setIsEdit] = useState(false);
  const [titleActivity, setTitleActivity] = useState('');

  const menuDropdown = [
    {
      id: 1,
      title: 'Terbaru',
      icon: <TbSortDescending />,
      data_cy: 'sort-latest',
    },
    {
      id: 2,
      title: 'Terlama',
      icon: <TbSortAscending />,
      data_cy: 'sort-oldest',
    },
    {
      id: 3,
      title: 'A-Z',
      icon: <TbSortAscendingLetters />,
      data_cy: 'sort-az',
    },
    {
      id: 4,
      title: 'Z-A',
      icon: <TbSortDescendingLetters />,
      data_cy: 'sort-za',
    },
    {
      id: 5,
      title: 'Belum Selesai',
      icon: <BiSortAlt2 />,
      data_cy: 'sort-unfinished',
    },
  ];

  const requestApi = async () => {
    const { activity_id } = params;
    await axios({
      method: 'get',
      url: `https://todo.api.devcode.gethired.id/activity-groups/${activity_id}`,
    })
      .then((response) => {
        const { data } = response;
        console.log(data);
        setData(data.todo_items);
        setTitleActivity(data.title);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const updateTitleActivity = async () => {
    const { activity_id } = params;
    await axios({
      method: 'patch',
      url: `https://todo.api.devcode.gethired.id/activity-groups/${activity_id}`,
      data: {
        title: titleActivity,
        priority: choosePriority,
      },
    })
      .then(() => {})
      .catch((err) => {
        console.log(err);
      });
  };

  const addTodo = async () => {
    const { activity_id } = params;
    await axios({
      method: 'post',
      url: `https://todo.api.devcode.gethired.id/todo-items`,
      data: {
        activity_group_id: activity_id,
        priority: choosePriority,
        title: titleItem,
      },
    })
      .then(() => {})
      .catch((err) => {
        console.log(err);
      })
      .finally(() => [requestApi(), setTitleItems('')]);
  };

  const updateTodo = async () => {
    await axios({
      method: 'patch',
      url: `https://todo.api.devcode.gethired.id/todo-items/${toDoId}`,
      data: {
        priority: choosePriority,
        title: updateTitleItem,
      },
    })
      .then(() => {})
      .catch((err) => {
        console.log(err);
      })
      .finally(() => requestApi());
  };

  const deleteToDo = async () => {
    await axios({
      method: 'delete',
      url: `https://todo.api.devcode.gethired.id/todo-items/${toDoId}`,
    })
      .then(() => {})
      .catch((err) => {
        console.log(err);
      })
      .finally(() => requestApi());
  };

  useEffect(() => {
    requestApi();
  }, []);

  return (
    <Layout>
      <div className="w-full h-full flex justify-center mt-3  ">
        <div className="w-full max-w-4xl p-5  text-black flex justify-between  ">
          <div className="flex items-center">
            <div>
              <Link to="/">
                <FaChevronLeft className="w-8 h-8" />
              </Link>
            </div>
            {isEdit ? (
              <input type="text" className="border-b-2 border-black   bg-slate-200 w-20" value={titleActivity} onChange={(e) => setTitleActivity(e.target.value)} />
            ) : (
              <h2 className="font-bold text-xl text-black mr-2">{titleActivity}</h2>
            )}
            {console.log(titleActivity)}
            <button className="text-black" onClick={() => [isEdit === true ? updateTitleActivity() : null, setIsEdit(!isEdit)]}>
              <TbPencil className="w-7 h-7 " />
            </button>
          </div>
          <div className="flex justify-end flex-row ">
            {/* sort */}
            <div className="mr-2 ">
              <button className="text-lg border-2 border-black rounded-full p-4 " onClick={() => setOpenMenuDropdown(!openMenuDropdown)}>
                <BiSortAlt2 />
              </button>
              {openMenuDropdown ? (
                <ul className="absolute mt-3 border border-slate-100 bg-white">
                  {menuDropdown.map((item) => (
                    <li className="flex items-center space-x-5 py-4 px-8 cursor-pointer hover:bg-slate-100">
                      <div className="text-sky-400 text-base sm:text-xl">{item.icon}</div>
                      <p className="text-base sm:text-xl">{item.title}</p>
                    </li>
                  ))}
                </ul>
              ) : null}
            </div>
            {/* add activity_id */}
            <div className="bg-[#16ABF8] rounded-lg text-white flex justify-center cursor-pointer p-3 items-center " onClick={handleOpen}>
              <div className="mr-1">
                <FiPlus className="w-6 h-6" />
              </div>
              <div className="text-xl font-bold">Tambah</div>
            </div>
          </div>
        </div>
      </div>

      {/* gambar */}
      {data.length < 1 ? (
        <div className="w-full h-full flex justify-center mt-8">
          <img src={images} alt="images" />
        </div>
      ) : (
        <div>
          {data &&
            data.map((item, index) => {
              return (
                <div className="w-full h-full flex justify-center mt-3  " key={index}>
                  <div className="w-full max-w-3xl   text-black  rounded-lg bg-white">
                    <div className="w-full flex items-center px-8 py-4 border">
                      <input
                        id="bordered-checkbox-1"
                        type="checkbox"
                        value=""
                        name="bordered-checkbox"
                        class="w-4 h-4 text-blue-600 bg-gray-100 rounded border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                      />
                      <div className="flex items-center flex-grow space-x-5 pl-8">
                        <div
                          className={`w-4 h-4 rounded-full ${
                            item.priority === 'very-high' ? 'bg-red-500' : item.priority === 'high' ? 'bg-yellow-500' : item.priority === 'normal' ? 'bg-green-500' : item.priority === 'low' ? 'bg-blue-300' : 'bg-purple-500'
                          }`}
                        ></div>
                        <div>{item.title}</div>
                        <div onClick={() => [setOpenModalUpdate(true), setUpdateTitleItems(item.title), setToDoId(item.id)]}>
                          <TbPencil className="cursor-pointer" />
                        </div>
                      </div>
                      <div className="cursor-pointer">
                        <FiTrash2 onClick={() => [setOpenModalDelete(true), setTitleDelete(item.title), setToDoId(item.id)]} />
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          {/* modal delete */}
          <Modal open={openModalDelete} onClose={() => setOpenModalDelete(false)} aria-labelledby="modal-modal-title" aria-describedby="modal-modal-description">
            <Box className="absolute flex justify-center flex-col top-2/4 left-2/4 -translate-x-2/4 -translate-y-2/4 shadow-xl bg-white w-3/4 max-w-xl p-8 rounded-lg h-[300px]">
              <div className="text-7xl text-red-500 w-full flex justify-center mb-10">
                <FiAlertTriangle />
              </div>
              <h1>
                Apakah anda yakin menghapus List Item <span className="font-bold">“{titleDelete}”?</span>
              </h1>
              <div className="flex space-x-5 items-center justify-end mt-8">
                <button className="bg-slate-100 hover:bg-slate-200 active:bg-slate-300 px-6 py-2 rounded-full" onClick={() => setOpenModalDelete(false)}>
                  Batal
                </button>
                <button className="bg-red-500 hover:bg-red-600 active:bg-red-700 px-6 py-2 text-white rounded-full" onClick={() => [deleteToDo(), setOpenModalDelete(false)]}>
                  Hapus
                </button>
              </div>
            </Box>
          </Modal>
          {/* akhir modal delete*/}

          {/* update modal */}
          <Modal keepMounted open={openModalUpdate} aria-labelledby="keep-mounted-modal-title" aria-describedby="keep-mounted-modal-description">
            <Box sx={style} className="absolute top-2/4 left-2/4 -translate-x-2/4 -translate-y-2/4 shadow-xl bg-white w-1/2 max-w-xl p-8 rounded-lg">
              <div className="flex flex-col justify-between">
                <div className="flex justify-between  items-center border-b border-black w-full mb-5">
                  <div className="font-bold text-xl">Tambah List item</div>
                  <div>
                    <CgClose
                      className="w-7 h-7  text-black cursor-pointer"
                      onClick={() => {
                        setOpenModalUpdate(false);
                      }}
                    />
                  </div>
                </div>

                <div className="mt-5 mb-5">
                  <label for="first_name" class="block text-sm font-medium text-gray-900 dark:text-gray-300 ">
                    NAMA LIST ITEM
                  </label>
                  <input
                    type="text"
                    value={updateTitleItem}
                    onChange={(e) => setUpdateTitleItems(e.target.value)}
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-4 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder="Tambahkan nama activity"
                    required
                  />
                </div>

                <div>
                  <label for="first_name" class="block  text-sm font-medium text-gray-900 dark:text-gray-300 ">
                    PRIORITY
                  </label>

                  <div className="w-1/3 flex items-center justify-center  border-2 border-neutral-900 p-3 cursor-pointer" onClick={() => setSelectUser(!selectUser)}>
                    <div
                      value={choosePriority}
                      className={`rounded-full w-4 h-4 mr-2 ${
                        choosePriority === 'very-high' ? 'bg-red-500' : choosePriority === 'high' ? 'bg-yellow-500' : choosePriority === 'normal' ? 'bg-green-500' : choosePriority === 'low' ? 'bg-blue-300' : 'bg-purple-500'
                      }`}
                    ></div>
                    <div className="">{priorityTitle}</div>
                  </div>
                  {selectUser ? (
                    <div className="absolute flex flex-col justify-evenly w-32 mt-1 mb-3 bg-white">
                      <div className={`flex items-center w-full  ${choosePriority === 'very-high' ? 'bg-blue-500' : 'hover:bg-blue-200'}`} onClick={() => [setChoosePriority('very-high'), setPriorityTitle('VeryHigh'), setSelectUser(false)]}>
                        <div className="w-4 h-4 rounded-full bg-red-500 mr-3"></div>
                        <p>Very High</p>
                      </div>
                      <div className={`flex items-center  ${choosePriority === 'high' ? 'bg-blue-500' : 'hover:bg-blue-200'}`} onClick={() => [setChoosePriority('high'), setPriorityTitle('High'), setSelectUser(false)]}>
                        <div className="w-4 h-4 rounded-full bg-yellow-500 mr-3"></div>
                        <p>High</p>
                      </div>
                      <div className={`flex items-center  ${choosePriority === 'normal' ? 'bg-blue-500' : 'hover:bg-blue-200'}`} onClick={() => [setChoosePriority('normal'), setPriorityTitle('Medium'), setSelectUser(false)]}>
                        <div className="w-4 h-4 rounded-full bg-green-500 mr-3"></div>
                        <p>Medium</p>
                      </div>
                      <div className={`flex items-center ${choosePriority === 'low' ? 'bg-blue-500' : 'hover:bg-blue-200'}`} onClick={() => [setChoosePriority('low'), setPriorityTitle('Low'), setSelectUser(false)]}>
                        <div className="w-4 h-4 rounded-full bg-blue-300 mr-3"></div>
                        <p>Low</p>
                      </div>
                      <div className={`flex items-center ${choosePriority === 'very-low' ? 'bg-blue-500' : 'hover:bg-blue-200'}`} onClick={() => [setChoosePriority('very-low'), setPriorityTitle('VeryLow'), setSelectUser(false)]}>
                        <div className="w-4 h-4 rounded-full bg-purple-500 mr-3"></div>
                        <p>Very Low</p>
                      </div>
                    </div>
                  ) : (
                    false
                  )}
                  <div className="border-b border-black mt-4"></div>
                  <div class="p-7 flex justify-end items-center">
                    <button className="bg-blue-500 justify-center h-10 hover:bg-blue-600 rounded-md p-5 flex items-center text-white font-bold" onClick={() => [updateTodo(), setOpenModalUpdate(false)]}>
                      Update
                    </button>
                  </div>
                </div>
              </div>
            </Box>
          </Modal>
        </div>
      )}
      {/* update modal */}

      {/* modal create add */}
      <Modal keepMounted open={open} aria-labelledby="keep-mounted-modal-title" aria-describedby="keep-mounted-modal-description">
        <Box sx={style} className="">
          <div className="flex flex-col justify-between">
            <div className="flex justify-between  items-center border-b border-black w-full mb-5">
              <div className="font-bold text-xl">Tambah List item</div>
              <div>
                <CgClose className="w-7 h-7  text-black cursor-pointer" onClick={handleClose} />
              </div>
            </div>

            <div className="mt-5 mb-5">
              <label for="first_name" class="block text-sm font-medium text-gray-900 dark:text-gray-300 ">
                NAMA LIST ITEM
              </label>
              <input
                type="text"
                id="first_name"
                value={titleItem}
                onChange={(e) => setTitleItems(e.target.value)}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-4 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="Tambahkan nama activity"
                required
              />
            </div>

            <div>
              <label for="first_name" class="block  text-sm font-medium text-gray-900 dark:text-gray-300 ">
                PRIORITY
              </label>

              <div className="w-1/3 flex items-center justify-center  border-2 border-neutral-900 p-3 cursor-pointer" onClick={() => setSelectUser(!selectUser)}>
                <div
                  className={`rounded-full w-4 h-4 mr-2 ${
                    choosePriority === 'very-high' ? 'bg-red-500' : choosePriority === 'high' ? 'bg-yellow-500' : choosePriority === 'normal' ? 'bg-green-500' : choosePriority === 'low' ? 'bg-blue-300' : 'bg-purple-500'
                  }`}
                ></div>
                <div className="">{priorityTitle}</div>
              </div>
              {selectUser ? (
                <div className="absolute flex flex-col justify-evenly w-32 mt-1 mb-3 bg-white">
                  <div className={`flex items-center w-full  ${choosePriority === 'very-high' ? 'bg-blue-500' : 'hover:bg-blue-200'}`} onClick={() => [setChoosePriority('very-high'), setPriorityTitle('VeryHigh'), setSelectUser(false)]}>
                    <div className="w-4 h-4 rounded-full bg-red-500 mr-3"></div>
                    <p>Very High</p>
                  </div>
                  <div className={`flex items-center  ${choosePriority === 'high' ? 'bg-blue-500' : 'hover:bg-blue-200'}`} onClick={() => [setChoosePriority('high'), setPriorityTitle('High'), setSelectUser(false)]}>
                    <div className="w-4 h-4 rounded-full bg-yellow-500 mr-3"></div>
                    <p>High</p>
                  </div>
                  <div className={`flex items-center  ${choosePriority === 'normal' ? 'bg-blue-500' : 'hover:bg-blue-200'}`} onClick={() => [setChoosePriority('normal'), setPriorityTitle('Medium'), setSelectUser(false)]}>
                    <div className="w-4 h-4 rounded-full bg-green-500 mr-3"></div>
                    <p>Medium</p>
                  </div>
                  <div className={`flex items-center ${choosePriority === 'low' ? 'bg-blue-500' : 'hover:bg-blue-200'}`} onClick={() => [setChoosePriority('low'), setPriorityTitle('Low'), setSelectUser(false)]}>
                    <div className="w-4 h-4 rounded-full bg-blue-300 mr-3"></div>
                    <p>Low</p>
                  </div>
                  <div className={`flex items-center ${choosePriority === 'very-low' ? 'bg-blue-500' : 'hover:bg-blue-200'}`} onClick={() => [setChoosePriority('very-low'), setPriorityTitle('VeryLow'), setSelectUser(false)]}>
                    <div className="w-4 h-4 rounded-full bg-purple-500 mr-3"></div>
                    <p>Very Low</p>
                  </div>
                </div>
              ) : (
                false
              )}
              <div className="border-b border-black mt-4"></div>
              <div class="p-7 flex justify-end items-center">
                <button className="bg-blue-500 justify-center h-10 hover:bg-blue-600 rounded-md p-5 flex items-center text-white font-bold" onClick={() => [addTodo(), setOpen(false)]}>
                  Simpan
                </button>
              </div>
            </div>
          </div>
        </Box>
      </Modal>
      {/* akhir modal create add */}
    </Layout>
  );
};

export default Activity;
