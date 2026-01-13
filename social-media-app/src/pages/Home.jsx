import React, { use } from "react";
import Layout from "../components/Layout";
import {Row, Col, Image } from "react-bootstrap";
import { randomAvatar } from "../utils";
import useSWR from "swr";
import { fetcher } from "../helpers/axios";
import { getUser } from "../hooks/user.actions";
import CreatePost from "../components/posts/CreatePost";
import Post from "../components/posts/Post";
import { API_VERSION } from "../config/api";




function Home () {
    const user = getUser();

    const posts = useSWR(`${API_VERSION}/post/`, fetcher, {
        refreshInterval: 10000,
    });

    if (!user) {
        return <div>Loading</div>
    }


    return (
        <Layout>
            <Row className="justify-content-evenly">
                <Col sm={7}>
                    <Row className="border rounded align-items-center p-2">
                        <Col className="flex-shrink-1">
                            <Image
                                src={randomAvatar()}
                                roundedCircle
                                width={52}
                                height={52}
                                className="my-2"
                            />
                        </Col>
                        <Col sm={10} className="flex-grow-1">
                            <CreatePost refresh={posts.mutate}/>
                        </Col>
                    </Row>
                    <Row className="my-4">
                        {posts.data?.results.map((post, index) => (
                            <Post key={index} post={post}
                                refresh={posts.mutate}  />
                        ))}
                    </Row>
                </Col>
            </Row>        
        </Layout>
    );
}

export default Home;
