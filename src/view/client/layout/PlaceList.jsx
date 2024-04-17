import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import UseFetchPlace from "../../../hooks/client/UseFetchPlace";
import LoadingPlaceList from "./LoadingPlace";
import PlaceSlider from "./PlaceSlider";
import { IonIcon } from "@ionic/react";
import { heartOutline, heartCircleOutline } from "ionicons/icons";
import "../../../../node_modules/@fortawesome/fontawesome-free/css/all.min.css";
import moment from 'moment';
import checkOpenClose from "../../../utils/CheckOpenClose";

export default function PlaceList({ placeList, loading }) {
  const currentTime = moment();
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [showMap, setShowMap] = useState(false);
  const [showMapStates, setShowMapStates] = useState({});
  const [isOverlayVisible, setIsOverlayVisible] = useState(false);
  const [hoveredIndex, setHoveredIndex] = useState(null);
  const [isOverLayOpenFormWishList, setIsOverLayOpenFormWishList] =
    useState(false);
  const [
    isOverLayOpenFormCreatNewWishList,
    setIsOverLayOpenFormCreatNewWishList,
  ] = useState(false);

  const toggleHover = (index) => {
    setHoveredIndex(index);
  };

  const nextImage = () => {
    setActiveImageIndex(
      (prevIndex) => (prevIndex + 1) % placeList[activeImageIndex].images.length
    );
  };

  const prevImage = () => {
    setActiveImageIndex(
      (prevIndex) =>
        (prevIndex - 1 + placeList[activeImageIndex].images.length) %
        placeList[activeImageIndex].images.length
    );
  };

  const toggleOverlay = () => {
    setIsOverlayVisible(!isOverlayVisible);
  };
  return (
    <div>
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

      <div className="search-results">
        {loading ? (
          <LoadingPlaceList />
        ) : Array.isArray(placeList) && placeList.length > 0 ? (
          placeList?.map((place, index) => {
            const openTime = moment(place.contact.openTime, 'HH:mm:ss').format('HH:mm'); 
            const closeTime = moment(place.contact.closeTime, 'HH:mm:ss').format('HH:mm'); 
            
            // const isHouseLiked = houseLiked.includes(Number(house.id));
            const isPlaceLiked = "";
            return (
              <div key={index} className="listing">
                <div>
                  <div>
                    <div>
                      <PlaceSlider place={place} />
                      {isPlaceLiked ? (
                        <div
                          className="outer-div"
                          onMouseEnter={() => toggleHover(index)}
                          onMouseLeave={() => toggleHover(null)}
                        >
                          <i
                            // onClick={() => {
                            //   handleRemoveFavorite(place.id);
                            // }}
                            className="fa-solid fa-heart"
                            style={{ color: "#f21202" }}
                          ></i>
                        </div>
                      ) : (
                        <div
                          className="outer-div"
                          onMouseEnter={() => toggleHover(index)}
                          onMouseLeave={() => toggleHover(null)}
                        >
                          {hoveredIndex === index ? (
                            <IonIcon
                              //   onClick={() => {
                              //     toggleOpenFormWishList();
                              //     setIdHouseSelected(place.id);
                              //   }}
                              icon={heartCircleOutline}
                              className="heartCircle-icon"
                            />
                          ) : (
                            <IonIcon
                              icon={heartOutline}
                              className="heart-icon"
                            />
                          )}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
                <div className="div-show-map-details-on-list">
                  {showMapStates[index] && (
                    <div className="house-on-map">
                      {/* <ShowLocation
                        latitude={house.location.latitude}
                        longitude={house.location.longitude}
                      /> */}
                      <button
                        onClick={() =>
                          setShowMapStates((prevState) => ({
                            ...prevState,
                            [index]: false,
                          }))
                        }
                      >
                        <i className="fa-solid fa-circle-xmark"></i>
                      </button>
                    </div>
                  )}
                </div>
                <div>
                  <div className="listing-header">
                    <h3 className="hotel-name">{place?.placeTitle}</h3>
                    <span className="review">
                      <i className="fa-solid fa-star"></i>&nbsp;{place?.rating}
                    </span>
                    
                    <span>{checkOpenClose(openTime,closeTime)}</span>
                  </div>
                  {/* <button onClick={() => {
                                            setShowMapStates((prevState) => ({ ...prevState, [index]: true }))
                                        }}>
                                            Xem vị trí
                                        </button> */}
                </div>
              </div>
            );
          })
        ) : (
          <LoadingPlaceList />
        )}
      </div>
    </div>
  );
}
