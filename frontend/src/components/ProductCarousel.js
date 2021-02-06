import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { Carousel } from "react-bootstrap";
import { Loader } from "./Loader";
import { Message } from "./Message";
import { listTopProducts } from "../actions/productActions.js";

export const ProductCarousel = () => {
  const dispatch = useDispatch();

  const productTopRated = useSelector((state) => state.productTopRated);
  const { loading, error, products } = productTopRated;

  useEffect(() => {
    dispatch(listTopProducts());
  }, [dispatch]);

  return loading ? (
    <Loader />
  ) : error ? (
    <Message variant="danger">{error}</Message>
  ) : (
    <Carousel pause="hover" className="bg-light animate__animated animate__fadeIn">
      {products.map((product) => (
        <Carousel.Item
          style={{
            // backgroundImage: `url(${product.picture_url})`,
            backgroundImage: `url(/images/apple2.jpg)`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            height: "80vh",
          }}
          key={product._id}
        >
          <Link to={`/product/${product._id}`}>
            <Carousel.Caption className="carousel-caption">
              <h2>
                {product.title} ($ {product.unit_price})
              </h2>
            </Carousel.Caption>
          </Link>
        </Carousel.Item>
      ))}
    </Carousel>
    // <Carousel pause="hover" className="bg-dark">
    //   {products.map((product) => (
    //     <Carousel.Item key={product._id}>
    //       <Link to={`/product/${product._id}`}>
    //         <Image
    //           src={product.picture_url}
    //           classNameName="d-block w-100"
    //           alt={product.name}
    //           fluid
    //         />
    //         <Carousel.Caption classNameName="carousel-caption">
    //           <h2>
    //             {product.title} ($ {product.unit_price})
    //           </h2>
    //         </Carousel.Caption>
    //       </Link>
    //     </Carousel.Item>
    //   ))}
    // </Carousel>
  );
};
