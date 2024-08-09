"use strict";

var input = document.getElementById('input'), // nút nhập/xuất
  number = document.querySelectorAll('.numbers div'), // các nút số
  
  result = document.getElementById('result'), // nút bằng
  clear = document.getElementById('clear'), // nút xóa
  resultDisplayed = false; // cờ để theo dõi kết quả hiện tại

 
number.forEach(function(btn){
  btn.addEventListener("click",function(){
    if(input.innerHTML==0)
      input.innerHTML="";
    if(btn.innerHTML=='C')
      input.innerHTML="";
    

    else
    input.innerHTML+=btn.innerHTML;
   
  console.log(btn.innerHTML)})
  result.addEventListener("click",function(){
    input.innerHTML=eval(input.innerHTML);
 
  })

})