import "./styles/TechStackMobile.css";

const techIcons = [
    { name: "React", image: "/images/react2.webp" },
    { name: "Next.js", image: "/images/next2.webp" },
    { name: "Node.js", image: "/images/node2.webp" },
    { name: "Express", image: "/images/express.webp" },
    { name: "MongoDB", image: "/images/mongo.webp" },
    { name: "MySQL", image: "/images/mysql.webp" },
    { name: "TypeScript", image: "/images/typescript.webp" },
    { name: "JavaScript", image: "/images/javascript.webp" },
];

const TechStackMobile = () => {
    return (
        <div className="techstack-mobile">
            <h2>My Techstack</h2>
            <div className="techstack-grid">
                {techIcons.map((tech, index) => (
                    <div className="techstack-item" key={index}>
                        <img src={tech.image} alt={tech.name} />
                        <span>{tech.name}</span>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default TechStackMobile;
