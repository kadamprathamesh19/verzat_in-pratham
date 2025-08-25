import React, { useContext, useEffect, useState } from 'react';
import { BaseContext } from '../context/BaseContext.jsx';
import { toast } from 'react-toastify';

const ChangeBaseContent = () => {
  const {
    addBaseDescription,
    getBaseDescription,
    addCompanyProduct,
    getCompanyProducts,
    updateCompanyProduct,
    deleteCompanyProduct,
    loading,
  } = useContext(BaseContext);

  const [description, setDescription] = useState('');
  const [products, setProducts] = useState([]);
  const [loadingProducts, setLoadingProducts] = useState(true);

  const [productName, setProductName] = useState('');
  const [productLongName, setProductLongName] = useState('');
  const [productImage, setProductImage] = useState(null);
  const [previewImage, setPreviewImage] = useState(null);

  const [editingId, setEditingId] = useState(null);
  const [editName, setEditName] = useState('');
  const [editLongName, setEditLongName] = useState('');
  const [editImage, setEditImage] = useState(null);
  const [editPreview, setEditPreview] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const desc = await getBaseDescription();
        setDescription(desc);
        await refreshProducts();
      } catch (error) {
        toast.error('Failed to load data.');
      }
    };
    fetchData();
  }, []);

  const refreshProducts = async () => {
    setLoadingProducts(true);
    const productList = await getCompanyProducts();
    setProducts(productList);
    setLoadingProducts(false);
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setProductImage(file);
    setPreviewImage(file ? URL.createObjectURL(file) : null);
  };

  const handleEditImageChange = (e) => {
    const file = e.target.files[0];
    setEditImage(file);
    setEditPreview(file ? URL.createObjectURL(file) : null);
  };

  const handleDescriptionSubmit = async (e) => {
    e.preventDefault();
    await addBaseDescription(description);
  };

  const handleProductSubmit = async (e) => {
    e.preventDefault();
    if (!productName || !productLongName) {
      toast.error('Fill in all fields.');
      return;
    }
    const formData = new FormData();
    formData.append('name', productName);
    formData.append('longform', productLongName);
    if (productImage) formData.append('image', productImage);

    await addCompanyProduct(formData);
    await refreshProducts();
    setProductName('');
    setProductLongName('');
    setProductImage(null);
    setPreviewImage(null);
  };

  const startEditing = (product) => {
    setEditingId(product._id);
    setEditName(product.name);
    setEditLongName(product.longform);
    setEditPreview(product.image);
    setEditImage(null);
  };

  const cancelEditing = () => {
    setEditingId(null);
    setEditImage(null);
    setEditPreview(null);
  };

  const handleEditSubmit = async (e, id) => {
    e.preventDefault();
    if (!editName || !editLongName) {
      toast.error('Fill in all fields.');
      return;
    }
    const formData = new FormData();
    formData.append('name', editName);
    formData.append('longform', editLongName);
    if (editImage) formData.append('image', editImage);

    await updateCompanyProduct(id, formData);
    await refreshProducts();
    cancelEditing();
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this product?')) return;
    await deleteCompanyProduct(id);
    await refreshProducts();
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-8 bg-gray-50 font-sans">
      <h2 className="text-3xl text-center text-blue-700 font-bold mb-8"> Base Company Content</h2>

      <form onSubmit={handleDescriptionSubmit} className="mb-10">
        <h3 className="text-xl font-semibold mb-2">Base Page Description</h3>
        <textarea
          rows="5"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="w-full p-3 border border-gray-300 rounded-md mb-4"
        />
        <button type="submit" disabled={loading} className="bg-blue-600 text-white px-4 py-2 rounded-md">
          {loading ? 'Saving...' : 'Save Description'}
        </button>
      </form>

      <form onSubmit={handleProductSubmit} className="mb-10">
        <h3 className="text-xl font-semibold mb-2">Add Product</h3>
        <input
          type="text"
          value={productName}
          onChange={(e) => setProductName(e.target.value)}
          placeholder="Short Name"
          className="w-full p-2 border rounded mb-2"
        />
        <input
          type="text"
          value={productLongName}
          onChange={(e) => setProductLongName(e.target.value)}
          placeholder="Longform Name"
          className="w-full p-2 border rounded mb-2"
        />
        <input type="file" accept="image/*" onChange={handleImageChange} className="mb-2" />
        {previewImage && <img src={previewImage} alt="Preview" className="h-24 mb-2" />}
        <br />
        <button type="submit" disabled={loading} className="bg-green-600 text-white px-4 py-2 rounded-md">
          {loading ? 'Adding...' : 'Add Product'}
        </button>
      </form>

      <div>
        <h3 className="text-xl font-semibold mb-4">Products</h3>
        {loadingProducts ? (
          <p>Loading...</p>
        ) : (
          products.map((product) => (
            <div key={product._id} className="border p-4 mb-4 rounded-md">
              {editingId === product._id ? (
                <form onSubmit={(e) => handleEditSubmit(e, product._id)}>
                  <input type="text" value={editName} onChange={(e) => setEditName(e.target.value)} className="w-full p-2 mb-2 border rounded" />
                  <input type="text" value={editLongName} onChange={(e) => setEditLongName(e.target.value)} className="w-full p-2 mb-2 border rounded" />
                  <input type="file" onChange={handleEditImageChange} className="mb-2" />
                  {editPreview && <img src={editPreview} className="h-20 mb-2" />}
                  <div className="flex gap-2">
                    <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded-md">Save</button>
                    <button type="button" onClick={cancelEditing} className="bg-gray-500 text-white px-4 py-2 rounded-md">Cancel</button>
                  </div>
                </form>
              ) : (
                <div className="flex justify-between items-center">
                  <div className="flex items-center gap-4">
                    <img src={product.imageUrl} alt={product.name} className="h-16 w-16 rounded-md object-cover border" />
                    <div>
                      <p className="font-bold">{product.name}</p>
                      <p>{product.longform}</p>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <button onClick={() => startEditing(product)} className="bg-yellow-500 text-white px-3 py-1 rounded-md">Edit</button>
                    <button onClick={() => handleDelete(product._id)} className="bg-red-600 text-white px-3 py-1 rounded-md">Delete</button>
                  </div>
                </div>
              )}
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default ChangeBaseContent;
