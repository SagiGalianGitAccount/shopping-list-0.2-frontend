import React, { Component } from 'react';

function Home() {
    return (
        <div className='home-container'>
            <h1>רוצה ליצור רשימה חדשה ? <a href='/register'>לחץ כאן</a></h1>
            <h1>יש לך רשימה ?<a href='/signin'>לחץ כאן</a></h1>
        </div>
    );
}

export default Home;