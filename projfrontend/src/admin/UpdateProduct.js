import React, { useEffect, useState } from 'react';
import { Link, Route } from 'react-router-dom';
import { isAuthenticated } from '../auth/helper';
import Base from '../core/Base';
import { getProduct, updateProduct, getCategories } from './helper/adminapicall';


const UpdateProduct = ({history, match}) => {

    const { user, token } = isAuthenticated(); 

    const [values, setValues] = useState({
        name : "",
        description : "",
        price : "",
        stock : "",
        photo : "",
        categories : [],
        category : "",
        loading : false,
        error : "",
        success:"",
        createdProduct : "",
        getRedirect : false,
        formData : ""
    });

    const {name, description, price, stock, photo, categories, category, loading, error, success, createdProduct, getRedirect, formData} = values;

    const preload = (productId) => {
        getProduct(productId).then(data => {
            if(data && data.error){
                setValues({...values, error: data.error });
            }
            else{
                setValues({
                    ...values,
                    name:data.name,
                    description:data.description,
                    price:data.price,
                    category:data.category._id,
                    stock:data.stock,
                    formData: new FormData()
                });
                preloadCategories();
            }
        });
    }

    const preloadCategories = () =>{
        getCategories()
        .then(data => {
            if(data && data.error){
                setValues({...values, error: data.error });
            }
            else{
                setValues({
                    categories: data,
                    formData: new FormData
                });
            }
        });
    }

    useEffect(() => {
        preload(match.params.productId);
    },[])

    const onSubmit = (event) => {
        event.preventDefault();
        setValues({...values, error:"", success:"", loading: true});
        updateProduct(match.params.productId, user._id, token, formData)
        .then(data => {
            if(data && data.error){
                setValues({...values, error: data.error, success:false});

            }
            else{
                setValues({...values,
                    name: "",
                    description:"",
                    price:"",
                    photo:null,
                    stock:"",
                    loading:false,
                    error:"",
                    success:true,
                    getRedirect:true,
                    createdProduct: data.name,
                    formData:new FormData()
                });
            }
        })
        .catch(err => console.log(error));
    };

    const handleChange = name => event => {
        const value = name === "photo" ? event.target.files[0] : event.target.value ;
        formData.set(name, value);
        setValues({...values, error:"",success:"", [name]:value});
    }

    const successMessage = () => {
        return(
            <div className="alert alert-success mt-3"
                style={{ display: success ? "": "none"}}
            >
                <h4>Product updated successfully</h4>
            </div>
        )
    }

    const errorMessage = () => {
        return(
            <div className="alert alert-danger mt-3"
                style={{ display: error ? "": "none"}}
            >
                <h4>{error}</h4>
            </div>
        )
    }

    const performRedirect = () => {
        if(getRedirect) {
            setTimeout(() => {
                history.push("/admin/dashboard");               
            }, 2000)
        }
    }

    const createProductForm = () => (
        <form >
          <span>Post photo</span>
          <div className="form-group pt-4">
            <label className="btn btn-block btn-success">
              <input
                onChange={handleChange("photo")}
                type="file"
                name="photo"
                accept="image"
                placeholder="choose a file"
              />
            </label>
          </div>
          <div className="form-group pt-4">
            <input
              onChange={handleChange("name")}
              name="photo"
              className="form-control"
              placeholder="Name"
              value={name}
            />
          </div>
          <div className="form-group pt-4">
            <textarea
              onChange={handleChange("description")}
              name="photo"
              className="form-control"
              placeholder="Description"
              value={description}
            />
          </div>
          <div className="form-group pt-4">
            <input
              onChange={handleChange("price")}
              type="number"
              className="form-control"
              placeholder="Price"
              value={price}
            />
          </div>
          <div className="form-group pt-4">
            <select
              onChange={handleChange("category")}
              className="form-control"
              placeholder="Category"
            >
              <option>Select</option>
              { categories && categories.map(( cate, index) => (
                  <option key={index} value={cate._id}>
                      {cate.name}
                  </option>
              ))

              }
            </select>
          </div>
          <div className="form-group pt-4">
            <input
              onChange={handleChange("stock")}
              type="number"
              className="form-control"
              placeholder="stock"
              value={stock}
            />
          </div>
          
          <button type="submit" onClick={onSubmit} className="btn btn-outline-success my-4">
            Update Product
          </button>
        </form>
      );

    return (
        <Base title="update product here"
            description="Welcome to Product update section"
            className="container bg-info p-4"
        >
            <Link to="/admin/dashboard" className="btn btn-md btn-dark mb-3 ">
                <h6>Admin Home</h6>
            </Link>
            <div className="row bg-dark text-white rounded">
                <div className="col-md-8 offset-md-2">
                    {successMessage()}
                    {errorMessage()}
                    {/* {performRedirect()} */}
                    {createProductForm()}   
                </div>
            </div>
        </Base>
    )
}


export default UpdateProduct;