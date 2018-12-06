/*Taken by Grant Adams 12.6.18  */
$(".submenu").hide();

$(".mainmenu").click(function (){
   
    $(this).next(".submenu").slideToggle("slow");
    
  
})

let name = ("article0.txt");
console.log(name);

$("article").load(name);

$(":radio").change(function (){
    name = $(this).val();
    console.log(name);
    $("article").load(name);
})


