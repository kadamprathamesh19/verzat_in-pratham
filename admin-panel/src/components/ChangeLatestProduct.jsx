import React, { useState, useEffect } from 'react';
import { useLatestProducts } from '../context/LatestProductContext.jsx';
import { toast } from 'react-toastify';

const ChangeLatestProduct = () => {
  const {
    briefDescription,
    setBriefDescription,
    products,
    addProduct,
    updateProduct,
    deleteProduct,
    sectionTitle,
    setSectionTitle,
    sectionImage,
    setSectionImage: uploadSectionImage, // rename for clarity
  } = useLatestProducts();

  const [titleInput, setTitleInput] = useState(sectionTitle);
  const [sectionImagePreview, setSectionImagePreview] = useState(sectionImage);
  const [uploading, setUploading] = useState(false);

  const [tempBrief, setTempBrief] = useState(briefDescription);

  useEffect(() => {
    setTempBrief(briefDescription);
    setTitleInput(sectionTitle);
    setSectionImagePreview(sectionImage);
  }, [briefDescription, sectionTitle, sectionImage]);

  const [productForm, setProductForm] = useState({
    id: null,
    image: null, // File or URL string
    title: '',
    description: '',
    features: [],
    link: '',
  });

  const [featureInput, setFeatureInput] = useState('');
  const [imagePreview, setImagePreview] = useState(''); // base64 string for preview

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setProductForm((prev) => ({ ...prev, image: file }));

    const reader = new FileReader();
    reader.onloadend = () => {
      setImagePreview(reader.result);
    };
    reader.readAsDataURL(file);
  };

  // Use context upload function for section image
  const handleSectionImageUpload = async (file) => {
    setUploading(true);
    try {
      await uploadSectionImage(file);
      setUploading(false);
      
    } catch (error) {
      setUploading(false);
      
      console.error(error);
    }
  };

  const handleFeatureAdd = () => {
    if (featureInput.trim()) {
      setProductForm((prev) => ({
        ...prev,
        features: [...prev.features, featureInput.trim()],
      }));
      setFeatureInput('');
    }
  };

  const handleFeatureDelete = (index) => {
    setProductForm((prev) => ({
      ...prev,
      features: prev.features.filter((_, i) => i !== index),
    }));
  };

  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setProductForm((prev) => ({ ...prev, [name]: value }));
  };

  const clearForm = () => {
    setProductForm({
      id: null,
      image: null,
      title: '',
      description: '',
      features: [],
      link: '',
    });
    setImagePreview('');
    setFeatureInput('');
    const fileInput = document.getElementById('productImage');
    if (fileInput) fileInput.value = '';
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { title, description, features, link, image, id } = productForm;

    if (
      !title.trim() ||
      !description.trim() ||
      !link.trim() ||
      !features.length ||
      (!id && !image) // require image when adding new product
    ) {
      toast.error(
        'All fields are required, including at least one feature and an image (when adding a product).'
      );
      return;
    }

    if (id) {
      await updateProduct(productForm);
    } else {
      await addProduct(productForm);
    }

    clearForm();
  };

  const handleEdit = (product) => {
    setProductForm({
      id: product.id || product._id,
      image: product.image || null, // URL string
      title: product.title,
      description: product.description,
      features: product.features || [],
      link: product.link || '',
    });
    setImagePreview(product.image || '');
  };

  const handleDelete = (id) => {
    if (window.confirm('Delete this product?')) {
      deleteProduct(id);
      if (productForm.id === id) clearForm();
    }
  };

  return (
    <div className="p-6 bg-white min-h-screen mx-auto text-gray-900 max-w-4xl">
      <h1 className="text-3xl text-center font-bold mb-8 text-blue-700">
        Verzat R&D Lab Page
      </h1>

      {/* R&D Lab Title */}
      <div className="mb-8">
        <label className="block text-2xl font-semibold mb-2">R&D Lab Title</label>
        <input
          type="text"
          value={titleInput}
          onChange={(e) => setTitleInput(e.target.value)}
          className="w-full p-3 border rounded"
        />
        <div className="flex gap-2 mt-3">
          <button
            onClick={() => {
              setSectionTitle(titleInput);
            //   toast.success('Title saved!');
            }}
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
          >
            Save Title
          </button>
          <button
            onClick={() => setTitleInput(sectionTitle)}
            className="px-4 py-2 bg-gray-400 text-white rounded hover:bg-gray-500"
          >
            Reset
          </button>
        </div>
      </div>

      {/* R&D Lab Background Image */}
      <div className="mb-10">
        <label className="block text-2xl font-semibold mb-2">
          Upload Background Image
        </label>
        <input
          type="file"
          accept="image/*"
          onChange={(e) => {
            const file = e.target.files[0];
            if (file) handleSectionImageUpload(file);
          }}
        />
        {uploading && <p className="text-blue-600 mt-2">Uploading...</p>}
        {sectionImagePreview && (
          <div className="mt-4">
            <p className="text-sm text-gray-600 mb-2">Image Preview:</p>
            <img
              src={sectionImagePreview}
              alt="Background Preview"
              className="w-full max-w-md rounded shadow"
            />
          </div>
        )}
      </div>

      {/* Description */}
      <section className="mb-8 mt-6">
        <h2 className="text-2xl font-semibold mb-2">R&D Lab Description</h2>
        <textarea
          rows="3"
          className="w-full p-2 border rounded"
          value={tempBrief}
          onChange={(e) => setTempBrief(e.target.value)}
        />
        <button
          onClick={() => setBriefDescription(tempBrief)}
          className="mt-2 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
        >
          Save Description
        </button>
      </section>
      <hr />

      <br />

      {/* Product Form */}
      <section className="mb-10">
        <h2 className="text-2xl font-semibold mb-2">
          {productForm.id ? 'Edit Product' : 'Add New Product'}
        </h2>
        <form onSubmit={handleSubmit} className="grid gap-4">
          <input
            id="productImage"
            type="file"
            accept="image/*"
            onChange={handleImageChange}
          />
          {imagePreview && (
            <img
              src={imagePreview}
              alt="Preview"
              className="w-40 h-40 object-cover rounded"
            />
          )}

          <input
            type="text"
            name="title"
            placeholder="Product Title"
            value={productForm.title}
            onChange={handleFormChange}
            className="p-2 border rounded"
          />
          <textarea
            name="description"
            placeholder="Product Description"
            rows="3"
            value={productForm.description}
            onChange={handleFormChange}
            className="p-2 border rounded"
          />

          <input
            type="text"
            name="link"
            placeholder="Product Link"
            value={productForm.link}
            onChange={handleFormChange}
            className="p-2 border rounded"
          />

          <div>
            <div className="flex gap-2 mb-2">
              <input
                type="text"
                placeholder="Add Feature"
                value={featureInput}
                onChange={(e) => setFeatureInput(e.target.value)}
                className="flex-1 p-2 border rounded"
              />
              <button
                type="button"
                onClick={handleFeatureAdd}
                className="bg-gray-700 text-white px-4 py-2 rounded hover:bg-gray-800"
              >
                Add
              </button>
            </div>
            <ul>
              {productForm.features.map((f, i) => (
                <li
                  key={i}
                  className="flex justify-between border p-1 rounded mb-1"
                >
                  <span>{f}</span>
                  <button
                    type="button"
                    onClick={() => handleFeatureDelete(i)}
                    className="text-red-500 text-xs"
                  >
                    Remove
                  </button>
                </li>
              ))}
            </ul>
          </div>

          <div className="flex gap-2 mt-2">
            <button
              type="submit"
              className="bg-blue-700 text-white px-4 py-2 rounded hover:bg-blue-800"
            >
              {productForm.id ? 'Update Product' : 'Add Product'}
            </button>
            <button
              type="button"
              onClick={clearForm}
              className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600"
            >
              Clear
            </button>
          </div>
        </form>
      </section>

      {/* Products List with full details */}
      <section>
        <h2 className="text-2xl font-semibold mb-4">Products</h2>
        {products.map((product) => (
          <div
            key={product.id || product._id}
            className="mb-8 p-4 border rounded shadow-md"
          >
            <div className="flex flex-col md:flex-row gap-4">
              <img
                src={product.image}
                alt={product.title}
                className="max-w-xs max-h-56 rounded"
              />
              <div className="flex-1">
                <h3 className="text-xl font-bold mb-2">{product.title}</h3>
                <p className="mb-2">{product.description}</p>

                <div>
                  <h4 className="font-semibold mb-1">Key Features:</h4>
                  <ul className="list-disc list-inside">
                    {product.features &&
                      product.features.map((feature, index) => (
                        <li key={index}>{feature}</li>
                      ))}
                  </ul>
                </div>

                <a
                  href={product.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-700 underline mt-2 inline-block"
                >
                  Visit Link
                </a>

                <div className="mt-4 flex gap-4">
                  <button
                    onClick={() => handleEdit(product)}
                    className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(product.id || product._id)}
                    className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </section>
    </div>
  );
};

export default ChangeLatestProduct;
