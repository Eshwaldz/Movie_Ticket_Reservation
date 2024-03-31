import { message } from "antd";

import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import StripeCheckout from "react-stripe-checkout";

import { GetShowById } from "../../apicalls/theatres";
import { BookShowTickets, MakePayment } from "../../apicalls/bookings";

import { HideLoading, ShowLoading } from "../../redux/loadersSlice";

import Button from "../../components/Button";

import moment from "moment"; // นำเข้าไลบรารี moment เพื่อการจัดรูปแบบวันที่และเวลา

/**
 * Component สำหรับการจองตั๋วหนัง
 * @returns {JSX.Element} - โค้ด JSX สำหรับการจองตั๋วหนัง
 */
function BookShow() {
  const { user } = useSelector((state) => state.users); // ดึงข้อมูลผู้ใช้จากสเตตของ Redux
  const [show, setShow] = React.useState(null); // ตัวแปร state เพื่อเก็บรายละเอียดการแสดง
  const [selectedSeats, setSelectedSeats] = React.useState([]); // ตัวแปร state เพื่อเก็บที่นั่งที่เลือก

  const params = useParams(); // ดึงพารามิเตอร์ของเส้นทาง
  const dispatch = useDispatch(); // ดึงฟังก์ชัน dispatch จาก Redux
  const navigate = useNavigate(); // ดึงฟังก์ชัน navigate จาก React Router

  /**
   * ฟังก์ชันสำหรับดึงข้อมูลการแสดงตัวอย่าง
   */
  const getData = async () => { 
    try {
      dispatch(ShowLoading());
      const response = await GetShowById({ // เรียกใช้งาน GetShowById API function
        showId: params.id, // ส่ง showId เป็นพารามิเตอร์
      });
      if (response.success) {
        setShow(response.data); // กำหนดรายละเอียดการแสดงให้กับ state
      } else {
        message.error(response.message); // แสดงข้อความผิดพลาด
      }
      dispatch(HideLoading());
    } catch (error) {
      dispatch(HideLoading());
      message.error(error.message);
    }
  };

  /**
   * ฟังก์ชันสำหรับแสดงที่นั่งที่ว่างและที่ถูกจอง
   */
  const getSeats = () => {
    const columns = 12; // กำหนดจำนวนคอลัมน์สำหรับการจัดที่นั่ง
    const totalSeats = show.totalSeats; // ดึงจำนวนที่นั่งทั้งหมด
    const rows = Math.ceil(totalSeats / columns); // คำนวณจำนวนแถว

    return (
      <div className="flex gap-1 flex-col p-2 card">
        {Array.from(Array(rows).keys()).map((seat, index) => { // วนลูปผ่านแถว
          return (
            <div className="flex gap-1 justify-center">
              {Array.from(Array(columns).keys()).map((column, index) => { // วนลูปผ่านคอลัมน์
                const seatNumber = seat * columns + column + 1; // คำนวณหมายเลขที่นั่ง
                let seatClass = "seat"; // กำหนดคลาสที่นั่งเริ่มต้น

                if (selectedSeats.includes(seat * columns + column + 1)) { // ตรวจสอบว่าที่นั่งถูกเลือกหรือไม่
                  seatClass = seatClass + " selected-seat"; // เพิ่มคลาสที่นั่งที่ถูกเลือก
                }

                if (show.bookedSeats.includes(seat * columns + column + 1)) { // ตรวจสอบว่าที่นั่งถูกจองหรือไม่
                  seatClass = seatClass + " booked-seat"; // เพิ่มคลาสที่นั่งที่ถูกจอง
                }

                return (
                  seat * columns + column + 1 <= totalSeats && ( // ตรวจสอบว่าเป็นที่นั่งที่ถูกกำหนดหรือไม่
                    <div
                      className={seatClass} // กำหนดคลาสที่นั่ง
                      onClick={() => {
                        if (selectedSeats.includes(seatNumber)) { // ตรวจสอบว่าที่นั่งถูกเลือกหรือไม่
                          setSelectedSeats( // อัปเดตรายการที่นั่งที่เลือก
                            selectedSeats.filter((item) => item !== seatNumber)
                          );
                        } else {
                          setSelectedSeats([...selectedSeats, seatNumber]); // เพิ่มที่นั่งที่เลือกเข้าไปในรายการ
                        }
                      }}
                    >
                      <h1 className="text-sm">{seat * columns + column + 1}</h1>
                    </div>
                  )
                );
              })}
            </div>
          );
        })}
      </div>
    );
  };

  /**
   * ฟังก์ชันสำหรับจองตั๋วหนัง
   * @param {string} transactionId - รหัสธุรกรรม
   */
  const book = async (transactionId) => {
    try {
      dispatch(ShowLoading());
      const response = await BookShowTickets({ // เรียกใช้งาน BookShowTickets API function
        show: params.id, // ส่ง showId เป็นพารามิเตอร์
        seats: selectedSeats, // ส่งที่นั่งที่เลือก
        transactionId,
        user: user._id, // ส่ง ID ของผู้ใช้
      });
      if (response.success) {
        message.success(response.message); // แสดงข้อความสำเร็จ
        navigate("/profile"); // เปลี่ยนเส้นทางไปยังหน้าโปรไฟล์
      } else {
        message.error(response.message); // แสดงข้อความผิดพลาด
      }
      dispatch(HideLoading()); // ส่งการกระทำเพื่อซ่อนสปินเนอร์
    } catch (error) {
      message.error(error.message); // แสดงข้อความผิดพลาด
      dispatch(HideLoading());
    }
  };

  /**
   * ฟังก์ชันสำหรับการจ่ายเงินผ่าน Stripe
   * @param {object} token - ข้อมูล Token จากการจ่ายเงินผ่าน Stripe
   */
  const onToken = async (token) => {
    try {
      dispatch(ShowLoading());
      const response = await MakePayment( // เรียกใช้งาน MakePayment API function
        token,
        selectedSeats.length * show.ticketPrice * 100 // คำนวณยอดเงินที่ต้องจ่าย
      );
      if (response.success) {
        message.success(response.message);
        book(response.data); // เรียกใช้ฟังก์ชันจองตั๋ว
      } else {
        message.error(response.message);
      }
      dispatch(HideLoading());
    } catch (error) {
      message.error(error.message);
      dispatch(HideLoading());
    }
  };

  useEffect(() => { // useEffect hook เพื่อดึงรายละเอียดการแสดงเมื่อคอมโพเนนต์โหลดเสร็จ
    getData();
  }, []);

  return (
    show && (
      <div>
        {/* Show Info */}
        <div className="flex justify-between card p-2 items-center">
          <div>
            <h1 className="text-sm">{show.theatre.name}</h1> 
            <h1 className="text-sm">{show.theatre.address}</h1>
          </div>

          <div>
            <h1 className="text-2xl uppercase">
              {show.movie.title} ({show.movie.language})
            </h1>
          </div>

          <div>
            <h1 className="text-sm">
              {moment(show.date).format("MMM Do yyyy")} -{" "}
              {moment(show.time, "HH:mm").format("hh:mm A")}
            </h1>
          </div>  
        </div>

        {/* Seats */}
        <div className="flex justify-center mt-2">{getSeats()}</div>

        {selectedSeats.length > 0 && (
          <div className="mt-2 flex justify-center gap-2 items-center flex-col">
            <div className="flex justify-center">
              <div className="flex uppercase card p-2 gap-3">
                <h1 className="text-sm">
                  <b>Selected Seats</b> : {selectedSeats.join(" , ")}
                </h1>

                <h1 className="text-sm">
                  <b>Total Price</b> : {selectedSeats.length * show.ticketPrice}
                </h1>
              </div>
            </div>
            <StripeCheckout
              currency="THB"
              token={onToken}
              amount={selectedSeats.length * show.ticketPrice * 100}
              billingAddress
              stripeKey="pk_test_51OvLlNKCD4cxX2Vs0D5fc98oxk0OpuVdU0sbyj0hXIugcLMNW4N5w8c2iIqxjUTEKnoOqYTsIgx0oWR4HSS3oPNK00cBh7X878"
            >
              <Button title="Book Now" />
            </StripeCheckout>
          </div>
        )}
      </div>
    )
  );
}

export default BookShow;

/**
 * BookShow Component:
 * 
 * หน้าที่/การใช้งาน: BookShow Component ใช้สำหรับการจองตั๋วหนังโดยแสดงข้อมูลการแสดงตัวอย่างและตารางที่นั่งให้ผู้ใช้เลือก 
 * โดยมีการใช้งาน Stripe Checkout เพื่อการชำระเงิน.
 * 
 */
