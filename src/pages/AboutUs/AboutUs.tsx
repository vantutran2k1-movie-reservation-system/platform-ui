import "./AboutUs.css";

export default function AboutUs() {
    return (
        <div className="about-us-container">
            <header className="about-us-header">
                <h1>About Us</h1>
                <p>Discover the easiest way to book your favorite movies online.</p>
            </header>

            <section className="about-us-section">
                <div className="about-us-mission">
                    <h2>Our Mission</h2>
                    <p>
                        At MovieHub, we aim to provide a seamless and user-friendly platform for movie enthusiasts to
                        explore, book, and enjoy the best cinematic experiences. Whether it’s the latest blockbuster or
                        a timeless classic, we make movie booking convenient and exciting.
                    </p>
                </div>

                <div className="about-us-features">
                    <h2>Why Choose Us?</h2>
                    <ul>
                        <li>🎥 Easy-to-use platform for booking movie tickets.</li>
                        <li>📅 Advanced seat selection and scheduling features.</li>
                        <li>💳 Multiple payment options for a hassle-free experience.</li>
                        <li>⭐ Exclusive offers, discounts, and memberships.</li>
                    </ul>
                </div>

                <div className="about-us-contact">
                    <h2>Contact Us</h2>
                    <p>
                        Have questions or need assistance? We’re here to help! Reach out to us via:
                    </p>
                    <ul>
                        <li>Email: support@moviehub.com</li>
                        <li>Phone: +1 (555) 123-4567</li>
                        <li>Follow us on social media:
                            <a href="https://facebook.com" target="_blank"
                               rel="noopener noreferrer"> Facebook</a>,
                            <a href="https://twitter.com" target="_blank"
                               rel="noopener noreferrer"> Twitter</a>,
                            <a href="https://instagram.com" target="_blank"
                               rel="noopener noreferrer"> Instagram</a>
                        </li>
                    </ul>
                </div>
            </section>

            <footer className="about-us-footer">
                <p>&copy; {new Date().getFullYear()} MovieHub. All rights reserved.</p>
            </footer>
        </div>
    );
};

