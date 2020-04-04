import React from 'react';

const Header = props => {
    return (
        <article>
            <header className = "text-center">
                <h1>Weather App</h1>
                <div className="btn-container">
                    <button>Celcius</button>
                    <button>Fahrenheit</button>
                </div>
            </header>
        </article>
    );
}

export default Header;