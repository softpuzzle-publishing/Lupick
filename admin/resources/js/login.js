$('input').on('input', function (e) {
    $(this).addClass('active');
});


$("input").on("change keyup paste",function () {
    var id = $('.input-id').val();
    var pw = $('.input-pw').val();

    if (!id == "" && !pw == "") {
        $('button').addClass('active');
    }else{
        $('button').removeClass('active');
    }
});

function clickLogin(){
    var id = $('.input-id').val();
    var pw = $('.input-pw').val();

    if (!id == "" && !pw == "") {
        $('.error-msg').css({'display':'block'});
    }
    
}

// $(document).ready(function (e) { })