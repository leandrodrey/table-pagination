import {FC, useState} from 'react';
import Loader from "./Loader.tsx";

interface ImageProps {
    src: string;
    alt: string;
}

const Image: FC<ImageProps> = ({src, alt}) => {
    const [isLoading, setIsLoading] = useState(true);
    const [hasError, setHasError] = useState(false);

    const handleLoad = () => {
        setIsLoading(false);
    };

    const handleError = () => {
        setIsLoading(false);
        setHasError(true);
    };

    return (
        <div role="img" aria-label={alt} aria-busy={isLoading}>
            {isLoading && <div className="loading"><Loader/></div>}
            {hasError && <div className="error">Error al cargar la imagen</div>}
            <img
                src={src}
                alt={alt}
                onLoad={handleLoad}
                onError={handleError}
                style={{display: isLoading || hasError ? 'none' : 'block'}}
            />
        </div>
    );
};

export default Image;
