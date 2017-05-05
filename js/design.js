var json = {
  //对象默认值，从这里复制
  default : {
    title : '',     //done
    title2 : '',    //done
    placeholder : '', //done
    placeholder2:'',  //done
    required : false, //done
    detailstatistic : false,  //done
    printable : true, //done
    display : true,//done
    options : '', //done
    dateType : '',  //done
    pushcalendar : false,//done
    seq : 1,    //根据表单里的上下顺序，顺序排列
    controltype :'',//类型，控件类型
    name : '',  //随即的name
    html : '' //代码，表单里的代码
  },
  key : {
    //只传一个参数，则为返回代码，传两个参数为赋值给data赋值,传三个参数为取值，从data取值
    title : function(v,t,f){
      if(arguments.length == 1){
        //赋值
        return '<div class="design-setting-view"><div class="design-setting-view-head">标题<span class="design-setting-tip">最多10个字</span></div><div class="design-setting-view-ipt"><input class="ipt title-ipt" type="text" data-type="title" name="title" value="'+v+'"></div></div>';
      }else if(arguments.length == 2){
        //返回html代码,有可能是给明细的title赋值
        if(t.find('.component-item-table-head').length > 0){
          t.find('.component-item-table-head').html(v);
        }else{
          t.find('.component-item-view-label').html(v);
          t.data('title',v);
          //同时判断下是不是数字输入框
          var ttype = t.data().controltype;
          if(ttype == 'numberfield'){
            //再判断下是不是有同id的统计代码
            var id = t.attr('id');
            $('[dtid="'+id+'"]').html('总'+v+':0');
          }

        }
      }else{
        return t.data().title;
      }
    },
    title2 : function(v,t,f){
      if(arguments.length == 1){
        //赋值
        return '<div class="design-setting-view"><div class="design-setting-view-head">标题2<span class="design-setting-tip">最多10个字</span></div><div class="design-setting-view-ipt"><input class="ipt title2-ipt" type="text" data-type="title2" name="title2" value="'+v+'"></div></div>';
      }else if(arguments.length == 2){
        //返回html代码
        t.find('.component-item-view-label2').html(v);
        t.data('title2',v);
      }else{
        return t.data().title2;
      }
    },
    placeholder : function(v,t,f){
      if(arguments.length == 1){
        //赋值
        return '<div class="design-setting-view"><div class="design-setting-view-head">提示文字<span class="design-setting-tip">最多20个字</span></div><div class="design-setting-view-ipt"><input class="ipt placeholder-ipt" type="text" data-type="placeholder" name="placeholder" value="'+v+'"></div></div>';
      }else if(arguments.length==2){
        //返回html代码
        var rq = t.data().required || t.data().required == true || t.data().required == 'true' ? '(必填)':'';
        t.find('.component-placeholder').html(v+rq);
        t.data('placeholder',v);
      }else{
        return t.data().placeholder;
      }
    },
    placeholder2 : function(v,t,f){
      if(arguments.length == 1){
        //赋值
        return '<div class="design-setting-view"><div class="design-setting-view-head">提示文字2<span class="design-setting-tip">最多20个字</span></div><div class="design-setting-view-ipt"><input class="ipt placeholder2-ipt" type="text" data-type="placeholder" name="placeholder" value="'+v+'"></div></div>';
      }else if(arguments.length==2){
        //返回html代码
        t.find('.placeholder2-ipt').val(v);
      }else{
        return t.data().placeholder2;
      }
    },
    
    detailstatistic : function(v,t,f){
      if(arguments.length == 1){
        //赋值
        //1.如果只是赋值的话..判断一下该t的上级是不是table
        var settingT = setting.currentTarget;
        var mingxiO = settingT.parent().parent().parent();
        if(mingxiO && mingxiO.attr('type') =='table'){
          var ck = v == true || v =='true' ? 'checked' : '';
          return '<div class="design-setting-view"><div class="design-setting-view-head">统计</div><div class="design-setting-view-ipt"><input type="checkbox" '+ck+' class="ipt detailstatistic-ipt" data-type="detailstatistic" name="detailstatistic" />明细内部统计（如勾选，该字段将在明细组件内参与统计求和）</div></div>';  
        }else{
          return '';
        }
      }else if(arguments.length==2){
        //返回html代码
        //1.如果选中，则向明细底部添加代码
        //2.如果取消，则从明细底部移除代码
        //3.如果更改标题，则更改对应的明细底部代码
        t.data('detailstatistic',v);
        var id = t.attr('id');
        if(v == true || v == 'true'){
          var title = t.data().title;
          var mxo = t.parent().parent();
          //还要排序的昂
          mxo.append('<div class="numberfield-detail" dtid="'+id+'">总'+title+':0'+'</div>');
        }else{
          $('[dtid="'+id+'"]').remove();
        }
        t.find('.detailStatistic-ipt').val(v);
      }else{
        return t.data().detailStatistic;
      }
    },
    description : function(v,t,f){
      if(arguments.length == 1){
        return '<div class="design-setting-view"><div class="design-setting-view-head">说明文字<span class="design-setting-tip">最多400个字</span></div><div class="design-setting-view-ipt"><textarea name="description" data-type="description" class="ipt description-ipt">'+v+'</textarea></div></div>';
      }else if(arguments.length == 2){
        //赋值
        t.find('.component-item-view-wp').html(v);
        t.data('description',v);
      }else{
        return t.data().description;
      }
    },
    display : function(v,t,f){
      if(arguments.length == 1){
        //赋值
        return '<div class="design-setting-view"><div class="design-setting-view-head">显示</div><div class="design-setting-view-ipt"><input type="checkbox" class="ipt display-ipt" data-type="display" name="display" />不在审批页面显示</div></div>';
      }else if(arguments.length==2){
        //返回html代码
        t.find('.display-ipt').val(v);
      }else{
        return t.data().display;
      }
    },
    options : function(v,t,f){
      var createOpt = function(tempv){
        var res = '',vs = tempv.split(',');
        for(var i=0,max=vs.length;i<max;i++){
          var str = vs[i];
          res+='<div class="design-setting-view-opt"><input type="text" class="ipt options-ipt" name="options" value="'+str+'" data-type="options" ><span>-</span><span>+</span></div>';
        }
        return res;
      };
      var getOpt = function(t){

      };
      if(arguments.length == 1){
        //赋值
        return '<div class="design-setting-view"><div class="design-setting-view-head">选项<span class="design-setting-tip">最多200项，每项最多20个字</span></div>'+createOpt(v)+'</div>';
      }else if(arguments.length==2){
        //返回html代码
        t.find('.options-ipt').val(v);
      }else{
        return t.data().options;
      }
    },
    datetype : function(v,t,f){
      if(arguments.length == 1){
        //赋值,ymd ymdhm
        var ck1='',ck2=' checked';
        if(v.toLowerCase() == 'ymdhm'){
          ck1 = ' checked ',ck2 ='';
        }
        return '<div class="design-setting-view"><div class="design-setting-view-head">日期类型</div><div class="design-setting-view-ipt"><input type="radio" class="ipt datetype-ipt" data-type="datetype" '+ck1+' value="ymdhm" name="datetype" />年-月-日 时:分<br /><input type="radio" class="ipt datatype-ipt" data-type="datetype" '+ck2+' value="ymd" name="datetype" />年-月-日</div></div>';
      }else if(arguments.length==2){
        //返回html代码
        t.data('datetype',v);
      }else{
        return t.data().datetype;
      }
    },
    required : function(v,t,f){
      if(arguments.length == 1){
        //赋值
        var ck = undefined == v || null == v || '' == v ? '' : ' checked ';
        return '<div class="design-setting-view"><div class="design-setting-view-head">验证</div><div class="design-setting-view-ipt"><input type="checkbox" class="ipt required-ipt" data-type="required" name="required" '+ck+' />必填</div></div>';
      }else if(arguments.length==2){
        //返回html代码
        var nowv = t.find('.component-placeholder').html();
        if(v == 'true' || v == true){
          //增加必填
          t.find('.component-placeholder').html(nowv+'(必填)');  
        }else{
          t.find('.component-placeholder').html(nowv.substring(0,nowv.length-4));
        }
        t.data('required',v);
      }else{
        return t.data().required;
      }
    },
    printable : function(v,t,f){
      if(arguments.length == 1){
        //赋值
        var ck = v == true || v == 'true' ? ' checked ' : '';
        return '<div class="design-setting-view"><div class="design-setting-view-head">打印</div><div class="design-setting-view-ipt"><input type="checkbox" class="ipt printable-ipt" data-type="printable" '+ck+' name="printable" />参与打印（如不勾选，打印时不显示该项）</div></div>';
      }else if(arguments.length==2){
        //返回html代码
        t.data('printable',v);
      }else{
        return t.data().printable;
      }
    },
    pushcalendar : function(v,t,f){
      if(arguments.length == 1){
        return '<div class="design-setting-view"><div class="design-setting-view-head">推送</div><div class="design-setting-view-ipt"><input type="checkbox" class="ipt pushCalendar-ipt" data-type="pushCalendar" name="pushCalendar" />数据推送管理日历（推送后数据就会在管理日历中体现，例如：请假、出差、外出）</div></div>';
      }else if(arguments.length==2){
        //返回html代码
        t.data('pushcalendar',v);
      }else{
        return t.data().pushcalendar;
      }
    },
    actionname : function(v,t,f){
      if(arguments.length == 1){
        return '<div class="design-setting-view"><div class="design-setting-view-head">动作名称<span class="design-setting-tip">最多10个字</span></div><div class="design-setting-view-ipt"><input type="text" class="ipt actionname-ipt" data-type="actionname" name="actionname" value="'+v+'" /></div></div>';
      }else if(arguments.length == 2){
        //只有明细组件才会有这个
        t.data('actionname',v);
        t.find('.component-item-table-bottom').html(v);
      }else{
        return t.data().actionname;
      }
    }

  },
  getName : function(type){
    //返回一个随即字符串
    return type+''+new Date().getTime()+(100*Math.random());
  },
  textfield : {
    controltype : 'textfield',
    title : '单行输入框',
    placeholder : '请输入',
    name :  function(){return json.getName(this.controltype);},
    required : false,
    printable : true,
    html : function(){
      return '<div class="component-item-cantainer" data-controltype="'+this.controltype+'" data-title="'+this.title+'" data-placeholder="'+this.placeholder+'" data-name="'+this.name()+'" data-required="'+this.required+'" data-printable="'+this.printable+'"><div class="component-item-view"><div class="component-item-remove"></div><div class="component-item-view-wp"><label for="'+this.name()+'" class="component-item-view-label">'+this.title+'</label><span class="component-item-view-textfield component-placeholder" >'+this.placeholder+'</span></div></div></div>';
    }
  },
  textareafield : {
    controltype : 'textareafield',
    title : '多行输入框',
    placeholder : '请输入',
    name :  function(){return json.getName(this.controltype);},
    required : false,
    printable : true,
    html : function(){
      return '<div class="component-item-cantainer" data-controltype="'+this.controltype+'" data-title="'+this.title+'" data-placeholder="'+this.placeholder+'" data-name="'+this.name()+'" data-required="'+this.required+'" data-printable="'+this.printable+'"><div class="component-item-view"><div class="component-item-remove"></div><div class="component-item-view-wp"><label for="'+this.name()+'" class="component-item-view-label">'+this.title+'</label><span class="component-item-view-textareafield component-placeholder" >'+this.placeholder+'</span></div></div></div>';
    }
  },
  numberfield : {
    controltype :'numberfield',
    title : '单行输入框',
    placeholder : '请输入',
    name :  function(){return json.getName(this.controltype);},
    required : false,
    printable : true,
    detailstatistic : false,
    id : (function(){
      return new Date().getTime().toString().substring(10)+Math.random()*100;
    }),
    html : function(){
      return '<div class="component-item-cantainer" id="'+this.id()+'" data-controltype="'+this.controltype+'" data-title="'+this.title+'" data-placeholder="'+this.placeholder+'" data-name="'+this.name()+'" data-required="'+this.required+'" data-printable="'+this.printable+'" data-detailstatistic="'+this.detailstatistic+'"><div class="component-item-view"><div class="component-item-remove"></div><div class="component-item-view-wp"><label for="'+this.name()+'" class="component-item-view-label">'+this.title+'</label><span class="component-item-view-numberfield  component-placeholder" >'+this.placeholder+'</span></div></div></div>';
    }
  },
  ddselectfield : {
    controltype : 'ddselectfield',
    title : '单选框',
    name :  function(){return json.getName(this.controltype);},
    options : '选项1,选项2,选项3',
    required: false,
    printable : true,
    html : function(){
      return '<div class="component-item-cantainer" data-controltype="'+this.controltype+'" data-title="'+this.title+'" data-options="'+this.options+'" data-name="'+this.name()+'" data-required="'+this.required+'"  data-printable="'+this.printable+'"><div class="component-item-view"><div class="component-item-remove"></div><div class="component-item-view-wp"><label for="'+this.name()+'" class="component-item-view-label">'+this.title+'</label><span class="component-item-view-ddselectfield component-placeholder" >请选择</span><span class="component-item-view-arrow-right"></span></div></div></div>';
    }
  },
  dddatefield : {
    controltype : 'dddatefield',
    title : '日期',
    datetype : 'ymd',
    name :  function(){return json.getName(this.controltype);},
    required : false,
    printable : true,
    html : function(){
      return '<div class="component-item-cantainer" data-controltype="'+this.controltype+'" data-title="'+this.title+'" data-datetype="'+this.datetype+'" data-required="'+this.required+'" data-printable="'+this.printable+'" data-name="'+this.name()+'"><div class="component-item-view"><div class="component-item-remove"></div><div class="component-item-view-wp"><label for="'+this.name()+'" class="component-item-view-label">'+this.title+'</label><span class="component-item-view-dddatefield component-placeholder" >请选择</span><span class="component-item-view-arrow-right"></span></div></div></div>';
    }
  },
  dddaterangefield : {
    controltype : 'dddaterangefield',
    title : '开始时间',
    title2 : '结束时间',
    placeholder : '请选择',
    placeholder2:'请选择',
    name :  function(){return json.getName(this.controltype);},
    required : false,
    printable : true,
    datetype : 'ymd',
    pushcalendar : false,
    html : function(){
      return '<div class="component-item-cantainer" data-controlType="'+this.controltype+'" data-title="'+this.title+'" data-title2="'+this.title2+'" data-name="'+this.name()+'" data-datetype="'+this.datetype+'" data-required="'+this.required+'" data-printable="'+this.printable+'" data-pushcalendar="'+this.pushcalendar+'"><div class="component-item-view"><div class="component-item-remove"></div><div class="component-item-view-wp"><label for="ddstartfield" class="component-item-view-label">'+this.title+'</label><span class="component-item-view-dddaterangefield  component-placeholder" >请选择</span><span class="component-item-view-arrow-right"></span></div><div class="component-item-view-line"></div><div class="component-item-view-wp"><label for="ddendtime" class="component-item-view-label2">'+this.title2+'</label><span class="component-item-view-dddaterangefield component-placeholder" >请选择</span><span class="component-item-view-arrow-right"></span></div></div></div>';
    }
  },
  ddphotofield : {
    controltype : 'ddphotofield',
    title : '图片',
    required : false,
    printable : true,
    name :  function(){return json.getName(this.controltype);},
    html : function(){
      return '<div class="component-item-cantainer" data-controlType="'+this.controltype+'" data-title="'+this.title+'" data-required="'+this.required+'" data-printable="'+this.printable+'" data-name="'+this.name()+'"><div class="component-item-view"><div class="component-item-remove"></div><div class="component-item-view-wp"><label for="'+this.name()+'" class="component-item-view-label">'+this.title+'</label><span class="component-item-view-ddphotofield component-placeholder" ></span><span class="component-item-view-photo-icon"></span></div></div></div>';
    }
  },
  textnote : {
    controltype : 'textnote',
    description : '请输入说明文字',
    display : false,
    printable : false,
    name :  function(){return json.getName(this.controltype);},
    html : function(){
      return '<div class="component-item-cantainer" data-controlType="'+this.controltype+'" data-description="'+this.description+'" data-display="'+this.display+'" data-printable="'+this.printable+'" data-name="'+this.name()+'"><div class="component-item-view  component-item-view-textnote"><div class="component-item-remove"></div><div class="component-item-view-wp">'+this.description+'</div></div></div>';
    }
  },
  tablefield : {
    controltype : 'tablefield',
    title : '明细',
    actionname : '添加明细',
    name :  function(){return json.getName(this.controltype);},
    html : function(){
      return '<div class="component-item-cantainer" type="table" data-controlType="'+this.controltype+'" data-title="'+this.title+'" data-actionname="'+this.actionname+'" data-name="'+this.name()+'"><div class="component-item-view"><div class="component-item-remove"></div><div class="component-item-table-head">'+this.title+'</div><div class="component-item-table-body"><span class="component-item-table-empty">可拖入多个组件(不包含明细组件)</span></div><div class="component-item-table-bottom">'+this.actionname+'</div></div></div>';
    }
  }

};
  var result = [];//返回结果
 $(document).ready(function(){
  //全局对象，表单对象
  var $formObject = $('.design-workspace-code');
  var currentTarget = {
      fromTarget : null,
      toTarget : null,
      iscom : false,
      componentType : ''
  };
  //var currentTarget = null;
  var isMove = false;
  $("body").delegate(".design-component-item,.component-item-cantainer", "mousedown", function(event){
    //阻止默认事件
    event.preventDefault();
    event.stopPropagation();
    var removeT = event.target ? event.target : event.srcElement;
    if($(removeT).attr('class') == 'component-item-remove'){
      removeComponent($(removeT).parent().parent());
      event.stopPropagation();
      return false;
    }
    isMove = true;
    //生成阴影
    // var target = event.target ? event.target : event.srcElement;
    // if(undefined == $(target).data().title){
    //   target = $(target).parent()[0];
    // }

    var target = event.currentTarget;
    var dataMap = $(target).data();
    currentTarget.fromTarget = $(target);
    console.log(target);
    if($(target).attr('class') == 'design-component-item'){
      //左侧控件
      currentTarget.componentType = dataMap.type;
      currentTarget.iscom = false;
    }else{
      //表单控件
      currentTarget.componentType = dataMap.controltype;
      currentTarget.iscom = true;
      addClickStyle($(target));
      //当前激活状态的对象
      setting.currentTarget = $(target);
      //同时，根据该对象创建右侧的设置区域
      setting.createSetting($(target));
    }

    var $temp = $('<div class="design-component-item-move">'+dataMap.title+'</div>');

    $('body').append($temp);//.css({
    //   'left':(event.pageX-75)+'px',
    //   'top':(event.pageY-20)+'px'
    // }));
    //获得手机里组件的位置
    var positionMap = getPosition();
    //监听鼠标移动事件
    $(document).delegate('body','mousemove',function(en){
      var mouseX = en.pageX,mouseY = en.pageY;
      //防止空移动，就是不抓取组件，模拟移动
      if(isMove == false){
        return;
      }
      if(currentTarget.iscom == true){
        currentTarget.fromTarget.addClass('design-component-move');
      }
      $temp.css({
        'display':'block',
        'left' : (en.pageX-75)+'px',
        'top' : (en.pageY-20)+'px'
      });
      if(mouseX > positionMap.left && mouseX < positionMap.right){
        if(positionMap.position.length > 0){
          //随时判断
          var createTarget = null;
          var formFlag = false;
          for(var i=0,max=positionMap.position.length;i<max;i++){
            //得到所有的组件
            if(formFlag){//如果从上到下有10个组件，只要前面的符合就break..不然..
              break;
            }
            var $tempTarget = positionMap.position[i];
            //判断是否是明细
            if($tempTarget.table){
              //明细单独判断
              //判断抓取的目标是不是明细，同时目标是不是明细
              if(currentTarget.fromTarget.data().type =='tablefield' || currentTarget.fromTarget.data().controltype == 'tablefield'){
                //判断是不是中间
                if(mouseY <  $tempTarget.center){
                  createTarget = $tempTarget.target;
                  createLine(createTarget);
                  formFlag = true;
                  break;
                }else{
                  continue;
                }
              }


              if(mouseY < $tempTarget.top){
                //在明细组件的上面
                createTarget = $tempTarget.target;
                createLine(createTarget);
                formFlag = true;
                break;
              }else if(mouseY > $tempTarget.top && mouseY < $tempTarget.bottom){
                //在明细组件内部，判断明细组件的子级
                var tableChilds = $tempTarget.children;
                if(tableChilds.length > 0 ){
                  //存在子级
                  var mingxiFlag = false;
                  for(var x=0,xma=tableChilds.length;x<xma;x++){
                    var tableChildren = tableChilds[x];
                    //判断当前鼠标位置与子级的位置。
                    if(mouseY < tableChildren.top){
                      createTarget = tableChildren.target;
                      createLine(createTarget);
                      mingxiFlag = true;
                      formFlag = true;
                      break;
                    }
                  }
                  if(mingxiFlag == false){
                    //放在最后面
                    //console.log($tempTarget.target);
                    createLine($tempTarget.target,0);
                    formFlag = true;
                    break;
                  }
                }else{
                  //直接在明细内部创建位置线
                  // createTarget($tempTarget.target,0);
                  createLine($tempTarget.target,0);
                  formFlag = true;
                  break;
                }
              }
              // else {
              //   formFlag = false;
              //   break;
              // }
            }else{
              if(mouseY < $tempTarget.top ){
                createTarget = $tempTarget.target;
                createLine(createTarget);
                formFlag = true;
                break;
              }
            }
          }
          if(!formFlag){
            createLine(null);
          }
        }else{
          //表单里面没有内容
          createLine(null);
        }
      }else{
        destoryLine();
      }
    })

    //监听鼠标移动事件
    $(document).delegate('body','mouseup',function(en){
      en.preventDefault();
      isMove = false;
      //判断当前对象是否有值，没有值则不操作。有则添加
      if(null != currentTarget.toTarget){
        if(null == currentTarget.toTarget.target){
          var $appendBody = null;
          if(currentTarget.iscom == true){
            $appendBody = currentTarget.fromTarget.removeClass('design-component-move');
          }else{
            $appendBody = $(json[currentTarget.componentType].html());  
          }
          
          //添加点击样式
          addClickStyle($appendBody);
          //将组件添加到form表单中
          $formObject.append($appendBody);
          //根据组件内容生成右侧设置代码
          setting.createSetting($appendBody);
         
        }else{
          var $appendBody = null;
          if(currentTarget.iscom == true){
            $appendBody = currentTarget.fromTarget.removeClass('design-component-move');
          }else{
            $appendBody = $(json[currentTarget.componentType].html());  
          }
          // var $appendBody = $(json[currentTarget.componentType].html());
          if(undefined != currentTarget.toTarget.flag && currentTarget.toTarget.flag == 0){
            addClickStyle($appendBody);
            currentTarget.toTarget.target.find('.component-item-table-body').append($appendBody);  
            //根据组件内容生成右侧设置代码
            setting.createSetting($appendBody);
          }else{
            addClickStyle($appendBody);
            currentTarget.toTarget.target.before($appendBody);
            //根据组件内容生成右侧设置代码
            setting.createSetting($appendBody);
          }
          if(currentTarget.iscom == true){
            $('.design-component-move').remove();
          }
          
        }
        //去掉表单的空样式
        destoryEmpty();
      }
      destoryLine();
      $('.design-component-item-move').remove();
      $(document).undelegate('body','mousemove mouseup');
    });


  });

 

  //得到表单中所有组件的位置信息
 var getPosition = function(){
  var resObj = {};resObj.left = $formObject.offset().left,resObj.right =$formObject.offset().left+$formObject.width(),resObj.position=[];
  var components = $formObject.children('.component-item-cantainer');
  if(components.size() > 0){
    $.each(components,function(){
      var $componentItem = $(this);
      /**
      1.如果是普通的组件
      2.如果是明细
      **/
      var $os = $componentItem.offset();
      var isTable = $componentItem.attr('type') == 'table' ? true : false;
      var res = {};
      if(isTable){
        //1.明细的起始
        var coms = $componentItem.find('.component-item-table-body').children('.component-item-cantainer');
        var comsRes = [];
        if(coms.length > 0){

          $.each(coms,function(){
            var $temp = $(this);
            var $tempOs = $temp.offset();
            comsRes.push({
              target : $temp,
              top : $tempOs.top+($temp.height()/2)
            });
          });
        }
        res = {
          table : true,
          target : $componentItem,
          top : $os.top,
          center : $os.top+($componentItem.height()/2),
          bottom : $os.top+$componentItem.height(),
          //返回明细的组件子级
          children : comsRes
        };
      }else{
        res = {
          target : $componentItem,
          top : ($os.top+$componentItem.height()/2)
        };
      }
      resObj.position.push(res);
    });
  }else{
    
  }  
  return resObj;
 };

//摧毁确定位置的线
var destoryLine = function(){
  if($('.component-dragging-mark').length > 0 ){
    $('.component-dragging-mark').remove();
  }
  currentTarget.toTarget = null;
};
//生成确定位置的线,flag :0 ，主要是明细的问题。。明细真烦人
 var createLine = function(target,flag){
  destoryLine();
  if(null == target){ //直接在form中append
    $formObject.append('<div class="component-dragging-mark"></div>');
    currentTarget.toTarget = {
      target : null
    };
  }else{  //在target之前增加
    if(undefined != flag && (flag == false || flag == 0 )){
      //在明细内部创建
      target.find('.component-item-table-body').append('<div class="component-dragging-mark"></div>');
      currentTarget.toTarget = {
        target : target,
        flag : 0
      };
    }else{
      target.before('<div class="component-dragging-mark"></div>');
      currentTarget.toTarget = {
        target : target
      };
    }
    
  }
 };
 //生成空表单的图片
 var createEmpty = function(){
  $('.design-workspace-form').addClass('design-workspace-empty');
 };
 //删除空表单的图片
 var destoryEmpty = function(){
  $('.design-workspace-form').removeClass('design-workspace-empty');
 };
  
  
  //增加点击样式
  var addClickStyle = function(t){
    $('.component-item-focus').removeClass('component-item-focus');
    t = t instanceof jQuery ? t : $(t);
    //如果是明细，则只增加名字自己的样式
    t.children('.component-item-view').addClass('component-item-focus');
    setting.activeA();
  };

  //绑定删除组件事件
  $formObject.delegate('.component-item-remove','keydown',function(ev){
    var target = $(ev.currentTarget).parent().parent();
    removeComponent(target);
    ev.stopPropagation();
    return false;
  });

  //移除组件
  var removeComponent = function(t){
    if(t.attr('class').indexOf('component-item-cantainer') > -1){
      t.remove();
      //如果form里面没有组件，则增加empty
      if($formObject.find('.component-item-cantainer').length <= 0){
        createEmpty();
      }
      setting.activeB();
    }
  };

  //绑定鼠标经过事件
  $formObject.delegate('.component-item-view','mouseenter',function(ev){
    var $target = $(ev.currentTarget);
    var judgeObject = $target.parent().parent();
    if(judgeObject.attr('class').indexOf('design-workspace-code') > -1){
      //表单的
      createHover($target);
    }else{
      //明细的
      createHover($target);
      //1.先把外层的样式去掉
      destoryHover(judgeObject.parent());
      return false;
    }
  });
  //绑定鼠标滑出事件
  $formObject.delegate('.component-item-view','mouseleave',function(ev){
    var $target = $(ev.currentTarget);
    var judgeObject = $target.parent().parent();
    if(judgeObject.attr('class').indexOf('design-workspace-code') > -1){
      //表单的
      destoryHover($target);
    }else{
      //明细的
      destoryHover($target);
      createHover(judgeObject.parent());
    }
  });
  //给对象创建鼠标经过的样式
  var createHover = function(t){
    t.addClass('hoverStyle');
    t.children('.component-item-remove').css('display','block');
  };
  //摧毁对象的鼠标经过样式
  var destoryHover = function(t){
    t.removeClass('hoverStyle');
    t.children('.component-item-remove').css('display','none');
  };


  //处理表单的高度
  
  var createFormHeight = function(){
    $formObject.height($('.wrap').height()-$formObject.offset().top);
    $('.design-setting-left').height($('.wrap').height()-$('.design-setting-left').offset().top);
  };
  createFormHeight();
  //绑定窗口变化
  window.onresize = function(){
    createFormHeight();
  };
//---jquery end
});



/**审批设置*/
$(document).ready(function(){
  //绑定设置点击事件
  $('.design-setting-header').delegate('li','click',function(ev){
    if($(ev.currentTarget).attr('id') == 'setting-header1'){
      setting.activeA();
    }else{
      setting.activeB();
    }
  });

  //1.绑定输入框的按键事件
  $('.design-setting-left').delegate('.ipt[type="text"]','keyup',function(ev){
    var $ipt = $(ev.currentTarget);
    var v = $ipt.val();
    var type = $ipt.data().type;
    //同时校验字符长度
    if(type == 'title' || type == 'title2' || type == 'actionname'){
      if(v.length > 10 ){
        v = v.substring(0,10);
        $ipt.parent().parent().addClass('design-setting-warn');
      }else{
        $ipt.parent().parent().removeClass('design-setting-warn');
      }
    }else if(type == 'placeholder' || type == 'placeholder2'){
      if(v.length > 20 ){
        v = v.substring(0,20);
        $ipt.parent().parent().addClass('design-setting-warn');
      }else{
        $ipt.parent().parent().removeClass('design-setting-warn');
      }
    }else if(type == 'options'){
      //超过20不显示
      $ipt.val(v.substring(0,20));
      return false;
    }
    setting.setValue(type,v);
  });
  //2.绑定复选框的事件
  $('.design-setting-left').delegate('.ipt[type=checkbox]','click',function(ev){
    var $cpt = $(ev.currentTarget);
    var type= $cpt.data().type;
    //判断是选中还是取消了..
    var v = $cpt.prop('checked');
    setting.setValue(type,v);
    
  });
  //3.绑定文本框
  $('.design-setting-left').delegate('textarea','keyup',function(ev){
    //不能超过400字
    var $tpt = $(ev.currentTarget);
    var v = $tpt.val();
    var type = $tpt.data().type;
    if(v.length > 400){
      $tpt.parent().parent().addClass('design-setting-warn');
    }else{
      $tpt.parent().parent().removeClass('design-setting-warn');
    }
    setting.setValue(type,v);
  });
  //4.绑定单选框
  $('.design-setting-left').delegate('.ipt[type=radio]','click',function(ev){
    var $rpt = $(ev.currentTarget);
    var v = $rpt.val();
    var type = $rpt.data().type;
    setting.setValue(type,v);
  });

  //5.绑定保存事件
  $('.toolbar-save').delegate('','click',function(){
    var result = setting.scanForm($('.design-workspace-code'));
    console.log(result);
    var sourse = setting.genSourse();
    localStorage.setItem('content',sourse);
    localStorage.setItem('nodes',toolbar.stringfy(result));
  });
  $('.toolbar-view').delegate('','click',function(){
    window.open('view.html');
  });

  //6.绑定图标点击事件
  $('.setting-icon').delegate('','click',function(ev){
    $('.icon-active').css('display','none');
    $(ev.currentTarget).children('.icon-active').show();
  });

  //7.自动从localStorage 中加载已经保存的数据
  setting.renderForm(toolbar.parseJson(localStorage.getItem('nodes')));

});

var setting = {
    currentTarget : null,
    activeA : function(){
      $('#setting-header1').addClass('active');
      $('#setting-header2').removeClass('active');
      $('.design-setting-left').addClass('design-setting-active');
      $('.design-setting-right').removeClass('design-setting-active');
    },
    activeB : function(){
      $('#setting-header2').addClass('active');
      $('#setting-header1').removeClass('active');
      $('.design-setting-right').addClass('design-setting-active');
      $('.design-setting-left').removeClass('design-setting-active');
    },
    //根据div的data属性，创建html代码
    createSetting : function(t){
      var data = t.data();
      $('.design-setting-left').html('');
      for(var type in json.key){
        //判断该属性在该控件是否存在
        if(undefined != data[type]){
          var val = data[type];
          var fn = json.key[type];
          var html = fn(val);
          $('.design-setting-left').append(html);
          setting.currentTarget = t;
        }
      }
    },
    //根据当前的值和当前的类型，进行赋值
    setValue : function(type,value){
      if(type in json.key){
        var fn = json.key[type];
        if(null != setting.currentTarget && undefined != setting.currentTarget){
          fn(value,setting.currentTarget);
        }
      }
    },
    //将默认的值赋给对象
    copy  : function(t){
      for(var p in json.default){
        var v = json.default[p];
        if(undefined == t[p]){
          t[p] = json.default[p];
        }
      }
      return t;
    },
    //最后生成源代码
    genSourse : function(){
      //要去掉一下不需要的样式，去掉一下不需要的代码，比如remove 等等，最好生成的代码单独拿出来让到页面中也是这个样子
      //1.hoverstyle
      $('.component-item-focus').removeClass('component-item-focus');
      return $('.design-workspace-code').html();
    },

    //扫描表单，生成一个数组
    scanForm : function(obj){
      var resNodes = [];
      var $targetObjects = obj.children('.component-item-cantainer');
      //循环
      $.each($targetObjects,function(i){
        var $component = $(this);
        var data = $component.data();
        data.seq = (i+1);
        data.children = [];
        //明细
        if($component.attr('type') == 'table'){
          // 1.扫描该明细下的控件，然后组成数组
          data = setting.copy(data);
          data.children = setting.scanForm($component.find('.component-item-table-body'));
          resNodes.push(data);
        //1.普通的
        }else{
          data = setting.copy(data);
          resNodes.push(data);
        }
      });
      return resNodes;
    },
    setNode : function(o,j){
      for(var i in o ){
        if(undefined != j[i] && i != 'html' && i != 'name'){
          o[i] = j[i];
        }
      }
      o.children = j.children;
      return o;
    },
    //根据已经保存的数据，进行重新渲染
    renderForm : function(nodes){
      if(null != nodes){
        for(var i=0,max=nodes.length;i<max;i++){
          var node = nodes[i];
          $('.design-workspace-form').removeClass('design-workspace-empty');
          //普通的.. 
          var type = node.controltype;
          var nt = json[type];
          //根据nt里面的属性进行渲染。 
          nt = setting.setNode(nt,node);
          if(type =='tablefield'){
            //拿到他的子级，进行渲染
            var temp = nt.html();
            var $temp = $(temp);
            var tempNodes = nt.children;
            $('.design-workspace-code').append($temp); 
            var appbody = $temp.find('.component-item-table-body');
            for(var x=0,xma=tempNodes.length;x<xma;x++){
              var tempnode = tempNodes[x];
              var ttype = tempnode.controltype;
              var tp = json[ttype];
              tp = setting.setNode(tp,tempnode);
              var tph = tp.html();
              appbody.append($(tph));
            }
            
          }else{
            var temp = nt.html();
            $('.design-workspace-code').append($(temp));  
          }
        }
      }
            console.log('end');
    }

};


var toolbar = {
  stringfy : function(obj){
    if(null == obj || obj == undefined)return undefined;
    if(typeof obj == 'string')return obj;
    if(typeof obj =='number')return obj;
    var arrParse = function(temp){
      var tempstr = [];
      tempstr.push('[');
      for(var i=0;i<temp.length;i++){
        var tempobj = temp[i];
        var str = switchObj(tempobj);
        tempstr.push(str);
        if(i != temp.length-1){
          tempstr.push(',');
        }
      }
      tempstr.push(']');
      return tempstr.join('');
    
    };
    var switchObj  = function(tempobj){
      if(typeof tempobj == 'object'){
        if(tempobj instanceof Array){
          return arrParse(tempobj);
        }else if(tempobj instanceof Object){
          return objParse(tempobj); 
        }
      }else if(typeof tempobj == 'function'){
        return ''+tempobj.toString()+'';
      }else{
        return '"'+tempobj+'"';
      }
      return '';
    };
    var objParse = function(obj){
      var htmls = [];
      htmls.push('{');
      for(var p in obj){
        var tempobj = obj[p];
        var str= switchObj(tempobj);
        htmls.push('"'+p+'":'+str+'');
        htmls.push(',');
      }
      htmls.splice(htmls.length-1);
      htmls.push('}');
      return htmls.join('');
    };
    return switchObj(obj);
  },
  parseJson : function(str){
    var obj = {};
    if(null !=str && undefined != str && ''!=str){
      try{
        obj = eval('('+str+')');
      }catch(Error){
        return str;
      }
    }
    return obj;
  }
};