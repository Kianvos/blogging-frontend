import {useEffect, useState} from "react";
import {StoryApi} from "../../../../helper/api/story";
import {useNavigate, useParams} from "react-router-dom";
import {IMG} from "../../../../helper/img";
import './story.css';
import {PostApi} from "../../../../helper/api/post";

function EditPost() {
    const navigate = useNavigate()
    const {id} = useParams();
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [image, setImage] = useState();
    const [showFileInput, setShowFileInput] = useState(false);

    const [error, setError] = useState(false);

    useEffect(() => {
        getPost(id)

    }, [id]);

    const getPost = (id) => {
        PostApi.getPost(id)
            .then((response) => {
                setTitle(response.title);
                setDescription(response.description);
                setImage(response.image);
            })
            .catch(err => {
                console.error(err);
                setError(true);
            });
    }

    // const deletePost = () => {
    //     PostApi.deletePost(id)
    //         .then((response) => {
    //             navigate('/');
    //         })
    //         .catch(err => {
    //             error.log(err);
    //             setError(true);
    //         });
    // }

    // const handleImageSelect = async event => {
    //     const file = event.target.files[0];
    //     if (file) {
    //         try {
    //             let base64String = await IMG.resizeFile(file);
    //             base64String = base64String.replace("data:image/jpeg;base64,", "");
    //             setImage(base64String)
    //         } catch (error) {
    //             console.error('Er is een fout opgetreden bij het omzetten van de afbeelding:', error);
    //         }
    //     }
    // }

    const handleSubmit = (event) => {
        event.preventDefault();
        editPost(title, description, image)
    }

    function editPost(title, description, img) {
        PostApi.editPost(id, title, description, img)
            .then((response) => {
                // console.log(response)
                navigate(`/story/${id}`);
            })
            .catch(err => {
                console.log(err.statusCode)
                setError(true);
            });
    }


    return (
        <div className={"wrapper-story"}>
            {error ?
                <div className={"error-message"}>
                    <p>Er is iets fout gegaan..</p>
                </div>
                : null
            }
            {/*<div className="form">*/}
            {/*    <form onSubmit={handleSubmit} className="story-form">*/}
            {/*        <button type="button" className="delete-button" onClick={deleteStory}>*/}
            {/*            Delete post*/}
            {/*        </button>*/}
            {/*        <input value={title} type="text" placeholder="Titel" onChange={(e) => setTitle(e.target.value)}/>*/}
            {/*        <textarea value={description} placeholder="Kort vertellen over de blog."*/}
            {/*                  onChange={(e) => setDescription(e.target.value)}/>*/}
            {/*        <button type="button" className="button" onClick={() => setShowFileInput(true)}>*/}
            {/*            Verander foto*/}
            {/*        </button>*/}
            {/*        {showFileInput && (*/}
            {/*            <input type="file" accept="image/*" onChange={handleImageSelect} />*/}
            {/*        )}*/}
            {/*        <button className={"form-button"}>UpdateStory</button>*/}
            {/*    </form>*/}
            {/*</div>*/}
        </div>

    );
}

export default EditStory;
