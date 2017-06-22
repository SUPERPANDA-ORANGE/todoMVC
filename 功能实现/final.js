$(document).ready(function(){
    var myDate = new Date();
    if(myDate.getHours() =='2'){
        console.log(myDate.getHours())
        storage.clear();
    }
    init();
    $('#cin').keydown(function(ev){
        if(ev.keyCode == 13){add(activecnt)}
    })
    $("#allFinish").click(allFinish);
    $("#allNotFinish").click(allNotFinish);

})

function allFinish(){
    var activecnt = storage.getItem("activecnt");
    for(var i=0 ;i<=activecnt;i++){
        var text = storage.getItem("todo"+i);
        if(text==null){
            storage.removeItem('complete'+i);
            continue;
        }
        storage.setItem('complete'+i , 'true');
        $("#todo"+i).css('text-decoration' , 'line-through');
    }

}

function allNotFinish(){
    var activecnt = storage.getItem("activecnt");
    for(var i=0 ;i<=activecnt;i++){
        var text = storage.getItem("todo"+i);
        if(text==null){
            storage.removeItem('complete'+i);
            continue;
        }
        storage.setItem('complete'+i , 'false');
        $("#todo"+i).css('text-decoration' , 'none');
    }
    
}


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
    checkbox.attr('id' , activecnt);
    checkbox.attr("checked" , false)
    checkbox.css("display" , 'inline')
    checkbox.css("float" , 'left');
    checkbox.click(function(){
        //console.log(checkbox.is(':checked'))
        console.log(this.id);
        var temp = this.id;
        var status = checkbox.is(':checked');
        if(status == true){
            storage.setItem('complete'+temp , 'true');
            $("#todo"+temp).css('text-decoration' , 'line-through');
        }
        else if(status == false){
            storage.setItem('complete'+temp , 'false');
            $("#todo"+temp).css('text-decoration' , 'none');
        }
    })

    div.append(checkbox);

    //创建input的checkbox
    if(text==''){
        text = storage.getItem('todo'+activecnt);
    }
    var insert = $("<label></label>").text(text);
    insert.attr('id' , 'todo'+activecnt);
    insert.attr('class' , 'todo');
    insert.attr('for' , activecnt);
    insert.show();
    storage.setItem('todo'+activecnt , text);
    storage.setItem('complete'+activecnt , 'false');
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
    buttonController();
}



function init(){
    activecnt = storage.getItem('activecnt')
    if(activecnt== null) activecnt = 0
    for(var i=0;i<activecnt;i++){
            setAll(i);
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
    var activecnt = storage.getItem('activecnt');
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
    $("#clearComplete").mouseover(function(){
        $("#clearComplete").css('border-color' , 'grey');
    })
    $('#clearComplete').mouseleave(function(){
        $("#clearComplete").css('border-color' , 'white')
    })

//button控制
//Allbutton
    $("#All").click(function(){
        clear();
        for(var i=0;i<=activecnt;i++){
            setAll(i);
         }
    })

//Actice button
    $("#Active").click(function(){
        clear();
        for(var i=0;i<=activecnt;i++){
            setActive(i);
         }
    })

//Complete button
    $("#Complete").click(function(){
        clear();
        for(var i=0;i<=activecnt;i++){
            setComplete(i);
         }
    })

//clearComplete button
    $("#clearComplete").click(function(){
            clear();
            for(var i =0 ; i<=activecnt ; i++){
                setClearComplete(i);
            }
    })

}

function clear(){
    var list = $("#show-list-ul");
    list.empty();
} 

function setAll(temp){
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
    checkbox.attr('id' , temp)

    //checkbox.prop("checked" , storage.getItem('complete'+temp))
    var checked =  storage.getItem('complete'+temp);
    if(checked=='true'){
        checkbox.attr('checked' , true)
    }
    else if(checked=='false'){
        checkbox.attr('checked' , false)
    }
    console.log(checkbox.checked)
    checkbox.css("display" , 'inline')
    checkbox.css("float" , 'left');
    checkbox.click(function(){
        //console.log(checkbox.is(':checked'))
        console.log(this.id);
        var temp = this.id;
        var status = checkbox.is(':checked');
        if(status == true){
            storage.setItem('complete'+temp , 'true');
            $("#todo"+temp).css('text-decoration' , 'line-through');
        }
        else if(status == false){
            storage.setItem('complete'+temp , 'false');
            $("#todo"+temp).css('text-decoration' , 'none');
        }
    })
    div.append(checkbox);
    //创建input的checkbox
    var insert = $("<label></label>").text(text);
    insert.attr('id' , 'todo'+temp);
    insert.attr('for' , temp);
    insert.attr('class' , 'todo');
        if(checked=='true'){
        insert.css('text-decoration' , 'line-through')
    }
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

function setActive(temp){
    var status = storage.getItem('complete'+temp);//只针对complete:false的元素
    if(status == 'false'){
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
    checkbox.attr('id' , temp)
    checkbox.attr('checked' , false)
    checkbox.css("display" , 'inline')
    checkbox.css("float" , 'left');
    checkbox.click(function(){
        //console.log(checkbox.is(':checked'))
        console.log(this.id);
        var temp = this.id;
        var status = checkbox.is(':checked');
        if(status == true){
            storage.setItem('complete'+temp , 'true');
            $("#todo"+temp).css('text-decoration' , 'line-through');
        }
        else if(status == false){
            storage.setItem('complete'+temp , 'false');
            $("#todo"+temp).css('text-decoration' , 'none');
        }
    })
    div.append(checkbox);
    //创建input的checkbox
    var insert = $("<label></label>").text(text);
    insert.attr('id' , 'todo'+temp);
    insert.attr('class' , 'todo');
    insert.attr('for' , temp);
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
}

function setComplete(temp){
        var status = storage.getItem('complete'+temp);//只针对complete:false的元素
    if(status == 'true'){
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
    checkbox.attr('checked' , true);
    checkbox.css("display" , 'inline')
    checkbox.css("float" , 'left');
    checkbox.click(function(){
        //console.log(checkbox.is(':checked'))
        console.log(this.id);
        var temp = this.id;
        var status = checkbox.is(':checked');
        if(status == true){
            storage.setItem('complete'+temp , 'true');
            $("#todo"+temp).css('text-decoration' , 'line-through');
        }
        else if(status == false){
            storage.setItem('complete'+temp , 'false');
            $("#todo"+temp).css('text-decoration' , 'none');
        }
    })
    div.append(checkbox);
    //创建input的checkbox
    var insert = $("<label></label>").text(text);
    insert.attr('id' , 'todo'+temp);
    insert.attr('class' , 'todo');
    insert.attr('for' , temp);
    insert.css('text-decoration' , 'line-through')
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
}

function setClearComplete(temp){
    var status = storage.getItem('complete'+temp);
    if(status=='true'){
        storage.removeItem('complete'+temp)
        storage.removeItem('todo'+temp);
    }
   setAll(temp);
}