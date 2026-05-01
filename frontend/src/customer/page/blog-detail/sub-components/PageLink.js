import { Link } from "react-router-dom";

const PageLink = () => {
    return (
        <div className="page-header border-bottom">
            <div className="container">
                <div className="d-md-flex justify-content-between align-items-center py-4">
                    <nav className="woocommerce-breadcrumb font-size-2">
                        <Link className="h-primary"  to="https://bookworm.madrasthemes.com">Home</Link>
                        <span className="breadcrumb-separator mx-2">
                            <i className="fas fa-angle-right"></i>
                        </span>
                        <Link className="h-primary" to="/category/childrens-books/">Children's Books</Link>
                        <span className="breadcrumb-separator mx-2">
                            <i className="fas fa-angle-right"></i>
                        </span>
                        &#8216;American Dirt&#8217; Invites Readers into the
                        Journey of Mexican Migrants
                    </nav>
                </div>
            </div>
        </div>
    );
};

export default PageLink;