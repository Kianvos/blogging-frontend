import {useState} from "react";
import {useNavigate, useParams} from "react-router-dom";
import {IMG} from "../../../../helper/img";
import {PostApi} from "../../../../helper/api/post";
import {NotificationHandler} from "../../elements/notification/notification";
import TextareaAutosize from "react-textarea-autosize";


function NewPost() {
    const navigate = useNavigate()
    const {storyId} = useParams();

    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [images, setImages] = useState([]);

    const [showState, setState] = useState(false);


    const updateState = () => {
        setState(!showState);
    }

    const deleteImage = (image) => {
        setImages(images.filter(item => item.image !== image))

    }

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
                    setImages((prevImage) => [...prevImage, tmp]);
                } catch (error) {
                    NotificationHandler.createNotification("Error", "Er is een fout opgetreden bij het omzetten van de afbeelding!")
                }
            }
        }
        setState(true);
        event.target.value = null;
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        createPost(title, description, images)
    }

    function createPost(title, description, img) {
        PostApi.createPost(storyId, title, description, img)
            .then(() => {
                NotificationHandler.createNotification("success", "Post is aangemaakt!")
                navigate(`/story/${storyId}`);
            })
            .catch(() => {
                NotificationHandler.createNotification("error", "Het is helaas niet gelukt om de post aan te maken.")
            });
    }


    return (
        <div className={"wrapper-story"}>
            <div className="form">
                <h1>Nieuwe post</h1>
                <form onSubmit={handleSubmit} className="story-form">
                    <input type="text" placeholder="Titel" onChange={(e) => setTitle(e.target.value)}/>
                    <TextareaAutosize className={"story-text-area"} placeholder={"Kort vertellen over de blog."}
                                      onChange={(e) => setDescription(e.target.value)}
                                      minRows={5}/>
                    {images.length === 0 ?
                        <input multiple="multiple" type="file" accept="image/*" onChange={handleImageSelect}/>
                        :
                        showState ?
                            <>
                                <button className={"update-image-button"} type={"button"} onClick={updateState}>
                                    Verklein
                                </button>
                                <input multiple="multiple" type="file" accept="image/*" onChange={handleImageSelect}/>
                                <div className={"post-images"}>
                                    {
                                        // images.map((image, index) => (
                                        //     <button key={index} className={"image-remove-button"} type={"button"}
                                        //             onClick={() => deleteImage(image.image)}><img
                                        //         className={"post-image"} src={"data:image/jpeg;base64," + image.image}
                                        //         alt={`${title}-${index}`}/></button>
                                        // ))
                                    }
                                </div>
                            </>
                            :
                            <button className={"update-image-button"} type={"button"} onClick={updateState}>
                                Update images
                            </button>
                    }
                    <button className={"form-button"}>Maak post aan</button>
                </form>
            </div>
        </div>
    );
}

export default NewPost;
