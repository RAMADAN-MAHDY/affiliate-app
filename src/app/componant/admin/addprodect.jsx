'use client'
import { useState , useEffect , useRef} from "react";
import { ToastContainer, toast , Flip } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import TextareaAutosize from 'react-textarea-autosize';
const AddProduct = () => {

    const URL= process.env.NEXT_PUBLIC_API_URL
    
  const imagesRef = useRef(null);
  const [productName, setProductName] = useState("");
  const [images, setImages] = useState([]);
  const [details, setDetails] = useState("");
  const [price, setPrice] = useState(0);
  const [commition, setcommition] = useState('');
  const [newprice, setnewprice] = useState(0);
  const [category, setcategory] = useState('1');
  const [isClient, setIsClient] = useState(false)
//   const [isOpen, setIsOpen] = useState(false);
//   console.log(typeof(category) );
//   console.log(category);
//   console.log(error);


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
//             setImages(base64Images);
//         })
//         .catch(error => console.error(error));
// };

const handleImageChange = (e) => {
    const value = e.target.value;

    const imageUrls = value.split(',').map(url => url.trim());
    setImages(imageUrls);
  };
  
   
  const data = {
    address: productName,
   image : images,
   details: details,
   price: price,
   commition:commition,
   newprice :newprice,
  }

  const postData = async (data) => {
    try {
      const response = await fetch(`${URL}/products/${category}`, {
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
//   console.log(category);

    e.preventDefault();
    // هنا يمكنك إرسال البيانات إلى خادم أو القيام بالإجراء المناسب
//    console.log(images);
   if (!images || !productName || !details || !price ) {
    return notifyError();
  }
  postData(data)
  .then((response) => {
    console.log(response.message ==="تم انشاء المنتج بنجاح"
);
    if (response.message ==="تم انشاء المنتج بنجاح") {
    //   console.log("done");
      setProductName('');
      setImages([]);
      setDetails('');
      setPrice(0);
      setnewprice(0);
    //   setIsOpen(true);
    if (imagesRef.current) {
        imagesRef.current.value = '';
      }
      notifySuccess();
    } else {
        notifyError();
      throw new Error('Network response was not ok');
    }
  })
  .catch((error) => {
    console.error('There was a problem with your fetch operation:', error);
  });
  };


  useEffect(() => {
    setIsClient(true)
  }, [])

  if(!isClient){
    return null ;
  }



  return (
    <>

<div>
      {/* <button onClick={ notifySuccess}>افتح الـ Popup</button> */}
    </div>
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
        <label htmlFor="productName" className="block text-gray-700 font-semibold mb-2">Product address:</label>
        <input
          type="text"
          id="productName"
          value={productName}
          onChange={(e) => setProductName(e.target.value)}
          required
          className="text-[#000] block w-full border border-gray-300 rounded-md px-4 py-3 leading-tight focus:outline-none focus:border-green-500 focus:ring-green-500"
        />
      </div>

      <div className="mb-6">
        <label htmlFor="images" className="block text-gray-700 font-semibold mb-2">Images (3 to 4 images):</label>
       <TextareaAutosize
  rows="3"
  type="text"
  id="images"
  placeholder="ادخل روابط الصور مفصولة بفواصل"
  onChange={handleImageChange}
  ref={imagesRef}
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
        <label htmlFor="details" className="block text-gray-700 font-semibold mb-2">Details:</label>
        <TextareaAutosize
          id="details"
          value={details}
          onChange={(e) => setDetails(e.target.value)}
          required
          minRows={3}
          className="text-[#000] block w-full border border-gray-300 rounded-md px-4 py-3 leading-tight focus:outline-none focus:border-green-500 focus:ring-green-500"
        />
      </div>

      <div className="mb-6">
        <label htmlFor="price" className="block text-gray-700 font-semibold mb-2">Price:</label>
        <input
          type="number"
          id="price"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          required
          className="text-[#000] block w-full border border-gray-300 rounded-md px-4 py-3 leading-tight focus:outline-none focus:border-green-500 focus:ring-green-500"
        />
      </div>

      <div className="mb-6">
        <label htmlFor="commition" className="block text-gray-700 font-semibold mb-2">commition:</label>
        <input
          type="text"
          id="commition"
          value={commition}
          onChange={(e) => setcommition(e.target.value)}
          required
          className="text-[#000] block w-full border border-gray-300 rounded-md px-4 py-3 leading-tight focus:outline-none focus:border-green-500 focus:ring-green-500"
        />
      </div>
      <div className="mb-6">
        <label htmlFor="newprice" className="block text-gray-700 font-semibold mb-2">newprice:</label>
        <input
          type="number"
          id="newprice"
          value={newprice}
          onChange={(e) => setnewprice(e.target.value)}
          className="text-[#000] block w-full border border-gray-300 rounded-md px-4 py-3 leading-tight focus:outline-none focus:border-green-500 focus:ring-green-500"
        />
      </div>
      <select id="category" className="m-2 p-2 " onChange={(e)=>setcategory(e.target.value) }>
  <option value="1"> الكترونيات</option>
  <option value="2">ملابس </option>
  <option value="3">ادوات منزليه</option>
  <option value="4">منتجات اوت دور</option>
  <option value="5">  ستائر و مفروشات</option>
  <option value="منوعات">منوعات
    </option>
     </select>
     {category !== "1" && category !== "2" && category !== "3" && category !== "4" && category !== "5" && <input placeholder="ادخل نوع الفئة او الصنف" onChange={(e)=>setcategory(e.target.value)} required/> }
     
      <button type="submit" className="bg-green-500 hover:bg-green-600 text-white font-semibold py-3 px-6 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-50">Add Product</button>
    </form>
    </>
  );
};

export default AddProduct;
