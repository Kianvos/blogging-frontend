import {Link} from "react-router-dom";
import {JWT} from "../../../../helper/jwt";
import {useEffect, useState} from "react";
import ImageGallery from 'react-image-gallery';

const Post = (props) => {
    const title = props.title;
    const description = props.description;
    const images = props.images;
    const user = props.user;
    const created = props.created;

    const [isOwner, setOwner] = useState(false);
    // const [imagesGallery, setImagesGallery] = useState([]);

    useEffect(() => {
        const token = JWT.decodeToken();
        setOwner(token.sub == user);
    }, [user]);

    const getTime = (date) => {
        const dateTime = new Date(date);
        return dateTime.toLocaleString('nl-NL', {
            day: '2-digit',
            month: '2-digit',
            year: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
        });
    }

    const setupImageGallery = () => {
        const tmpImages = []
        images.forEach((item, index) => {
            const image = {
                original: `data:image/jpeg;base64,${item.image}`,
                thumbnail: `data:image/jpeg;base64,${item.image}`,
                originalHeight: 600,
                originalWidth: 600,
            }
            tmpImages.push(image);
        });
        console.log(tmpImages)
        return tmpImages
    }

    return (
        <div className={"post"}>
            <h2 className={""}>{title}</h2>
            <p>{description}</p>
            { images.length > 0 ?
                <ImageGallery items={setupImageGallery()} showThumbnails={false} showIndex={true} showPlayButton={false} showFullscreenButton={false}/>
                : null
            }
            <div>
                {
                    isOwner ? <div>
                        <Link to={`/post/edit/${props.id}`}>Edit post</Link>
                    </div> : null
                }
            </div>
            <p>Aangemaakt: {getTime(created)}</p>
        </div>
    );
}

export default Post;
