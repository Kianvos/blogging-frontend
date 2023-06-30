import {useNavigate} from "react-router-dom";
import {JWT} from "../../../../helper/jwt";
import {useEffect, useState} from "react";
import {FaEdit} from "react-icons/fa";

const Story = (props) => {
    const navigate = useNavigate();

    const title = props.title;
    const description = props.description;
    const image = props.image;
    const user = props.user;

    const [isOwner, setOwner] = useState(false);
    const [alineas, setAlineas] = useState([]);

    useEffect(() => {
        const token = JWT.decodeToken();
        setOwner(parseInt(token.sub) === user.id);
        setAlineas(description.split('\\n'))
    }, [description, user.id]);

    const handleEdit = () => {
        navigate(`/story/edit/${props.id}`);
    }


    return (
        <div className={"story"}>
            <h2 className={"text-center story-title"}>{title}</h2>
            <div className={"top-story"}>
                <p className={"name"}>Geschreven door: {user.first_name} {user.last_name}</p>
                {
                    isOwner ? <div className={"edit-icon"}>
                        <FaEdit className={"icon"} onClick={handleEdit} fontSize={24}/>
                    </div> : null
                }
            </div>

            <img className={"story-image"} src={image}
                 alt={`Foto die bij ${title} hoort.`}/>
            {
                alineas.map((alinea, index) => (
                    <p key={index} className={"story-description"}>{alinea}</p>
                ))
            }

            <button type={"button"} className={"story-button"} onClick={() => navigate(`/story/${props.id}`)}>Naar
                story
            </button>
        </div>
    );
}

export default Story;
