import React, { createContext, useContext, useEffect, useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';

const LatestProductContext = createContext();
export const useLatestProducts = () => useContext(LatestProductContext);

export const LatestProductProvider = ({ children }) => {
    const [products, setProducts] = useState([]);
    const [briefDescription, setBriefDescription] = useState('');
    const [sectionTitle, setSectionTitle] = useState('');
    const [sectionImage, setSectionImage] = useState('');

    const API_BASE = 'http://localhost:5000/api/latest-products';
    const API_DESC_BASE = 'http://localhost:5000/api/latest-description';
    const CLOUDINARY_UPLOAD = 'http://localhost:5000/api/latest-description/upload'; // should be your cloudinary route

    useEffect(() => {
        fetchProducts();
        fetchBriefDescription();
        fetchSectionData();
    }, []);

    // ✅ Fetch all products
    const fetchProducts = async () => {
        try {
            const response = await axios.get(API_BASE);
            setProducts(response.data);
        } catch (error) {
            toast.error('Failed to fetch products.');
            console.error(error);
        }
    };

    // ✅ Fetch brief description
    const fetchBriefDescription = async () => {
        try {
            const response = await axios.get(API_DESC_BASE);
            setBriefDescription(response.data?.description || '');
        } catch (error) {
            toast.error('Failed to fetch description.');
            console.error(error);
        }
    };

    // ✅ Fetch section title + image
    const fetchSectionData = async () => {
        try {
            const response = await axios.get(API_DESC_BASE);
            setSectionTitle(response.data?.sectionTitle || '');
            setSectionImage(response.data?.sectionImage || '');
        } catch (error) {
            toast.error('Failed to fetch section info.');
            console.error(error);
        }
    };


    // ✅ Update brief description
    const updateBriefDescription = async (desc) => {
        try {
            const response = await axios.put(API_DESC_BASE, {
                description: desc,
                sectionTitle,
                sectionImage,
            });
            setBriefDescription(response.data.description);
            toast.success('Description updated successfully!');
        } catch (error) {
            toast.error('Failed to update description.');
            console.error(error);
        }
    };


    // ✅ Update section title
    const updateSectionTitle = async (newTitle) => {
        try {
            const response = await axios.put(API_DESC_BASE, {
                sectionTitle: newTitle,
                sectionImage, // send existing image back so it's not lost
                description: briefDescription, // include existing desc
            });
            setSectionTitle(response.data.sectionTitle);
            toast.success('Title updated successfully!');
        } catch (error) {
            toast.error('Failed to update title.');
            console.error(error);
        }
    };


    // ✅ Upload section image to Cloudinary, then store the URL
    const uploadSectionImage = async (file) => {
        const formData = new FormData();
        formData.append('image', file);

        try {
            const res = await axios.post(CLOUDINARY_UPLOAD, formData, {
                headers: { 'Content-Type': 'multipart/form-data' },
            });

            const imageUrl = res.data.imageUrl;
            if (!imageUrl) throw new Error('No image URL returned.');

            // Only proceed if Cloudinary upload succeeded
            const updateRes = await axios.put(API_DESC_BASE, {
                sectionImage: imageUrl,
                sectionTitle,
                description: briefDescription,
            });

            setSectionImage(updateRes.data.sectionImage);

            // ✅ Success toast AFTER both steps complete
            toast.success('Section image updated!');

        } catch (error) {
            toast.error('Failed to upload or update section image.');
            console.error(error);
        }
    };



    // ✅ Add product
    const addProduct = async (newProduct) => {
        try {
            const formData = new FormData();
            formData.append('title', newProduct.title);
            formData.append('description', newProduct.description);
            formData.append('link', newProduct.link);

            newProduct.features.forEach((feature, i) => {
                formData.append(`features[${i}]`, feature);
            });

            formData.append('image', newProduct.image);

            const response = await axios.post(API_BASE, formData, {
                headers: { 'Content-Type': 'multipart/form-data' },
            });

            setProducts((prev) => [...prev, response.data]);
            toast.success('Product added successfully!');
        } catch (error) {
            toast.error('Failed to add product.');
            console.error(error);
        }
    };

    // ✅ Update product
    const updateProduct = async (updatedProduct) => {
        try {
            let response;
            const isImageUpdated = updatedProduct.image instanceof File;

            if (isImageUpdated) {
                const formData = new FormData();
                formData.append('title', updatedProduct.title);
                formData.append('description', updatedProduct.description);
                formData.append('link', updatedProduct.link || '');

                updatedProduct.features.forEach((feature, index) =>
                    formData.append(`features[${index}]`, feature)
                );
                formData.append('image', updatedProduct.image);

                response = await axios.put(`${API_BASE}/${updatedProduct.id}`, formData, {
                    headers: { 'Content-Type': 'multipart/form-data' },
                });
            } else {
                const { image, ...rest } = updatedProduct;
                response = await axios.put(`${API_BASE}/${updatedProduct.id}`, rest);
            }

            const updated = response.data;
            setProducts((prev) =>
                prev.map((prod) =>
                    (prod.id || prod._id) === updated._id ? updated : prod
                )
            );
            toast.success('Product updated successfully!');
        } catch (error) {
            toast.error('Failed to update product.');
            console.error(error);
        }
    };

    // ✅ Delete product
    const deleteProduct = async (id) => {
        try {
            await axios.delete(`${API_BASE}/${id}`);
            setProducts((prev) => prev.filter((p) => (p.id || p._id) !== id));
            toast.success('Product deleted successfully!');
        } catch (error) {
            toast.error('Failed to delete product.');
            console.error(error);
        }
    };

    return (
        <LatestProductContext.Provider
            value={{
                products,
                briefDescription,
                setBriefDescription: updateBriefDescription,
                sectionTitle,
                setSectionTitle: updateSectionTitle,
                sectionImage,
                setSectionImage: uploadSectionImage,
                addProduct,
                updateProduct,
                deleteProduct,
            }}
        >
            {children}
        </LatestProductContext.Provider>
    );
};
