"use client"
// components/ConditionForm.js
import {useEffect, useState , useCallback} from 'react';
// import { useDropzone } from 'react-dropzone';
import Navebar from '../componant/navbar';
import { useSelector } from 'react-redux';
import { ToastContainer, toast , Flip } from 'react-toastify';
import { usePathname, useSearchParams } from 'next/navigation';

import 'react-toastify/dist/ReactToastify.css';

const ConditionForm = () => {
    const [usercode, setUsercode] = useState( typeof window !== 'undefined' ?localStorage.getItem('codeorderaffilate') || '':'');
    // const [err , setErr] = useState();
    const [commition , setcommition] = useState(0);
    const [delevary , setdelevary] = useState(0);
    const [quantuty , setquantuty] = useState();
    const [isLoading, setIsLoading] = useState(false);
    // const pathname = usePathname();
    const URL= process.env.NEXT_PUBLIC_API_URL
    const searchParams = useSearchParams();
    const query = searchParams.get('id');// get order id from cart



    const Products = useSelector(state => state.prodectData.carts);
    // console.log(Products);

    const filteredProduct = Products.filter((items , index)=>  items._id === query)
    // console.log(filteredProduct);
    // console.log(filteredProduct.length + "-----------------" );


    const notifySuccess = () => toast.success('تم إرسال البيانات بنجاح اذهب اللي التقارير لمتابعة الطلبات', {
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

const price = filteredProduct[0].newprice > 0 ? filteredProduct[0].newprice : filteredProduct[0].price;


const calculaterTotal = (parseFloat(price) * quantuty) + parseFloat(delevary) + parseFloat(commition);

  const [formData, setFormData] = useState({
    name: '',
    code: '',
    stateDetail: {
      clientname: '',
      phone: '',
      covernorate: '',
      city: '',
      productname: filteredProduct[0].address,
      productprece: price,
      productorder: delevary,
      quantuty :quantuty,
      commition: commition,
      total:  calculaterTotal || 0,
      notes: '',
      state: '',
      imagePaths: filteredProduct[0].image
    }
  });
 
  const governorates = [
    "القاهرة",
    "الجيزة",
    "الإسكندرية",
    "القليوبية",
    "الشرقية",
    "الغربية",
    "المنوفية",
    "البحيرة",
    "الفيوم",
    "المنيا",
    "أسيوط",
    "سوهاج",
    "قنا",
    "الأقصر",
    "أسوان",
    "الوادي الجديد",
    " بورسعيد",
    "الاسماعيليه",
    "دمياط",
    "السويس",
    "بني سويف",
    "الدقهليه",
    "كفرالشيخ"
    // يمكنك إضافة المزيد من المحافظات والمدن هنا
  ];

  // Update total whenever delevary or commition changes
  useEffect(() => {
    setquantuty(filteredProduct[0].quantity)
  }
    ,[])

  useEffect(() => {
    setFormData(prevData => ({
        ...prevData,
        stateDetail: {
            ...prevData.stateDetail,
            productorder: delevary,
            commition: commition,
            total : calculaterTotal,
            quantuty :quantuty,
        }
    }));
}, [delevary, commition, price , quantuty]);



  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name in formData.stateDetail) {
      setFormData({
        ...formData,
        stateDetail: {
          ...formData.stateDetail,
          [name]: value
        }
      });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };
 
  
//   const onDrop = useCallback((acceptedFiles) => {
//     const imagePaths = acceptedFiles.map((file) => URL.createObjectURL(file));
//     setFormData((prevData) => ({
//       ...prevData,
//       stateDetail: {
//         ...prevData.stateDetail,
//         imagePaths: [...prevData.stateDetail.imagePaths, ...imagePaths]
//       }
//     }));
//   }, []);

//   const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });



//   const imageBase64 = async () => {
//     const path = formData.stateDetail.imagePaths[0];
    
//     // قم بإنشاء عنصر صورة جديد
//     const img = new Image();
//     img.src = path;
  
//     // استخدم Promise للتأكد من تحميل الصورة بالكامل
//     return new Promise((resolve, reject) => {
//       img.onload = () => {
//         const canvas = document.createElement('canvas');
//         canvas.width = img.width;
//         canvas.height = img.height;
//         const ctx = canvas.getContext('2d');
//         ctx.drawImage(img, 0, 0);
//         resolve(canvas.toDataURL('image/jpeg'));
//       };
//       img.onerror = reject;
//     });
//   };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    
    // if (formData.stateDetail.imagePaths.length === 0) {
    //   setIsLoading(false);
    //   setErr(true);
    //   return;
    // }
  
    try {
    //   const imageBase64Data = await imageBase64();
  
      const requestData = {
        name: formData.name,
        code: usercode,
        stateDetail: {
          clientname: formData.stateDetail.clientname,
          phone: formData.stateDetail.phone,
          covernorate: formData.stateDetail.covernorate,
          city: formData.stateDetail.city,
          productname: formData.stateDetail.productname,
          productprece: formData.stateDetail.productprece,
          productorder: formData.stateDetail.productorder,
          quantity: formData.stateDetail.quantuty,
          commition: formData.stateDetail.commition,
          total: formData.stateDetail.total,
          notes: formData.stateDetail.notes,
          state: formData.stateDetail.state,
          imagePaths: formData.stateDetail.imagePaths[0]// إضافة الصور المحولة إلى Base64
        }
      };
  
      const response = await fetch(`${URL}/condition`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(requestData)
      });
  
      if (response.ok) {
        notifySuccess();
        setFormData({
          name: '',
          code: '',
          stateDetail: {
            clientname: '',
            phone: '',
            covernorate: '',
            city: '',
            productname: '',
            productprece: '',
            productorder: '',
            quantuty: 1,
            commition: '',
            total: '',
            notes: '',
            state: '',
            imagePaths: []
          }
        });
      } else {
        const errorData = await response.json();
        alert(`حدث خطأ أثناء إرسال البيانات: ${errorData.message || response.statusText}`);
      }
    } catch (error) {
      notifyError();
    } finally {
      setIsLoading(false);
    }
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
    <Navebar/>
    
    


{filteredProduct.length > 0 && filteredProduct.map((filteredProduct)=>(
    <div className="mt-[30px] bg-gray-50 dark:bg-gray-800  flex flex-col items-center justify-start p-6">
      <div className="max-w-4xl w-full bg-white shadow-xl dark:shadow-none dark:bg-gray-900 rounded-lg overflow-hidden">
        <div className="flex flex-col md:flex-row gap-8 p-6">
          <div className="flex-1">
            <h2 className="text-3xl font-bold text-gray-800 dark:text-white">
              {filteredProduct.address}
            </h2>
            <p className={`text-gray-700 text-[24px] ${filteredProduct.newprice > 0 ? 'line-through text-red-500' : ''}`}>
        السعر: ج{filteredProduct.price}
      </p>
      {filteredProduct.newprice > 0 &&
                    <div className='flex justify-around'>
                        <p className="text-gray-700 font-bold text-[24px] ">السعر: ج{filteredProduct.newprice}</p>
                           
                           <p className='font-bold bg-[#f82525] p-1 text-[#fafafa]'>{((filteredProduct.price - filteredProduct.newprice) / filteredProduct.price *100).toFixed(0)}%</p>
                           
                         </div>  
                           } 
            
            <div
              className={`max-w-screen-sm text-gray-600 dark:text-gray-300 mt-6 p-6 rounded-lg transition-all 
        "bg-green-200 hover:bg-gray-300 dark:hover:bg-gray-600`} 
              style={{ cursor: "pointer" }}
            >
              {filteredProduct.details}
            </div>
            <div className="mt-2">
            </div>
          </div>
          <div className="flex-1 grid grid-cols-2 gap-6">
            {filteredProduct.image.map((image, idx) => (
              <div
                key={idx}
                className="group relative h-48 md:h-64 rounded-lg overflow-hidden shadow-lg transition-transform transform-gpu hover:scale-110"
              >
                <img
                  src={image}
                  loading="lazy"
                  alt={`Product image ${idx}`}
                  className="absolute inset-0 w-full h-full object-cover object-center"
                />
                <div
                  className="absolute inset-0 bg-gradient-to-t from-gray-800 via-transparent to-transparent opacity-50"
                />
                
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
))}

<form onSubmit={handleSubmit} className="w-[95%] md:max-w-xl mx-auto p-6 bg-gray-100 shadow-md rounded-lg">
      <div className="mb-4">
        <label className="block text-gray-700">اسم المسوق</label>
        <input
          type="text"
          name="name"
          required
          value={formData.name}
          onChange={handleChange}
          className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>
      <div className="mb-4">
        <label className="block text-gray-700">الكود</label>
        <input
          required
          type="text"
          name="code"
          value={usercode}
          onChange={handleChange}
          className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>
      <div className="mb-4">
        <label className="block text-gray-700">اسم العميل</label>
        <input
          required
          type="text"
          name="clientname"
          value={formData.stateDetail.clientname}
          onChange={handleChange}
          className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>
      <div className="mb-4">
        <label className="block text-gray-700">الهاتف</label>
        <input
          required
          type="text"
          name="phone"
          value={formData.stateDetail.phone}
          onChange={handleChange}
          className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>
      <div className="mb-4">
        <label className="block text-gray-700">المحافظة</label>
        <select
        required
          name="covernorate"
          value={formData.stateDetail.covernorate}
          onChange={handleChange}
          className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="">اختر المحافظة</option>
          {governorates.map((governorate, index) => (
            <option key={index} value={governorate}>{governorate}</option>
          ))}
        </select>
      </div>
      <div className="mb-4">
        <label className="block text-gray-700">العنوان بالتفصيل</label>
        <input
        required
          name="city"
          value={formData.stateDetail.city}
          onChange={handleChange}
          className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

 
      <div className="mb-4">
        <label className="block text-gray-700">الكميه</label>
        <input
        required
          type="number"
          name="quantuty"
          value={formData.stateDetail.quantuty}
          onChange={(e)=>{
            setquantuty(e.target.value)
          }}
          className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>
  
      <div className="mb-4">
        <label className="block text-gray-700"> سعر الشحن</label>
        <input
        required
          type="number"
          name="productorder"
          value={delevary}
          onChange={(e)=>{
            setdelevary(e.target.value)
          }}
          className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>
       
      <div className="mb-4">
        <label className="block text-gray-700">العمولة</label>
        <input
        required
          type="number"
          name="commition"
          value={commition}
          onChange={(e)=>{
            setcommition(e.target.value)
          }}
          className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>
      <div className="mb-4">
        <label className="block text-gray-700">الاجمالي شامل العموله والشحن</label>
        <input
        required
          type="number"
          name="total"
          value={formData.stateDetail.total}
          onChange={handleChange}
          className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>
      <div className="mb-4">
        <label className="block text-gray-700">ملاحظات ( اختياري )</label>
        <input    
          type="text"
          name="notes"
          value={formData.stateDetail.notes}
          onChange={handleChange}
          className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>
      
      {isLoading ? (
        <p className="text-gray-700 font-bold">جاري ارسال البيانات...</p>
    ) : (
        <button type="submit" className="w-full bg-blue-600 text-white px-3 py-2 rounded hover:bg-blue-700">
        إرسال
      </button>
    )}
    </form>
    </>
  );
};

export default ConditionForm;


