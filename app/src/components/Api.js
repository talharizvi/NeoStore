

const Api=(endPoint,method,token,body)=>{
    const commonUrl = "http://staging.php-dev.in:8844/trainingapp/api/"
    console.log(token)
    console.log(method)
    console.log(endPoint)
    const url = commonUrl+endPoint
    console.log(url)
     return fetch(url,{
        method:method,
        headers:{
            access_token:token,
            'Content-Type': 'application/x-www-form-urlencoded',
          },
          body:body
    }).then((response)=>response.json())
    
}

export default Api;