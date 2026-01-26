import React, { useState, useContext } from "react";
import { Button, Modal, Form, Dropdown } from "react-bootstrap";
import axiosService from "../../helpers/axios";
import { Context } from "../Layout";
import { useAsyncError } from "react-router-dom";




function UpdateComment(props) {
    const API_VERSION = process.env.REACT_APP_API_VERSION;
    const { postId, comment, refresh } = props;
    const [show, setShow] = useState(false)
    const [validated, setValidated] = useState(false);
    const [form, setForm] = useState({
        body: comment.body,
    });

    const { setToaster } = useContext(Context);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const handleSubmit = (event) => {
        // handle the modification of a comment
        event.preventDefault();
        const updateCommentForm = event.currentTarget;

        if (updateCommentForm.checkValidity() === false) {
            event.stopPropagation();
        }

        setValidated(true);

        const data = {
            body: form.body,
        };

        axiosService
            .put(`${API_VERSION}/post/${postId}/comment/${comment.id}/`, data)
            .then(() => {
                handleClose();
                setToaster({
                    type: "success",
                    message: "Comment updated 🚀",
                    show: true,
                    title: "Success!",
                });
                refresh();
            })
            .catch(() => {
                setToaster({
                    type: "danger",
                    massage: "An error occurred.",
                    show: true,
                    title: "Comment Error",
                });
            });
    };


    return (
        <>
            <Dropdown.Item onClick={handleShow}>Modify</Dropdown.Item>
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton className="border-0">
                    <Modal.Title>Update Post</Modal.Title>
                </Modal.Header>
                <Modal.Body className="border-0">
                    <Form noValidate validated={validated} onSubmit={handleSubmit}>
                        <Form.Group className="mb-3">
                            <Form.Control
                                name="body"
                                value={form.body}
                                onChange={(e) => setForm({...form, body: e.target.value})}
                                as="textarea"
                                rows={3}
                            />
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="primary" onClick={handleSubmit}>
                        Modify
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}


export default UpdateComment;