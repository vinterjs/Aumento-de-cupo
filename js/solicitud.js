$(document).ready(function(){
    //solo numeros
    $(".soloNumeros").inputFilter(function(value){
        return /^-?\d*$/.test(value);
    });

    //cupos
    var $monto_editar = parseInt($("#monto-editar").val().split(".").join("").split("$").join(""));
    var $cupo_actual = parseInt($("#cup-actual").text().split(".").join("").split("$").join(""));
    var $cupo_final = $cupo_actual + $monto_editar;
    $cupo_final = $cupo_final.toString();
    $cupo_final = $cupo_final.replace(/([0-9])([0-9]{3})$/, "$1.$2")
    .replace(/\B(?=(\d{3})+(?!\d)\.?)/g, ".")
    $("#cup-final").text("$"+$cupo_final);
});

//focus para el label
$(".input-std label").click(function(){
    $(this).parent().find("input").focus();
});

//validacion telefono
$(".input-std input.telefono").focusout(function(){
    if($(this).val()){
        if( $(this).val().length < 8 ){
            $(this).addClass("invalid").removeClass("valid");
        }else{
            $(this).removeClass("invalid").addClass("valid");
        }
    }else{
        $(this).removeClass("invalid valid");
    }
});
//mail
$(".email").focusout(function(){
    isMail($(this).val(), $(this));
});

$(".monto").keyup(function(e){
    $(e.target).val(function(value) {
        return value.replace(/\D/g, "")
        .replace(/([0-9])([0-9]{3})$/, "$1.$2")
        .replace(/\B(?=(\d{3})+(?!\d)\.?)/g, ".");
    });
});

//input monto
$("#monto-editar").keyup(function(){
    if( $(this).val() == "" ){
        $(this).val("$");
        $(this).removeClass("invalid valid");
    }else{
        var formated = formatMoney( $(this).val() );
        $(this).val(formated);
    }
});
$("#monto-editar").focusout(function(){
    var $monto_min = parseInt($("#monto-minimo-cupo").val().split(".").join(""));
    var formatMin = $("#monto-minimo-cupo").val().split(".").join("").toString();
    var vlc = parseInt($(this).val().split(".").join("").split("$").join(""));
    if( vlc < $monto_min){
        formatMin = formatMin.replace(/([0-9])([0-9]{3})$/, "$1.$2")
    .replace(/\B(?=(\d{3})+(?!\d)\.?)/g, ".");
        $("#monto-editar").addClass("invalid").removeClass("valid");
        $("#monto-editar").parent().find(".msj-input-error").text("El monto mínimo es de $"+ formatMin+".");
    }
    if( $(this).val() == "" || $(this).val() == "$" ){
        $(this).val("$");
        $(this).removeClass("invalid valid");
    }
});
//terminos y condiciones
$("#check-terms").click(function(){
    if( $(this).is(":checked") ){
        $(".superclave-cont").slideDown();
    }else{
        $(".superclave-cont").slideUp();
    }
});


$('.montoNumber').keydown(function(event){
    // Funcion que valida que solo se escriban numeros en un input
    var no_permitidas = ['!', '"', '$', '%', '&', '/', '(', ')', '=', '?', '¿', '*', '¨', '^', '{', '}', 'Ç', 'ç', 'ª', 'º', ',', 'Dead', '´', '+', '`', '_', '@', '#', '|', '¢', '∞', '¬', '÷', '”', '≠', '´'];
    var no_permitidas_eventkey = [192, 222, 16, 220, 187];
    var key;

    if( !event.charCode ){
        key = String.fromCharCode(event.which);
    }else{
        key = String.fromCharCode(event.charCode);
    }

    if( no_permitidas_eventkey.indexOf( event.keyCode ) !== -1 || no_permitidas.indexOf( event.key ) !== -1 ){
        // Verifica si el caracter ingresado está dentro del array de las no permitidas
        // Si se escriben las comillas (`) o (‘) o Shift pierde el foco
        $(this).blur();
    }

    if( event.keyCode !== 8 && event.keyCode !== 9 && event.keyCode !== 37 && event.keyCode !== 39 ){
      // Permite el ingreso de Borrar, Tab, Flecha a la izquierda, Flecha a la derecha
        if ((event.keyCode >= 48 && event.keyCode <= 57) || (event.keyCode >= 96 && event.keyCode <= 105)){
            // Si es numero, permite la accion
            return true;
        }else{
            // Si no es numero, previene la escritura en el input
            event.preventDefault();
            return false;
        }
    }
});

(function($){
    $.fn.inputFilter = function(inputFilter){
        return this.on("input keydown keyup mousedown mouseup select contextmenu drop", function(){
            if( inputFilter(this.value) ){
               this.oldValue = this.value;
               this.oldSelectionStart = this.selectionStart;
               this.oldSelectionEnd = this.selectionEnd;
            }else if(this.hasOwnProperty("oldValue")){
               this.value = this.oldValue;
               this.setSelectionRange(this.oldSelectionStart, this.oldSelectionEnd);
            }else{
               this.value = "";
            }
        });
    };
}(jQuery));

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

function formatMoney(valor){
    //minMax
    var $mMaximo = parseInt($("#monto-maximo-cupo").val());
    var $mMinimo = parseInt($("#monto-minimo-cupo").val());
    var formatMax = $mMaximo.toString();
    var formatMin = $mMinimo.toString();
    formatMax = formatMax.replace(/([0-9])([0-9]{3})$/, "$1.$2")
    .replace(/\B(?=(\d{3})+(?!\d)\.?)/g, ".");
    formatMin = formatMin.replace(/([0-9])([0-9]{3})$/, "$1.$2")
    .replace(/\B(?=(\d{3})+(?!\d)\.?)/g, ".");

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

        //sumaTotal(valor_final, $mMaximo, $mMinimo);
        var valor = parseInt(valor_final.split(".").join(""));
        var $cupo_actual_reval = parseInt($("#cup-actual").text().split(".").join("").split("$").join(""));

        if( valor > $mMaximo ){

            $("#monto-editar").blur();
            $("#monto-editar").addClass("invalid").removeClass("valid");
            $("#monto-editar").parent().find(".msj-input-error").text("El monto máximo es de $"+ formatMax+".");
            valor = $mMaximo;
            var reval = valor.toString();
            reval = reval.replace(/([0-9])([0-9]{3})$/, "$1.$2")
            .replace(/\B(?=(\d{3})+(?!\d)\.?)/g, ".");
            valor = valor + $cupo_actual_reval;
            valor = valor.toString();
            valor = valor.replace(/([0-9])([0-9]{3})$/, "$1.$2")
            .replace(/\B(?=(\d{3})+(?!\d)\.?)/g, ".");
            $("#cup-final").text("$"+valor);
            valor_final = reval;

        }else if(valor < $mMinimo){
            //$("#monto-editar").blur();
            $("#monto-editar").addClass("invalid").removeClass("valid");
            $("#monto-editar").parent().find(".msj-input-error").text("El monto mínimo es de $"+ formatMin+".");
            //valor = $mMinimo;
            var reval = valor.toString();
            reval = reval.replace(/([0-9])([0-9]{3})$/, "$1.$2")
            .replace(/\B(?=(\d{3})+(?!\d)\.?)/g, ".");
            valor = valor + $cupo_actual_reval;
            valor = valor.toString();
            valor = valor.replace(/([0-9])([0-9]{3})$/, "$1.$2")
            .replace(/\B(?=(\d{3})+(?!\d)\.?)/g, ".");
            $("#cup-final").text("$"+valor);
            valor_final = reval;
        }else{
            $("#monto-editar").removeClass("invalid").addClass("valid");
            valor = valor + $cupo_actual_reval;
            valor = valor.toString();
            valor = valor.replace(/([0-9])([0-9]{3})$/, "$1.$2")
            .replace(/\B(?=(\d{3})+(?!\d)\.?)/g, ".");
            $("#cup-final").text("$"+valor);
        }


        returned = "$" + valor_final;
    }else{
        returned = "";
    }
    return returned;
}