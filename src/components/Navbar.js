import React, { useState } from 'react';
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom';


import LogoSrc from '../assets/Logo_ML.png';
import Logo2XSrc from '../assets/Logo_ML@2x.png.png';
import IconSrc from '../assets/ic_Search.png';
import Icon2XSrc from '../assets/ic_Search@2x.png.png';


const Navbar = (props) => {

  const { search, history, setCategoriesStatus} = props;
  const [query, setQuery] = useState({});
  const handleKeyEnter = (e) => {
    if(e.keyCode === 13){
      history.push('/items');
      return search(query);
    }
  };

  const setCategories = () =>{
    setCategoriesStatus('');
    history.push('/');
  }

  return(
    <header className="header">
      <nav className="nav">

        <img
          src={LogoSrc}
          srcSet={Logo2XSrc}
          alt="Logo MercadoLibre"
          className="logoNavbar"
          onClick={() => setCategories()}
        />
        <div className="searchContainer">
          <input
            className="inputNavbar"
            type="text"
            placeholder="Buscar productos, marcas y mas..."
            onKeyDown={(e) => handleKeyEnter(e)}
            onChange={(e) => setQuery({q: e.target.value, offset: 0, page: 0})}
          />
          <button
            className="btnInput"
            onClick={() => search(query)}
          >
            <img
              className="iconBtn"
              src={IconSrc}
              srcSet={Icon2XSrc}
              alt="icon search"
            />
          </button>
        </div>
      </nav>

    </header>
  )
}
const mapState = (state) =>({
  offset: state.itemsMeli.offset
});

const mapDispath = (dispath) =>({
  search: (payload) => dispath.itemsMeli.searchAPI(payload),
  setCategoriesStatus: (payload) => dispath.itemsMeli.setCategories(payload)
});

export default withRouter(connect(mapState, mapDispath)(Navbar));
