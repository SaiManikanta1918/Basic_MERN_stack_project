import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { isAuthenticated } from '../auth/helper';
import Base from '../core/Base';
import { createCategory } from './helper/adminapicall';


const AddCategory = () => {

    const [name, setName] = useState("");
    const [error,setError] = useState(false);
    const [success, setSuccess] = useState(false);

    const {user, token} = isAuthenticated();

    const goBack = () => {
        return (
            <div className="mt-5">
                <Link className="btn btn-success mb-3" to="/admin/dashboard">
                    Go Back
                </Link>
            </div>
        )
    }

    const handleChange = event => {
        setError("");
        setName(event.target.value);
    }

    const onSubmit = (event) => {
        event.preventDefault();
        setError("");
        setSuccess(false);

        //request to backend
        createCategory(user._id, token, {name})
        .then(data => {
            if(data && data.error){
                setError(true);
            }
            else{
                setError(false);
                setSuccess(true);
                setName("");
            }
        })
        .catch(err => console.log(err))
    };

    const successMessage = () => {
        if(success){
            return <h4 className="text-success">Category created Successfully</h4>
        }
    }

    const warningsMessage = () => {
        if(error){
            return <h4 className="text-danger">Failed to create category</h4>
        }
    }

    const myCategoryForm = () => {
        return (
            <form>
                <div className="form-group">
                    <p className="lead">Enter category</p>
                    <input type="text"
                        className="form-control my-3"
                        onChange={handleChange}
                        value={name}
                        autoFocus
                        required
                        placeholder="For ex..Summer"
                    />
                    <button onClick={onSubmit} className="btn btn-outline-info rounded">Create Category</button>
                </div>
            </form>
        )
    }

    return (
        <Base
            title="Create a category here"
            description="Add a new category for new t-shirts"
            className="container bg-info p-4"
        >
            <div className="row bg-white rounded">
                <div className="col-md-8 offset-md-2 py-2">
                    {successMessage()}
                    {warningsMessage()}
                    {myCategoryForm()}
                    {goBack()}
                </div>
            </div>
        </Base>
    )
}

export default AddCategory;