import React, {useEffect, useState} from 'react';
import Story from "../../elements/story/story";
import './story.css';
import {StoryApi} from "../../../../helper/api/story";

const Homepage = () => {

    const [storyList, setStoryList] = useState([]);

    useEffect(() => {
        StoryApi.get()
            .then((storyList) => {
                setStoryList(storyList);
            })
            .finally(() => {
            });
    }, []);


    return (
        <div className={"container"}>
            { storyList.length > 0 ?
                storyList.map((story, index) => (
                    <Story key={story.id} id={story.id} title={story.title} description={story.description} user={story.user} image={story.image}/>
                ))
                :
                <p>Er zijn nog geen stories.</p>

            }
        </div>
    );
}

export default Homepage;