import React, { useState, useEffect, useRef } from 'react'
import "../css/Client.css"
import UseFetchCategory from '../../../../hooks/client/UseFetchCategory'
import Header from '../Header';
import PlaceList from '../PlaceList';

export default function Body() {
    
    const categories = UseFetchCategory();
    const categoriesIds = categories.map(cate => cate.id);
    
    console.log(categories)


  return (
    <div>
        <Header/>
        <PlaceList/>
    </div>
  )
}
