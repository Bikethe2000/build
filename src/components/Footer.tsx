import { faInstagram, faTiktok } from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export const Footer = () => {
    return(
        <footer>
        <div className="container footer-container" style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <p>© 2025 PrintXcelerate. All rights reserved.</p>
            <div className="social-icons" style={{ display: "flex", gap: "20px" }}>
            <a href="https://instagram.com/printxcelerate" target="_blank" rel="noopener noreferrer" aria-label="Instagram" style={{ color: "#E1306C" }}>
                <FontAwesomeIcon icon={faInstagram} size="2x" />
            </a>
            <a href="https://tiktok.com/@printxcelerate" target="_blank" rel="noopener noreferrer" aria-label="TikTok" style={{ color: "#000000" }}>
                <FontAwesomeIcon icon={faTiktok} size="2x" />
            </a>
            </div>
        </div>
        </footer>
    )
}