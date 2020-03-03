//rangeslider
var minCup = $("#js-amount-range").attr("min").split(".").join("").toString();
var maxCup = $("#js-amount-range").attr("max").split(".").join("").toString();
var mmaxRange = parseInt(maxCup);
var mminRange = parseInt(minCup);
var $rangeslider = $("#js-amount-range");
var $amount = $("#monto-slider");
var $mactual = parseInt($("#monto-actual").text().split(".").join("").split("$").join(""));

$(document).ready(function(){
    minCup = minCup.replace(/([0-9])([0-9]{3})$/, "$1.$2")
    .replace(/\B(?=(\d{3})+(?!\d)\.?)/g, ".");
    maxCup = maxCup.replace(/([0-9])([0-9]{3})$/, "$1.$2")
    .replace(/\B(?=(\d{3})+(?!\d)\.?)/g, ".");
    $("#miCup").text("$"+minCup);
    $("#maCup").text("$"+maxCup);
    var nm = $mactual + mmaxRange;
    nm = nm.toString();
    nm = nm.replace(/([0-9])([0-9]{3})$/, "$1.$2")
    .replace(/\B(?=(\d{3})+(?!\d)\.?)/g, ".");
    $("#cup_Final").text("$"+nm);
    $amount.val("$"+maxCup);
    $rangeslider.rangeslider({
        polyfill: false
    });
});

//rangeslider
$rangeslider.on("input", function(){
    var valor_format = this.value;
    valor_format = valor_format.toString();
    valor_format = valor_format.replace(/([0-9])([0-9]{3})$/, "$1.$2")
    .replace(/\B(?=(\d{3})+(?!\d)\.?)/g, ".");
    $amount[0].value = "$"+valor_format;
    calculoMonto($mactual, this.value);
});
$amount.on({
    "focusout": function(){
        var input_format = this.value;
        input_format = input_format.split("$").join("").split(".").join().split(",").join("");
        $rangeslider.val(input_format).change();
    },
    "keyup": function(){
        if(this.value === ""){
            this.value = "$";
            $amount.removeClass("invalid valid");
        }else{
            this.value = formatMoney(this.value);
            calculoMonto($mactual, this.value);
        }
    }
});

function calculoMonto(v1,v2){
    var nv2 = parseInt(v2.split("$").join("").split(".").join().split(",").join("")); 
    var nv = v1 + nv2;
    nv = nv.toString();
    nv = nv.replace(/([0-9])([0-9]{3})$/, "$1.$2")
    .replace(/\B(?=(\d{3})+(?!\d)\.?)/g, ".");
    $("#cup_Final").text("$"+nv);
}


//btn
$("#btn-aumento").click(function(){
    if( $(this).hasClass("disabled") ){
        return false;
    }else{
        window.location.href = "solicitud.html";
    }
});

//no letras ni caracteres especiales
$('.digDot').keydown(function(event){
    var no_permitidas = ['!', '"', '$', '%', '&', '/', '(', ')', '=', '?', '¿', '*', '¨', '^', '{', '}', 'Ç', 'ç', 'ª', 'º', ',', 'Dead', '´', '+', '`', '_', '@', '#', '|', '¢', '∞', '¬', '÷', '”', '≠', '´'];
    var no_permitidas_eventkey = [192, 222, 16, 220, 187];
    var key;
    if( !event.charCode ){
        key = String.fromCharCode(event.which);
    }else{
        key = String.fromCharCode(event.charCode);
    }
    if( no_permitidas_eventkey.indexOf( event.keyCode ) !== -1 || no_permitidas.indexOf( event.key ) !== -1 ){
        $(this).blur();
    }
    if( event.keyCode !== 8 && event.keyCode !== 9 && event.keyCode !== 37 && event.keyCode !== 39 ){
        if ((event.keyCode >= 48 && event.keyCode <= 57) || (event.keyCode >= 96 && event.keyCode <= 105)){
            return true;
        }else{
            event.preventDefault();
            return false;
        }
    }
});

//condiciones
if ($(".js-accordion").length) {
    $(".js-accordion--active .box__body").hide();
    $(".js-accordion").on("click", ".js-accordion__trigger", function() {
        $(this).parents(".js-accordion").toggleClass("js-accordion--active"), $(this).next().slideToggle();
    });
}

function formatMoney(valor){
    var i2, j2, valor1, unformatted;
    if( valor.length > 0 && valor.startsWith("$") ){
        unformatted = valor.split("$")[1];
    }else{
        unformatted = valor;
    }
    var wopoints = unformatted.split(".");
    var restored_val = "";
    $.each(wopoints, function(i,e){
        index = i;
        restored_val += e;
    });
    i2 = String( parseInt( restored_val = Math.abs(Number(restored_val) || 0 ).toFixed(0) ) );
    j2 = i2.length;
    if(j2 > 3){
        j2 = j2 % 3;
    }else{
        j2 = 0;
    }
    if(j2 !== 0){
        valor1 = i2.substr(0, j2) + ".";
    }else{
        valor1 = "";
    }
    var valor_final = valor1 + i2.substr(j2).replace(/(\d{3})(?=\d)/g, "$1" + ".");
    var returned;
    if( valor_final != "0" ){
        returned = "$" + valor_final;
    }else{
        returned = "";
    }
    return returned;
}