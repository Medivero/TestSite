const API_URL = import.meta.env.VITE_API_URL;

async function getApiData(){
    try{
        const res = await fetch(API_URL);
        const data = await res.json();
        return data;
    }
    catch(error){
        console.log(error)
        return null
    }
}

export default getApiData;