
//save loc storge
//create after save
//read
//count
//delete
//update
//search
//clean data
let title = document.getElementById('title');
let price = document.getElementById('price');
let taxes = document.getElementById('taxes');
let ads = document.getElementById('ads');
let discount = document.getElementById('discount');
let count = document.getElementById('count');
let category = document.getElementById('category');
let submit = document.getElementById('submit');
let total = document.getElementById('total');

let mood='create';
let tmp;
let searchmood='title';

function getsearchmood(id){
let search=document.getElementById('search');
if(id=='searchTiltle')
{
    searchmood='title';
    
}
else{
    searchmood='category';
}


search.focus();
search.value=' ';
showData();
}




//get total
 function getTotal(){
  if(price.value!='')
  {
    let result= (+price.value+ +taxes.value+ +ads.value)- +discount.value;
    total.innerHTML=result;
    total.style.background='#040'}
    else
    {   total.innerHTML='   '
        total.style.background='#a00d02'
    }
  }




 //create

let dataPro;
if (localStorage.product_info!=null){
    dataPro=JSON.parse(localStorage.product_info)
}
    else{
        dataPro=[];
    
}
submit.onclick=function(){
    let newPro={
        title:title.value.toLowerCase(),
        price:price.value,
        taxes:taxes.value,
        ads:ads.value,
        discount:discount.value,
        total:total.innerHTML,
        count:count.value,
        category:category.value.toLowerCase()
    }
    if(title.value!='' && price.value!=''&& category.value!=''&& newPro.count<101)
   { if(mood=='create'){


 if(newPro.count > 1){
        for(let i=0;i<newPro.count;i++)
            {dataPro.push(newPro);}



    }
    else{
        dataPro.push(newPro);
    }
    clearData();
    }
    else{

        dataPro[ tmp  ]=newPro
        mood='create';
        submit.innerHTML='create';
        count.style.display='block';

    }

}
    
    
    //add value of obj and save in array
    localStorage.setItem('product_info'/*name of item thae local storage will save info in it*/, JSON.stringify(dataPro))



showData();
}


function clearData(){

    title.value='';
    price.value='';
    taxes.value='';
    ads.value='';
    discount.value='';
    total.innerHTML='';
    count.value='';
    category.value='';


}

//read

function showData(){
    getTotal();
    let table='';
    for(let i=0; i<dataPro.length;i++){
        table +=`
        <tbody>
        
        <tr>
            <td>${i+1}</td>
            <td>${dataPro[i].title}</td>
            <td>${dataPro[i].price}</td>
            <td>${dataPro[i].taxes}</td>
            <td>${dataPro[i].ads}</td>
            <td>${dataPro[i].discount}</td>
            <td>${dataPro[i].total}</td>
            <td>${dataPro[i].category}</td>
            <td><button style="background-color: orange;" id="update" onclick="updateData(${i})">Update</button></td>
            <td><button style="background-color: rgb(201, 56, 56); id="delete" onclick="deleteData(${i})">Delete</button></td>
        </tr>
   </tbody>`
     
  






    }

    document.getElementById('tbody').innerHTML= table;

    let btnDelete=document.getElementById('deleteAll');
    if(dataPro.length>0)
       {btnDelete.innerHTML=`<button onclick="deleteAll()" id="update" style="background-color:  rgb(201, 56, 56);">delete All (${4})</button>`}

        else{

            btnDelete.innerHTML=''
            
        }

    

}





showData();



    


function deleteData(i){

dataPro.splice(i,1);
localStorage.product_info=JSON.stringify(dataPro)

showData();
}


function deleteAll(){

    localStorage.clear();
    dataPro.splice(0)
    showData();


}

function updateData(i){

    title.value=dataPro[i].title;
    price.value=dataPro[i].price;
    taxes.value=dataPro[i].taxes;
    ads.value=dataPro[i].ads;
    discount.value=dataPro[i].discount;
    category.value=dataPro[i].category;
    getTotal();
    count.style.display='none';
    submit.innerHTML='Update'
    mood='update';
    tmp=i;    
    scroll({
        top:0,
        behavior:'smooth'        
    })
    
    
    }
    
    function searchdata(value){
        let table='';

        if(searchmood =='title')
        {



            for(let i=0;i<dataPro.length;i++){


                if(dataPro[i].title.includes(value.toLowerCase()))
                {
                    table +=`
                    <tbody>
                    
                    <tr>
                        <td>${i}</td>
                        <td>${dataPro[i].title}</td>
                        <td>${dataPro[i].price}</td>
                        <td>${dataPro[i].taxes}</td>
                        <td>${dataPro[i].ads}</td>
                        <td>${dataPro[i].discount}</td>
                        <td>${dataPro[i].total}</td>
                        <td>${dataPro[i].category}</td>
                        <td><button id="update" onclick="updateData(${i})">update</button></td>
                        <td><button id="delete" onclick="deleteData(${i})">delete</button></td>
                    </tr>
               </tbody>`
                }
    
    
    
            }
    
    
    
    
    
        }
        else{
            
            for(let i=0;i<dataPro.length;i++){


                if(dataPro[i].category.includes(value.toLowerCase()))
                {
                    table +=`
                    <tbody>
                    
                    <tr>
                        <td>${i}</td>
                        <td>${dataPro[i].title}</td>
                        <td>${dataPro[i].price}</td>
                        <td>${dataPro[i].taxes}</td>
                        <td>${dataPro[i].ads}</td>
                        <td>${dataPro[i].discount}</td>
                        <td>${dataPro[i].total}</td>
                        <td>${dataPro[i].category}</td>
                        <td><button id="update" onclick="updateData(${i})">update</button></td>
                        <td><button id="delete" onclick="deleteData(${i})">delete</button></td>
                    </tr>
               </tbody>`
                }
    
    
    
            }
        }
    
        document.getElementById('tbody').innerHTML= table;

    
    
    
    
    
    
    }