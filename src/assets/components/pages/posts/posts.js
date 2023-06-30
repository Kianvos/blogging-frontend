import React, {useEffect, useState} from 'react';
import {StoryApi} from "../../../../helper/api/story";
import {useParams} from "react-router-dom";
import {useNavigate} from "react-router-dom";

import "react-image-gallery/styles/css/image-gallery.css";
import Post from "./post";

import './post.css';
import InfiniteScroll from "react-infinite-scroll-component";


const Posts = () => {
    const navigate = useNavigate();
    const {id} = useParams();
    const [postList, setPostList] = useState([]);
    const [storyInfo, setStoryInfo] = useState([]);
    const [alineas, setAlineas] = useState([]);

    const [posts, setPosts] = useState([]);
    const [postsLoaded, setPostsLoaded] = useState(0);

    const [hasMore, setHasMore] = useState(true);

    useEffect(() => {
        StoryApi.getStory(id)
            .then((story) => {
                setPostList(story.posts);
                setStoryInfo(story);
                setPosts(story.posts.slice(0, 2))
                setPostsLoaded(2);
                setAlineas(story.description.split('\\n'))

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

    const fetchMoreData = () => {
        setPosts(postList.slice(0, postsLoaded+2));
        setPostsLoaded(postsLoaded+2);
        if (postsLoaded >= postList.length){
            setHasMore(false);
        }
    };

    return (
        <div className={"container"}>
            <div>
                <h1>{storyInfo.title}</h1>
                <button onClick={() => navigate(`/post/new/${id}`)}>Maak post</button>
            </div>
            {
                alineas.map((alinea, index) => (
                    <p key={index} className={"story-description"}>{alinea}</p>
                ))
            }
            <InfiniteScroll
                dataLength={posts.length}
                next={fetchMoreData}
                hasMore={hasMore}
                loader={<h4>Laden...</h4>}
            >
                {
                    posts.map((post, index) => (
                        <Post key={index} id={post.id} title={post.title} description={post.description} user={storyInfo.user_id} images={post.images} created={post.created_at}></Post>
                    ))
                }
            </InfiniteScroll>
        </div>
    );
}

export default Posts;