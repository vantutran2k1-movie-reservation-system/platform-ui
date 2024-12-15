import "./QuickAction.css";

type QuickActionProps = {
    iconPath: string,
    content: string,
    style?: object
}

export default function QuickAction(props: QuickActionProps) {
    function handleClick() {
        console.log("clicked");
    }

    return (
        <>
            <button id="action-btn" style={props.style} onClick={handleClick}>
                <img src={props.iconPath} alt="action-icon" className="action-icon"/>
                <span className="action-content">{props.content}</span>
            </button>
        </>
    );
}