import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import ProductService from '../services/product.service';
import { AuthContext } from '../context/auth.context';
import service from '../services/product.service';
import Icon from '../images/addImg.png';

function AddProduct() {
  const { user } = useContext(AuthContext);
  const [img, setImg] = useState('');
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [category, setCategory] = useState('Other');
  const [condition, setCondition] = useState('Used');
  const [description, setDescription] = useState('');

  const categories = [
    'Other',
    'Vehicles',
    'Technology',
    'Furniture',
    'Sport',
    'Animals',
  ];
  const conditions = ['Used', 'New'];

  const handleFileUpload = (e) => {
    // console.log("The file to be uploaded is: ", e.target.files[0]);

    const uploadData = new FormData();

    // imageUrl => this name has to be the same as in the model since we pass
    // req.body to .create() method when creating a new movie in '/api/movies' POST route
    uploadData.append('img', e.target.files[0]);

    service
      .updateImage(uploadData)
      .then((response) => {
        // console.log("response is: ", response);
        // response carries "fileUrl" which we can use to update the state
        console.log(response);
        setImg(response.data.fileUrl);
      })
      .catch((err) => console.log('Error while uploading the file: ', err));
  };

  const handleName = (e) => setName(e.target.value);
  const handlePrice = (e) => setPrice(e.target.value);
  const handleCategory = (e) => setCategory(e.target.value);
  const handleCondition = (e) => setCondition(e.target.value);
  const handleDescription = (e) => setDescription(e.target.value);

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const body = {
      name,
      price,
      img,
      category,
      condition,
      description,
      seller: user._id,
    };
    try {
      await ProductService.createProduct(body);
      setImg('');
      setPrice('');
      setCategory('');
      setCondition('');
      setDescription('');

      navigate('/products');
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <section className="formdiv">
      <form
        style={{ marginTop: '4vh', width: '25vw', padding: '5vh' }}
        className="form"
        onSubmit={handleSubmit}
      >
        <p>Create Product:</p>

        <input
          required="true"
          className="main-input"
          type="text"
          name="name"
          id="name"
          value={name}
          onChange={handleName}
          placeholder="Name"
        />
        <br />
        <input
          required="true"
          className="main-input"
          type="text"
          name="description"
          id="description"
          value={description}
          onChange={handleDescription}
          placeholder="Description"
        />
        <br />
        <input
          required="true"
          className="main-input"
          type="text"
          name="price"
          id="price"
          value={price}
          onChange={handlePrice}
          placeholder="Price"
        />
        <br />
        <select
          style={{ height: '6vh' }}
          required="true"
          className="main-input"
          name="category"
          id="category"
          onChange={handleCategory}
          value={category}
        >
          {categories.map((filters) => {
            return <option value={filters}>{filters}</option>;
          })}
        </select>
        <br />
        <select
          style={{ height: '6vh' }}
          required="true"
          className="main-input"
          name="condition"
          id="condition"
          onChange={handleCondition}
          value={condition}
        >
          {conditions.map((filters) => {
            return <option value={filters}>{filters}</option>;
          })}
        </select>
        <br />
        
        <label for="img">
          <i style={{ cursor: 'pointer' }}>
            <img src={Icon} style={{ width: '3vw' }} alt="" />
          </i>
        </label>

        <input
          style={{
            width: '15vw',
            alignContent: 'flex-end',
            alignItems: 'flex-end',
            display: "hidden"
          }}
          className="main-input"
          type="file"
          name="img"
          id="img"
          onChange={(e) => handleFileUpload(e)}
        />

        <button required="true" className="submit" type="submit">
          Create Product
        </button>
      </form>
    </section>
  );
}

export default AddProduct;
