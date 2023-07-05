import {useState} from "react";
import {useNavigate, useParams} from "react-router-dom";
import {IMG} from "../../../../helper/img";
import {PostApi} from "../../../../helper/api/post";
import {NotificationHandler} from "../../elements/notification/notification";


function NewPost() {
    const navigate = useNavigate()
    const {storyId} = useParams();

    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [image, setImage] = useState([]);

    const [error, setError] = useState(false);


    const handleImageSelect = async (event) => {
        let i = 0;
        for (const file of event.target.files) {
            i++;
            if (file) {
                try {
                    let base64String = await IMG.resizeFile(file);
                    base64String = base64String.replace("data:image/jpeg;base64,", "");
                    const tmp = {
                        description: `image ${i}`,
                        image: base64String,
                    };
                    setImage((prevImage) => [...prevImage, tmp]);
                } catch (error) {
                    NotificationHandler.createNotification("Error", "Er is een fout opgetreden bij het omzetten van de afbeelding!")
                }
            }
        }
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        createPost(title, description, image)
    }

    function createPost(title, description, img) {
        PostApi.createPost(storyId, title, description, img)
            .then(() => {
                navigate(`/story/${storyId}`);
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
                <h1>Nieuwe post</h1>
                <form onSubmit={handleSubmit} className="story-form">
                    <input type="text" placeholder="Titel" onChange={(e) => setTitle(e.target.value)}/>
                    <textarea placeholder="Kort vertellen over de blog."
                              onChange={(e) => setDescription(e.target.value)}/>
                    <input multiple="multiple" type="file" accept="image/*" onChange={handleImageSelect}/>
                    <button className={"form-button"}>Maak post aan</button>
                </form>
            </div>
        </div>

    );
}

export default NewPost;
