import {useEffect, useState} from "react";
import {StoryApi} from "../../../../helper/api/story";
import {useNavigate, useParams} from "react-router-dom";
import {IMG} from "../../../../helper/img";
import './story.css';

function EditStory() {
    const navigate = useNavigate()
    const {id} = useParams();
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [image, setImage] = useState();
    const [showFileInput, setShowFileInput] = useState(false);

    const [error, setError] = useState(false);

    useEffect(() => {
        getStory(id)

    }, [id]);

    const getStory = (id) => {
        StoryApi.getStory(id)
            .then((response) => {
                setTitle(response.title);
                setDescription(response.description);
                setImage(response.image);
            })
            .catch(err => {
                console.log(err);
                setError(true);
            });
    }

    const deleteStory = () => {
        StoryApi.deleteStory(id)
            .then((response) => {
                navigate('/');
            })
            .catch(err => {
                console.log(err);
                setError(true);
            });
    }

    const handleImageSelect = async event => {
        const file = event.target.files[0];
        if (file) {
            try {
                let base64String = await IMG.resizeFile(file);
                base64String = base64String.replace("data:image/jpeg;base64,", "");
                setImage(base64String)
            } catch (error) {
                console.error('Er is een fout opgetreden bij het omzetten van de afbeelding:', error);
            }
        }
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        editStory(title, description, image)
    }

    function editStory(title, description, img) {
        StoryApi.editStory(id, title, description, img)
            .then((response) => {
                console.log(response)
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
            <div className="form">
                <form onSubmit={handleSubmit} className="story-form">
                    <button type="button" className="delete-button" onClick={deleteStory}>
                        Delete foto
                    </button>
                    <input value={title} type="text" placeholder="Titel" onChange={(e) => setTitle(e.target.value)}/>
                    <textarea value={description} placeholder="Kort vertellen over de blog."
                              onChange={(e) => setDescription(e.target.value)}/>
                    <button type="button" className="button" onClick={() => setShowFileInput(true)}>
                        Verander foto
                    </button>
                    {showFileInput && (
                        <input type="file" accept="image/*" onChange={handleImageSelect} />
                    )}
                    <button className={"form-button"}>UpdateStory</button>
                </form>
            </div>
        </div>

    );
}

export default EditStory;