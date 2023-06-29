import React, {useEffect, useState} from 'react';
import './post.css';
import {StoryApi} from "../../../../helper/api/story";
import {useParams} from "react-router-dom";
import {useNavigate} from "react-router-dom";
import Story from "./post";

import "react-image-gallery/styles/css/image-gallery.css";

const Posts = () => {
    const navigate = useNavigate();
    const {id} = useParams();
    const [postList, setPostList] = useState([]);
    const [storyInfo, setStoryInfo] = useState([]);

    useEffect(() => {
        StoryApi.getStory(id)
            .then((story) => {
                setPostList(story.posts);
                setStoryInfo(story);
            })
            .catch((error) => {
                if (error.response && error.response.status === 404) {
                    navigate('/404');
                } else {
                    console.error(error);
                }
            })
            .finally(() => {
            });
    }, [id, navigate]);

    return (
        <div className={"container"}>
            <div>
                <h1>{storyInfo.title}</h1>
                <button onClick={() => navigate(`/post/new/${id}`)}>Maak post</button>
            </div>
            <p>{storyInfo.description}</p>

            {
                postList.map((post, index) => (
                    <Story key={post.id} title={post.title} description={post.description} user={storyInfo.user_id} images={post.images} created={post.created_at}></Story>

                ))
            }
        </div>
    );
}

export default Posts;