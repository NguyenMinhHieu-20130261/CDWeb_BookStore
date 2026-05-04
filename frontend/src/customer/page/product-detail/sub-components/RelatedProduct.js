const RelatedProducts = () => {
    // const [relatedProducts, setRelatedProducts] = useState([]);
    return (
        <section className="related products space-bottom-3">
            <div className="container">
                <header className="mb-5 d-md-flex justify-content-between align-items-center">
                    <h2 className="font-size-5 mb-3 mb-md-0">Sản phẩm liên quan</h2>
                </header>
                <div className="products-carousel-wrap related-product-carousel" data-ride="bk-slick-carousel"
                     data-wrap=".products"
                     data-slick="{&quot;slidesToShow&quot;:5,&quot;slidesToScroll&quot;:1,&quot;infinite&quot;:false,&quot;autoplay&quot;:false,&quot;arrows&quot;:true,&quot;dots&quot;:false,&quot;responsive&quot;:[{&quot;breakpoint&quot;:554,&quot;settings&quot;:{&quot;slidesToShow&quot;:2,&quot;slidesToScroll&quot;:1}},{&quot;breakpoint&quot;:992,&quot;settings&quot;:{&quot;slidesToShow&quot;:2,&quot;slidesToScroll&quot;:1}},{&quot;breakpoint&quot;:1199,&quot;settings&quot;:{&quot;slidesToShow&quot;:3,&quot;slidesToScroll&quot;:2}},{&quot;breakpoint&quot;:1500,&quot;settings&quot;:{&quot;slidesToShow&quot;:4,&quot;slidesToScroll&quot;:2}}]}">
                    <ul className="products list-unstyled row no-gutters row-cols-2 row-cols-lg-5 row-cols-wd-5 border-top border-left mb-6">
                        {/* {relatedProducts.map(product => (<Product key={product.id} info={product}/>))} */}
                    </ul>
                </div>
            </div>
        </section>
    )
}
export default RelatedProducts;