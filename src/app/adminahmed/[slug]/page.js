'use client';
import { useState, useEffect } from 'react';
import {notFound} from "next/navigation"
import { format } from 'date-fns';
import ImageHoverEffect from '@/app/adminahmed/imageHover';

const TableAdmin = ({ params })=>{

    const [data, setData] = useState([]);

    // console.log(data.code)
    // console.log(params.slug)
    const [isLoading, setIsLoading] = useState(true);

    const [selectedOptions, setSelectedOption] = useState({});

    const [sendreqIsfiled, setsendreqIsfiled] = useState({});
    const [commition , setcommition] = useState({});
    const [getcommition , setgetcommition] = useState([]);
    console.log(getcommition)
  
   // handle PUT fetch state 
   const handleUpdateStatus = async (id, code) => {
    try {
        let state;
        if (sendreqIsfiled[id]) {
            state = Object.values(sendreqIsfiled[id]).join("");
        } else { state = Object.values(selectedOptions[id]).join("") }

        console.log(state)
        const response = await fetch(`https://api-order-form.onrender.com/condition/state/${code}/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ state }) // إرسال البيانات كجسم JSON
        });
        if (response.ok) {
            alert('تم ارسال الطلب');


        } else {
            const errorData = await response.json();
            alert(`حدث خطأ أثناء إرسال البيانات: ${errorData.message || response.statusText}`);
        }
    } catch (error) {
        alert(`فشل في إرسال البيانات: ${error.message}`);
    }


}

  // handle PUT fetch state 
  const handleGetCommition = async () => {
    try {
        const response = await fetch(`https://api-order-form.onrender.com/Commitionschma`);
        const responseData = await response.json();
        // console.log(responseData)
        setgetcommition(responseData);
    } catch (error) {
        alert(`فشل في استلام البيانات: ${error.message}`);
    }
};


const handleUpdateCommition = async (id) => {
    try {
        const commitionValue = commition[id];
        if (!commitionValue) {
            alert('الرجاء إدخال العمولة');
            return;
        }

        const response = await fetch(`https://api-order-form.onrender.com/Commitionschma`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ id, commition: commitionValue }) // إرسال البيانات كجسم JSON
        });

        if (response.ok) {
            alert('تم ارسال الطلب');
        } else {
            const errorData = await response.json();
            alert(`حدث خطأ أثناء إرسال البيانات: ${errorData.message || response.statusText}`);
        }

       
    } catch (error) {
        alert(`فشل في إرسال البيانات: ${error.message}`);
    }
}



const handleOptionChange = async (event, id, code) => {
    setSelectedOption(prevOptions => ({
        ...prevOptions,
        [id]: event.target.value
    }));

};
   // handle input state if shwose "ملغي"  
   const handleInputChange = (event, id) => {
    setsendreqIsfiled(prevOptions => ({
        ...prevOptions,
        [id]: event.target.value
    }));
};

useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`https://api-order-form.onrender.com/condition/${params.slug}`);
        const responseData = await response.json();
        setData(responseData);
        setIsLoading(false);

        if(!responseData.ok){
            notFound();
        }
        // console.log(responseData);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    fetchData();
    handleGetCommition();
  }, [params]);


  if (isLoading) {
    return <div>Loading...</div>;
}
return(

<div className="overflow-x-auto ">
<table className="table-auto w-full border-collapse border border-gray-800">
    <thead>
        <tr className='text-[#32ff46] bg-[#433]' key={params.slug}>
            <th className="border border-gray-800 px-4 py-2">اسم العميل</th>
            <th className="border border-gray-800 px-4 py-2">رقم الهاتف</th>
            <th className="border border-gray-800 px-4 py-2">المحافظه</th>
            <th className="border border-gray-800 px-4 py-2 max-w-[400px] min-w-[300px]">العنوان</th>
            <th className="border border-gray-800 px-4 py-2">اسم المنتج</th>
            <th className="border border-gray-800 px-4 py-2">سعر المنتج</th>
            <th className="border border-gray-800 px-4 py-2 min-w-[30px] m-0 text-center">الكميه</th>
            <th className="border border-gray-800 px-4 py-2">الشحن</th>
            <th className="border border-gray-800 px-4 py-2 w-[30px]">العموله</th>
            <th className="border border-gray-800 px-4 py-2">اجمالي السعر</th>
            <th className="border border-gray-800 px-4 py-2">حالة الطلب</th> <th className="border border-gray-800 px-4 py-2">التاريخ </th>
            <th className="border border-gray-800 px-4 py-2">طلب العموله </th>
            <th className="border border-gray-800 px-4 py-2"> ملاحظه </th>
            <th className="border border-gray-800 px-4 py-2"> عمولتنا </th>
            <th className="border border-gray-800 px-4 py-2">الصور</th>
        </tr>
    </thead>
    <tbody key={params.slug} >
        {data.conditions ? data.conditions.map((rowData, rowIndex) => (
            <tr key={`${rowData._id}-${rowIndex}`} className={`${rowIndex % 2 === 0 ? 'bg-gray-100' : 'bg-gray-200'}`}>
                <td className="border border-gray-800 px-4 py-2">{rowData.clientname}</td>
                <td className="border border-gray-800 px-4 py-2">{rowData.phone}</td>
                <td className="border border-gray-800 px-4 py-2 ">{rowData.covernorate}</td>
                <td className="border border-gray-800 px-4 py-2 max-w-[400px] break-words">{rowData.city}</td>

                <td className="border border-gray-800 px-4 py-2">{rowData.productname}</td>
                <td className="border border-gray-800 px-4 py-2">{rowData.productprece}</td>
                <td className="border border-gray-800 px-4 py-2">{rowData.quantity}</td>
                <td className="border border-gray-800 px-4 py-2">{rowData.productorder}</td>
                <td className="border border-gray-800 px-4 py-2">{rowData.commition}</td>
                <td className="border border-gray-800 px-4 py-2">{rowData.total}</td>
                <td className="border border-gray-800 px-4 py-2 text-[#5d11ff]">    <span className='text-[#fd3737]' >{rowData.state}</span>

                    <div>
                        <label htmlFor={`options-${rowData._id}`}>اختر خيارًا:</label>
                        <select className='rounded-2xl p-1 '
                            id={`options-${rowData._id}`}
                            value={selectedOptions[rowData._id] || ''}
                            onChange={(event) => handleOptionChange(event, rowData._id, data.code)}
                        >
                            <option value="">اختر...</option>
                            <option value="قيد المراجعه"> قيد المراجعه</option>
                            <option value="تم قبول الطلب"> تم قبول الطلب</option>
                            <option value="جاري التوصيل"> جاري التوصيل</option>
                            <option value="تم التسليم">  تم التسليم</option>
                            <option value="تم القبض">  تم القبض</option>
                            <option value="(خصم العموله)ملغي">   (خصم العموله)ملغي </option>
                        </select>
                        {
                            selectedOptions[rowData._id] === '(خصم العموله)ملغي' &&
                            <input className='p-2 rounded-2xl' type='text' placeholder='ملغي ' value={sendreqIsfiled[rowData._id] || ''} onChange={
                                (event) => handleInputChange(event, rowData._id, data.code)}
                            />

                        }

                        <button className=' bg-[#12e512df] p-2 rounded-2xl m-1' onClick={() => handleUpdateStatus(rowData._id, data.code)}>تحديث الحالة</button>
                    </div>
                </td>
                <td className="border border-gray-800 px-4 py-2">{format(rowData.timestamp, 'MM-dd   hh:mm a')}</td>

                <td className="border border-gray-800 px-4 py-2 text-[#ff3a3a]">{rowData.commitionreq}</td>
                <td className="border border-gray-800 px-4 py-2 text-[#ff3a3a]">{rowData.notes}</td>
                <td className="border border-gray-800 px-4 py-2 text-[#ff3a3a]">
                <input
    className='w-[100px] p-1 m-0 rounded-xl'
    type='text'
    placeholder='العموله'
    onChange={(event) => {
        const value = event.target.value;
        setcommition(prevCommition => ({
            ...prevCommition,
            [rowData._id]: value
        }));
    }}
    value={commition[rowData._id] !== undefined ? commition[rowData._id] : (getcommition.find(item => item.id === rowData._id)?.commition || "")}
/>

    <button className='bg-[#0bff27] p-1 m-2 rounded-2xl' onClick={() =>{
handleUpdateCommition(rowData._id)
    } 

    }>حفظ</button>
</td>



                <td className="border border-gray-800 px-4 py-2">
                    {rowData.imagePaths && rowData.imagePaths.length > 0 && (

                        rowData.imagePaths.map((sre, imgIndex) => (

                            <ImageHoverEffect
                                key={`${rowData._id}-img-${imgIndex}`}
                                src={sre}
                            />
                        ))

                    )}
                </td>
            </tr>
        )): <p className='text-center text-[#fff] fixed ml-[30%] w-[300px] y-[100px] text-[34px] bg-[#343244] p-6 mt-6'> لا يوجد طلبات </p>}
    </tbody>
</table>
</div>

)



}
export default TableAdmin;






