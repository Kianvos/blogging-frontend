import {useState} from "react";
import {StoryApi} from "../../../../helper/api/story";
import {useNavigate} from "react-router-dom";
import {IMG} from "../../../../helper/img";
import TextareaAutosize from 'react-textarea-autosize';
import {NotificationHandler} from "../../elements/notification/notification";


function NewStory() {
    const navigate = useNavigate()

    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [image, setImage] = useState("");
    const [imageSelected, setImageSelected] = useState(false);


    const handleImageSelect = async event => {
        const file = event.target.files[0];
        if (file) {
            try {
                let base64String = await IMG.resizeFile(file);
                base64String = base64String.replace("data:image/jpeg;base64,", "");
                setImage(base64String)
                setImageSelected(true);
            } catch (error) {
                NotificationHandler.createNotification("Error", "Er is een fout opgetreden bij het omzetten van de afbeelding!")
            }
        }
    }

    const handleImageUpdate = () => {
        setImage("");
        setImageSelected(false)
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        const descriptionEnter = description.replace(/\r\n/g, '\\n');

        createStory(title, descriptionEnter, image)
    }

    function createStory(title, description, img) {
        StoryApi.createStory(title, description, img)
            .then((response) => {
                const id = response.id;
                navigate(`/story/${id}`);
                NotificationHandler.createNotification("success", "Nieuwe story is aangemaakt!")
            })
            .catch(() => {
                NotificationHandler.createNotification("error", "Er is iets fout gegaan, probeer later opnieuw.")
            });
    }


    return (
        <div className={"wrapper-story"}>
            <div className="form">
                <h1>Nieuwe story</h1>
                <form onSubmit={handleSubmit} className="story-form">
                    <input type="text" placeholder="Titel" onChange={(e) => setTitle(e.target.value)}/>
                    <TextareaAutosize className={"story-text-area"} placeholder={"Kort vertellen over de blog."}
                                      onChange={(e) => setDescription(e.target.value)}
                                      minRows={5}/>
                    {imageSelected ?
                        <div className={"story-image-container"}>
                            <img className={"story-image"} src={"data:image/jpeg;base64,"+image} alt={"gekozen foto"}/>
                            <button className={"update-image-button"} type={"button"} onClick={handleImageUpdate} >Foto aanpassen</button>
                        </div>
                        :
                        <input type="file" accept="image/*" onChange={handleImageSelect}/>
                    }
                    <button className={"form-button"}>Maak story aan</button>
                </form>
            </div>
        </div>

    );
}

export default NewStory;
