import React  from 'react';

const Header = props => {
    
    return (
        <article>
            <header className="text-center col-mg-6">
                <h1 className="display-3">Weather App</h1>
                <div>
                    <div className="container col-md-6 mb-3">
                        <input className="col-md-6" type="text" placeholder="Search Location" onChange={e => props.changeRegion(e.target.value)} />
                    </div>
                </div>
                <div className="btn-container">
                    <button className="btn btn-info mr-2" onClick={(e) => props.unitChanger(e)} value="metric">Celcius</button>
                    <button className="btn btn-info " onClick={(e) => props.unitChanger(e)} value="imperial">Fahrenheit</button>
                </div>
            </header>
        </article>
    );
}


export default Header;