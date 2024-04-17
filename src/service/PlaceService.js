import axios from "axios";
import API_URL_PLACE from '../constant/constantURL/URLPlace';

class PlaceService  {
    static getPlaceList() {
        return axios.get(API_URL_PLACE)
    }
    static getPlaceListByCategoryAndSearch(categoryId,search) {
        return axios.get(API_URL_PLACE + `?category=${categoryId}&search=${search}`)
    }
    static getPlaceDetailById(placeId){
        return axios.get(API_URL_PLACE + `/${placeId}`)
    }

}   

export default PlaceService;
