'use client'
import { useEffect, useState } from "react";
import { ToastContainer, toast, Flip } from 'react-toastify';
// import Compressor from 'compressorjs';

import 'react-toastify/dist/ReactToastify.css';

const AddImageToCarousel = () => {

    const URL_Api = process.env.NEXT_PUBLIC_API_URL

    const [images, setImages] = useState([]);
    // const [label, setlabel] = useState('');
    // const [caption, setcaption] = useState('');
    const [isloading, setisloading] = useState(false);
    const [client, setClient] = useState(false);



   useEffect(() => {
        if (typeof window !== 'undefined') {
            setClient(true);
        }
   }, []);





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




    //   const handleImageChange = (e) => {
    //     const files = Array.from(e.target.files);
    //     const imagePromises = files.map(file => {
    //       return new Promise((resolve, reject) => {
    //         new Compressor(file, {
    //           quality: 0.8, // نسبة الجودة (0-1)
    //           success(result) {
    //             const reader = new FileReader();
    //             reader.onload = () => resolve(reader.result);
    //             reader.onerror = error => reject(error);
    //             reader.readAsDataURL(result);
    //           },
    //           error(err) {
    //             reject(err);
    //           }
    //         });
    //       });
    //     });

    //     Promise.all(imagePromises)
    //       .then(imagesData => {
    //         const base64Images = imagesData.map(imageData => imageData);
    //         setImages(base64Images);
    //       })
    //       .catch(error => console.error(error));
    //   };


    // التعامل مع الصور من خلال إدخال الروابط مباشرة

    // const handleImageChange = (e) => {
    //     const value = e.target.value;

    //     const imageUrls = value.split(',').map(url => url.trim());
    //     setImages(imageUrls);
    //   };

    const handleImageChange = (e) => {
        setImages(e.target.files);
    };



    const postData = async () => {
        try {
            const formData = new FormData();

            for (let i = 0; i < images.length; i++) {
                formData.append('images', images[i]); // backend لازم يستقبل الصور تحت اسم "images"
            }

            const response = await fetch(`${URL_Api}/image`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: formData,
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
        // console.log(data);
        if (images.length === 0) {
            // console.log(images.length);
            setisloading(false);
            return null;
        }
        postData().then((response) => {
            if (response.message === "تم تحميل الصوره بنجاح") {
                // console.log("done");
                setImages([]);
                // setlabel('');
                // setcaption('');
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

    if (!client) {
        return null; 
    }


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
                    <label className="block text-gray-700 mb-2">الصور:</label>
                    <input
                        type="file"
                        id="images"
                        multiple
                        accept="image/*"
                        onChange={handleImageChange}
                        className="text-[#000] block w-full border border-gray-300 rounded-md px-4 py-3 leading-tight focus:outline-none focus:border-green-500 focus:ring-green-500"
                    />
                    {images?.length > 0 && (
                        <div className="mt-2 grid grid-cols-3 gap-2">
                            {Array.from(images).map((img, index) => (
                                img instanceof File && (
                                    <img
                                        key={index}
                                        src={URL.createObjectURL(img)}
                                        alt={`Image ${index + 1}`}
                                        className="w-full h-auto object-cover rounded-md"
                                    />


                                )
                            ))}
                        </div>
                    )}
                </div>
                {/* <div className="mb-6">
                    <label htmlFor="caption" className="block text-gray-700 font-semibold mb-2">العنوان :</label>
                    <input
                        type="text"
                        id="caption"
                        value={caption}
                        onChange={(e) => setcaption(e.target.value)}
                        className="text-[#000] block w-full border border-gray-300 rounded-md px-4 py-3 leading-tight focus:outline-none focus:border-green-500 focus:ring-green-500"
                    />
                </div> */}

                {/* <div className="mb-6">
                    <label htmlFor="label" className="block text-gray-700 font-semibold mb-2">التفاصيل :</label>
                    <input
                        type="text"
                        id="label"
                        value={label}
                        onChange={(e) => setlabel(e.target.value)}
                        className="text-[#000] block w-full border border-gray-300 rounded-md px-4 py-3 leading-tight focus:outline-none focus:border-green-500 focus:ring-green-500"
                    />
                </div> */}
                {isloading ? <p className=""> جاري الارسال </p> :
                    <button type="submit" className="bg-green-500 hover:bg-green-600 text-white font-semibold py-3 px-6 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-50">Add Product</button>
                }

            </form>
        </>
    );
};

export default AddImageToCarousel;
