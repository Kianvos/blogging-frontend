import {useEffect, useState} from "react";
import {useNavigate, useParams} from "react-router-dom";
import './post.css';
import {PostApi} from "../../../../helper/api/post";
import {IMG} from "../../../../helper/img";
import {MdDelete} from "react-icons/md";
import TextareaAutosize from "react-textarea-autosize";
import {NotificationHandler} from "../../elements/notification/notification";

function EditPost() {
    const navigate = useNavigate()
    const {id} = useParams();
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [storyId, setStoryId] = useState();
    const [images, setImages] = useState([]);
    const [showFileInput, setShowFileInput] = useState(false);

    const [newImages, setNewImages] = useState([]);
    const [deletedImages, setDeletedImages] = useState([]);


    const updateShowFileInput = () => {
        setShowFileInput(!showFileInput);
    }

    useEffect(() => {

        PostApi.getPost(id)
            .then((response) => {
                setTitle(response.title);
                setDescription(response.description);
                setStoryId(response.story_id);
                setImages(response.images);
            })
            .catch(err => {
                if (err.response && err.response.status === 404) {
                    navigate('/404');
                } else {
                    NotificationHandler.createNotification("error", "Probeer het later opnieuw.")
                }
            });
    }, [id, navigate]);

    const deletePost = () => {
        PostApi.deletePost(id)
            .then(() => {
                NotificationHandler.createNotification("success", "Post succesvol verwijderd.")
                navigate(`/story/${storyId}`);
            })
            .catch(() => {
                NotificationHandler.createNotification("error", "Post niet verwijderd.")
            });
    }

    const deleteImage = (imageId, isNew) => {
        if (isNew) {
            setNewImages(newImages.filter(item => item.image !== imageId))
        } else {
            setImages(images.filter(item => item.id !== imageId))
            setDeletedImages((prevImage) => [...prevImage, imageId]);
        }
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
                    setNewImages((prevImage) => [...prevImage, tmp]);
                } catch (error) {
                    console.error("Er is een fout opgetreden bij het omzetten van de afbeelding:", error);
                }
            }
        }
        event.target.value = null;
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        editPost(title, description, newImages, deletedImages)
    }

    function editPost(title, description, newImg, delImg) {
        PostApi.editPost(id, title, description, newImg, delImg)
            .then(() => {
                navigate(`/story/${storyId}`);
                NotificationHandler.createNotification("success", "Post succesvol aangepast.")

            })
            .catch(() => {
                NotificationHandler.createNotification("error", "Het is niet gelukt om de post te verwijderen.")
            });
    }


    return (
        <div className={"wrapper-story"}>
            <div className="form">
                <form onSubmit={handleSubmit} className="story-post">
                    <div className={"top-story"}>
                        <input className={"title-input"} value={title} type="text" placeholder="Titel"
                               onChange={(e) => setTitle(e.target.value)}/>
                        <MdDelete className={"icon-delete"} onClick={deletePost} fontSize={36}/>
                    </div>
                    <TextareaAutosize value={description} className={"story-text-area"}
                                      placeholder={"Kort vertellen over de dag."}
                                      onChange={(e) => setDescription(e.target.value)}
                                      minRows={5}/>
                    {showFileInput ?
                        <button className={"update-image-button"} type={"button"} onClick={updateShowFileInput}>
                            Verklein
                        </button>
                        :
                        <button className={"update-image-button"} type={"button"} onClick={updateShowFileInput}>
                            Update images
                        </button>
                    }
                    {showFileInput && (
                        <div>
                            <input multiple="multiple" type="file" accept="image/*" onChange={handleImageSelect}/>
                            <div className={"post-images"}>
                                {
                                    newImages.map((image, index) => (
                                        <button key={index} className={"image-remove-button"} type={"button"}
                                                onClick={() => deleteImage(image.image, true)}><img
                                            className={"post-image"} src={"data:image/jpeg;base64," + image.image}
                                            alt={`${title}-${index}`}/></button>
                                    ))
                                }
                                {images.map((image, index) => (
                                    <button key={index} className={"image-remove-button"} type={"button"}
                                            onClick={() => deleteImage(image.id, false)}><img
                                        className={"post-image"} src={image.image}
                                        alt={`${title}-${index}`}/></button>
                                ))}
                            </div>
                        </div>
                    )}

                    <button className={"form-button"}>Update post</button>
                </form>
            </div>
        </div>

    );
}

export default EditPost;
