'use client'
import React, { useState, useEffect, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { ToastContainer, toast , Flip } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import TextareaAutosize from 'react-textarea-autosize';


const EditForm = ({ categoryId, productId, showEditForm ,setReloadEditForm ,reloadEditForm}) => {

  const imagesRef = useRef(null);
  const [onClose, setOnClose] = useState(true);
  const product = useSelector((state) => state.prodectData.prodectes);
  const URL_Api= process.env.NEXT_PUBLIC_API_URL
  const [imageUrls, setImageUrls] = useState([]);
  const [previewImages, setPreviewImages] = useState([]); // حالة لتخزين روابط الصور للمعاينة
  const [isLoading, setIsLoading] = useState(false);

  const notifySuccess = (eo) => toast.success(eo, {
    position: "top-center",
    autoClose: 3000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "light",
    transition: Flip,
  })

  const notifyError = (text) => toast.error(text, {
    position: "top-center",
    autoClose: 3000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "light",
    transition: Flip,
  })


  // فلترة المنتجات بناءً على المنتج المحدد
let filterProduct ;
  if(Array.isArray(product)){

       filterProduct = product.filter((pro) => pro._id === productId);

  }
//   console.log(product);
//   console.log(filterProduct);
//   console.log(onClose);

  const [productData, setProductData] = useState({
    image: [],
    address: '',
    details: '',
    price: '',
    newprice: '',
    commition:''
  });
  const [originalProductData, setOriginalProductData] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (filterProduct.length > 0) {
      const product = filterProduct[0];
      setProductData({
        image:   product.image || [],
        address: product.address,
        details: product.details,
        price: product.price,
        newprice: product.newprice,
        commition:product.commition
      });
      setOriginalProductData(product); // حفظ البيانات الأصلية
      setImageUrls(product.image || []);
    }
  }, [showEditForm , productId]);


  //show link of image 
  useEffect(()=>{
    if (imagesRef.current) {
        imagesRef.current.value = productData.image;
      }

  },[productData.image])

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProductData((prevData) => ({ ...prevData, [name]: value }));
  };
//   const handleImageChange = (e) => {
//     const files = Array.from(e.target.files);
//     const imagePromises = files.map(file => {
//         return new Promise((resolve, reject) => {
//             const reader = new FileReader();
//             reader.onload = () => resolve(reader.result);
//             reader.onerror = error => reject(error);
//             reader.readAsDataURL(file);
//         });
//     });

//     Promise.all(imagePromises)
//         .then(imagesData => {
//             const base64Images = imagesData.map(imageData => imageData);
//             // setImages(base64Images);
//             setProductData((prevData) => ({ ...prevData, image: base64Images }));
//         })
//         .catch(error => console.error(error));
// };

// التعامل مع الصور من خلال ارسال لينك الصوره

// const handleImageChange = (e) => {
//     const value = e.target.value;
  
//     const newImageUrls = value
//       .split(',')
//       .map(url => url.trim())
//       .filter(url => url !== '');
  
//     setImageUrls(newImageUrls);
// };
const handleImageChange = (e) => {
  const files = Array.from(e.target.files);
  const validFiles = files.filter((file) => file.type.startsWith("image/") && file.size <= 5 * 1024 * 1024); // 5MB كحد أقصى

  if (validFiles.length !== files.length) {
    notifyError("بعض الملفات غير صالحة (يجب أن تكون صورًا وأقل من 5 ميجابايت)");
  }

  setImageUrls(validFiles);

  const previews = validFiles.map((file) => URL.createObjectURL(file));
  setPreviewImages(previews);
};

useEffect(() => {
  return () => {
    previewImages.forEach((url) => URL.revokeObjectURL(url));
  };
}, [previewImages]);

  

// handle Edit product
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    const formData = new FormData();

    // إضافة الصور إلى FormData
    imageUrls.forEach((file, index) => {
      formData.append(`image_${index}`, file);
    });

    // إضافة البيانات الأخرى إلى FormData
    Object.keys(productData).forEach((key) => {
      if (key !== "image") {
        formData.append(key, productData[key]);
      }
    });

    try {
      const response = await fetch(`${URL_Api}/${categoryId}/${productId}`, {
        method: "PUT",
        body: formData,
      });

      if (!response.ok) {
        notifyError("حدث خطأ غير متوقع");
        throw new Error("Network response was not ok");
      }

      notifySuccess("تم تعديل المنتج بنجاح!");
      setReloadEditForm(!reloadEditForm);
      setOnClose(!onClose);
      return response.json();
    } catch (error) {
      notifyError("حدث خطأ أثناء الإرسال");
      console.error("There was a problem with your fetch operation:", error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  if (!product) return <p>Loading...</p>;
  if (error) return <p className="text-red-500">{error}</p>;

  return (
    <div className={`fixed inset-0 ${onClose === showEditForm ? "flex" : "hidden"} items-center justify-center bg-gray-800 bg-opacity-50 z-50`}>
      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 rounded-lg shadow-lg w-full max-w-lg max-h-[80vh] overflow-y-auto"
      >
        <h2 className="text-xl font-semibold mb-4">تعديل المنتج</h2>

        {/* عرض الصور الحالية */}
        {productData.image.length > 0 && (
          <div className="mb-4">
            <h3 className="text-lg font-medium mb-2">Current Images:</h3>
            <div className="flex gap-4 flex-wrap">
              {productData.image.map((img, index) => (
                <div key={index} className="relative w-32 h-32 overflow-hidden rounded-lg shadow-md">
                  <img
                    src={img}
                    alt={`Image ${index + 1}`}
                    className="w-full h-full object-cover"
                  />
                </div>
              ))}
            </div>
          </div>
        )}

        <div className="mb-4 overflow-hidden">
          <label className="block text-gray-700 mb-2">العنوان:</label>
          <input
            type="text"
            name="address"
            value={productData.address}
            onChange={handleChange}
            required
            className="w-full px-3 py-2 border border-gray-300 rounded"
          />
        </div>

        <div className="relative mb-4">
          <label className="block text-gray-700 mb-2">التفاصيل:</label>
          <TextareaAutosize
            name="details"
            value={productData.details}
            onChange={handleChange}
            required
            className="w-full px-3 py-2 border border-gray-300 rounded resize both"
            rows="3"
          />
          {/* <div className="absolute bottom-0 right-0 w-4 h-4 bg-gray-300 cursor-nwse-resize"></div> */}
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 mb-2">السعر:</label>
          <input
            type="number"
            name="price"
            value={productData.price}
            onChange={handleChange}
            required
            className="w-full px-3 py-2 border border-gray-300 rounded"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 mb-2">عمولة المسوق:</label>
          <input
            type="text"
            name="commition"
            value={productData.commition}
            onChange={handleChange}        
            className="w-full px-3 py-2 border border-gray-300 rounded"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 mb-2">السعر بعد الخصم (اختياري):</label>
          <input
            type="number"
            name="newprice"
            value={productData.newprice}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded"
          />
        </div>
   {/* عرض الصور الجديده */}
   {imageUrls.length > 0 && (
   <div className="mb-4">
   <label className="block text-gray-700 mb-2">الصور:</label>
   <input
     type="file"
     id="images"
     multiple
     accept="image/*"
     onChange={handleImageChange}
     className="text-[#000] block w-full border border-gray-300 rounded-md px-4 py-3 leading-tight focus:outline-none focus:border-green-500 focus:ring-green-500"
   />
 </div>
        )}
        {previewImages.length > 0 && (
  <div className="mb-4">
    <h3 className="text-lg font-medium mb-2">معاينة الصور الجديدة:</h3>
    <div className="flex gap-4 flex-wrap">
      {previewImages.map((img, index) => (
        <div key={index} className="relative w-32 h-32 overflow-hidden rounded-lg shadow-md">
          <img
            src={img}
            alt={`Preview ${index + 1}`}
            className="w-full h-full object-cover"
          />
        </div>
      ))}
    </div>
  </div>
)}
        {/* <div className="mb-4">
          <label className="block text-gray-700 mb-2">الصور:</label>
          <TextareaAutosize
  minRows={3}
  ref ={imagesRef}
  type="text"
  id="images"
  placeholder="ادخل روابط الصور مفصولة بفواصل"
  onChange={handleImageChange}
  className="text-[#000] block w-full border border-gray-300 rounded-md px-4 py-3 leading-tight focus:outline-none focus:border-green-500 focus:ring-green-500"
/>
        </div> */}

        <div className="flex justify-end gap-4">
          <button
            type="submit"
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
          >
            تعديل المنتج
          </button>
          <button
            type="button"
            onClick={() => setOnClose(!onClose)}
            className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600"
          >
            إلغاء
          </button>
        </div>
        {isLoading && <div>
            <svg className="animate-spin h-5 w-5 bg-[#343] text-blue-500" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 1 1 16 0A8 8 0 0 1 4 12z"></path>
            </svg>
            </div>}
      </form>
    </div>
  );
};

export default EditForm;
