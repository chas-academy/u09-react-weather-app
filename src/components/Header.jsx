import React from 'react';

const Header = props => {
    return (
        <article>
            <header className = "text-center">
                <h1>Weather App</h1>
                <h2>Stockholm, Sweden</h2>
                <p>5 days forecast</p>
            </header>
        </article>
    );
}

export default Header;