$(document).click(function(e){
    if( $(e.target).is("#modal-click") ){
        $(".modal-email").fadeOut();
        resetModal();
    }
});
//focus para el label
$(".input-std label").click(function(){
    $(this).parent().find("input").focus();
});
$("#btn-modal-email").click(function(){
    $(".modal-email").fadeIn();
});
$(".comprobante-ico.right-click .com-ico").click(function(){
    $(".modal-email").fadeOut();
    resetModal();
});
$("#btn-enviar-mail").click(function(){
    if( $(this).hasClass("disabled") ){
        return false;
    }else{
        $(".inicial-result").hide();
        $(".result-success").show();
    }
});
$("#btn-aceptar-email").click(function(){
    $(".modal-email").fadeOut(function(){
        resetModal();
    });
});
$("#email-modalin").focusout(function(){
    isMail($(this).val(), $(this));
    if( !$(this).val() == "" ){
        if( $(this).hasClass("valid") ){
            $("#btn-enviar-mail").removeClass("disabled");
        }else{
            $("#btn-enviar-mail").addClass("disabled");
        }
    }else{
        $("#btn-enviar-mail").addClass("disabled");
    }
});

//print 
document.getElementById("doPrint").addEventListener("click", function() {
    //var printContents = document.getElementById('printComp').innerHTML;
    //var originalContents = document.body.innerHTML;
    //document.body.innerHTML = printContents;
    window.print();
    //document.body.innerHTML = originalContents;
});
function resetModal(){
    $(".inicial-result").show();
    $(".result-success").hide();
    $("#email-modalin").val("");
    $("#email-modalin").removeClass("valid invalid");
    $("#btn-enviar-mail").addClass("disabled");
}
function isMail(mail, el){
    var rg=/^([a-zA-Z0-9_\.\-\+])+\@(([a-zA-z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
    if(!rg.test(mail)){
        if(mail==""){
            el.removeClass("invalid valid");
            return false;
        }else{
            el.removeClass("valid").addClass("invalid");
            return false;
        }
    }else{
        el.removeClass("invalid").addClass("valid");
        return true;
    }
}