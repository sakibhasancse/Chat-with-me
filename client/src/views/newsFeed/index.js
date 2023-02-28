import React, { useEffect, useState } from 'react'
import { Col, Row } from 'antd'
import Grid from 'antd/es/card/Grid'
import ArticleCard from '../../components/ArticleCard'
import Navbar from '../../components/Layout'
import Footer from '../../components/Layout/Footer'
import { getAllPosts } from '../../data/posts'
import CreatePostModal from '../posts/CreatePostModal'
import RightBox from './RightBox.js'
import Tags from './Tags'

const Feed = () => {
  const [open, setOpen] = useState(false);
  const [posts, setPosts] = useState([])
  const [loading, setLoading] = useState(true)

  const postsApiCall = () => {
    getAllPosts().then(response => {
      console.log({ response })
      setPosts(response || [])
      setLoading(false)
    }).catch(err => {
      console.log({ err })
      setLoading(false)
    })
  }

  useEffect(() => {
    postsApiCall()
  }, [])

  return (
    <div className="container">
      <CreatePostModal open={open} setOpen={setOpen} setPosts={setPosts} />
      <Row justify="space-around">
        <Col xs={24} xl={4}>
          <Tags />
        </Col>
        <Col xs={24} xl={15}>
          <ArticleCard loading={loading} posts={posts} />
        </Col>
        <Col xs={24} xl={5}>
          <RightBox open={open} setOpen={setOpen} />
        </Col>
      </Row>
    </div>
  )
}

export default Feed
