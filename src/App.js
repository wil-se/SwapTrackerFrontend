import React from 'react';
import BigNumber from 'bignumber.js';
import { useWeb3React } from '@web3-react/core';
import { Col, Row } from 'react-bootstrap';
import { usePools } from 'store/hooks';
import { useFetchPublicData, useFetchPriceList } from 'store/hooks';
import useEagerConnect from 'hooks/useEagerConnect';
import TopNavbar from 'components/TopNavbar';
import MainContainer from 'components/MainContainer';
import CardsSection from 'components/CardsSection';
import PoolCard from 'components/PoolCard';

// This config is required for number formatting
BigNumber.config({
  EXPONENTIAL_AT: 1000,
  DECIMAL_PLACES: 80,
});

import 'style/App.scss';

function App() {
  useEagerConnect();
  useFetchPublicData();
  useFetchPriceList();

  const { account } = useWeb3React();
  const pools = usePools(account);

  const openedPools = pools.filter(pool => pool).sort((a, b) => a.sortOrder - b.sortOrder);

  return (
    <>
      <TopNavbar></TopNavbar>
      <MainContainer>
        <a href="https://swaptracker.io/">
          <img src="./images/logo.svg" alt="SwapTracker" width="100%" height="110px" style={{ display: 'none' }}></img>
        </a>
        <CardsSection pools={pools} />
        <Row className="d-flex justify-content-center mt-5">
          <Col md={9}>
            <h1 className="page-title">Pools</h1>
            <Row>
              {openedPools.map(pool => (
                <Col md={6} key={pool.poolId} className="mb-4">
                  <PoolCard pool={pool} />
                </Col>
              ))}
            </Row>
          </Col>
        </Row>
        <Row className="d-flex justify-content-center mt-5">
          <Col md={9}>
            <h5 className="text-uppercase text-center font-weight-bold" style={{color: '#889db3'}}><a style={{color: '#889db3'}} href="https://bit.ly/stakingtutorial" target="_blank" rel="noreferrer">How to stake SWPT</a></h5>
          </Col>
        </Row>
      </MainContainer>
    </>
  );
}

export default App;
