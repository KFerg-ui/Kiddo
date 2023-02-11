const PORT = process.env.PORT || 8000;

export default async function isVerified(){ 
  let token = localStorage.getItem("token");
  let rootURL = `https://${document.location.hostname}`;

  if (document.location.hostname === 'localhost'){
    rootURL = `http://localhost:${PORT}`
  }

  fetch(`${rootURL}/verify-user`, {
    method: 'GET',
    headers: {
      "accesstoken": token
    } 
  })
    .then(response => response.json())
    .then(data => !!data?.auth)
    .catch(error => {
      console.error('Error:', error);
      return false;
    });
}
