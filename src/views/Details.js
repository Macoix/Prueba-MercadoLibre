import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import LogoShipping from '../assets/ic_shipping.png';

const Details = (props) => {

  const { item } = props;
  console.log(item)
  return (
    <div className="detailsContainer">
      <div className="detailContainerItem">
        <div className="detailWrapper">
          <div className="detailLeftColumn">
            <div className="detailImageContainer">
              <img src={item.picture.url} alt={item.picture.id}/>
            </div>
            <div className="detailDescripContainer">
              <h2>Descripción</h2>
              <p>{item.description}</p>
            </div>
          </div>
          <div className="detailRightColumn">
            <div className="detailRightContent">
              <div className="detailTitleContent">
                <div className="SubheaderTitle">
                  <span>
                    {item.condition === 'new' ? 'Nuevo' : 'Usado'}
                  </span>
                </div>
                <h1>{item.title}</h1>
              </div>
              <div className="detailPriceContent">
                <span>$</span>
                <span>{new Intl.NumberFormat("de-DE").format(item.price.amount)}</span>
              </div>
              <div className="detailFreeShipping">
                <figure className="figure">
                  <img src={LogoShipping} srcSet={LogoShipping} alt="Shipping icon"/>
                </figure>
                <div className="freeShippingText">Envío Gratis</div>
              </div>
              <div className="btnContainer">
                <button className="btn btn-blue">
                  Comprar ahora
                </button>
                <button class="btn btn-blue_light">
                  Añadir al carrito
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

const mapState = (state) => ({
  item: state.itemMeli.item
})

export default withRouter(connect(mapState, {})(Details));
