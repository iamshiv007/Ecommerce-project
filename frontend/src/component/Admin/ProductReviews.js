import React, { Fragment, useEffect, useState } from "react";
import { useAlert } from "react-alert";
import { useDispatch, useSelector } from "react-redux";
import { Sidebar } from "./Sidebar";
import { MetaData } from "../layout/MetaData";
import { clearErrors, deleteReview, getAllReview } from "../../actions/productAction";
import { DELETE_REVIEW_RESET } from "../../constants/productConstants";
import { Button } from "@material-ui/core";
import { Delete, Star } from "@mui/icons-material";
import { useHistory } from "react-router-dom";
import { DataGrid } from "@mui/x-data-grid";
import './ProductReviews.css'

export const ProductReviews = () => {
  const dispatch = useDispatch();
  const alert = useAlert();
  const history = useHistory()

  const { error: deleteError, isDeleted } = useSelector(state => state.review)

  const { error, reviews, loading } = useSelector(state => state.productReview)

  const [productId, setProductId] = useState("");

  const deleteReviewHandler = (reviewId) => {
    dispatch(deleteReview(reviewId, productId))
  }

  const productReviewSubmitHandler = (e) => {
    e.preventDefault()
    dispatch(getAllReview(productId))
  }

  useEffect(() => {
    if (productId.length === 24) {
      dispatch(getAllReview(productId))
    }
    if (error) {
      alert.error(error)
      dispatch(clearErrors())
    }

    if (deleteError) {
      alert.error(deleteError)
      dispatch(clearErrors())
    }

    if (isDeleted) {
      alert.success("Product Review Deleted Successfully")
      history.push('/admin/reviews')
      dispatch({ type: DELETE_REVIEW_RESET })
    }
  }, [dispatch, alert, error, productId, isDeleted, deleteError, history]);

  const columns = [
    { field: "id", headerName: "Review Id", minWidth: 200, flex: 0.5 },
    {
      field: 'user',
      headerName: "User",
      minWidth: 200,
      flex: 0.6
    },
    {
      field: 'comment',
      headerName: "Comment",
      minWidth: 350,
      flex: 1
    },
    {
      field: 'rating',
      headerName: "Rating",
      minWidth: 180,
      flex: 0.4,
      type: 'number',
      cellClassName: (params) => {
        return params.getValue(params.id, 'rating') >= 3
          ? 'greenColor'
          : 'redColor'
      }
    },
    {
      field: 'actions',
      headerName: "Actions",
      minWidth: 150,
      flex: 0.3,
      type: 'number',
      sortable: false,
      renderCell: (params) => {
        return <Fragment>
          <Button
            onClick={() => deleteReviewHandler(params.getValue(params.id, 'id'))}
          >
            <Delete />
          </Button>
        </Fragment>
      }
    },
  ]

  const rows = []

  return (
    <Fragment>
      <MetaData title={`ALL REVIEWS -- Admin`} />

      <div className="dashboard">
        <Sidebar />
        <div className="productReviewsContainer">
          <form
            className="productReviewsForm"
            onSubmit={productReviewSubmitHandler}
          >
            <h1 className="productReviewsFormHeading">All Reviews</h1>

            <div>
              <Star />
              <input
                type="text"
                placeholder="Product Id"
                required
                value={productId}
                onChange={(e) => setProductId(e.target.value)}
              />
            </div>

            <button
              id="createProductBtn"
              type="submit"
              disabled={
                loading ? true : false || productId === "" ? true : false
              }
            >Search</button>
          </form>

          {reviews && reviews.length > 0 ? (
            <DataGrid
          rows={rows}
          columns={columns}
          pageSize={10}
          disableSelectionOnClick
          className='productListTable'
          autoHeight
            />
          ) : (
          <div className="productReviewsFormHeading">No Reviews Found</div>
          )}
        </div>
      </div>
    </Fragment>
  );
};
