import {Link} from "react-router-dom";

const Story = (props) => {
    const title = props.title;
    const description = props.description;
    const image = props.image;
    const user = props.user;
    return (
        <div className={"story"}>
            <p>{title}</p>
            <p>{description}</p>
            <p>{user.first_name} {user.last_name}</p>
            <img className={"story-image"} src={`data:image/jpeg;base64,${image}`}
                 alt={`Foto die bij ${title} hoort.`}/>
            <Link to={`/story/${props.id}`}>Naar posts</Link>
        </div>
    );
}

export default Story;
