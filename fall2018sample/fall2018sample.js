/* Don't use <script> tags in a linked js file! */

$(".submenu").hide();

$(".menuitem").click(function (){
   
    $(this).next(".submenu").slideToggle("slow");
    
  
})

let name = ("content1.txt");

$("article").load(name);

$("#choose-content").change(function (){
    name = $(this).val();
    $("article").load(name);
})