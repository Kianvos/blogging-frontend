import {useState} from "react";
import {StoryApi} from "../../../../helper/api/story";
import {useNavigate} from "react-router-dom";
import {IMG} from "../../../../helper/img";


function NewStory() {
    const navigate = useNavigate()

    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [image, setImage] = useState("");

    const [error, setError] = useState(false);

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
        createStory(title, description, image)
    }

    function createStory(title, description, img) {
        // console.log("title: " + title);
        // console.log("img: " + img);
        StoryApi.createStory(title, description, img)
            .then((response) => {
                const id = response.id;
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
                    <input type="text" placeholder="Titel" onChange={(e) => setTitle(e.target.value)}/>
                    <textarea placeholder="Kort vertellen over de blog."
                              onChange={(e) => setDescription(e.target.value)}/>
                    <input type="file" accept="image/*" onChange={handleImageSelect}/>
                    <button className={"form-button"}>Maak story aan</button>
                </form>
            </div>
        </div>

    );
}

export default NewStory;
