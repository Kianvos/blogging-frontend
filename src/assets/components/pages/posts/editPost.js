import {useEffect, useState} from "react";
import {useNavigate, useParams} from "react-router-dom";
import './post.css';
import {PostApi} from "../../../../helper/api/post";
import {IMG} from "../../../../helper/img";

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

    const [error, setError] = useState(false);

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
                    console.error(err);
                    setError(true);
                }
            });
    }, [id, navigate]);

    const deletePost = () => {
        PostApi.deletePost(id)
            .then(() => {
                navigate(`/story/${storyId}`);
            })
            .catch(err => {
                console.error(err);
                setError(true);
            });
    }

    const deleteImage = (imageId) => {
        setDeletedImages((prevImage) => [...prevImage, imageId]);
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
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        editPost(title, description, newImages, deletedImages)
    }

    function editPost(title, description, newImg, delImg) {
        PostApi.editPost(id, title, description, newImg, delImg)
            .then(() => {
                // console.log(response)
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
                <form onSubmit={handleSubmit} className="story-form">
                    <button type="button" className="delete-button" onClick={deletePost}>
                        Delete post
                    </button>
                    <input value={title} type="text" placeholder="Titel" onChange={(e) => setTitle(e.target.value)}/>
                    <textarea value={description} placeholder="Kort vertellen over de blog."
                              onChange={(e) => setDescription(e.target.value)}/>
                    <button type="button" className="button" onClick={() => setShowFileInput(true)}>
                        Verander fotos
                    </button>
                    {showFileInput && (
                        <div>
                            <input multiple="multiple" type="file" accept="image/*" onChange={handleImageSelect}/>
                            {images.map((image, index) => (
                                <div key={index}>
                                    <img className={"story-image"} src={image.image}
                                         alt={`${title}-${index}`}/>
                                    <button type={"button"} onClick={() => deleteImage(image.id)}>X</button>
                                </div>
                            ))}
                        </div>
                    )}

                    <button className={"form-button"}>Update post</button>
                </form>
            </div>
        </div>

    );
}

export default EditPost;
