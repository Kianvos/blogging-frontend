import {useEffect, useState} from "react";
import {StoryApi} from "../../../../helper/api/story";
import {useNavigate, useParams} from "react-router-dom";
import {IMG} from "../../../../helper/img";
import './story.css';
import {NotificationHandler} from "../../elements/notification/notification";
import {MdDelete} from "react-icons/md";
import TextareaAutosize from "react-textarea-autosize";

function EditStory() {
    const navigate = useNavigate()
    const {id} = useParams();
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [image, setImage] = useState("");
    const [newImage, setNewImage] = useState("none");
    const [showFileInput, setShowFileInput] = useState(false);
    const [newImageSelected, setNewImageSelected] = useState(false);

    useEffect(() => {
        getStory(id)

    }, [id]);

    const getStory = (id) => {
        StoryApi.getStory(id)
            .then((response) => {
                setTitle(response.title);
                setDescription(response.description.replace(/\\n/g, '\n'));
                setImage(response.image);
            })
            .catch(() => {
                NotificationHandler.createNotification("error", "Story niet gevonden.")
            });
    }

    const deleteStory = () => {
        StoryApi.deleteStory(id)
            .then(() => {
                NotificationHandler.createNotification("success", "Story is verwijderd.")
                navigate('/');
            })
            .catch(err => {
                NotificationHandler.createNotification("error", "Story kon niet verwijderd worden, probeer het later opnieuw.")
            });
    }

    const handleImageSelect = async event => {
        const file = event.target.files[0];
        if (file) {
            try {
                let base64String = await IMG.resizeFile(file);
                base64String = base64String.replace("data:image/jpeg;base64,", "");
                setNewImage(base64String);
                setNewImageSelected(true);
                setShowFileInput(false);
            } catch (error) {
                NotificationHandler.createNotification("Error", "Er is een fout opgetreden bij het omzetten van de afbeelding!")
            }
        }
    }

    const handleImageUpdate = () => {
        setImage("");
        setShowFileInput(true)
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        const descriptionEnter = description.replace(/\r?\n/g, '\\n');

        editStory(title, descriptionEnter, newImage)
    }

    function editStory(title, description, img) {
        StoryApi.editStory(id, title, description, img)
            .then(() => {
                NotificationHandler.createNotification("success", "Story is succesvol aangepast.")
                navigate(`/story/${id}`);
            })
            .catch(() => {
                NotificationHandler.createNotification("Error", "Veranderingen aan story zijn niet opgeslagen.")
            });
    }


    return (
        <div className={"wrapper-story"}>
            <div className="form">

                <form onSubmit={handleSubmit} className="story-post">
                    <div className={"top-story"}>
                        <input className={"title-input"} value={title} type="text" placeholder="Titel" onChange={(e) => setTitle(e.target.value)}/>
                        <MdDelete className={"icon-delete"} onClick={deleteStory} fontSize={36}/>
                    </div>

                    <TextareaAutosize value={description} className={"story-text-area"} placeholder={"Kort vertellen over de blog."}
                                      onChange={(e) => setDescription(e.target.value)}
                                      minRows={5}/>
                    {showFileInput ?
                        <input type="file" accept="image/*" onChange={handleImageSelect} />
                        :
                        <div className={"story-image-container"}>
                            {newImageSelected ?
                                <img className={"story-image"} src={"data:image/jpeg;base64," + newImage} alt={"gekozen foto"}/>
                                :
                                <img className={"story-image"} src={image} alt={"gekozen foto"}/>

                            }
                            <button className={"update-image-button"} type={"button"} onClick={handleImageUpdate}>Verander foto</button>
                        </div>
                    }
                    <button className={"form-button"}>UpdateStory</button>
                </form>
            </div>
        </div>

    );
}

export default EditStory;
