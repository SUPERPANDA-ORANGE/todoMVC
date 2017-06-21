$(document).ready(function(){
    init();
    $('#add').click('add(activecnt)');
    $('#cin').keydown(function(ev){
        if(ev.keyCode == 13){add(activecnt)}
    })

})

var storage = window.localStorage;
function add(activecnt){
    activecnt = storage.getItem('activecnt');
    if(activecnt==null) activecnt=0;
    //var showlist = $('#show-list-ul');
    var text = $("#cin").val();
    //alert(text);    
    var li = $("<li></li>");
    li.attr('id' , 'li' +activecnt);
    $("#show-list-ul").append(li);
    //创建主体框
    var div = $("<div></div>");
    div.attr('id' , 'div'+activecnt);
    li.append(div);
    //创建div
    var checkbox = $("<input></input>");
    checkbox.attr('class' , 'toggle');
    checkbox.attr('type' , 'checkbox');
    checkbox.css("display" , 'inline')
    checkbox.css("float" , 'left');
    div.append(checkbox);
    //创建input的checkbox
    if(text==''){
        text = storage.getItem('todo'+activecnt);
    }
    var insert = $("<label></label>").text(text);
    insert.attr('id' , 'todo'+activecnt);
    insert.attr('class' , 'todo');
    insert.show();
    storage.setItem('todo'+activecnt , text);
    div.append(insert);
    //创建文字标签
    var input = $("<input>")
    input.attr('type' , 'text');
    input.attr('id' , 'edit'+activecnt);
    input.attr('placeholder' , text);
    input.attr('autofocus' , 'autofocus');
    input.hide();
    div.append(input);
    //创建input标签
    activecnt = parseInt(activecnt);
    activecnt+=1;
    storage.setItem('activecnt' , activecnt);
    //计数器加一
    $("#cin").val('') ;
    var button = $("<button></button>").text('x');
    button.attr('class' , 'destroy');
    button.attr('id' , 'destroy'+activecnt);
    div.append(button);
    //创建删除按钮
    button.click(deleted);
    div.dblclick(edit);
}

function set(temp){
    //var showlist = $('#show-list-ul');
    var text = storage.getItem('todo'+temp)
    if(text==null)return;
    //alert(text);    
    var li = $("<li></li>");
    li.attr('id' , 'li' +temp);
    $("#show-list-ul").append(li);
    //创建主体框
    var div = $("<div></div>");
    div.attr('id' , 'div'+temp);
    li.append(div);
    //创建div
    var checkbox = $("<input></input>");
    checkbox.attr('class' , 'toggle');
    checkbox.attr('type' , 'checkbox');
    checkbox.css("display" , 'inline')
    checkbox.css("float" , 'left');
    div.append(checkbox);
    //创建input的checkbox
    var insert = $("<label></label>").text(text);
    insert.attr('id' , 'todo'+temp);
    insert.attr('class' , 'todo');
    insert.show();
    div.append(insert);
    //创建文字标签
    var input = $("<input>")
    input.attr('type' , 'text');
    input.attr('id' , 'edit'+temp);
    input.attr('placeholder' , text);
    input.attr('autofocus' , 'autofocus');
    input.hide();
    div.append(input);
    //创建input标签
    $("#cin").val('') ;
    var button = $("<button></button>").text('x');
    button.attr('class' , 'destroy');
    button.attr('id' , 'destroy'+temp)
    div.append(button);
    //创建删除按钮
    button.click(deleted);
    div.dblclick(edit);
}

function init(){
    activecnt = storage.getItem('activecnt')
    if(activecnt== null) activecnt = 0
    for(var i=0;i<activecnt;i++){
            set(i);
         }
    buttonController();
}

//删除问题成功解决
function deleted(){
    console.log(this.id.slice(7));
    var temp = this.id.slice(7);
    this.parentNode.parentNode.parentNode.removeChild(this.parentNode.parentNode);
    storage.removeItem("todo"+temp);
}

//修改
function edit(){
    console.log("edit");
    console.log(this.id.slice(3));
    var temp = this.id.slice(3);
    $("#todo"+temp).toggle();
    $("#edit"+temp).toggle();
    $("#edit"+temp).focus();
    $("#edit"+temp).blur(function(){
        var text = $("#edit"+temp).val();
        //attention
        if(text==''){
            $("#todo"+temp).show();
            $("#edit"+temp).text('')
            $("#edit"+temp).hide();
            return;
        }
        storage.setItem("todo"+temp , text);
        $("#todo"+temp).text(text);
        $("#todo"+temp).show();
        $("#edit"+temp).attr('placeholder' , text)
        $("#edit"+temp).val('')
        $("#edit"+temp).hide();
        console.log("blur");
    })

    $("#edit"+temp).keydown(function(ev){
        if(ev.keyCode==13){
            var text = $("#edit"+temp).val();
            if(text==undefined) text='';
            storage.setItem("todo"+temp , text);
        /*    if(text==''){
            $("#todo"+temp).show();
            $("#edit"+temp).text('')
            $("#edit"+temp).hide();
            return;
        }回车不实现这个功能
        */
            $("#todo"+temp).text(text);
            $("#todo"+temp).show();
            $("#edit"+temp).hide();
            console.log("blur");
        }
    })
    
}

function buttonController(){
    console.log("2")
    $("#All").mouseover(function(){
        $("#All").css('border-color' , 'grey');
    })
    $('#All').mouseleave(function(){
        $("#All").css('border-color' , 'white')
    })
        $("#Active").mouseover(function(){
        $("#Active").css('border-color' , 'grey');
    })
    $('#Active').mouseleave(function(){
        $("#Active").css('border-color' , 'white')
    })
        $("#Complete").mouseover(function(){
        $("#Complete").css('border-color' , 'grey');
    })
    $('#Complete').mouseleave(function(){
        $("#Complete").css('border-color' , 'white')
    })
}

 