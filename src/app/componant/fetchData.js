const Fetchdata = async ()=>{

    const URL= process.env.NEXT_PUBLIC_API_URL
    
        const res = await fetch(`${URL}/productsAll`,{ next: { revalidate: 3600 } })
       const data = res.json()
       
       console.log(data)
        return ;

} 

export default Fetchdata;