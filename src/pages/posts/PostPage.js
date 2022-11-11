import React, { useEffect, useState } from "react";

import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Container from "react-bootstrap/Container";

import { Link, useParams } from "react-router-dom";
import { axiosReq } from "../../api/axiosDefaults";

import Post from "./Post";
import CommentCreateForm from "../comments/CommentCreateForm";
import { useCurrentUser } from "../../contexts/CurrentUserContext";
import Comment from "../comments/Comment";

import styles from '../../App.module.css'
import InfiniteScroll from "react-infinite-scroll-component";
import Asset from "../../components/Asset";
import { fetchMoreData } from "../../utils/utils";

function PostPage() {
  const { id } = useParams();
  const [ post, setPost ] = useState({ results: [] });
  const currentUser = useCurrentUser();
  const profile_image = currentUser?.profile_image;
  const [ comments, setComments ] = useState({ results: []});

  useEffect(() => {
    const handleMount = async () => {
      try {
        const [{ data: post }, { data: comments }] = await Promise.all([
          axiosReq.get(`/posts/${id}`),
          axiosReq.get(`/comments/?post=${id}`),
        ]);
        setPost({ results: [post] });
        setComments(comments);
      } catch(err) {
        console.log(err);
      }
    };
    handleMount();
  }, [id]);

  return (
    <Row className="h-100">
      <Col className="py-2 p-0 p-lg-2" lg={8}>
        <p>Display something here</p>
        <Post {...post.results[0]} setPosts={setPost} postPage/>
        <Container className="card shadow p-3">
          {currentUser ? (
            <CommentCreateForm
              profile_id={currentUser.profile_id}
              username={currentUser.username}
              profileImage={profile_image}
              post={id}
              setPost={setPost}
              setComments={setComments}
            />
          ) : comments.results.length ? (
            "Comments"
          ) : null}
          {comments.results.length ? (
            <InfiniteScroll 
              children={
                comments.results.map(comment => (
                  <Comment
                    key={comment.id}
                    {...comment}
                    setPost={setPost}
                    setComments={setComments}/>
              ))}
              dataLength={comments.results.length}
              loader={<Asset spinner />}
              hasMore={!!comments.next}
              next={() => fetchMoreData(comments, setComments)}
            />
          ) : currentUser ? (
            <span
              className={styles.SpanText}>
                No comments yet, this is your opportunity to be the first to leave a comment, huuurry!
            </span>
          ) : (
            <span
              className={styles.SpanText}>
                No comments yet, <Link
                  to={'/signin'} className={styles.OrangeText}>sign in</Link> or <Link
                  to={'/signup'} className={styles.OrangeText}>sign up</Link> to be the first to comment!
            </span>
          )}
        </Container>
      </Col>
      <Col lg={4} className="d-none d-lg-block p-0 p-lg-2">
        Profiles to follow
      </Col>
    </Row>
  );
}

export default PostPage;