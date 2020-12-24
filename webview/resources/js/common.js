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

    $(window).on('load', function () {
        //select
        
        $(".select-sm").each(function () {
            $(this).selectmenu().selectmenu("menuWidget").addClass("overflow select-sm");
        });
        $(".select-md").each(function () {
            $(this).selectmenu().selectmenu("menuWidget").addClass("overflow select-md menuWidget");
           
            $('.ui-selectmenu-button').on('click', function () {
                var option_height = $('.ui-menu').height();
                var modal_height = $('.modal-content').height();
                var total_height = option_height + modal_height;
                var sel_length = $('.sel-option').length;
                console.log(sel_length);
                
                if( sel_length  >= 1 ){
                    $('.wrap').css('height', 'auto');
                    return false;
                }
                if (!$('.ui-selectmenu-menu').hasClass('ui-selectmenu-open')) {
                    $('.wrap').css('height', 'auto');
    
                } else {
                    setTimeout(function () {
                        $('.wrap').css('height', total_height);
                    }, 100)
                    setTimeout(function () {
                        $(".select-md").selectmenu("open");
                    }, 100)
                }
                $('.ui-selectmenu-menu').click(function () {
                    $('.wrap').css('height', 'auto');
                })
            })
        });
        $(".select-lg").each(function () {
            $(this).selectmenu().selectmenu("menuWidget").addClass("overflow select-lg");
        });
        //중첩된 모달이 닫힐때 스타일 삭제 방지
        $('[data-overlap="true"]').on('hidden.bs.modal', function (e) {
            $('body').addClass('modal-open');
        });
        //열려있는 모달 갯수 파악하여 3중 모달 이상일때 가장 최근 모달 z-index 올림 처리
        $('.modal').on('show.bs.modal', function (e) {
            if ($('.modal.show').length > 1) {
                $(this).css('z-index', '1600');
            }
        });

        //bouncing balls
        if ($('#stage').length > 0) {
            bouncing();
        }
    });

    //수량 입력
    $('.spinner button').on('click', function () {
        var max = parseInt($(this).closest('.spinner').attr('data-max'));
        var min = parseInt($(this).closest('.spinner').attr('data-min'));
        var count = $(this).siblings('.spinner-input').val();

        if ($(this).hasClass('spinner-increment')) {
            if (count < max) {
                count++;
                $(this).siblings('.spinner-input').val(count);
                $(this).siblings('.spinner-decrement').prop('disabled', false);
                $(this).prop('disabled', false);
            }
            if (count == max) {
                $(this).prop('disabled', true);
            }
        } else if ($(this).hasClass('spinner-decrement')) {
            if (count > min) {
                count--;
                $(this).siblings('.spinner-input').val(count);
                $(this).siblings('.spinner-increment').prop('disabled', false);
                $(this).prop('disabled', false);
            } else {
                $('.modal-alert').addClass('active');
                setTimeout(function () {
                    $('.modal-alert').removeClass('active');
                }, 2000)
            }
        }
    });

    // 아이템 정보
    var length_product = $('.tab.item .product').length;
    if (length_product > 1) {
        var first_product = $('.tab.item .product').first();
        first_product.show();

        $('.more').click(function () {
            if (!$(this).hasClass('active')) {
                $('.tab.item .product').show();
                $(this).addClass('active');
                $(this).text('닫기');
            } else {
                $('.tab.item .product').hide();
                $('.tab.item .product').first().show();
                $(this).removeClass('active');
                $(this).text('총' + length_product + '건 전체보기');
            }
        })
    } else {
        $('.tab.item .product').show();
    }

    var length_tracking = $('.tab.tracking .step').length;
    if (length_product > 1) {
        var first_product = $('.tab.tracking .step').first();
        first_product.show();

        $('.tracking-more').click(function () {
            if (!$(this).hasClass('active')) {
                $('.tab.tracking .step').show();
                $(this).addClass('active');
                $(this).text('간략히 보기');
            } else {
                $('.tab.tracking .step').hide();
                $('.tab.tracking .step').first().show();
                $(this).removeClass('active');
                $(this).text('자세히 보기');
            }
        })
    }
    //배송지 직접입력
    $('#delivery-select').selectmenu({
        change: function (event, ui) {
            if ($(this).val() == '직접 입력') {
                $('.direct textarea').show();
            } else {
                $('.direct textarea').hide();
            }
        }
    });
});

//투표 에러메시지
$('.vote .form-control').on('keyup', function () {
    var value = $(this).val();
    if (value > 1000) {
        $(this).next().addClass('active');
    }
})

function closeBtn() {
    window.history.back();
}

function deleteOption(idx) {
    $('#sel-' + idx).remove();

    var option = $('.sel-option');
    var option_length = option.length;
    console.log(option_length);

    if (option_length == 0) {
        $('.total-price').hide();
    }

}
//결제완료 background balls,
function bouncing() {
    var stage = document.getElementById('stage');

    var browserX = window.screenX;
    var browserY = window.screenY;
    var balls = [];
    var total = 4;
    var currentDrag = null;
    var mouseX = 0;
    var mouseY = 0;
    var stageWidth = $('.result').width();
    var stageHeight = $('.result').height();
    stage.width = stageWidth;
    stage.height = stageHeight;

    var IE = document.all ? true : false;
    if (!IE) document.addEventListener(Event.MOUSEMOVE, getMouseXY, false);
    document.onmousemove = getMouseXY;

    window.onresize = function (event) {
        stage.width = 5;
        stage.height = 5;
        stageWidth = $(document).width();
        stageHeight = $(document).height();
        stage.width = stageWidth;
        stage.height = stageHeight;
    }

    generate();

    var drawingCanvas = document.getElementById('stage');
    if (drawingCanvas.getContext) {
        var context = drawingCanvas.getContext('2d');
        setInterval(render, 20);
    }

    jQuery(document).ready(function () {
        $(document).mousedown(function (e) {
            onMouseDown();
        });

        $(document).mouseup(function (e) {
            onMouseUp();
        });
    });

    function onMouseDown() {
        var j = balls.length;
        while (--j > -1) {
            var dx = mouseX - balls[j].x;
            var dy = mouseY - balls[j].y;
            var dist = Math.sqrt(dx * dx + dy * dy);
            if (dist < balls[j].size / 2) {
                currentDrag = balls[j];
                currentDrag.dragging = true;
                return;
            }
        }
    }

    function onMouseUp() {
        if (currentDrag != null) currentDrag.dragging = false;
    }

    function generate() {
        for (var i = 0; i < total; i++) {
            var ball = {};
            ball.color = genHex(i);
            ball.bounce = 1;
            ball.vx = Math.random() * 50 - 25;
            ball.vy = Math.random() * 50 - 25;
            ball.size = 50;
            ball.x = Math.random() * stageWidth;
            ball.y = Math.random() * stageHeight;
            balls[balls.length] = ball;
        }
    }

    function genHex(i) {
        colors = new Array(4);
        colors[0] = "#ffff00";
        colors[1] = "#ffff00";
        colors[2] = "#ffff00";
        colors[3] = "#ffff00";

        return colors[i];
    }

    function render() {
        var isChange = (browserX != window.screenX || browserY != window.screenY);
        if (isChange) {
            var diffX = browserX - window.screenX;
            browserX = window.screenX;

            var diffY = browserY - window.screenY;
            browserY = window.screenY;
        }

        var j = balls.length;
        while (--j > -1) {
            update(balls[j]);

            if (isChange) {
                balls[j].vx += (diffX * .05);
                balls[j].vy += (diffY * .1);
            }
        }

        draw();
    }

    function draw() {
        context.clearRect(0, 0, stageWidth, stageHeight);
        var i = balls.length;
        while (--i > -1) {
            context.fillStyle = balls[i].color;
            context.beginPath();
            context.arc(balls[i].x, balls[i].y, balls[i].size, 0, Math.PI * 2, true);
            context.closePath();
            context.fill();
        }
    }

    function update(ball) {
        collisionCheck();

        var gravity = 1.3;
        var drag = .95;

        if (ball.dragging) {
            ball.vx = ball.x - ball.ox;
            ball.vy = ball.y - ball.oy;
            ball.ox = ball.x;
            ball.oy = ball.y;

            ball.x = mouseX;
            ball.y = mouseY;

            if ((ball.x + ball.size) > stageWidth) {
                ball.x = stageWidth - ball.size;
            } else if ((ball.x - ball.size) < 0) {
                ball.x = 0 + ball.size;
            }

            if ((ball.y + ball.size) > stageHeight) {
                ball.y = stageHeight - ball.size;
            } else if ((ball.y - ball.size) < 0) {
                ball.y = 0 + ball.size;
            }
        } else {
            ball.x += ball.vx;
            ball.y += ball.vy;

            if ((ball.x + ball.size) > stageWidth) {
                ball.x = stageWidth - ball.size;
                ball.vx = -ball.vx * ball.bounce;
            } else if ((ball.x - ball.size) < 0) {
                ball.x = 0 + ball.size;
                ball.vx = -ball.vx * ball.bounce;
            }

            if ((ball.y + ball.size) > stageHeight) {
                ball.y = stageHeight - ball.size;
                ball.vy = -ball.vy * ball.bounce;
            } else if ((ball.y - ball.size) < 0) {
                ball.y = 0 + ball.size;
                ball.vy = -ball.vy * ball.bounce;
            }

            ball.vx = ball.vx * drag;
            ball.vy = ball.vy * drag + gravity;
        }
    }

    function collisionCheck() {
        var spring = 0.8;

        for (var i = 0; i < (total - 1); ++i) {
            var ball0 = balls[i];

            for (var j = i + 1; j < total; ++j) {
                var ball1 = balls[j];
                var dx = ball1.x - ball0.x;
                var dy = ball1.y - ball0.y;
                var dist = Math.sqrt(dx * dx + dy * dy);
                var minDist = ball0.size + ball1.size;

                if (dist < minDist) {
                    var angle = Math.atan2(dy, dx);
                    var tx = ball0.x + dx / dist * minDist;
                    var ty = ball0.y + dy / dist * minDist;
                    var ax = (tx - ball1.x);
                    var ay = (ty - ball1.y);


                    ball0.x -= ax;
                    ball0.y -= ay;

                    ball1.x += ax;
                    ball1.y += ay;


                    ball0.vx -= (ax * spring);
                    ball0.vy -= (ay * spring);
                    ball1.vx += (ax * spring);
                    ball1.vy += (ay * spring);
                }
            }
        }
    }

    function getMouseXY(e) {
        if (IE) {
            mouseX = event.clientX + document.body.scrollLeft
            mouseY = event.clientY + document.body.scrollTop
        } else {
            mouseX = e.pageX
            mouseY = e.pageY
        }

        if (mouseX < 0) {
            mouseX = 0;
        }
        if (mouseY < 0) {
            mouseY = 0;
        }

        return true;
    }
}


// var fileUpload = {
//     // getElementById
//     $id : function(id){
//         return document.getElementById(id);
//     },
//     // output information
//     Output: function(msg){
//         var m = fileUpload.$id("files");
//         m.innerHTML = msg + m.innerHTML;
//     },
//     // file drag hover
//     FileDragHover: function(e){
//         e.stopPropagation();
//         e.preventDefault();
//         if(e.type == "dragover"){
//             $('.filedrag').addClass('hover');
//         }else{
//             $('.filedrag').removeClass('hover');
//         }
//     },
//     // file selection
//     FileSelectHandler: function(e){
//         // cancel event and hover styling
//         fileUpload.FileDragHover(e);

//         // fetch FileList object
//         var files = e.target.files || e.dataTransfer.files;

//         // process all File objects
//         for (var i = 0, f; f = files[i]; i++) {
//             fileUpload.ParseFile(f);
//         }
//     },
//     // output file information
//     ParseFile: function(file){
//         fileUpload.Output('<div class="item"><i class="icon-file"></i><div class="status"><div class="name">' + file.name + '</div><div class="size">' + file.size + ' bytes</div></div><a href="javascript:;"><i class="icon-x"></i></a></div>');
//     },
//     // initialize
//     Init: function(file){
//         var fileselect = fileUpload.$id("fileselect"),
//             filedrag = fileUpload.$id("filedrag"),
//             submitbutton = fileUpload.$id("submitbutton");

//         // file select
//         fileselect.addEventListener("change", fileUpload.FileSelectHandler, false);

//         // is XHR2 available?
//         var xhr = new XMLHttpRequest();
//         if (xhr.upload) {

//             // file drop
//             filedrag.addEventListener("dragover", fileUpload.FileDragHover, false);
//             filedrag.addEventListener("dragleave", fileUpload.FileDragHover, false);
//             filedrag.addEventListener("drop", fileUpload.FileSelectHandler, false);
//             filedrag.style.display = "block";
//         }
//     }
// };