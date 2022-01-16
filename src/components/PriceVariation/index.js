import React, { useState,useEffect } from 'react'
import PropTypes from 'prop-types';


export function PriceVariation(props) {
  
  let comp = null
  if(Number(props.priceVariation) >= 0) {
    comp = <h5 style={{color: "#00CC83", fontWeight: 900, fontSize: 24}}>+{props.priceVariation} %</h5>
  } else {
    comp = <h5 style={{color: "#F4002C", fontWeight: 900, fontSize: 24}}>{props.priceVariation} %</h5>
  }
  
  return(
    comp          
  )
}


PriceVariation.propTypes = {
  priceVariation: PropTypes.any,
};
