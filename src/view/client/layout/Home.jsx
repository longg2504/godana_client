import React, { useState, useEffect, useRef } from "react";
import Header from "./Header";
import PlaceList from "./PlaceList";
import "./css/Client.css";
import markerIcon from "../../../images/marker.png";
import L from "leaflet";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import ImgSliderOnMap from "./Footer/ImgSlideOnMap";
import { divIcon } from "leaflet";
import "rc-slider/assets/index.css";
import Slider from "rc-slider";
import "../../../../node_modules/@fortawesome/fontawesome-free/css/all.min.css";
import PlaceService from "../../../service/PlaceService";

const Home = () => {
  const [showMapList, setshowMapList] = useState(false);
  const [userLocation, setUserLocation] = useState(null);
  const [showMap, setShowMap] = useState(false);
  const [showBtnCurrentLocation, setShowBtnCurrentLocation] = useState(false);
  const [showUserLocation, setShowUserLocation] = useState(false);
  const [showSpinner, setShowSpinner] = useState(false);
  const [hasClickedButtonSpinner, setHasClickedButtonSpinner] = useState(false);
  const [placeLocations, setPlaceLocations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [placeList, setPlaceList] = useState([]);

  useEffect(() => {
    async function getPlaceList() {
      try {
        let placeRes = await PlaceService.getPlaceList();
        setPlaceList(placeRes.data.content);
      } catch (error) {
        console.log("Error fetching place list:", error);
      } finally {
        setLoading(false);
      }
    }
    getPlaceList();
  }, []);
  console.log(placeList, "placeList");
  useEffect(() => {
    if (placeList && placeList.length > 0) {
      const locations =
        placeList &&
        placeList?.map((item) => {
          if (item && item.latitude && item.longitude) {
            return {
              lng: item.longitude,
              lat: item.latitude,
              info: {
                placeName: item.placeTitle,
                images: item.placeAvatar.map((image) => image.fileUrl),
                id: item.id,
              },
            };
          }
          return null;
        });
      setPlaceLocations(locations);
    }
  }, [placeList]);

  const mapRef = useRef();

  const icon = new L.Icon({
    iconSize: [25, 41],
    iconAnchor: [10, 41],
    popupAnchor: [2, -40],
    iconUrl: "https://unpkg.com/leaflet@1.7/dist/images/marker-icon.png",
    shadowUrl: "https://unpkg.com/leaflet@1.7/dist/images/marker-shadow.png",
  });

  const customIconCurrent = new L.Icon({
    iconUrl: markerIcon,
    iconSize: [32, 32],
  });

  const customIcon = (title) => {
    console.log(title, "title");
    return divIcon({
      className: " test",
      html: `<div className='custom-div-icon-leaflet'> 
      ${title} 
      </div>`,
    });
  };

  const getUserLocation = () => {
    setShowUserLocation(true);
    if (userLocation) {
      mapRef.current.setView(userLocation, 15); // Set view to user location with a zoom level of 15
    }
  };
  console.log(userLocation, "userLocation");
  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        const { latitude, longitude } = position.coords;
        setUserLocation([latitude, longitude]);

        console.log(userLocation, "userLocation");
      });
    } else {
      alert("Trình duyệt không hỗ trợ xác định vị trí.");
    }
  }, []);

  const handleShowCurrentLocation = () => {
    if (!hasClickedButtonSpinner) {
      setShowSpinner(true);

      setTimeout(() => {
        getUserLocation();
        setShowSpinner(false);
      }, 500);
      setHasClickedButtonSpinner(true);
    } else {
      getUserLocation();
    }
  };

  const handleToggleShowMap = () => {
    setShowMap(!showMap);
  };

  const handleShowMap = () => {
    setshowMapList((prevShowMap) => !prevShowMap);
    setShowBtnCurrentLocation((prevBtn) => !prevBtn);
    if (!showMapList) {
      setShowUserLocation(false);
    }
    if (hasClickedButtonSpinner) {
      setHasClickedButtonSpinner(false);
    }
  };

  useEffect(() => {
    console.log(userLocation, showUserLocation);
  }, [userLocation, showUserLocation]);
  return (
    <>
      <Header setPlaceList={setPlaceList} setLoading={setLoading} />
      <PlaceList placeList={placeList} loading={loading} />

      <div
        className="spinner"
        style={{ display: showSpinner ? "block" : "none" }}
      >
        <div className="bounce1"></div>
        <div className="bounce2"></div>
        <div className="bounce3"></div>
      </div>
      <button className="show-map" onClick={handleShowMap}>
        {showMapList ? "Ẩn bản đồ" : "Hiện bản đồ"}
      </button>
      {showBtnCurrentLocation && (
        <button
          className="btn-show-current-location"
          onClick={handleShowCurrentLocation}
        >
          <i className="fa-solid fa-location-crosshairs"></i>
        </button>
      )}
      {showMapList ? (
        <div id="map-container" style={{ height: "500px" }}>
          <MapContainer
            center={[16.07237,108.21628] || [0, 0]}
            zoom={100}
            style={{ height: "200%", width: "100%" }}
            ref={mapRef}
          >
            <TileLayer
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              attribution={`
                                    &copy; <a href="https://www.openstreetmap.org/copyright">Điều khoản sử dụng</a>
                                    `}
            />
            {placeLocations.map((location, index) => {
              return (
                <Marker
                  key={index}
                  position={[location.lat, location.lng]}
                  icon={customIcon(location.info.placeName)}
                >
                  <Popup>
                    <div
                      style={{
                        width: "115.3%",
                        right: "21px",
                        position: "relative",
                        top: "-14px",
                        borderRadius: "5px 5px 5px 5px",
                      }}
                    >
                      <div>
                        <ImgSliderOnMap place={location} />
                      </div>
                      <div style={{ margin: "0px 20px" }}>
                        <h2>{location.placeName}</h2>
                      </div>
                    </div>
                  </Popup>
                </Marker>
              );
            })}
            {showUserLocation && (
              <Marker position={userLocation} icon={customIconCurrent}></Marker>
            )}
          </MapContainer>
        </div>
      ) : (
        ""
      )}
    </>
  );
};

export default Home;
