import { Col, Row } from 'antd'
import Grid from 'antd/es/card/Grid'
import React from 'react'
import ArticleCard from '../../components/ArticleCard'
import Navbar from '../../components/Layout'
import Footer from '../../components/Layout/Footer'
import RightBox from './RightBox.js'
import Tags from './Tags'

const Feed = () => {
  return (
    <div className="container">
      <Row justify="space-around">
        <Col xs={24} xl={4}>
          <Tags />
        </Col>
        <Col xs={24} xl={10}>
          <ArticleCard />
        </Col>
        <Col xs={24} xl={10}>
          <RightBox />
        </Col>
      </Row>
    </div>
  )
}

export default Feed
