import React from 'react';
import moment from 'moment';
import { FiTrash2 } from 'react-icons/fi';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Typography from '@mui/material/Typography';
import { FiAlertTriangle } from 'react-icons/fi';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 500,
  height: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

const Card = ({ title, create, onClick, onClickCard }) => {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <div className="bg-white w-full max-w-4xl p-5 flex flex-col  rounded-md h-64 cursor-pointer">
      <div className="font-bold text-lg" onClick={onClickCard}>
        {title}
      </div>
      <div className="mt-auto text-black flex flex-row items-center">
        <p>{moment(create).format('DD MMMM  YYYY')}</p>
        <div className="ml-3">
          <FiTrash2 className="w-6 h-7 cursor-pointer text-black" onClick={handleOpen} />
        </div>
      </div>

      {/* modal */}
      <Modal keepMounted open={open} aria-labelledby="keep-mounted-modal-title" aria-describedby="keep-mounted-modal-description">
        <Box sx={style} className=" flex flex-col justify-center items-center rounded-lg">
          <div className="bg-red mb-5">
            <FiAlertTriangle className="font-red  w-20 h-20 text-red-500 " />
          </div>
          <Typography id="keep-mounted-modal-title" variant="h6" component="h2">
            Apakah anda yakin menghapus activity
            <div className="font-bold text-2xl text-center  ">"{title}" ?</div>
          </Typography>
          <div className="text-center flex justify-center items-center mt-7 ">
            <button className="bg-[#F4F4F4] w-28 p-3 rounded-2xl mr-5 text-bold " onClick={handleClose}>
              Batal
            </button>
            <button className="bg-[#ED4C5C] w-28 p-3 rounded-2xl text-white text-bold cursor-pointer " onClick={onClick}>
              Hapus
            </button>
          </div>
        </Box>
      </Modal>
      {/* akhir modal */}
    </div>
  );
};

export default Card;
