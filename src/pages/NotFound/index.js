import { useEffect } from 'react';
import NotFoundImg from '~/assets/background/404-not-found.png';

function PageNotFound() {
    useEffect(() => {
        document.body.style.overflow = 'hidden';
        return () => {
            document.body.style.overflowY = 'scroll';
        };
    }, []);
    return (
        <div className="flex justify-center ">
            <div>
                <img src={NotFoundImg} alt="" />
                <h1 className="text-center text-4xl text-white">Trang không tồn tại !!</h1>
            </div>
        </div>
    );
}

export default PageNotFound;
