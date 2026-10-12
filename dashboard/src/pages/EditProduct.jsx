import React, { useState, useEffect, useRef } from 'react';
import ProductForm from '@/components/PrductForm';
import { useParams, useNavigate } from 'react-router-dom';
import { getProductById, updateProduct } from '@/services/productService';
import { toast } from '@/components/ui/toast';

const EditProduct = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [isLoadingProduct, setIsLoadingProduct] = useState(true);
    const [productImg, setProductImg] = useState("");
    const [selectedImagePreview, setSelectedImagePreview] = useState("");
    const formRef = useRef(null);
    
    // Original data backend se aane wala
    const [originalData, setOriginalData] = useState({
        title: '',
        description: '',
        basePrice: '',
        discountPrice: '',
        stock: '',
        sku: '',
    });

    // Form mein edit hone wala data
    const [productData, setProductData] = useState({
        title: '',
        description: '',
        basePrice: '',
        discountPrice: '',
        stock: '',
        sku: '',
    });

    const [imageFile, setImageFile] = useState(null);
    const [hasChanged, setHasChanged] = useState(false); // Enable/Disable button ke liye

    useEffect(() => {
        if (!imageFile) {
            setSelectedImagePreview("");
            return undefined;
        }

        const previewUrl = URL.createObjectURL(imageFile);
        setSelectedImagePreview(previewUrl);
        return () => URL.revokeObjectURL(previewUrl);
    }, [imageFile]);

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                const data = await getProductById(id);
                const fetchedValues = {
                    title: data.title ?? '',
                    description: data.description ?? '',
                    basePrice: data.basePrice ?? '',
                    discountPrice: data.discountPrice ?? '',
                    stock: data.stock ?? '',
                    sku: data.sku ?? '',
                };
                setOriginalData(fetchedValues);
                setProductData(fetchedValues);
                setProductImg(data.productImg || "");
            } catch (error) {
                console.error('Error fetching product:', error);
                toast.add({ title: "Error", description: "Failed to load product." });
            } finally {
                setIsLoadingProduct(false);
            }
        };
        fetchProduct();
    }, [id]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        const updatedData = { ...productData, [name]: value };
        setProductData(updatedData);

        const isModified = Object.keys(updatedData).some(
            (key) => String(updatedData[key]) !== String(originalData[key])
        );

        setHasChanged(isModified || imageFile !== null);
    };

    const handleFileChange = (e) => {
        if (e.target.files && e.target.files[0]) {
            setImageFile(e.target.files[0]);
            setHasChanged(true); 
        }
    };

    const clearForm = () => {
        setProductData(originalData); 
        setImageFile(null);
        setHasChanged(false);
        formRef.current?.reset();
    };

    const handleFormSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            let updateData = productData;
            if (imageFile) {
                const formData = new FormData();
                Object.entries(productData).forEach(([key, value]) => {
                    formData.append(key, value);
                });
                formData.append("productImg", imageFile);
                updateData = formData;
            }

            const updatedProduct = await updateProduct(id, updateData);
            const savedFieldsMatch = Object.entries(productData).every(([field, value]) => {
                if (["basePrice", "discountPrice", "stock"].includes(field)) {
                    return Number(updatedProduct[field]) === Number(value);
                }
                return String(updatedProduct[field]).trim() === String(value).trim();
            });

            if (!savedFieldsMatch || (imageFile && updatedProduct.productImg === productImg)) {
                throw new Error("The server did not save all changes. Restart the backend and try again.");
            }

            setProductImg(updatedProduct.productImg || productImg);

            toast.add({
                type: "success",
                description: "Product updated successfully.",
            });

            navigate("/dashboard/productlist");
        } catch (error) {
            console.error('Error updating product:', error);
            toast.add({
                type: "error",
                description: error.response?.data?.message || error.message || "Failed to update product.",
            });
        } finally {
            setLoading(false);
        }
    };

    if (isLoadingProduct) {
        return <p className="py-6 text-sm text-muted-foreground">Loading product...</p>;
    }

    return (
        <ProductForm 
            isEdit={true}
            isModified={hasChanged}
            productData={productData}
            productImg={selectedImagePreview || productImg}
            handleInputChange={handleInputChange}
            handleFileChange={handleFileChange}
            handleFormSubmit={handleFormSubmit}
            clearForm={clearForm}
            loading={loading}
            formRef={formRef}
        />
    );
};

export default EditProduct;