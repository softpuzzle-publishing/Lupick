//중첩된 모달이 닫힐때 스타일 삭제 방지
$('[data-overlap="true"]').on('hidden.bs.modal', function (e) {
    $('body').addClass('modal-open');
});

$('textarea, input').on("input", function () {
    if ($(this).attr('maxlength') !== "") {
        var maxlength = $(this).attr("maxlength");
        var content = $(this).val();

        $($(this).attr('data-byte-target')).html(content.length);

        if (content.length > maxlength) {
            $(this).val(content.substring(0, maxlength));
            $($(this).attr('data-byte-target')).html();
        }
    }
});



///이미지 미리보기 업로드
var sel_file;
$(document).ready(function () {
    $('#input-img').on("change", handleImgFileSelect);
    $('#profile-img').on("change", profileImgFileSelect);

});

function handleImgFileSelect(e) {
    var files = e.target.files;
    var filesArr = Array.prototype.slice.call(files);

    filesArr.forEach(function (f) {
        if (!f.type.match("image.*")) {
            alert("확장자는 이미지 확장자만 가능합니다.");
            return;
        }
        sel_file = f;

        var reader = new FileReader();
        reader.onload = function (e) {
            $('#img').attr('src', e.target.result);
            $('.filebox i').hide();
        }
        reader.readAsDataURL(f);

    });
}

function profileImgFileSelect(e) {
    var files = e.target.files;
    var filesArr = Array.prototype.slice.call(files);

    filesArr.forEach(function (f) {
        if (!f.type.match("image.*")) {
            alert("확장자는 이미지 확장자만 가능합니다.");
            return;
        }
        sel_file = f;

        var reader = new FileReader();
        reader.onload = function (e) {
            $('#sel-img').attr('src', e.target.result);
            $('.filebox i').hide();
        }
        reader.readAsDataURL(f);

    });
}



//체크박스 두개
$("input[type=checkbox]").click(function () {
    if ($("#subject").prop("checked")) {
        $('.subject-name').css({
            'color': '#ffff00'
        });
    } else {
        $('.subject-name').css({
            'color': '#ffffff'
        });
    }
});

$(document).ready(function () {
    $('aside').load('../_include/aside.html');

    //select
    setTimeout(function () {
        $(".select-sm").selectmenu().selectmenu("menuWidget").addClass("overflow select-sm");
        $(".select-md").selectmenu().selectmenu("menuWidget").addClass("overflow select-md");
        $(".select-lg").selectmenu().selectmenu("menuWidget").addClass("overflow select-lg");
    }, 50);


});




$('.custom-radio').click(function(){

    var idx = $(this).index()+1;
    console.log('number = ' + idx);
    
 
    if( idx == 1){
        $('#radio-select-'+idx).show();
        $('#radio-select-2').hide();
        $('#radio-select-3').hide();
    }else if( idx == 2){
        $('#radio-select-'+idx).show();
        $('#radio-select-1').hide();
        $('#radio-select-3').hide();
    }else if( idx == 3 ){
        $('#radio-select-'+idx).show();
        $('#radio-select-1').hide();
        $('#radio-select-2').hide();
    }

})