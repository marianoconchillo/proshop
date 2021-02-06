import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { Row, Col } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { listProducts } from "../../actions/productActions";
import { Loader } from "../Loader";
import { Message } from "../Message";
import { Meta } from "../Meta";
import { Paginate } from "../Paginate";
import { Product } from "../Product";
import { ProductCarousel } from "../ProductCarousel";

export const HomeScreen = ({ match }) => {
  const keyword = match.params.keyword;

  const pageNumber = match.params.pageNumber || 1;

  const dispatch = useDispatch();

  const productList = useSelector((state) => state.productList);
  const { loading, error, products, pages, page } = productList;

  useEffect(() => {
    dispatch(listProducts(keyword, pageNumber));
  }, [dispatch, keyword, pageNumber]);

  return (
    <>
      <Meta />
      {!keyword ? (
        <ProductCarousel />
      ) : (
        <Link className="btn btn-dark my-3" to="/">
          Go Back
        </Link>
      )}
      {keyword ? <h1 className="tex-center">Results for "{`${keyword}`}"</h1> : (
        <h1 className="text-center">Latest Products</h1>
      )}
      <hr />
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">{error}</Message>
      ) : (
        <>
          <Row>
            {products.map((product) => (
              <Col xs={6} sm={6} md={4} lg={3} xl={3} key={product._id}>
                <Product product={product} />
              </Col>
            ))}
          </Row>
          <Paginate
            pages={pages}
            page={page}
            keyword={keyword ? keyword : ""}
          />
        </>
      )}
    </>
  );
};
