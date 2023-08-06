$("h1").css("color","purple")
$("h1").html("HELLO JUERY");
// $("button").click(function(){
//     $("h1").css("color","purple")
// })

// $(document).keypress(function(event){
//     $("h1").html("event");
// })


$(document).on("click",function(){
    $("h1").animate({opacity:0.5})
})