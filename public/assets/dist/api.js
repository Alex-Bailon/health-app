$(document).ready(()=>{function a(a,b,c){return{type:"doughnut",data:{datasets:[{data:[a,Math.max(b-a,0)],backgroundColor:[c,"lightgray"],fillOpacity:.3}],labels:["Total","Recommended"]},options:{legend:{labels:{fontColor:"white",fontStyle:"bold",fontSize:18}}}}}function b(){$("#calHeader").text("Calories"),$("#fatHeader").text("Fat in Grams"),$("#sugarHeader").text("Sugar in Grams"),$("#carbHeader").text("Carbs in Grams");const b=$("#calChart"),g=new Chart(b,a(c,2e3,"#D38B5D")),h=$("#fatChart"),i=new Chart(h,a(d,55,"#739e82")),j=$("#sugarChart"),k=new Chart(j,a(e,32,"#2c5530")),l=$("#carbChart"),m=new Chart(l,a(f,275,"#99621e"))}let c,d,e,f;const g=new Date().getDate();let h=new Date().getDate();(function(){var a=JSON.parse(localStorage.getItem("todayStored"));null!==a&&(h=a)})(),+g==+h?(c=localStorage.getItem("calTotal"),d=localStorage.getItem("fatTotal"),e=localStorage.getItem("sugarTotal"),f=localStorage.getItem("carbTotal"),localStorage.setItem("todayStored",h)):(console.log("else"),c=0,d=0,e=0,f=0,h=g,localStorage.setItem("todayStored",h),localStorage.setItem("calTotal",c),localStorage.setItem("fatTotal",d),localStorage.setItem("sugarTotal",e),localStorage.setItem("carbTotal",f)),"/userhome"===window.location.pathname&&b(),$("#foodform").on("submit",a=>{a.preventDefault();var b={item:$("#foodSearch").val().trim()};console.log(b),$.ajax("/api/food",{type:"POST",data:b}).then(a=>{console.log(a),$(".itemCal").text(a.calories),$(".itemFat").text(a.totalNutrients.FAT.quantity.toFixed(2)),$(".itemSugar").text(a.totalNutrients.SUGAR.quantity.toFixed(2)),$(".itemCarbs").text(a.totalNutrients.CHOCDF.quantity.toFixed(2)),$("#addBtn").on("click",()=>{c=+c+ +$(".itemCal").text(),d=+d+ +$(".itemFat").text(),e=+e+ +$(".itemSugar").text(),f=+f+ +$(".itemCarbs").text(),localStorage.setItem("calTotal",c),localStorage.setItem("fatTotal",d),localStorage.setItem("sugarTotal",e),localStorage.setItem("carbTotal",f),location.reload()})})})});