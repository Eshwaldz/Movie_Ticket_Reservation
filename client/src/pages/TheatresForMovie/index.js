import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";

import { Col, message, Row, Table } from "antd";

import { HideLoading, ShowLoading } from "../../redux/loadersSlice";

import { GetAllMovies, GetMovieById } from "../../apicalls/movies";
import { GetAllTheatresByMovie } from "../../apicalls/theatres";

import moment from "moment";

/**
 * Component สำหรับแสดงรายชื่อโรงหนังที่มีการฉายหนังเรื่องนึงตามวันที่ที่กำหนด
 * @returns {JSX.Element} โค้ด JSX สำหรับแสดงรายชื่อโรงหนังและรายละเอียดการฉายหนัง
 */
function TheatresForMovie() {
  // เก็บค่าวันที่ที่ถูกเลือกจาก query string หรือใช้ค่าปัจจุบัน
  const tempDate = new URLSearchParams(window.location.search).get("date");
  const [date, setDate] = React.useState(
    tempDate || moment().format("YYYY-MM-DD")
  );

  const [movie, setMovie] = React.useState([]);
  const [theatres, setTheatres] = React.useState([]);

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const params = useParams();

  /**
   * ดึงข้อมูลของหนังที่กำลังแสดงตาม id ที่ระบุใน URL params
   */
  const getData = async () => {
    try {
      dispatch(ShowLoading());
      const response = await GetMovieById(params.id);
      if (response.success) {
        setMovie(response.data);
      } else {
        message.error(response.message);
      }
      dispatch(HideLoading());
    } catch (error) {
      dispatch(HideLoading());
      message.error(error.message);
    }
  };

  /**
   * ดึงข้อมูลโรงหนังที่มีการฉายหนังเรื่องนึงตามวันที่ที่กำหนด
   */
  const getTheatres = async () => {
    try {
      dispatch(ShowLoading());
      const response = await GetAllTheatresByMovie({ date, movie: params.id });
      if (response.success) {
        setTheatres(response.data);
      } else {
        message.error(response.message);
      }
      dispatch(HideLoading());
    } catch (error) {
      dispatch(HideLoading());
      message.error(error.message);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  useEffect(() => {
    getTheatres();
  }, [date]);

  return (
    movie && (
      <div>
        {/* ข้อมูลของหนัง */}
        <div className="flex justify-between items-center mb-2">
          <div>
            <h1 className="text-2xl uppercase">
              {movie.title} ({movie.language})
            </h1>
            <h1 className="text-md">Duration : {movie.duration} mins</h1>
            <h1 className="text-md">
              Release Date : {moment(movie.releaseDate).format("MMM Do yyyy")}
            </h1>
            <h1 className="text-md">Genre : {movie.genre}</h1>
          </div>

          <div>
            <h1 className="text-md">Select Date</h1>
            <input
              type="date"
              min={moment().format("YYYY-MM-DD")}
              value={date}
              onChange={(e) => {
                setDate(e.target.value);
                navigate(`/movie/${params.id}?date=${e.target.value}`);
              }}
            />
          </div>
        </div>

        <hr />

        {/* รายชื่อโรงหนังที่มีการฉาย */}
        <div className="mt-1">
          <h1 className="text-xl uppercase">Theatres</h1>
        </div>

        <div className="mt-1 flex flex-col gap-1">
          {theatres.map((theatre) => (
            <div className="card p-2">
              <h1 className="text-md uppercase">{theatre.name}</h1>
              <h1 className="text-sm">Address : {theatre.address}</h1>

              <div className="divider"></div>

              <div className="flex gap-2">
                {theatre.shows
                  .sort(
                    (a, b) => moment(a.time, "HH:mm") - moment(b.time, "HH:mm")
                  )
                  .map((show) => (
                    <div
                      className="card p-1 cursor-pointer"
                      onClick={() => {
                        navigate(`/book-show/${show._id}`);
                      }}
                    >
                      <h1 className="text-sm">
                        {/* AM PM */}
                        {/* {moment(show.time, "HH:mm").format("hh:mm A")} */}

                        {/* 24 Hour */}
                        {(show.time)}
                      </h1>
                    </div>
                  ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    )
  );
}

export default TheatresForMovie;

/**
 * TheatresForMovie Component:
 * 
 * หน้าที่: Component นี้ใช้สำหรับแสดงรายชื่อโรงหนังที่มีการฉายหนังเรื่องนึงตามวันที่ที่กำหนด 
 * โดยให้ผู้ใช้เลือกวันที่และแสดงรายละเอียดของหนังที่กำลังฉายพร้อมกับรายชื่อของโรงหนังที่ฉาย
 * 
 */