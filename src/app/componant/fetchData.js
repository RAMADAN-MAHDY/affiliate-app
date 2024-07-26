const Fetchdata = async ()=>{

       
        const res = await fetch('http://localhost:5000/api/productsAll',{ next: { revalidate: 3600 } })
       const data = res.json()
       
       console.log(data)
        return ;

} 

export default Fetchdata;