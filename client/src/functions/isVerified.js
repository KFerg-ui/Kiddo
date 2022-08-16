//This returns false or true

export default async function isVerified(){ 
  // console.log("checking verify")
    let token = localStorage.getItem("token");
    fetch('http://localhost:8000/verifyUser', {
      method: 'GET',
      headers: {
        "accesstoken": token
      } 
    })
    .then((response) => response.json())
    .then((data) => {
      // console.log("Auth check: " + data.auth !== undefined)
      if(data.auth){
        return true;
      }
      else{
        console.log("Bad Auth")
        return false;
      }
    })
    .catch((error)=>{
      console.error('Error:', error);
      console.log("catch")
      return false;
    });
  }