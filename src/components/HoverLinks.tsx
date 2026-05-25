import "./styles/style.css";

const HoverLinks = ({ text }: { text: string }) => {
  return (
    <div className="hover-link" data-cursor="disable">
      <div className="hover-in">
        {text} <div>{text}</div>
      </div>
    </div>
  );
};

export default HoverLinks;
