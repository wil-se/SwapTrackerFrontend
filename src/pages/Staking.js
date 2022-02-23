import React,{useEffect, useLayoutEffect} from 'react'
import BigNumber from 'bignumber.js';
import { useWeb3React } from '@web3-react/core';
import { Col, Row } from 'react-bootstrap';
import { usePools } from 'store/hooks';
import { useFetchPublicData, useFetchPriceList } from 'store/hooks';

import useEagerConnect from 'hooks/useEagerConnect';
import MainContainer from 'components/MainContainer';
import CardsSection from 'components/CardsSection';
import PoolCard from 'components/PoolCard';
import useAuthService from 'hooks/useAuthService';

BigNumber.config({
    EXPONENTIAL_AT: 1000,
    DECIMAL_PLACES: 80,
  });

const Staking = () => {
    useFetchPublicData();
    useFetchPriceList();
    const {account} = useAuthService()
    const pools = usePools(account);
  
    const openedPools = pools.filter(pool => pool).sort((a, b) => a.sortOrder - b.sortOrder);


    return (
        <MainContainer>
        <a href="https://swaptracker.io/">
          <img src="./images/logo.svg" alt="SwapTracker" width="100%" height="110px" style={{ display: 'none' }}></img>
        </a>
        <CardsSection pools={pools} />
        <Row className="d-flex justify-content-center mt-5">
          <Col md={9}>
            <h1 className="page-title">Pools</h1>
            <Row style={{marginTop: 20}}>
              {openedPools.map(pool => (
                <Col md={6} key={pool.poolId} className="mb-4">
                  <PoolCard pool={pool} />
                </Col>
              ))}
            </Row>
          </Col>
        </Row>
      </MainContainer>
    )
}

export default Staking
