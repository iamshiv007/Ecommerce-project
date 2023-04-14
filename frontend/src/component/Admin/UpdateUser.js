import React, { Fragment, useState, useEffect } from "react";
import { Loader } from "../layout/Loader/Loader";
import { MetaData } from "../layout/MetaData";
import { useHistory, useParams } from "react-router-dom";
import { useAlert } from "react-alert";
import { useDispatch, useSelector } from "react-redux";
import {
  clearErrors,
  updateUser,
} from "../../actions/userAction";
import { UPDATE_PROFILE_RESET } from "../../constants/userConstants";
import { MailOutline, Person, VerifiedUser } from "@mui/icons-material";
import { Sidebar } from "./Sidebar";
import { Button } from "@material-ui/core";
import { getUserDetails } from "../../actions/userAction";
import './Dashboard.css'
import './NewProduct.css'

export const UpdateUser = () => {
  const history = useHistory();
  const alert = useAlert();
  const dispatch = useDispatch();

  const  { id } = useParams()

  const { loading, error, user } = useSelector((state) => state.userDetails);

  const { loading: updateLoading, error: updateError, isUpdated } = useSelector(
    (state) => state.profile
  );

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("");

  const updateUserSubmitHandler = (e) => {
    e.preventDefault();

    const myForm = new FormData();

    myForm.set("name", name);
    myForm.set("email", email);
    myForm.set("role", role);
    dispatch(updateUser(id, myForm));
  };

  useEffect(() => {
    if (user && user._id !== id) {
      dispatch(getUserDetails(id));
    } else {
      setName(user.name);
      setEmail(user.email);
      setRole(user.role);
    }

    if (error) {
      alert.error(error);
      dispatch(clearErrors);
    }

    if (updateError) {
      alert.error(updateError);
      dispatch(clearErrors);
    }

    if (isUpdated) {
      alert.success("User Updated Successfully");
      history.push("/admin/users");

      dispatch({
        type: UPDATE_PROFILE_RESET,
      });
    }
  }, [dispatch, alert, error, isUpdated, history, user, updateError, id]);

  return (
    <Fragment>
      <MetaData title="Update User" />
      <div className="dashboard">
        <Sidebar />
        <div className="newProductContainer">
          {loading ? (
            <Loader />
          ) : (
            <form
              className="createProductForm"
              onSubmit={updateUserSubmitHandler}
            >
                <h1>Update User</h1>

              <div>
                <Person />
                <input
                  type="text"
                  value={name}
                  placeholder="Name"
                  required
                  name="name"
                  onChange={(e) => setName(e.target.value)}
                />
              </div>
              <div>
                <MailOutline />
                <input
                  type="email"
                  value={email}
                  placeholder="Email"
                  name="email"
                  required
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>

              <div>
                <VerifiedUser/>
                <select value={role} onChange={(e) => setRole(e.target.value)}>
                    <option value="">Choose Role</option>
                    <option value="Admin">Admin</option>
                    <option value="User">User</option>
                </select>
              </div>
              <Button
                type="submit"
                id="createProductBtn"

                disabled={
                    updateLoading ? true : false || role === "" ? true : false
                }
              >Update</Button>
            </form>
          )}
        </div>
      </div>
    </Fragment>
  );
};
