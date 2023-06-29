import {Link} from "react-router-dom";
import {JWT} from "../../../../helper/jwt";
import {useEffect, useState} from "react";

const Story = (props) => {
    const title = props.title;
    const description = props.description;
    const image = props.image;
    const user = props.user;

    const [isOwner, setOwner] = useState(false);

    useEffect(() => {
        const token = JWT.decodeToken();
        setOwner(token.sub == user.id);
    }, [user.id]);

    return (
        <div className={"story"}>
            <p>{title}</p>
            <p>{description}</p>
            <p>{user.first_name} {user.last_name}</p>
            <img className={"story-image"} src={`data:image/jpeg;base64,${image}`}
                 alt={`Foto die bij ${title} hoort.`}/>
            <div>
                <Link to={`/story/${props.id}`}>Naar posts</Link>
                {
                    isOwner ? <div>
                        <Link to={`/story/edit/${props.id}`}>Edit story</Link>
                    </div> : null
                }
            </div>

        </div>
    );
}

export default Story;
