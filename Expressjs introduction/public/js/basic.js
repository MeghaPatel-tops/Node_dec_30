async function getData(){
    const city = document.getElementById('city').value;
     const res = await fetch(`/citydata/${city}`);
     const data = await res.json();
     var str="";
     for(index in data){
        str+=`<h1>${index}:${data[index]}</h1>`;
     }
     document.getElementById("result").innerHTML = str;
     
}