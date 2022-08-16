//This returns false or true

export default function isVerified(){ 
  console.log("checking verify")
    let token = localStorage.getItem("token");
    fetch('http://localhost:8000/verifyUser', {
      method: 'GET',
      headers: {
        "accesstoken": token
      } 
    })
    .then((response) => response.json())
    .then((data) => {
      console.log(data.auth !== undefined)
      if(data.auth){
        return true;
      }
      else{
        return false;
      }
    })
    .catch((error)=>{
      console.error('Error:', error);
    });
  }