import React, { useRef, useState } from "react";
import { createProduct } from "@/services/productService";
import { toast } from "@/components/ui/toast";
import ProductForm from "@/components/PrductForm";


export default function AddProduct() {

  const [loading, setLoading] = useState(false);

  const initialFormState = {
    title: "",
    description: "",
    basePrice: "",
    discountPrice: "",
    stock: "",
    sku: "",
  };
  
  const [productData, setProductData] = useState(initialFormState);
  
  const [imageFile, setImageFile] = useState(null);
  const formRef = useRef(null);

  const resetForm = () => {
    setProductData(initialFormState);
    setImageFile(null);
    formRef.current?.reset();
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProductData((prevData) => ({
      ...prevData,
      [name]: value
    }));
  };

  const handleFileChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setImageFile(e.target.files[0]);
    }
  };

  const handleFormSubmit = async (e) => {
    
    e.preventDefault();
    setLoading(true);

    try {
      const formData = new FormData();
      formData.append("title", productData.title);
      formData.append("description", productData.description);
      formData.append("basePrice", productData.basePrice);
      formData.append("discountPrice", productData.discountPrice);
      formData.append("stock", productData.stock);
      formData.append("sku", productData.sku);
      
      if (imageFile) {
        formData.append("productImg", imageFile); 
      }

      await createProduct(formData);

      toast.add({
        type: "success",
        description: "Product has been created successfully.",
      });

      resetForm();

    } catch (error) {
      console.error("Error creating product:", error);
      toast.add({
        type: "error",
        description: "Failed to create product. Please try again.",
      });
    } finally {
      setLoading(false);
    }
  };

  const clearForm = () => {
    resetForm();
  };

  return (
    <>
      <ProductForm
        productData={productData}
        handleInputChange={handleInputChange}
        handleFileChange={handleFileChange}
        handleFormSubmit={handleFormSubmit}
        clearForm={clearForm}
        loading={loading}
        formRef={formRef}
      />
    </>
  );
}