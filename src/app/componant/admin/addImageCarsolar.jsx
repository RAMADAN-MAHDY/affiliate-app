'use client'
import { useState } from "react";
import { ToastContainer, toast , Flip } from 'react-toastify';
import Compressor from 'compressorjs';

import 'react-toastify/dist/ReactToastify.css';

const AddImageToCarousel = () => {
  const [images, setImages] = useState([]);
  const [label, setlabel] = useState('');
  const [caption, setcaption] = useState('');
  const [isloading, setisloading] = useState(false);

  const notifySuccess = () => toast.success('تم إضافة المنتج بنجاح!', {
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

  const notifyError = () => toast.error('يوجد خطا برجاء التاكد من النت ومن كل الحقول ', {
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

  const data = {
    label,
    image : images,
    caption,
  }


  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    const imagePromises = files.map(file => {
      return new Promise((resolve, reject) => {
        new Compressor(file, {
          quality: 0.8, // نسبة الجودة (0-1)
          success(result) {
            const reader = new FileReader();
            reader.onload = () => resolve(reader.result);
            reader.onerror = error => reject(error);
            reader.readAsDataURL(result);
          },
          error(err) {
            reject(err);
          }
        });
      });
    });
  
    Promise.all(imagePromises)
      .then(imagesData => {
        const base64Images = imagesData.map(imageData => imageData);
        setImages(base64Images);
      })
      .catch(error => console.error(error));
  };
  

  
  const postData = async (data) => {
    try {
      const response = await fetch(`http://localhost:5000/api/image`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      return response.json();
    } catch (error) {
      console.error('There was a problem with your fetch operation:', error);
      throw error;
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setisloading(true)
    // يمكنك هنا تنفيذ عملية إرسال البيانات إلى الخادم أو أي إجراء آخر
    console.log(data);
    if(images.length ===0 ){
    console.log(images.length);
        setisloading(false);
        return null;
    }
    postData(data)
    .then((response) => {
      console.log(response.message ==="تم تحميل الصوره بنجاح" 
  );
      if (response.message ==="تم تحميل الصوره بنجاح" ) {
        console.log("done");
        setImages([]);
        setlabel('');
        setcaption('');
        notifySuccess();
        setisloading(false);
      } else {
          notifyError();
        setisloading(false);

        throw new Error('Network response was not ok');
      }
    })
    .catch((error) => {
        setisloading(false);
        notifyError();
      console.error('There was a problem with your fetch operation:', error);
    });
  };

  return (
    <>
        <ToastContainer
position="top-right"
autoClose={3000}
hideProgressBar={false}
newestOnTop={false}
closeOnClick
rtl={false}
pauseOnFocusLoss
draggable
pauseOnHover
theme="light"
transition={Flip}
/>
   
    <form onSubmit={handleSubmit} className="bg-white shadow-md rounded-md p-8">
      <div className="mb-6">
        <label htmlFor="images" className="block text-gray-700 font-semibold mb-2">Images (3 to 4 images):</label>
        <input
          type="file"
          id="images"
          accept="image/*"
          multiple
          onChange={handleImageChange}
          required
          className="text-[#000] block w-full border border-gray-300 rounded-md px-4 py-3 leading-tight focus:outline-none focus:border-green-500 focus:ring-green-500"
        />
        {images.length > 0 && (
          <div className="mt-2 grid grid-cols-3 gap-2">
            {images.map((image, index) => (
              <img
                key={index}
                src={image}
                alt={`Image ${index + 1}`}
                className="w-full h-auto object-cover rounded-md"
              />
            ))}
          </div>
        )}
      </div>
      <div className="mb-6">
        <label htmlFor="caption" className="block text-gray-700 font-semibold mb-2">العنوان :</label>
        <input
          type="text"
          id="caption"
          value={caption}
          onChange={(e) => setcaption(e.target.value)}
          className="text-[#000] block w-full border border-gray-300 rounded-md px-4 py-3 leading-tight focus:outline-none focus:border-green-500 focus:ring-green-500"
        />
      </div>

      <div className="mb-6">
        <label htmlFor="label" className="block text-gray-700 font-semibold mb-2">التفاصيل :</label>
        <input
          type="text"
          id="label"
          value={label}
          onChange={(e) => setlabel(e.target.value)}
          className="text-[#000] block w-full border border-gray-300 rounded-md px-4 py-3 leading-tight focus:outline-none focus:border-green-500 focus:ring-green-500"
        />
      </div>
      {isloading ? <p className=""> جاري الارسال </p> :
        <button type="submit" className="bg-green-500 hover:bg-green-600 text-white font-semibold py-3 px-6 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-50">Add Product</button>
      }
      
    </form>
    </>
  );
};

export default AddImageToCarousel;
