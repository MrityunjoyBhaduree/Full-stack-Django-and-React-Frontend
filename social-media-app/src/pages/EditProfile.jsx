import React from "react";
import { useParams } from "react-router-dom";
import useSWR from "swr";
import Layout from "../components/Layout";
import UpdateProfileForm from "../components/profile/UpdateProfileForm";
import { fetcher } from "../helpers/axios";
import { Row, Col } from "react-bootstrap";
import { API_VERSION } from "../config/api";



function EditProfile() {
    const { profileId } = useParams();
    const profile = useSWR(`${API_VERSION}/user/${profileId}/`, fetcher);


    return (
        <Layout hasNavigationBack>
            {profile.data ? (
                <Row className="justify-content-evenly">
                    <Col s={9}>
                        <UpdateProfileForm profile={profile.data} />
                    </Col>
                </Row>
            ) : (
                <div>Loading...</div>
            )}
        </Layout>
    )

}


export default EditProfile;


