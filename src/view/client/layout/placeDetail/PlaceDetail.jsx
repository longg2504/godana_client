import React, { useEffect, useState } from 'react'
import Header from '../Header';
import BodyDetail from './BodyDetail';
import "../css/Client.css"
import "../css/ClientDetail.css"

const PlaceDetail = () => {
    const [loading, setLoading] = useState(true);

  return (
    <div>
        <Header setLoading={setLoading}/>
        <BodyDetail/>
    </div>
  )
}

export default PlaceDetail