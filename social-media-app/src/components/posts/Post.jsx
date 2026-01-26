import React, { useState } from "react";
import { format } from "timeago.js";


import {
    LikeFilled,
    CommentOutlined,
    LikeOutlined,
    MoreOutlined,
    ConsoleSqlOutlined,
} from "@ant-design/icons";
import { Image, Card, Button, Modal, Form, Dropdown } from "react-bootstrap";
import Toaster from "../Toaster";
import axiosService from "../../helpers/axios";
import { API_VERSION } from "../../config/api";
import { getUser } from "../../hooks/user.actions";
import UpdatePost from "./UpdatePost";
import { Link } from "react-router-dom";



const MoreToggleIcon = React.forwardRef(({ onClick }, ref) => (
    <a
        href="#"
        ref={ref}
        onClick={(e) => {
        e.preventDefault();
        onClick(e);
        }}
    >
        <MoreOutlined />
    </a>
));



function Post(props) {
    const API_VERSION = process.env.REACT_APP_API_VERSION;
    const {post, refresh, isSinglePost } = props;
    const [ShowToast, setShowToast] = useState(false);

    const user = getUser();

    const handleLikeClick = (action) => {
        axiosService
            .post(`${API_VERSION}/post/${post.id}/${action}/`)
            .then(() => {
                refresh();
            })
            .catch((err) => console.error(err));
            
    };

    const handleDelete = () => {
        axiosService
        .delete(`${API_VERSION}/post/${post.id}/`)
        .then (() => {
            setShowToast(true);
            refresh();
        })
        .catch((err) => console.error(err))
    };


    return (
        <>
        <Card className="rounded-3 my-4">
            {/* Add card body here */}
            <Card.Body>
                <Card.Title className="d-flex flex-row justify-content-between">
                    <div className="d-flex flex-row">
                        <Image 
                            src={user.avatar}
                            roundedCircle
                            width={48}
                            height={48}
                            className="me-2 border border-primary border-2"
                    />
                    <div className="d-flex flex-column justify-content-start align-self-center mt-2">
                        <p className="fs-6 m-0">
                            {post.author.name}
                        </p>
                        <p className="fs-6 fw-lighter">
                            <small>{format(post.created)}</small>
                        </p>
                    </div>
                    </div>
                    {user.name === post.author.name && (
                        <div>
                            <Dropdown>
                                <Dropdown.Toggle as={MoreToggleIcon}></Dropdown.Toggle>
                                <Dropdown.Menu>
                                    <UpdatePost post={post} refresh={refresh}/>
                                    <Dropdown.Item 
                                        onClick={handleDelete} 
                                        className="text-danger"
                                    >
                                        Delete
                                    </Dropdown.Item>
                                </Dropdown.Menu>
                            </Dropdown>
                        </div>
                    )}
                </Card.Title>
                <Card.Text>
                    {post.body}
                </Card.Text>
                <div className="d-flex flex-row">
                    <LikeFilled 
                        style={{
                            color: "#fff",
                            backgroundColor: "#0D6EFD",
                            borderRadius: "50%",
                            width: "18px",
                            height: "18px",
                            fontSize: "75%",
                            padding: "2px",
                            margin: "3px",
                        }}
                    />
                    <p className="ms-1 fs-6">
                        <small>{post.likes_count} like</small>
                    </p>
                </div>
                {/* For comment count */}
                {!isSinglePost && (
                    <p className="ms-1 fs-6">
                        <small>
                            <Link to={`/post/${post.id}/`}>
                                {post.comment_count} comments
                            </Link>
                        </small>
                    </p>
                )}

            </Card.Body>
            <Card.Footer className="d-flex bg-white w-50 justify-content-between border-0">
                <div className="d-flex flex-row">
                    <LikeOutlined 
                        style={{
                            width: "24px",
                            height: '24px',
                            padding: "2px",
                            fontSize: "20px",
                            color: post.liked ? "#0D6EFD": "#C4C4C4",
                        }}
                        onClick={() => {
                            if (post.liked) {
                                handleLikeClick("remove_like");
                            }
                            else {
                                handleLikeClick("like");
                            }
                        }}
                    />
                    <p className="ms-1">
                        <small>Like</small>
                    </p>
                </div>
                {/* Add comment icon here */}
                {!isSinglePost && (
                    <div className="d-flex flex-row">
                        <CommentOutlined 
                            style={{
                                width: "24px",
                                height: "24px",
                                padding: "2px",
                                fontSize: "20px",
                                color: "#C4C4C4",
                            }}
                        />
                        <p className="ms-1 mb-0">
                            <small>Comment</small>
                        </p>
                    </div>
                )}
            </Card.Footer>
        </Card>
        <Toaster
        title="Success!"
        message="Post deleted 🚀"
        type="danger"
        showToast={ShowToast}
        onClose={() => setShowToast(false)}
        />
    </>             
    );
}


export default Post;