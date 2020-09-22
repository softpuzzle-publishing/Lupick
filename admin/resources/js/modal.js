
$("div[id^='myModal']").each(function(){
  
    var currentModal = $(this);
    
    //click next
    currentModal.find('.btn-next').click(function(){
      currentModal.modal('hide');
      currentModal.closest("div[id^='myModal']").nextAll("div[id^='myModal']").first().modal('show'); 
    });
    
    //click prev
    currentModal.find('.btn-prev').click(function(){
      currentModal.modal('hide');
      currentModal.closest("div[id^='myModal']").prevAll("div[id^='myModal']").first().modal('show'); 
    });
  
  });
  
$('textarea').on("input", function () {
    var maxlength = $(this).attr("maxlength");
    var currentLength = $(this).val().length;

    if (currentLength >= maxlength) {
        console.log("끝");
    } else {
        console.log(currentLength);
    }

    //이벤트 정보 > 이벤트 타이틀
    $('.title textarea').keyup(function (e) {
        var content = $(this).val();

        $('#counter-title').html(content.length);

        if (content.length > 40) {
            $(this).val(content.substring(0, 40));
            $('#counter-title').html();
        }
    });

    //이벤트 정보 > 이벤트 주제태그 생성
    $('.create textarea').keyup(function (e) {
        var content = $(this).val();

        $('#counter-create').html(content.length);
        if (content.length > 15) {
            $(this).val(content.substring(0, 15));
            $('#counter-create').html();
        }
    });

    //아이템 정보 > 아이템 설명
    $('.explanation textarea').keyup(function (e) {
        var content = $(this).val();

        $('#counter-explanation').html(content.length);
        if (content.length > 90) {
            $(this).val(content.substring(0, 90));
            $('#counter-explanation').html();
        }
    });
});



///이미지 미리보기 업로드
var sel_file;
$(document).ready(function () {
    $('#input-img').on("change", handleImgFileSelect);

})

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



//체크박스 두개
$("input[type=checkbox]").click(function() {

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