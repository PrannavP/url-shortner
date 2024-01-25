import axios from 'axios';
import { useState } from 'react';

function GeneratedLinkComponent({ original_url }){

    const [shortenedUrl, setShortenedUrl] = useState("");

    const getShortUrl = () => {
        axios.get('http://localhost:6969/', {
            "original_url": original_url
        }).then((response) => {
            setShortenedUrl(response.data);
        });
    };

    return(
        <>
            <br /><button onClick={getShortUrl}>Get Short URL</button>
        </>
    )
};

export default GeneratedLinkComponent;