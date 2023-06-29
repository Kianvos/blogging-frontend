import React, {useEffect, useState} from 'react';
import './post.css';
import {StoryApi} from "../../../../helper/api/story";
import {useParams} from "react-router-dom";
import {useNavigate} from "react-router-dom";

const Posts = () => {
    const navigate = useNavigate();
    const {id} = useParams();
    const [postList, setPostList] = useState([]);
    const [storyInfo, setStoryInfo] = useState([]);

    useEffect(() => {
        StoryApi.getStory(id)
            .then((story) => {
                setPostList(story.posts);
                setStoryInfo(story)
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
                <button>Maak post</button>
            </div>
            {
                postList.map((post, index) => (
                    <p key={post.id}>{post.description}</p>
                    // <Story key={story.id} title={story.title} description={story.description} user={story.user} image={story.image}/>
                ))
            }
        </div>
    );
}

export default Posts;