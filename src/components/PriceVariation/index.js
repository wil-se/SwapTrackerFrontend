import React, { useState,useEffect } from 'react'
import PropTypes from 'prop-types';


export function PriceVariation(props) {
  
  let comp = null
  if(Number(props.priceVariation) >= 0) {
    comp = <h5 className="text-nowrap" style={{color: "#00CC83", fontWeight: 700, fontSize: 20}}>+{props.priceVariation} %</h5>
  } else {
    comp = <h5 className="text-nowrap" style={{color: "#F4002C", fontWeight: 700, fontSize: 20}}>{props.priceVariation} %</h5>
  }
  
  return(
    comp          
  )
}


PriceVariation.propTypes = {
  priceVariation: PropTypes.any,
};
