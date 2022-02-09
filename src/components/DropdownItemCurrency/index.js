import React, { useState,useEffect } from 'react'
import { Dropdown, Row, Col } from 'react-bootstrap';
import * as CurrenciesIcons from '../../assets/icons/currencies';
import PropTypes from 'prop-types';


export function DropdownItemCurrency(props){
  return(
    <Col xl={3} className="p-0"><Dropdown.Item className={"dropdownitemcurrency align-items-left"} onClick={() => props.onClickHandler(props.name, props.symbol)}><img className="img-fluid mr-3 p-1" src={CurrenciesIcons.default[props.name]} /><span className="font-weight-bold mr-2">{props.name}</span></Dropdown.Item></Col>
  )
}

DropdownItemCurrency.propTypes = {
  symbol: PropTypes.string,
  name: PropTypes.string,
  onClickHandler: PropTypes.any
};