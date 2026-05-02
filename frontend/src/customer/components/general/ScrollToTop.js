import {useEffect, useState} from "react";
import "../../assets/css/scroll-to-top.css"

const ScrollToTop = () => {
    const [isVisible, setIsVisible] = useState(false);

    const toggleVisibility = () => {
        if (window.pageYOffset > 500) {
            setIsVisible(true);
        } else {
            setIsVisible(false);
        }
    };

    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });
    };

    useEffect(() => {
        window.addEventListener('scroll', toggleVisibility);
        return () => {
            window.removeEventListener('scroll', toggleVisibility);
        };
    }, []);

    return (
        <>
            {isVisible && (
                <div className="scroll-to-top" onClick={scrollToTop}>
                    <i className="fa fa-angle-up"></i>
                </div>)
            }
        </>
    )
}

export default ScrollToTop;