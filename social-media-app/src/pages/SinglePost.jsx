import React from "react";
import Layout from "../components/Layout";
import { Row, Col } from "react-bootstrap";
import { useParams } from "react-router-dom";
import useSWR from "swr";
import { fetcher } from "../helpers/axios";
import Post from "../components/posts/Post";
import CreateComment from "../components/comments/CreateComment";
import Comment from "../components/comments/Comment";
import { API_VERSION } from "../config/api";



function SinglePost() {
    let { postId } = useParams();

    const post = useSWR(`${API_VERSION}/post/${postId}/`, fetcher)

    const comments = useSWR(`${API_VERSION}/post/${postId}/comment/`, fetcher)


    return (
        <Layout hasNavigationBack>
            {post.data ? (
                <Row className="justify-content-center">
                    <Col sm={8}>
                        <Post post={post.data} refresh={post.mutate}
                        isSinglePost />
                        {/* Adding CreateComment form and list all comments here */}
                        <CreateComment postId={post.data.id} refresh={comments.mutate} />
                        {comments.data &&
                            comments.data.results.map((comment, index) => (
                                <Comment 
                                    key={index}
                                    postId={post.data.id}
                                    comment={comment}
                                    refresh={comments.mutate}
                                />
                            
                        ))}
                    </Col>
                </Row>
            ) :(
            <div>Loading...</div>
            )}
        </Layout>
    );
}

export default SinglePost;