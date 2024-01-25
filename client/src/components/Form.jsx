import Axios from 'axios';
import { useState } from "react";

import GeneratedLinkComponent from './GeneratedLinkComponent';

function Form(){
    const [original_url, setOriginal_url] = useState('');

    const shortenLink = () => {
        Axios.post('http://localhost:6969/shortener', {
            original_url: original_url
        }).then(() => {
            alert('Success!');
            setOriginal_url('');
        });

        
    };

    return(
        <>
            <div className="input-section">
        
            <label htmlFor="url">Enter your original url</label><br />
            <input type="text" value={original_url} onChange={(event) => { setOriginal_url(event.target.value) }} /> <br />

            <button onClick={shortenLink}>Shorten</button>

            <GeneratedLinkComponent original_url={original_url} />

        </div>
        </>
    )
};

export default Form;