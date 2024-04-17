import React , {useState, useEffect} from "react";
import "../../../../node_modules/@fortawesome/fontawesome-free/css/all.min.css";
import "./css/Client.css";
import "../../../images/logoGoDana.png";
import UseFetchCategory from '../../../hooks/client/UseFetchCategory';
import PlaceService from "../../../service/PlaceService";


function Header({setPlaceList, setLoading}) {
  const categories = UseFetchCategory();
  const [categoryId, setCategoryId] = useState("");
  const [search, setSearch] = useState("");



  const handleCategoryChange = (event) => {
    setCategoryId(event.target.value);
  };

  // Hàm xử lý thay đổi giá trị search
  const handleSearchChange = (event) => {
    setSearch(event.target.value);
  };
  const handleSubmit = (event) => {
    event.preventDefault();
    // Không cần gọi service ở đây nữa vì useEffect đã thực hiện công việc đó
  };

  useEffect(() => {
    // Chỉ gọi service khi đã có giá trị categoryId và search
      async function getPlaceListByCategoryAndSearch(){
        try {
          let placeRes = await PlaceService.getPlaceListByCategoryAndSearch(categoryId,search);
          setPlaceList(placeRes.data.content)
      } catch (error) {
          console.log('Error fetching place list:', error);
      } finally {
          setLoading(false);
      }
    }

    getPlaceListByCategoryAndSearch();
    
  }, [categoryId, search]);
  return (
    <>
      <div className="header">
        <img
          className="img-header"
          src="http://localhost:3000/static/media/logoGoDana.e9590f267fe64f21b5e5.png"
          alt=""
          width="100px"
          height="100px"
        />
        <div className="search-box">
          
          
        <form onSubmit={handleSubmit} className="d-flex">
        <select className="form-select search-category" aria-label="Default select example" value={categoryId} onChange={handleCategoryChange}>
        <option value="">Tất Cả</option>
        {/* Đảm bảo categories được truyền vào từ props hoặc state */}
        {categories.map((item, index) => (
          <option key={index} value={item.id}>
            {item.title}
          </option>
        ))}
      </select>
      <input className="search-input" type="text" value={search} onChange={handleSearchChange} />
      <button className="search-button" type="submit">
        <i className="fa-solid fa-magnifying-glass" />
      </button>
    </form>
        </div>

        <div className="header-2">
          <span>
            <i
              className="fa-solid fa-circle-user"
              style={{ fontSize: "40px" }}
            />
          </span>
        </div>
        
      </div>
      
    </>
  );
}

export default Header;
