import React, {useEffect, useState} from 'react';
import './post.css';
import {StoryApi} from "../../../../api/story";
import {useParams} from "react-router-dom";

const Posts = () => {
    const {id} = useParams();
    const [isLoading, setLoading] = useState(true);
    const [postList, setPostList] = useState([]);
    const [storyInfo, setStoryInfo] = useState([]);

    useEffect(() => {
        console.log(id + "TEST");
        StoryApi.getStory(id)
            .then((story) => {
                setPostList(story.posts);
                setStoryInfo(story)
                console.log(story.posts)
            })
            .finally(() => {
                setLoading(false);
            });
    }, [id]);

    return (
        <div className={"container"}>
            <h1>{storyInfo.title}</h1>
            {
                postList.map((post, index) => (
                    <p>{post.description}</p>
                    // <Story key={story.id} title={story.title} description={story.description} user={story.user} image={story.image}/>
                ))
            }
        </div>
    );
}

export default Posts;