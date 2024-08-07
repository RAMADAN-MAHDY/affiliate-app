'use client'
import OrderStatus from '@/app/componant/orderStatus';
import { useState, useEffect, Suspense } from 'react';
import Navebar from "@/app/componant/navbar";
// import Loading from '../../loading';
import dynamic from 'next/dynamic';
import { ToastContainer, toast , Flip } from 'react-toastify';

const DataComponent = ({ params }) => {

    const Loading = dynamic(()=> import('@/app/loading') , {
        ssr : false,
    });

//   console.log(params.sluge);
const [usercode, setUsercode] = useState( typeof window !== 'undefined' ?localStorage.getItem('codeorderaffilate') || '':'');
  const [showCashNumber , setshowCashNumber ] = useState(false) 
  const [data, setData] = useState(null);
  const [commitionreq, setcommitionreq] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');
  const [hiddenBut, setHiddenBut] = useState({});

  const URL= process.env.NEXT_PUBLIC_API_URL
//   console.log(params.sluge);
//   console.log(usercode);
//   console.log(data);

  const notifySuccess = () => toast.success('تم ارسال الطلب  بنجاح!', {
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

  const notifyError = () => toast.error('يوجد خطا برجاء التاكد من النت  او رقم الكاش  ', {
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



  
//   console.log(data)
//   useEffect(()=>{
//   console.log(commitionreq)
//   },[commitionreq])
  //handle hiddenButData
  useEffect(() => {
    const hiddenButData = JSON.parse(localStorage.getItem('hiddenbut')) || {};
    setHiddenBut(hiddenButData);
    console.log(hiddenButData)
    // localStorage.removeItem("hiddenbut")
  }, []);

  useEffect(() => {
    if (showCashNumber) {
      const div = document.getElementById('cashNumberDiv');
      div.style.opacity = 0;
      div.style.transform = 'translate(-50%, -50%)';
      setTimeout(() => {
        div.style.transition = 'opacity 0.5s, transform 0.5s';
        div.style.opacity = 1;
        div.style.transform = 'translate(-50%, -50%)';
      }, 0);
    }
  }, [showCashNumber]);


  const handlecommitionreq = async (id)=>{

    try {
    // console.log(commitionreq)

    // console.log(id)
    const isValid = /^[0-9]{11}$/.test(commitionreq);

       if(isValid){
        const response = await fetch(`${URL}/condition/${usercode}/${id}`, {
            method: 'PUT',
            headers: {
              'Content-Type': 'application/json'
            },
          body: JSON.stringify({commitionreq}) // إرسال البيانات كجسم JSON
          });
  
          if (response.ok) {
            notifySuccess();
            setError('')
            setshowCashNumber(false)
            const updatedHiddenBut = { ...hiddenBut, [id]: true };
            setHiddenBut(updatedHiddenBut);
            localStorage.setItem('hiddenbut', JSON.stringify(updatedHiddenBut));
            setcommitionreq('')
          } else {
            const errorData = await response.json();
            notifyError();
            alert(`حدث خطأ أثناء إرسال البيانات: ${errorData.message || response.statusText}`);
          }
       }else{
        setError(' ملاحظه: يجب أن يتكون من 11 رقم ويحتوي على أرقام فقط');
       }
       
      } catch (error) {
        notifyError();
        console.error(error);
      }

  }

  useEffect(() => {
    const fetchData = async () => {
      try {
        //https://api-order-form.onrender.com
        const response = await fetch(`${URL}/condition/${usercode}`);
        const responseData = await response.json();
        setData(responseData);
        setIsLoading(false);
        // console.log(responseData);
      } catch (error) {
        console.error('Error fetching data:', error);
        setIsLoading(false);

      }
    };

    fetchData();
  }, [params]);
 



  return (
    <div className={`${!data && "bg-[#515251fa]"}bg-[#515251fa] min-h-screen`} >
       
            <Navebar/>     
       
  {/* <div className="mb-3 self-center border border-gray-400 rounded-lg p-4 group hover:bg-white bg-gradient-to-br from-red-500 to-blue-500 via-green-500">

<p className="text-center bg-clip-text bg-gradient-to-br from-red-500 to-blue-500 via-green-500 text-[#fff] hover:text-white animate-pulse">
  El mahdy
</p>
</div> */}


     <Suspense fallback={<Loading/>}>
      {isLoading ? (
      
      <Loading/>
   

      ) :  data !== null ? (
        <div className='m-3'>
               
          <p className='bg-[#eceaea] p-6 text-[#000000] font-bold text-[24px] font-serif'>Name: <span className='text-[#000000dc] font-bold text-[24px] font-serif'> {data[0].name}  </span>    </p>
          <p className='bg-[#e6e0e0] p-6 text-[#000000] font-bold text-[24px] font-serif'>Code:  <span className='text-[#000000ea] font-bold text-[24px] font-serif' >  {data[0].code}  </span>   </p>
          <div className="overflow-x-auto">
            <table className="table-auto w-full border-collapse border border-gray-800 -z-0">
              <thead>
                <tr>
                  <th className="border border-gray-800 px-4 py-2">اسم العميل</th>
                  <th className="border border-gray-800 px-4 py-2">رقم الهاتف</th>
                  <th className="border border-gray-800 px-4 py-2">المحافظه</th>
                  <th className="border border-gray-800 px-4 py-2">العنوان</th>
                  <th className="border border-gray-800 px-4 py-2">اسم المنتج</th>
                  <th className="border border-gray-800 px-4 py-2">سعر المنتج</th>
                  <th className="border border-gray-800 px-4 py-2">الكميه</th>
                  <th className="border border-gray-800 px-4 py-2">الشحن</th>
                  <th className="border border-gray-800 px-4 py-2">العموله</th>
                  <th className="border border-gray-800 px-4 py-2">اجمالي السعر</th>
                  <th className="border border-gray-800 px-4 py-2"> طلب العموله </th>
                  {/* <th className="border border-gray-800 px-4 py-2">الصور</th> */}
                </tr>
              </thead>
              <tbody>
                {
                data.map(data=>(          
                data.conditions.map((rowData, index) => (
                    <>
                  <tr key={rowData._id} className={`${index % 2 === 0 ? 'bg-gray-100' : 'bg-gray-200'}`}>
                    <td className="border border-gray-800 px-4 py-2">{rowData.clientname}</td>
                    <td className="border border-gray-800 px-4 py-2">{rowData.phone}</td>
                    <td className="border border-gray-800 px-4 py-2">{rowData.covernorate}</td>
                    <td className="border border-gray-800 px-4 py-2">{rowData.city}</td>
                    <td className="border border-gray-800 px-4 py-2">{rowData.productname}</td>
                    <td className="border border-gray-800 px-4 py-2">{rowData.productprece}</td>
                    <td className="border border-gray-800 px-4 py-2">{rowData.quantity}</td>
                    <td className="border border-gray-800 px-4 py-2">{rowData.productorder}</td>
                    <td className="border border-gray-800 px-4 py-2">{rowData.commition}</td>
                    <td className="border border-gray-800 px-4 py-2">{rowData.total}</td>
                    {rowData.state === "3"  ?  <td className="border border-gray-800 px-4 py-2"> 
                    <button className={`bg-[#40d151] p-2 rounded-2xl hover:bg-[#2b8936] hover:text-[#fff] ${hiddenBut[rowData._id]&&"bg-[#000000]"}`} disabled={hiddenBut[rowData._id]}  onClick={()=>{
                        handlecommitionreq(rowData._id)
                        setshowCashNumber(true)
                    }}>
                      {hiddenBut[rowData._id] ?  "تم الطلب":" طلب العموله"}  
                    </button>
                    
                    </td>  :  <td className="border border-gray-800 px-4 py-2"></td> }
                
                     {/* <img src={rowData.imagePaths[0]} alt="Product" /> */}
                  </tr>
                  <tr>
                        <td colSpan="12" className="p-4">
                          <div className="min-w-screen p-6">
                            <OrderStatus currentStatus={rowData.state} />
                          </div>
                        </td>
                      </tr>

                  </>
                ))
            )) 
             }

              </tbody>
            </table>
             {showCashNumber &&           <div id="cashNumberDiv" className="bg-[#bfd93b] fixed top-[10%] left-1/2 z-10 p-3 rounded-s-2xl rounded-b-full transform -translate-x-1/2 -translate-y-1/2 opacity-0">
<p className='pr-1'>
منفضلك ادخل رقم الكاش اولا ثم اضغط طلب العموله
</p>

        {error && <p className='text-[#ff0c0c]'>{error}</p>}
        <input
          className='m-3 mr-[20%] p-1 rounded-2xl w-[125px]'
          placeholder='رقم الكاش'
          onChange={(event) => {
            const values = event.target.value;
            setcommitionreq(values);
          }}
        />
      </div>}
            {/* <MyComponent/> */}
          </div>
        </div>
      ) : (
        
            <p className=' font-bold text-[40px] ml-[40%]'>لا يوجد تقارير لعرضها    </p>
      )}

      </Suspense>

    </div>
  );
};

export default DataComponent;
