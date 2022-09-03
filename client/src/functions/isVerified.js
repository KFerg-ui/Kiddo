//This returns false or true
const port = process.env.PORT || 8000;

export default async function isVerified(){ 
  // console.log("checking verify")
    let token = localStorage.getItem("token");

    let rootURL;
    if (document.location.hostname.includes("localhost")){
      rootURL = `http://localhost:8000`
    } else {
      rootURL = `https://${document.location.hostname}`
    }

    fetch(`${rootURL}/verifyUser`, {
      method: 'GET',
      headers: {
        "accesstoken": token
      } 
    })
    .then((response) => response.json())
    .then((data) => {
      
      if(data.auth){
        return true;
      }
      else{
        
        return false;
      }
    })
    .catch((error)=>{
      console.error('Error:', error);
     
      return false;
    });
  }