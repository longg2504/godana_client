import logo from "./logo.svg";
import "./App.css";
import Home from "./view/client/layout/Home";
import "../src/view/client/layout/css/Client.css"
import markerIcon from "./images/marker.png"
import {
  MapContainer,
  TileLayer,
  useMapEvents,
  Marker,
} from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import RoutesClient from "./routes/RoutesClient";
function App() {
  return(
    <RoutesClient/>
  )
  // const icon = L.icon({
  //   iconSize: [25, 41],
  //   iconAnchor: [10, 41],
  //   popupAnchor: [2, -40],
  //   iconUrl: "https://unpkg.com/leaflet@1.7/dist/images/marker-icon.png",
  //   shadowUrl: "https://unpkg.com/leaflet@1.7/dist/images/marker-shadow.png",
  // });
//   const customIconCurrent = new L.Icon({
//     iconUrl: markerIcon,
//     iconSize: [32, 32],
// });
  // function MyComponent() {
  //   const map = useMapEvents({
  //     click: (e) => {
  //       const { lat, lng } = e.latlng;
  //       L.marker([lat, lng], { icon }).addTo(map);
  //     },
  //   });
  //   return null;
  // }

  // return (
  //   <MapContainer
  //     center={[16.4883707, 107.5910397]}
  //     zoom={100}
  //     style={{ height: "100vh" }}
  //     // whenReady={(map) => {
  //     //   console.log(map);
  //     //   map.target.on("click", function (e) {
  //     //     const { lat, lng } = e.latlng;
  //     //     L.marker([lat, lng], { icon }).addTo(map.target);
  //     //   });
  //     // }}
  //   >
  //     <TileLayer
  //       attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
  //       url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
  //     />
  //     <Marker position={[16.4883707, 107.5910397]} icon={customIconCurrent}></Marker>
  //   </MapContainer>
  
}

export default App;
