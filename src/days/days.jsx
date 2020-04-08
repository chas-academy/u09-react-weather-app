import React from 'react';

const Days = props => {
    return (
        <article className="card text-left col-sm-2 border-0">
            <h1 className="text-center">Day</h1>
            <h2 className="text-center">Temperature 30C</h2>
            <p>First hour Temp</p>
            <p>Second hour Temp</p>
            <p>Third hour Temp</p>
            <p>Wind force</p>
            <p>Humidity</p>
            <p>Sunrise</p>
            <p>Sunset</p>
        </article>
    );
}

export default Days;