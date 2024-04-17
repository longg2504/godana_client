import React, { useState, useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import PlaceService from "../../../../service/PlaceService";
import "../css/ClientDetail.css";
import "../css/Client.css";
import LocationDetail from "./LocationDetail";
import { Link, useParams } from "react-router-dom";
import RatingService from "../../../../service/RatingService";
import ConvertDateReview from "./ConvertDataReview";

export default function BodyDetail() {
  const [place, setPlace] = useState({});
  const [isOverlayVisible, setIsOverlayVisible] = useState(false);
  const [placeReivew, setPlaceReviews] = useState([]);
  const [isOverlayReviews, setIsOVerlayReviews] = useState(false)
  const { placeId } = useParams();

  useEffect(() => {
    async function getPlaceDetail() {
      let res = await PlaceService.getPlaceDetailById(placeId);
      setPlace(res.data);
    }
    getPlaceDetail();
  }, []);

  useEffect(() => {
    async function getReviewsPlace() {
      let res = await RatingService.getRatingListByPlaceId(placeId);
      setPlaceReviews(res.data);
    }
    getReviewsPlace();
  }, []);

  const sixLastestReviews =
    placeReivew?.length >= 6
      ? placeReivew?.reviews
          .slice(0, 6)
          .sort((a, b) => new Date(b.reviewDate) - new Date(a.reviewDate))
      : placeReivew?.sort(
          (a, b) => new Date(b.reviewDate) - new Date(a.reviewDate)
        );

  const toggleOverlay = () => {
    setIsOverlayVisible(!isOverlayVisible);
    if (!isOverlayVisible) {
      document.querySelector(".leaflet-control").style.display = "none";
      document.querySelector(".leaflet-control-attribution").style.display =
        "none";
    } else {
      document.querySelector(".leaflet-control").style = "block";
      document.querySelector(".leaflet-control-attribution").style = "block";
    }
  };

  const toggleOverlayReviews = () => {
    setIsOVerlayReviews(!isOverlayReviews);
    if (!isOverlayReviews) {
        document.querySelector('.leaflet-control').style.display = 'none';
        document.querySelector('.leaflet-control-attribution').style.display = 'none'
    } else {
        document.querySelector('.leaflet-control').style = 'block';
        document.querySelector('.leaflet-control-attribution').style = 'block'
    }
};

  return (
    <>
      <ToastContainer
        position="bottom-right"
        autoClose={5000} // Thời gian tự động đóng toast (5 giây)
        // hideProgressBar
        newestOnTop
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
      <div className="body-detail">
        <div>
          <div className="title">
            <h1>
              <svg
                className="svg-title"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 16 16"
                aria-label="Tiêu đề được dịch tự động: Cabin 1 - Cabin sang trọng bên sườn núi với chế độ xem Batulao"
                role="img"
                focusable="false"
              >
                <path d="M9 0a1 1 0 0 1 1 .88V6h5a1 1 0 0 1 1 .88V15a1 1 0 0 1-.88 1H7a1 1 0 0 1-1-.88V10H1a1 1 0 0 1-1-.88V1a1 1 0 0 1 .88-1H9zm1.73 7-1.4.5.24.21.13.13c.12.13.23.25.3.36l.08.1.05.07.04.08H7.31v1.3h1.2l.17.53.1.26.1.3A6.3 6.3 0 0 0 10 12.61c-.5.32-1.12.61-1.87.87l-.33.11-.35.11-.44.14.72 1.15.4-.13.4-.12c1-.35 1.83-.76 2.48-1.22.57.4 1.28.77 2.12 1.08l.37.14.38.12.41.13.72-1.15-.45-.14-.26-.08-.34-.11a9.23 9.23 0 0 1-1.94-.9 6.3 6.3 0 0 0 1.07-1.7l.13-.31.11-.33.17-.52h1.2V8.45h-3.05l-.1-.23A3.7 3.7 0 0 0 11 7.3l-.12-.15-.14-.15zm1.35 2.76-.04.13-.08.22-.1.27a4.99 4.99 0 0 1-.86 1.38 4.95 4.95 0 0 1-.74-1.13l-.12-.25-.1-.27-.08-.22-.04-.13h2.16zM9 1H1v8h5V7l.01-.17H3.83L3.43 8H2l2.26-6h1.48l1.5 4H9V1zM5 3.41 4.25 5.6h1.5L5 3.41z"></path>
              </svg>
              {place.placeTitle}
            </h1>
          </div>
        </div>
        <div className="review">
          <div>
            <p>
              {place.rating}
              <i className="fa-solid fa-star"></i>
              <span className="text" style={{ textDecoration: "underline" }}>
                {place.numberRating} đánh giá
              </span>
              <span className="text" style={{ textDecoration: "underline" }}>
                {place.locationRegion?.address +
                  ", " +
                  place.locationRegion?.wardName +
                  ", " +
                  place.locationRegion?.districtName +
                  ", " +
                  place.locationRegion?.provinceName +
                  ", "}
              </span>
            </p>
          </div>
        </div>
        {place.placeAvatar && (
          <div className="image-house-detail">
            <div className="img0">
              <img
                src={place.placeAvatar[0].fileUrl}
                style={{
                  width: "96%",
                  height: "250px",
                }}
              />
            </div>
            <div className="imgs">
              <img src={place.placeAvatar[1].fileUrl} />
              <img
                src={place.placeAvatar[2].fileUrl}
                style={{ borderRadius: "0px 30px 0px 0px" }}
              />
              {/* <img src={place.placeAvatar[3].fileUrl} />
            <img
              src={place.placeAvatar[4].fileUrl}
              style={{ borderRadius: "0px 0px 30px 0px" }}
            /> */}
            </div>
          </div>
        )}
        <div style={{ width: "1200px" }}>
          <div className="title">
            <h3>
              <i className="fa-solid fa-star"></i> {place.rating} ·
              <span className="text" style={{ textDecoration: "underline" }}>
                {place.numberRating} đánh giá
              </span>
            </h3>
            <div className="container-review">
              <div className="review-details">
                {sixLastestReviews &&
                  sixLastestReviews.map((review, index) => (
                    <div className="content-details" key={index}>
                      <div className="container-details-users">
                        <img
                          className="avatar-user-review"
                          src={review?.userDTO?.avatar.fileUrl}
                          alt=""
                        />
                        <div>
                          <h3>{review?.userDTO.username}</h3>
                          <ConvertDateReview
                            date={review?.created_at}
                          ></ConvertDateReview>
                        </div>
                      </div>
                      <div className="content-user-review">
                        <p>{review?.content}</p>
                      </div>
                    </div>
                  ))}
              </div>
            </div>
            {placeReivew?.reviews?.length >= 2 && (
              <button
                className="btn-show-all-comfortable"
                onClick={toggleOverlayReviews}
              >
                Hiển thị tất cả {placeReivew?.totalElements} đánh giá
              </button>
            )}
          </div>
        </div>
        <div style={{ width: "1200px" }}>
          <div className="title">
            <h2>Nơi bạn sẽ đến</h2>
            {place?.longitude && (
              <LocationDetail
                latitude={place.latitude}
                longitude={place.longitude}
              />
            )}
            {/* <button className="btn-show-description" onClick={toggleOverlay}>
              <p>
                Hiển thị thêm{" "}
                <span>
                  <i className="fa-solid fa-angle-right"></i>
                </span>
              </p>
            </button> */}
          </div>
        </div>
      </div>
    </>
  );
}
