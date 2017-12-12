$(function(){	
	
	e.simpleUplad();   //普通的上传
	e.orderBy();	    //排序
	e.shardowTable();  //渲染修饰 table itemBox 鼠标经过和离开的效果
	e.inputShardow();  //input绑定 focus blur 事件
	e.selectModule();
	e.inputModule();   //初始化checked、radio 更换皮肤
	e.tabs();		    //初始化分组tab
	e.mustField(".must"); //必填字段
	
	//修补当窗口resize时.wrapbox 没有自动调整高度
	$(window).resize(function(){
		var get_window_height=$(window).outerHeight() -90;
		$(".wrapbox").height(get_window_height);
	});
	
	//横向滚动条
	$('.dataContent, .searchOutBox').perfectScrollbar({			
		useBothWheelAxes: true, 
		suppressScrollY: true,
		wheelPropagation: true,		
		useSelectionScroll:true
	});
	
	
	
	
		
	//itemBox 容器的折叠功能
	$(".itemBox>dt").live("click",function(){		
		if($(this).next("dd").css("display")=="block"){			
			$(this).next("dd").slideUp();
			$(this).children(".switchStatus").removeClass("fa-chevron-up");
			$(this).children(".switchStatus").addClass("fa-chevron-down");				
		}else{
			$(this).children(".switchStatus").removeClass("fa-chevron-down");
			$(this).children(".switchStatus").addClass("fa-chevron-up");			
			$(this).next("dd").slideDown();
		}	
	});
	
	// itemContent 容器的折叠功能
	$(".switchdd").live({
		click:function(){
			var dtbox=$(this).parentsUntil("dl","dt");			
			if(dtbox.next("dd").css("display")=="block"){				
				dtbox.next("dd").slideUp();
				$(this).children("i").removeClass("fa-chevron-circle-up");
				$(this).children("i").addClass("fa-chevron-circle-down");					
			}else{				
				$(this).children("i").removeClass("fa-chevron-circle-down");
				$(this).children("i").addClass("fa-chevron-circle-up");			
				dtbox.next("dd").slideDown();
			}	
		},
		mouseenter : function(){
			$(this).css({"color":"#5DB2FF"});
		},
		mouseleave : function(){
			$(this).css({"color":""});
		}	
	});
	
	//展示框全屏
	$(".fullSize").live({
		click:function(){		
			var getdlbox=$(this).parents(".itemContent");
			var get_window_height=$(window).outerHeight() -90;			
			if(!getdlbox.hasClass("setFullShow")){       
				$(this).children("i").removeClass("fa-expand");
				$(this).children("i").addClass("fa-compress");
				//增加一个背景
				$("body").css("overflow","hidden");
				$("body").append("<div class='fullshade'></div>");
				getdlbox.addClass("setFullShow");				
				//穿一层外套											
				getdlbox.children("dd").wrapInner("<div class='wrapbox' style='height:"+get_window_height+"px;'></div>");
			}else{     
				$(this).children("i").removeClass("fa-compress");
				$(this).children("i").addClass("fa-expand");
				getdlbox.removeClass("setFullShow");
				//移除背景
				$("body").removeAttr("style");
				$(".fullshade").remove();								
				//删除外套				
				getdlbox.children("dd").children().children().first().unwrap();
			}			
		},
		mouseenter:function(){
			$(this).css({"color":"#E46F61"});
		},
		mouseleave:function(){
			$(this).css({"color":""});
		}	
	});
	
	$(".readonly").focus(function(){		
		$(".cxcalendar").hide(); //readonly时关闭日历
	});	
	
//ready end
});

//改变窗口要执行的方法
$(window).resize(function(){	
	e.selectModule();
	setHeightEq();
});



var e={	
	//selectModule 更换皮肤
	selectModule:function(){		
		$("select.selectType").map(function(i){			
			var _this     = $(this);	
			var _eleWidth = _this.parent().outerWidth(); //获取宽度
			var _id       = "index_"+i;
			var tempval	  = _this.children("option[selected]").text();
			_this.attr("sid",_id);
			var ul='', option='';
			
			//画自定义样式
			if(_this.next(".selectEncap").length==0){
				_this.after("<div class='selectEncap'><input class='getSelectVal' readonly sid='"+ _id +"' type='text' /><i class='fa fa-caret-down'></i></div>");
				//创建UL				
				_this.children("option").each(function(i){
					var opval=$(this).val();
					if($(this).prop("selected")){
						option+="<li " + " value='"+ opval +"' class='selected' >"+ $(this).text() + "</li>";			
					}else{
						option+="<li " + "value='"+ opval +"'>"+ $(this).text() + "</li>";
					}	
				});	
				ul="<ul class='selectUL' eleID='"+ _id +"'>" + option + "</ul>";
					
				//2016/10/26修改
					
				if($("ul[eleID='"+ _id +"']").length>0){
					return false
				}else{
					$("body").append(ul);					
				}
				
				
				$("ul[eleID='"+ _id +"']").css("min-width",_eleWidth);
				$("input[sid="+ _id +"]").val(tempval);		
				//如果有 disabled 属性
				if(_this.prop("disabled")){
					$("input[sid="+ _id +"]").addClass("input_disable");
					$("input[sid="+ _id +"]").next(".fa").addClass("input_disable");
					$("input[sid="+ _id +"]").attr("readonly",true);
				}		
			}else{
				//创建UL				
				_this.children("option").each(function(i){
					var opval=$(this).val();
					if($(this).prop("selected")){
						option+="<li " + " value='"+ opval +"' class='selected' >"+ $(this).text() + "</li>";			
					}else{
						option+="<li " + "value='"+ opval +"'>"+ $(this).text() + "</li>";
					}	
				});
				
				
				
				//2016/10/26修改
				ul="<ul class='selectUL' eleID='"+ _id +"'>" + option + "</ul>";
				if($("ul[eleID='"+ _id +"']").length>0){
					return false			
				}else{
					$("body").append(ul);					
				}
				
				
				
				$("ul[eleID='"+ _id +"']").css("min-width",_eleWidth);
				$("input[sid="+ _id +"]").val(tempval);		
				//如果有 disabled 属性
				if(_this.prop("disabled")){
					$("input[sid="+ _id +"]").addClass("input_disable");
					$("input[sid="+ _id +"]").next(".fa").addClass("input_disable");
					$("input[sid="+ _id +"]").attr("readonly",true);
				}
			}
			var mmkwidth=_eleWidth - _this.next(".selectEncap").children(".fa").outerWidth();
			_this.next(".selectEncap").width( _eleWidth );				
			_this.next(".selectEncap").children("input").width( mmkwidth );
			//UL绑定事件		
			$("ul[eleID="+ _id +"]").children().on({
				click:function(){
					var value=$(this).text();
					var i=$(this).index();
					$("input[sid="+ _id +"]").val(value);
					$(this).siblings().removeAttr("class");
					$(this).addClass("selected");
					$("select[sid='" + _id + "']").get(0).selectedIndex=i;
					$("select[sid='" + _id + "']").change();					
					$(this).parent().hide();
				}
			});
		});

		//绑定方法
		$(".selectEncap input, .selectEncap i").on({
			click: function(event){	
				if($(this).is(".input_disable")){return false}				
				var sid;              //操作对象
				var fawid;            //小三角的宽度		
				var wobj        = {};
				var objPos      = {}; //绝对定位值
				var objrelative = {}; //相对屏幕位置值
				wobj.width      = $(window).outerWidth();
				wobj.height     = $(window).outerHeight();
				
				if(event.target.nodeName=="INPUT"){
					sid=$(this).attr("sid");
					
					fawid=$(this).next(".fa").outerWidth();
				}else{
					sid=$(this).prev("input").attr("sid");
					fawid=$(this).outerWidth();
				}				
				//定位
				var box=$("input[sid="+ sid +"]").get(0);		
				objPos.top    = mSift_SeekTp(box,0);
				objPos.right  = mSift_SeekTp(box,1) + fawid;
				objPos.bottom = mSift_SeekTp(box,2) - 1;  
				objPos.left   = mSift_SeekTp(box,3);
				
				//根据元素相对于屏幕的位置，计算ul显示在元素的上/下/左/右
				objrelative.top=box.getBoundingClientRect().top;
				objrelative.right=box.getBoundingClientRect().right + fawid;
				objrelative.bottom=box.getBoundingClientRect().bottom;
				objrelative.left=box.getBoundingClientRect().left;		
								
				var obgHeight   = $("ul[eleID='"+ sid +"']").outerHeight();
				var obgWidth   = $("ul[eleID='"+ sid +"']").outerWidth();
				var hSpacing = wobj.height - objrelative.bottom;		
				var lSpacing = wobj.width - objrelative.left;
				
				//判断出现的位置
				if(hSpacing > obgHeight){
					if(lSpacing>obgWidth){
						$(".selectUL").hide();
						$("ul[eleID='"+ sid +"']").show().css({"position":"absolute","top":objPos.bottom ,"left":objPos.left});
					}else{
						$(".selectUL").hide();
						$("ul[eleID='"+ sid +"']").show().css({"position":"absolute","top":objPos.bottom,"left":objrelative.right - obgWidth});
					}			
				}else{
					if(lSpacing>obgWidth){
						$(".selectUL").hide();
						$("ul[eleID='"+ sid +"']").show().css({"position":"absolute","top": objPos.bottom - obgHeight - fawid - 8 ,"left":objPos.left});
					}else{
						$(".selectUL").hide();
						$("ul[eleID='"+ sid +"']").show().css({"position":"absolute","top": objPos.bottom - obgHeight - fawid - 8 ,"left":objrelative.right - obgWidth});
					}						
				}		
				return false;		
			}
		});
		$(document).click(function(){$(".selectUL").hide()});	
		
		$('.dataContent, .searchOutBox').on('mousewheel', function(){$(".selectUL").hide();});		
	},
	
	inputModule:function(){
		//radio 更换皮肤
		$("input[type='radio']").map(function(){
			var tempThis=$(this);			
			if(tempThis.next(".cusRadio").length==0){tempThis.after("<i class='cusRadio facircleo'></i> ");}else{return}
			var inputName=$(this).attr("name");
			tempThis.next(".cusRadio").attr("name",inputName);			
			if(tempThis.prop("checked")){
				tempThis.next(".cusRadio").removeClass("facircleo").addClass("fadotcircleo");				
				if(tempThis.prop("disabled")){
					tempThis.next(".cusRadio").attr("disabled",tempThis.prop("disabled"));
					tempThis.next(".cusRadio").removeClass("fadotcircleo").addClass("rCheckedDisabled");
					setTimeout(function(){
						$(tempThis).siblings("input[name=" + inputName + "]").next(".cusRadio").addClass("cursorDefault");
					},0);							
				}
			}else{
				if(tempThis.prop("disabled")){
					tempThis.next(".cusRadio").attr("disabled",tempThis.prop("disabled"));
					tempThis.next(".cusRadio").removeClass("facircleo").addClass("rDisabled");
					setTimeout(function(){
						$(tempThis).siblings("input[name=" + inputName + "]").next(".cusRadio").addClass("cursorDefault");
					},0);
				}
			}			
			tempThis.next(".cusRadio").click(function(){
				var thisName=$(this).attr("name");				
				var RadioGroup=0;				
				$("i[name=" + thisName + "]").each(function(){
					if($(this).attr("disabled")=="disabled"){RadioGroup+=1;}					
				});				
				if(RadioGroup!=0){return false;}
				$("i[name=" + thisName + "]").removeClass("fadotcircleo").addClass("facircleo");
				$("input[name=" + thisName + "]").attr("checked",false);
				$(this).removeClass("facircleo").addClass("fadotcircleo");
				$(tempThis).attr("checked",true);
			});
		});
		
		//checkbox 更换皮肤
		$("input[type='checkbox']").map(function(i){
			var tempThis=$(this);			
			if(tempThis.next(".cusCheckbox").length==0){tempThis.after("<i class='cusCheckbox fasquare'></i> ");}else{return}			
			tempThis.next(".cusCheckbox").attr("name",$(this).attr("name"));				
			if(tempThis.prop("checked")){
				tempThis.next(".cusCheckbox").removeClass("fasquare").addClass("fachecksquare");				
				if(tempThis.prop("disabled")){
					tempThis.next(".cusCheckbox").attr("disabled",tempThis.prop("disabled"));
					tempThis.next(".cusCheckbox").removeClass("fachecksquare").addClass("cCheckedDisabled");
				}
			}else{
				tempThis.next(".cusCheckbox").removeClass("fachecksquare").addClass("fasquare");
				if(tempThis.prop("disabled")){
					tempThis.next(".cusCheckbox").attr("disabled",tempThis.prop("disabled"));
					tempThis.next(".cusCheckbox").removeClass("fasquare").addClass("cDisabled");
				}
			}
			
			tempThis.next(".cusCheckbox").click(function(){				
				if($(this).attr("disabled")=="disabled"){return false;}				
				if($(this).hasClass("fasquare")){
					$(this).removeClass("fasquare").addClass("fachecksquare");
					$(tempThis).attr("checked",true)
				}else{
					$(this).removeClass("fachecksquare").addClass("fasquare");
					$(tempThis).attr("checked",false)
				}
				return false
			});
			
			
		});
		
		$("input[type='text'] ,textarea").map(function(){		
			if($(this).parent().is(".singleDate, .selectEncap, .cus_Select, .unreadonly")){return}
			$(this).prop("readonly")?($(this).addClass("input_disable")):($(this).removeClass("input_disable"));
		});
	},
	
	/**
	* 全选
	* @param    {obj}            string	  限制域范围内的input
	**/
	selectAllcheck:function(obj){
		$(obj).next(".cusCheckbox").on({
			click: function(){
				var thisName=$(this).attr("name");			
				var checkedstatus=$(obj).prop("checked");			
				var arr=$(".dataCommon").find("input[name="+ thisName +"]");
				arr.map(function(){					
					$(this).attr("checked",checkedstatus);
					checkedstatus?($(this).next(".cusCheckbox").removeClass("fasquare").addClass("fachecksquare")):($(this).next(".cusCheckbox").removeClass("fachecksquare").addClass("fasquare"));
				});			
			}	
		});
	},
	
	//tabs Start
	tabs:function(){
		$(".tabs_header>li:first").children("a").addClass("actived");		
		$(".tabs_item:first").show();
	
		$(".tabs_header").children("li").each(function(){			
			if($(this).children().is("ul")){
				if($(this).find(".fa-caret-down").length==1){return true}
				$(this).children("a").addClass("moreTabs");
				$(this).children("a").wrapInner("<span></span>");
				$(this).children("a").append("<i class='fa fa-caret-down'></i>");
			}	
		});
		
		$(".tabs_header li").click(function(){		
			if($(this).children().is("ul")){
				return false;			
			}else{
				if($(this).children("a").hasClass("actived")|| $(this).children("a").hasClass("moreTabs")){
					return false;				
				}else{
					$(".more_header").fadeOut(100);
					$(this).siblings("li").find("a").removeClass("actived").removeAttr("style");
					$(this).children("a").addClass("actived");		
					var activeTab=$(this).find("a").attr("href");
					$(".tabs_item").hide();
					$(activeTab).fadeIn();				
					return false;
				}			
			}		
		});	
		
		$(".moreTabs").on({
			click:function(){
				$(this).css({"background":"#D8D8D8","border-top":"solid 2px #D8D8D8"});
				$(this).next("ul").fadeIn(100);
				$(this).next("ul").find("li").each(function(){
					$(this).on({
						click : function(){					
							$(this).parents("li").children("a").children("span").text($(this).text());
							$(this).parents("li").siblings("li").children("a").removeClass("actived");
							$(this).parents("li").children("a").addClass("actived");						
							$(this).siblings().children("a").removeClass("selected");
							$(this).children("a").addClass("selected");
							$(this).parent().fadeOut(100);						
						}
					});			
				});
			}
		});
		
		$(document).click(function(){
			$(".more_header").fadeOut(100);		
		});
	},
	
	
	//选择checked的行
	checkedtr:function(obj,inputobj){
		$(obj).live({
			click:function(){	
				$(this).siblings().removeClass("checkedtr");
				$(this).addClass("checkedtr");
			},
			dblclick:function(){
				var val=$(this).children().eq(1).text();
				$(inputobj).val(val);
				layer.closeAll();
			}
		});	
	},
	
	//隐藏或显示域
	showHideBlock:function(){
		$(".comlistBox>li>p>.fa").on({
			click: function(){		
				if($(".comTableBox").css("display")=="none"){
					$(".comTableBox").show(100);
					$(this).removeClass("fa-angle-double-right").addClass("fa-angle-double-down");
				}else{
					$(".comTableBox").hide(100);
					$(this).removeClass("fa-angle-double-down").addClass("fa-angle-double-right");
				}
			}
		});
	},
	/*
	forIE:function (){
		var b_version=navigator.appVersion;
		var version=b_version.split(";");
		var trim_Version="";
		if(version.length>2) {
			trim_Version = version[1].replace(/[ ]/g, "");
		}else{
			trim_Version ="normal";
		}
		var param=/MSIE[678].0/;
		var result=param.test(trim_Version);		
		if(result){	
			$("body").empty().append("<div class='blankScreen'><div class='forie'><img src='images/forie.png'></div></div>");
		}
	},*/
	
	//简单的上传
	simpleUplad:function(){
		$(".inputFile").map(function(){	
			var tempval=$(this).attr("data_value");
			var readonly=$(this).prop("readonly");		
			var file=tempval.split(/[\\\/]/);
			var fileName=file[file.length-1];		
			var disabled=$(this).prop("disabled");		
			//$(this).wrap('<div class="uploadedbox"></div>');
			$(this).after('<button class="uploadbutHide"><i class="fa fa-upload"></i> 添加附件</button>'+
						  '<a href="javascript:;" target="_blank" class="linkfile"><i class="fa fa-paperclip"></i><span class="filename">'+fileName+'</span></a><i class="fa fa-close fileremove"></i>');
			if(fileName.length!=0){
				$(this).siblings(".linkfile").show();
				$(this).siblings(".fileremove").show();		
				$(this).siblings(".linkfile").children(".filename").text(fileName);
				$(this).siblings(".linkfile").attr("href",tempval);
				$(this).siblings(".uploadbutHide").andSelf().hide();
				if(readonly || disabled){
					$(this).siblings(".fileremove").hide();				
					return;
				}	
			}					  
			if(readonly || disabled){
				$(this).siblings(".uploadbutHide").addClass("input_disable");
				$(this).hide();	
				return;
			}		
			$(this).change(function(){
				tempval=$(this).val();
				file=tempval.split(/[\\\/]/);
				fileName=file[file.length-1];		
				$(this).siblings(".linkfile").children(".filename").text(fileName);
				$(this).siblings(".linkfile").attr("href","javascript:void(0);");
				$(this).siblings(".uploadbutHide").andSelf().hide();
				$(this).siblings(".linkfile").show();
				$(this).siblings(".fileremove").show();
			});		
		});
		$(".uploadedbox").delegate(".fileremove","click",function(){
			$(this).siblings(".inputFile").val("").blur();
			$(this).siblings(".inputFile").show();
			$(this).siblings(".uploadbutHide").show();	
			$(this).siblings(".linkfile").andSelf().hide();			
		});
	},
	
	//table 排序 
	orderBy:function(){	
		$(".dataCommon thead tr").find(".orderBy").each(function(){			
			if($(this).children("i").length==0){$(this).append("<i class='sort_both'></i>")}
			$(this).click(function(){
				$(this).siblings().removeClass("light");
				$(this).addClass("light");
				if($(this).children("i").is(".sort_both")||$(this).children("i").is(".sort_asc")){
					$(this).siblings(".orderBy").children("i").removeClass().addClass("sort_both");
					$(this).children("i").removeClass().addClass("sort_desc");
				}else if($(this).children("i").is(".sort_desc")){
					$(this).siblings(".orderBy").children("i").removeClass().addClass("sort_both");
					$(this).children("i").removeClass().addClass("sort_asc");
				}
			});		
		});
	},
	
	//渲染修饰 table itemBox 鼠标经过和离开的效果
	shardowTable:function(){	 
		$(".dataCommon>tbody>tr:odd").addClass("trodd");	
		var trsize=$(".dataCommon>tbody>tr");
		trsize.live({
			mouseenter:function(){
				$(this).addClass("trhover");			
			},
			mouseleave:function(){
				$(this).removeClass("trhover");			
			}		
		});
		
		//table操作功能
		$(".operate_container").live({
			mouseenter: function(){				
				$(this).find(".minBox").show().stop().animate({
					"opacity":1,
					"left":"34px"
				},200);
			},
			mouseleave: function(){
				$(this).find(".minBox").stop().animate({
					"opacity":0,
					"left":"40px"
				},200,function(){
					$(this).hide();
				});
			}		
		});		
		//itemBox hover 效果 IE<9 无效
		$(".mouseShadow").live({
			mouseenter:function(){
				$(this).addClass("itemShadow");
			},
			mouseleave:function(){
				$(this).removeClass("itemShadow");
			}	
		});			
	},
	mustField:function (mustObj){
		$(mustObj).map(function(){
			if(!$(this).children(".must").length) $(this).prepend('<i class="must">*</i>');		
		});
	},
	
	//input 绑定样式
	inputShardow:function(){	
		if(!($(".layerData").children(".fa").length)){
			$(".layerData").children(":text").after("<i class='fa fa-caret-down'></i>");
		}		
		$(".inputType, .selectType, .DefaultInputType, .contrText, .textareaType, .shardowInput").live({
			focus:function(){
				if($(this).prop("readonly")){return};			
				$(this).addClass("inputfocus");				
				var fa=$(this).next(".fa");
				if(fa.length){
					fa.addClass("bordergl")
				}				
			},
			blur:function(){
				$(this).removeClass("inputfocus");
				var fa=$(this).next(".fa");
				if(fa.length){
					fa.removeClass("bordergl")
				}
			}	
		});	
	},
	
	//类似EXCEL的报表控件
	LockRowColTable:function(){
		$(".LockRowColTable tbody tr").mouseenter(function(){$(this).css({"color":"#09f"});}).mouseleave(function(){$(this).css({"color":""})});

		//触发滚动，锁定行和列
		$(".preportConbox").scroll(function(){	
			$(".LockRowColTable thead tr td[type='row_Lock_header']").css("top",$(this).scrollTop()+"px");
			$(".LockRowColTable thead tr td[type='row_Lock_header']").css("left",$(this).scrollLeft()+"px");
			$(".LockRowColTable thead tr td[type='row_Lock']").css("top",$(this).scrollTop()+"px");		
			$(".LockRowColTable tbody tr td[type='col_Lock']").css({"left":$(this).scrollLeft()+"px"});	
		});
		setinnerboxWH();
		function setinnerboxWH(){
			var width=$(".LockRowColTable").width(), height=$(".LockRowColTable").height();			
			$(".LockRowColbox").css({"width":width,"height":height});		
		}
	}
//end
}

//翻页自定义select
var customSelect={
	setSelect:function(){			
		$(".selectcon").live({
			click:function(){			
				$(this).siblings("ul").slideDown();
				$(this).children("i").addClass("sihover");
				$(this).siblings("ul").find("li").each(function(){
					$(this).on({
						click:function(){						
							$(this).siblings().css("background","");
							$(this).css("background","#eee");							
							$(this).parent().prev(".selectcon").children("span").text($(this).attr("dataval"));				
							$(this).parent().prev(".selectcon").delay(1000).removeClass("selectHover");					
							$(this).parent().delay(200).slideUp(300);								
							$(this).parent().prev(".selectcon").children("i").delay(200).removeClass("sihover");
						}
					});
				});
				return false;
			},
			mouseenter:function(){
				$(this).addClass("selectHover");
			}
		});
		//当鼠标点击其他区域时关闭UL		
		$(document).click(function(){
			$(".selectlist").delay(200).fadeOut(100);
			$(".selectcon").delay(1000).removeClass("selectHover");	
			$(".customSelect").find("i").removeClass("sihover");
		});
	}	
}

/**
* 自定义分页
* @param    {whichtable}            string   哪个对象的翻页
* @param    {len}              		number	 总共有多少条
* @param    {curPage}       		number   定位到第几页
* @param    {pageSize}       		number   每页显示的条数,可选值10、20、50、100
**/
function curPageTool(whichtable,len,curPage,pageSize){		
	if(isNaN(len)){
		alert("亲，总行数请传入一个整数");
		return false;
	};	
	var lastPage;        //最后页
	var direct=0;        //方向	
	var page;            //总页数
	var begin;
	var end;
		
	if(isNaN(curPage)){curPage=1}
	if(pageSize==undefined){	
		pageSize=10;
		$(whichtable).find(".selectlistSize").val(pageSize);
	}
	display();
	function display(){ 
		page=len % pageSize==0 ? len/pageSize : Math.floor(len/pageSize)+1;//根据记录条数，计算页数	
		if(len != 0 && curPage > page){
			alert( whichtable + "的当前页数不能大于总页数");
			return false;
		}
		//curPage=1;    // 设置当前为第一页
		displayPage(curPage);//显示第一页
		//$(".pageIndex").html("当前 " + curPage + " / " + page + " 页");    // 显示当前多少页
		$(whichtable).find(".rowLen").html("共计数据 " + len + "条");        // 显示数据量
		$(whichtable).find(".pageSize").text(pageSize);
		$(whichtable).find(".firstPage").click(function firstPage(){    // 首页
			curPage=1;
			direct = 0;
			displayPage();
		});
		$(whichtable).find(".prevPage").click(function frontPage(){    // 上一页
			direct=-1;
			displayPage();
		});
		$(whichtable).find(".nextPage").click(function nextPage(){    // 下一页
			direct=1;
			displayPage();
		});
		$(whichtable).find(".lastPage").click(function lastPage(){    // 尾页
			curPage=page;
			direct = 0;
			displayPage();
		});
		$(whichtable).find(".skipbtn").click(function changePage(){    // 转页		
			curPage=$(whichtable).find(".changePage").val() * 1;			
			if (curPage > page) {
				alert("您输入的数值超出了总页数");
				return
			}else if(curPage==0){
				alert("请输入转跳的页数");
				return false
			}
			
			direct = 0;
			displayPage();
		});	
		
		$(whichtable).find(".changePage").on({
			mouseenter: function(){
				$(this).addClass("selectHover");
			},
			mouseleave: function(){
				$(this).removeClass("selectHover");
			}		
		});		
		var tmp;		
		$(whichtable).find(".selectlistSize").change(function(){		
			var	value =$(this).val();
			if(value != tmp){
				pageSize=value;								
				page=len % pageSize==0 ? len/pageSize : Math.floor(len/pageSize)+1;//根据记录条数，计算页数				
				curPage=1;
				direct=0;
				displayPage();
				tmp = value;
			}
		});
	};	
	function displayPage(){		
		if(curPage <=1 && direct==-1){
			direct=0;			
			return;
		} else if (curPage >= page && direct==1) {
			direct=0;			
			return;
		}
		lastPage = curPage;
		
		// 修复当len=1时，curPage计算得0的bug
		len > pageSize?(curPage = (curPage + direct + len) % len):curPage = 1;		
		$(whichtable).find(".pageIndex").html("当前 " + curPage + " / " + page + " 页"); // 显示当前多少页
		
		begin=(curPage-1)*pageSize + 1;// 起始记录号
		end = begin + 1*pageSize - 1;    // 末尾记录号
		if(end > len ) end=len;
		
		curPage==1?$(whichtable).find(".firstPage, .prevPage").addClass("not_allowed"):$(whichtable).find(".firstPage, .prevPage").removeClass("not_allowed");
		curPage==page?$(whichtable).find(".lastPage, .nextPage").addClass("not_allowed"):$(whichtable).find(".lastPage, .nextPage").removeClass("not_allowed");		
	}
}


/**
* 全选
* @param    {bool}           true     给定input选中的状态
* @param    {obj}            string	  限制域范围内的input
* @param    {attrName}       string   限制哪些input有效
**/
function selectAll(bool,obj,attrName){		
	var arr=$(obj).find("input[name="+ attrName +"]");
	arr.map(function(){			
		$(this).attr("checked",bool);
		$(this).next(".cusCheckbox").removeClass("fasquare").addClass("fachecksquare");		
	});	
};

/**
* 反选
* @param    {obj}            string	  限制域范围内的input
* @param    {attrName}       string   限制哪些input有效
**/
function selectRe(obj,attrName){
	var arr=$(obj).find("input[name="+ attrName +"]");
	arr.map(function(){
		$(this).attr("checked",!($(this).prop("checked")));	
		$(this).prop("checked")?($(this).next(".cusCheckbox").removeClass("fasquare").addClass("fachecksquare")):($(this).next(".cusCheckbox").removeClass("fachecksquare").addClass("fasquare"));	
	});	
};


/**
* 自定义三层 select
* @author:  Ajun_li@139.com
* @version: 2016/06/10
* @param    {data}          jsonObj     select 下拉列表的数据
* @param    {mark}          bool        是否显示select的小图标，默认 true
* @param    {Lock}          bool        是否允许修改值，默认 false
* @param    {write}         bool        是否允许修改值，默认 false
**/
$.fn.extend({
	cus_Selector:function(par){
		var defaultparam={
			"data":{
				"第一行":[{"二级":["三级","三级","三级"]}],
				"第二行":[{"二级":[]},{"二级":["三级","三级","三级"]},{"二级":["三级"]}],
				"第三行":[]
			},
			"mark": true, //是否显示下拉列表的小图标
			"Lock": false, //是否锁定SELECT状态
			"write": false //是否允许写入
		};
		var clickWhich, obgHeight,windowHeight,objspacing,thiswidth;
		var pos_sel    = $(this);
		var param      = $.extend({},defaultparam,par);
		var tempdata   = param.data;	
		var mark       = param.mark;
		var Lock	   = param.Lock;
		var readonly   = param.write;
		windowHeight   = $(window).outerHeight();
		thiswidth      = pos_sel.width();
		var thisSelect = pos_sel.children(".cus_Select");		
		$(window).resize(function(){
			thiswidth  = pos_sel.width();
			setinputwidth();
		});
		function setinputwidth(){
			if(mark){
				thisSelect.children("input").css({"width":thiswidth-20});				
			}else{
				thisSelect.children("input").css("width",thiswidth);
			}
		}		
		if(mark){
			thisSelect.children("input").css({"width":thiswidth-20}).after("<i class='fa fa-caret-down fa_mark'></i>");
		}else{
			thisSelect.children("input").css("width",thiswidth);
		}
		
		if(Lock){
			thisSelect.children("input").attr("readonly","true").addClass("disabledStatus");
			return false;
		}
				
		if(readonly){
			thisSelect.children("input").removeAttr("readonly");
		}else{
			thisSelect.children("input").attr("readonly","true");			
		}
			
		thisSelect.children("input, .fa").on({
			click: function(){				
				var ullist         =  "<ul class='optionli'>";
				clickWhich         =  "#" + $(pos_sel).attr("id");				
				var selectPosition =  $(this).parent().offset();	
				var tempthis       =  $(this);		
				$.each(tempdata,function(i,arr){
					ullist += "<li><a href='javascript:;'><span>" + i + "</span></a>"; 						
					if(arr.length == 0){
						ullist +="</li>";
						return true;
					}
					ullist +="<ul>";					
					$.each(arr,function(i2,arr2){						
						$.each(arr[i2],function(i3,obj3){						
							if($.isEmptyObject(arr[i2])){	
								return true;
							}
							ullist +="<li><a href='javascript:;'><span>" + i3 + "</span></a>";							
							//if($.isEmptyObject(obj3)){
							if(obj3.length == 0){ //第三层是数组
								ullist +="</li>";
								return true;
							}
							ullist +="<ul>";
							
							$.each(obj3,function(h,hv){
								ullist +="<li><a href='javascript:;'><span>" +  hv + "</span></a></li>";
							});
							ullist +="</ul></li>";
						});
					});
					ullist += "</ul></li>";
				});
				ullist+="</ul>";
				$("body").append($(this).parents(".cus_Select").addClass("tempClass").removeClass("cus_Select").detach().css({"position":"absolute","top":selectPosition.top,"left":selectPosition.left,"z-index":"19811110"}));
				if($("ul.optionli").length == 0){
					$(".tempClass").append(ullist);			
				}else{
					return false;
				}				
				if($("div.fullsolid").length== 0){
					$("body").append($("<div class='fullsolid'></div>").click(shadeDiv));
				}else{
					return false;
				}				
				obgHeight   =  $(".optionli").outerHeight();
				objspacing  =  windowHeight - selectPosition.top;		
				
				if(obgHeight < objspacing){						
					$(".optionli").css({"top":"29px","min-width":$(pos_sel).outerWidth()});					
				}else{
					$(".optionli").css({"bottom":"29px","min-width":$(pos_sel).outerWidth()});
				}				
				$(tempthis).focus();				
				$(".optionli").find("a").each(function(){
					var ulnum=$(this).next("ul").length;
					if(ulnum){
						$(this).append("<i class='fa fa-angle-right'></i>");
					}
					$(this).live({
						click: function(){							
							if(ulnum){								
								$(this).parent().siblings().find("i").removeClass("fa-angle-down").addClass("fa-angle-right");
								$(this).parent().siblings().find("ul").hide();
								$(this).siblings("ul").show();
								$(this).children("i").removeClass("fa-angle-right").addClass("fa-angle-down");
							}else{
								$(this).parents(".optionli").siblings("input").val($(this).children("span").text()).change();
								shadeDiv();
							}
						}
					});
				});				
				//清除input的值,并获取焦点
				if(tempthis.val()){				
					var tempval=tempthis.val();
					tempthis.attr("dataVal",tempval)
					tempthis.val('');	 
				}						
				return false;
			},
			dblclick: function(){
				$(this).val('');
				$(this).attr("dataVal",'');				
			}			
		});	
		
		$(pos_sel).find("input").blur(function(){			
			//判断值是否已经改变			
			if(!$(this).val()){
				$(this).val($(this).attr("dataVal"));
			}	
		});		
		function shadeDiv(){
			$(clickWhich).append($(".tempClass").detach().removeAttr("style").addClass("cus_Select").removeClass("tempClass"));
			$(clickWhich).find(".optionli").remove();
			$(".fullsolid").remove();			
		}		
	}
});

//拖拽改变高度
$.fn.extend({
	bindReHeight:function () {
		var el=$(this);
	   $(el).live({
			mouseenter:function(){
				$(this).addClass("hovered");
			},
			mouseleave: function(){
				$(this).removeClass("hovered");		
			},
			mousedown: function(e) {			
			//在支持 setCapture 做些东东
			el.setCapture ? (el.setCapture(),el.onmousemove = function(ev) {mouseMove(ev || event)}, el.onmouseup = mouseUp) : ( $(document).bind("mousemove", mouseMove).bind("mouseup", mouseUp));
			//防止默认事件发生
			e.preventDefault();
		}
	   });	
		//移动事件
		function mouseMove(e){
			$(el).prev().height(e.clientY -8);	
		}
		//停止事件
		function mouseUp() {    
			el.releaseCapture ? (
			//释放焦点
			el.releaseCapture(),
			//移除事件
			el.onmousemove = el.onmouseup = null
			) : (
			//卸载事件
			$(document).unbind("mousemove", mouseMove).unbind("mouseup", mouseUp)
		)
		}
	}
});

// 双联动日期示例
function setLinkageDate(date_first,date_last){		
	var dateFirst = $(date_first);
	var dateLast = $(date_last);
	var dateFirstApi;
	var dateLastApi;

	dateFirst.cxCalendar(function(api){
		dateFirstApi = api;
	});

	dateLast.cxCalendar(function(api){
		dateLastApi = api;
	});

	dateFirst.bind('change', function(){
		var firstTime = parseInt(dateFirstApi.getDate('TIME'), 10);
		var lastTime = parseInt(dateLastApi.getDate('TIME'), 10);

		if (lastTime < firstTime) {
		  dateLastApi.clearDate();		  
		};

		dateLastApi.setOptions({
		  startDate: firstTime
		});
		dateLastApi.show();		
	});	
}

/**
 ** 减法函数，用来得到精确的减法结果
 ** 说明：javascript的减法结果会有误差，在两个浮点数相减的时候会比较明显。这个函数返回较为精确的减法结果。
 ** 调用：accSub(arg1,arg2)
 ** 返回值：arg1加上arg2的精确结果
 **/
function accSub(arg1, arg2) {
    var r1, r2, m, n;
    try {
        r1 = arg1.toString().split(".")[1].length;
    }
    catch (e) {
        r1 = 0;
    }
    try {
        r2 = arg2.toString().split(".")[1].length;
    }
    catch (e) {
        r2 = 0;
    }
    m = Math.pow(10, Math.max(r1, r2)); //last modify by deeka //动态控制精度长度
    n = (r1 >= r2) ? r1 : r2;
    return ((arg1 * m - arg2 * m) / m).toFixed(n);
}

/**
 ** 加法函数，用来得到精确的加法结果
 ** 说明：javascript的加法结果会有误差，在两个浮点数相加的时候会比较明显。这个函数返回较为精确的加法结果。
 ** 调用：accAdd(arg1,arg2)
 ** 返回值：arg1加上arg2的精确结果
 **/
function accAdd(arg1, arg2) {
    var r1, r2, m, c;
    try {
        r1 = arg1.toString().split(".")[1].length;
    }
    catch (e) {
        r1 = 0;
    }
    try {
        r2 = arg2.toString().split(".")[1].length;
    }
    catch (e) {
        r2 = 0;
    }
    c = Math.abs(r1 - r2);
    m = Math.pow(10, Math.max(r1, r2));
    if (c > 0) {
        var cm = Math.pow(10, c);
        if (r1 > r2) {
            arg1 = Number(arg1.toString().replace(".", ""));
            arg2 = Number(arg2.toString().replace(".", "")) * cm;
        } else {
            arg1 = Number(arg1.toString().replace(".", "")) * cm;
            arg2 = Number(arg2.toString().replace(".", ""));
        }
    } else {
        arg1 = Number(arg1.toString().replace(".", ""));
        arg2 = Number(arg2.toString().replace(".", ""));
    }
    return (arg1 + arg2) / m;
}

/**
 ** 乘法函数，用来得到精确的乘法结果
 ** 说明：javascript的乘法结果会有误差，在两个浮点数相乘的时候会比较明显。这个函数返回较为精确的乘法结果。
 ** 调用：accMul(arg1,arg2)
 ** 返回值：arg1乘以 arg2的精确结果
 **/
function accMul(arg1, arg2) {
    var m = 0, s1 = arg1.toString(), s2 = arg2.toString();
    try {
        m += s1.split(".")[1].length;
    }
    catch (e) {
    }
    try {
        m += s2.split(".")[1].length;
    }
    catch (e) {
    }
    return Number(s1.replace(".", "")) * Number(s2.replace(".", "")) / Math.pow(10, m);
}

/** 
 ** 除法函数，用来得到精确的除法结果
 ** 说明：javascript的除法结果会有误差，在两个浮点数相除的时候会比较明显。这个函数返回较为精确的除法结果。
 ** 调用：accDiv(arg1,arg2)
 ** 返回值：arg1除以arg2的精确结果
 **/
function accDiv(arg1, arg2) {
    var t1 = 0, t2 = 0, r1, r2;
    try {
        t1 = arg1.toString().split(".")[1].length;
    }
    catch (e) {
    }
    try {
        t2 = arg2.toString().split(".")[1].length;
    }
    catch (e) {
    }
    with (Math) {
        r1 = Number(arg1.toString().replace(".", ""));
        r2 = Number(arg2.toString().replace(".", ""));
        return (r1 / r2) * pow(10, t2 - t1);
    }
}

/* 获取数组元素的最大值 */
Array.prototype.getMax=function(){
	function sortNumber(a,b){
		return b - a;
	}				
	this.sort(sortNumber);				
	return this[0];				
}

/*** tags 标签功能 ***/
$.fn.extend({		
		CreateTags:function (){		
			var obj=$(this);
			var dl="<dl class='listbox'></dl>";
			var dt="<dt><input type='text' class='addtag' /></dt>";			
			var emptyval="按Enter创建标签";
			obj.append(dl);
			obj.children(".listbox").append(dt);			
			
			obj.find(".addtag").val(emptyval).css("color","#999");			
			obj.find(".addtag").on({				
				blur: function(){				
					if(this.value.replace(/^[\s]/g,'').length==0){
						this.value=emptyval;
						this.style.color="#999";
					}else{
						this.style.color="#333";
						var inputval=this.value;						
						$(this).parent().before("<dd><div class='kebox'><span>" + inputval +"</span><i class='fa fa-remove'></i></div></dd>");
						this.value='';
						this.value=emptyval;
						this.style.color="#999";
					}	
				},
				focus: function(){
					if(this.value==emptyval){
						this.value='';						
					}
				},
				keyup: function(event){
					this.style.color="#333";
					this.value=this.value.replace(/^[\s]/,'');
					if(event.keyCode==13){						
						if(this.value.length!=0){
							var inputval=this.value;
							$(this).parent().before("<dd><div class='kebox'><span>" + inputval +"</span><i class='fa fa-remove'></i></div></dd>");
							this.value='';
						}							
					}
				}
			
			});			
			
			//移除
			obj.find(".kebox").live({
				click:function(){
					$(this).parent().remove();
				}			
			});			
		},
		getTagsVal:function (){   //获取值
			var obj=$(this);
			var thisvalue=obj.children(".listbox").find("dd").map(function(){
				return $(this).find("span").text();				
			}).get().join(",");				
			return thisvalue;			
		}		
});



//input 自动完成
function mSift_SeekTp(oObj,nDire){
	if(oObj.getBoundingClientRect&&!document.all){
	
		var oDc={};
		if(document.documentElement && document.documentElement.scrollTop){
			oDc.top =document.documentElement.scrollTop;
			oDc.left=document.documentElement.scrollLeft;
		}else if(document.body){
			oDc.top =document.body.scrollTop;
			oDc.left=document.body.scrollLef;
		}
		
		switch(nDire){
			case 0:return oObj.getBoundingClientRect().top + oDc.top;
			case 1:return oObj.getBoundingClientRect().right;
			case 2:return oObj.getBoundingClientRect().bottom + oDc.top;
			case 3:return oObj.getBoundingClientRect().left;
		}
		
	}else{
		if(nDire==1||nDire==3){
			var nPosition=oObj.offsetLeft;
		}else{
			var nPosition=oObj.offsetTop;
		}

		if(arguments[arguments.length-1]!=0){
			if(nDire==1){
				nPosition+=oObj.offsetWidth;
			}else if(nDire==2){
				nPosition+=oObj.offsetHeight;
			}
		}

		if(oObj.offsetParent!=null){
			nPosition+=mSift_SeekTp(oObj.offsetParent,nDire,0);
		}
		return nPosition;	
	}
}

function mSift(cVarName,nMax){this.oo=cVarName;this.Max=nMax;}

mSift.prototype={	
	Target:Object,
	TgList:Object,
	Listeners:null,
	SelIndex:0,
	Data:[],
	ReData:[],
	Create:function(oObj){
		var _this=this;
		var oUL=document.createElement('ul');
		oUL.style.display='none';		
		//oObj.parentNode.insertBefore(oUL,oObj);
		document.body.appendChild(oUL,oObj);		
		_this.TgList=oUL;
		oObj.onkeydown=oObj.onclick=function(e){_this.Listen(this,e);};
		oObj.onblur=function(){setTimeout(function(){_this.Clear();},100);};		
	},
	Complete:function(){},
	Select:function(){
		var _this=this;
		if(_this.ReData.length>0){
			_this.Target.value=_this.ReData[_this.SelIndex].replace(/\*/g,'*').replace(/\|/g,'|');
			_this.Clear();
		}
		setTimeout(function(){_this.Target.focus();},10);
		_this.Complete();
	},
	Listen:function(oObj){
		var _this=this;
		_this.Target=oObj;
		var e=arguments[arguments.length-1];
		var ev=window.event||e;
		switch(ev.keyCode){
			case 9://TAB
				return;
			case 13://ENTER
				_this.Target.blur();
				_this.Select();
				return;
			case 38://UP
				_this.SelIndex=_this.SelIndex>0?_this.SelIndex-1:_this.ReData.length-1;
				break;
			case 40://DOWN
				_this.SelIndex=_this.SelIndex<_this.ReData.length-1?_this.SelIndex+1:0;
				break;
			default:
				_this.SelIndex=0;
		}
		
		if(_this.Listeners){
			clearInterval(_this.Listeners);
		}
		_this.Listeners=setInterval(function(){
			_this.Get();
		},10);
	},
	
	Get:function(){
		var _this=this;
		if(_this.Target.value==''){_this.Clear();return;}
		if(_this.Listeners){clearInterval(_this.Listeners);};
		_this.ReData=[];
		var cResult='';
		for(var i=0;i<_this.Data.length;i++){
			if(_this.Data[i].toLowerCase().indexOf(_this.Target.value.toLowerCase())>=0){
				_this.ReData.push(_this.Data[i]);
				if(_this.ReData.length==_this.Max){break;}
			}
		}
		var cRegPattern=_this.Target.value.replace(/\*/g,'*');
			cRegPattern=cRegPattern.replace(/\|/g,'|');
			cRegPattern=cRegPattern.replace(/\+/g,'\\+');
			cRegPattern=cRegPattern.replace(/\./g,'\\.');
			cRegPattern=cRegPattern.replace(/\?/g,'\\?');
			cRegPattern=cRegPattern.replace(/\^/g,'\\^');
			cRegPattern=cRegPattern.replace(/\$/g,'\\$');
			cRegPattern=cRegPattern.replace(/\(/g,'\\(');
			cRegPattern=cRegPattern.replace(/\)/g,'\\)');
			cRegPattern=cRegPattern.replace(/\[/g,'\\[');
			cRegPattern=cRegPattern.replace(/\]/g,'\\]');
			cRegPattern=cRegPattern.replace(/\\/g,'\\\\');
		var cRegEx=new RegExp(cRegPattern,'i');
		
		for(var i=0;i<_this.ReData.length;i++){
			if(_this.Target.value.indexOf('*')>=0){
				_this.ReData[i]=_this.ReData[i].replace(/\*/g,'*');
			}
			
			if(_this.Target.value.indexOf('|')>=0){
				_this.ReData[i]=_this.ReData[i].replace(/\|/g,'|');
			}
			
			cResult+='<li style="padding:0 5px;line-height:30px;cursor:default;" onmouseover="'+ _this.oo+'.ChangeOn(this);'+_this.oo+'.SelIndex='+i+';" onmousedown="'+_this.oo+'.Select();">'
			+_this.ReData[i].replace(cRegEx,function(s){return '<span style="background:yellow;font-weight:bold;font-style:normal;color:#e60;">'+s+'</span>';});+'</li>';
		}
		
		if(cResult==''){
			_this.Clear();
		}else{
			_this.TgList.innerHTML=cResult;
			_this.TgList.style.cssText='display:block;position:absolute;background:#fff;border:#ccc solid 1px;margin:-1px 0 0;padding: 5px;list-style:none;font-size:12px;z-index:10000;';
			_this.TgList.style.top=mSift_SeekTp(_this.Target,2)+'px';
			_this.TgList.style.left=mSift_SeekTp(_this.Target,3)+'px';
			//_this.TgList.style.width=_this.Target.offsetWidth+100+'px';
			_this.TgList.style.minWidth=_this.Target.offsetWidth + 'px';
		}

		var oLi=_this.TgList.getElementsByTagName('li');
		if(oLi.length>0){
			oLi[_this.SelIndex].style.cssText='background:#3382AF;padding:0 5px;line-height:30px;cursor:default;color:#fff;';
		}
	},
	
	ChangeOn:function(oObj){
		var oLi=this.TgList.getElementsByTagName('li');
		for(var i=0;i<oLi.length;i++) {
			oLi[i].style.cssText='padding:0 5px;line-height:30px;cursor:default;';
		}
		oObj.style.cssText='background:#36c;padding:0 5px;line-height:30px;cursor:default;color:#fff;';
	},
	
	Clear:function(){
		var _this=this;
		if(_this.TgList){
			_this.TgList.style.display='none';
			_this.ReData=[];
			_this.SelIndex=0;
		}
	}
}

function getRootPath(){  
    //获取当前网址，如： http://localhost:8083/uimcardprj/share/meun.jsp  
    var curWwwPath=window.document.location.href;  
    //获取主机地址之后的目录，如： uimcardprj/share/meun.jsp  
    var pathName=window.document.location.pathname;  
    var pos=curWwwPath.indexOf(pathName);  
    //获取主机地址，如： http://localhost:8083  
    var localhostPaht=curWwwPath.substring(0,pos);  
    //获取带"/"的项目名，如：/uimcardprj  
    var projectName=pathName.substring(0,pathName.substr(1).indexOf('/')+1);	
    return(localhostPaht+projectName);	
}


function forIE(){
	var url=getRootPath();	
	var b_version=navigator.appVersion;
	var version=b_version.split(";");
	var trim_Version="";	
	version.length>2?trim_Version = version[1].replace(/[ ]/g, ""):trim_Version ="trim_Version";
	var param=/MSIE[678]/;
	var result=param.test(trim_Version);
	
	if(result){	
		//document.referrer;
		/*
		var pos="";
		if(url=="http://bs.paic.com.cn"){			
			pos="http://bs.paic.com.cn/static";
		}else if(url=="http://www.lfexlocal.com"){
			pos="http://www.lfexlocal.com/static";
		}else{
			pos="http://172.16.101.88";
		}
		
		location.replace(pos + "/isIE.html");
		
		
		window.location.href="./isIE.html";
		window.navigate("./isIE.html");*/	
		self.location="./isIE.html";
			
		
	}
}


//自定义trim方法
$.extend({
	cLtrim:function(str,symbol){
		var blank=symbol==undefined ? 's': symbol;	
		var mat=new RegExp("^\\"+ blank);	
		var tmpstr=str;	
		do
		{
		tmpstr = tmpstr.replace(mat,'');		
		}while(mat.test(tmpstr));		
		return tmpstr;	
	},
	cRtrim:function(str,symbol){
		var blank=symbol==undefined ? 's': symbol;	
		var mat=new RegExp("\\"+ blank+ "$");	
		var tmpstr=str;	
		do
		{
		tmpstr = tmpstr.replace(mat,'');		
		}while(mat.test(tmpstr));	
		return tmpstr;	
	},	
	ctrim:function(str,symbol){
		var tmpstr = $.cLtrim(str,symbol)			
		return $.cRtrim(tmpstr,symbol);
	}
});


//快速检索功能，只适用小数据量
$.extend({
	searchesCompany:function(opt){
		var def={
			"inputId":"",    //当前操作的inputID
			"dataObj":"",    //传输的数据对象
			"Field":"",      //操作哪个字段
			"tableObj":"",   //显示到哪个table			
		};	
		var options=$.extend(def,opt);		
		$(options.inputId).keyup(function(){	
			var tempval=$(this).val();
			var patt=new RegExp(tempval,"gi");		
			//加载拼接数据
			var companyhtml="";
			$.each( options.dataObj ,function(key,item){			
				var searchField = item[options.Field];				
				if(!patt.test(searchField)) return;				
				companyhtml += '<tr>';
				for(var i in item){			
					var thisField=item[i].length> 22 ? item[i].substr(0,22) + "...": item[i];//如果超过22个长度截断	
					thisField=thisField.replace(patt ,"<span class='highcolor'>" + tempval.toLocaleUpperCase() + "</span>");					
					companyhtml += '<td>'+thisField +'</td>';
				}			
				companyhtml += '</tr>';				
			});			
			$(options.tableObj).html('').append(companyhtml);			
		});		
	}
});


/**
	* 同一类checkbox全部选择或取消
	* @param    {obj}            string	  操作全选的checkboxID	
**/
$.extend({
	checkAll:function(objID,callback){
		$(objID).next().on({
			click:function(){			
				var checkName= $(this).attr("name");
				var checked=$(this).prev().prop("checked");			
				$("input[name="+ checkName +"]").not("#allauthority").map(function(){				
					if(checked){
						$(this).attr("checked",true);
						$(this).next("i").removeClass("fasquare").addClass("fachecksquare");					
					}else{
						$(this).removeAttr("checked");
						$(this).next("i").removeClass("fachecksquare").addClass("fasquare");
					}
				});				
				if(callback==undefined) return;				
				callback();				
				return;
			}			
		});
	},
	/**
	* 同一类checkbox只要有一个为FASLE，则全选规则为FALSE
	* @param    {obj}            string	  操作全选的checkboxID
	* @param    {Name}           string   限制哪些input有效
	**/
	uncheckAll:function(obj,name){
		var checkboxs=$("input[name="+ name +"]").not(obj);	
		checkboxs.next().click(
			function(){		
				if (checkboxs.length != checkboxs.filter("[checked]").length){			
					$(obj).removeAttr("checked");
					$(obj).next("i").addClass("fasquare").removeClass("fachecksquare");
				}else{
					$(obj).attr("checked",true);
					$(obj).next("i").addClass("fachecksquare").removeClass("fasquare");
				}		
			}	
		);
		return this
	}	
});

//设置三列一样高
function setHeightEq(){
	var childArr=[];
	$(".authority_Table").find(".setHeightBox").each(function(i){
		childArr[i]=$(this).outerHeight();
	});	
	DevContent= childArr.getMax();
	
	DevContent = DevContent > $(window).outerHeight()-170 ? $(window).outerHeight()-170:DevContent;
	
	$(".blcokBorder").height(DevContent);
}


/*
 * 设置输入域(input/textarea)光标的位置
 * @param {HTMLInputElement/HTMLTextAreaElement} elem
 * @param {Number} index
 */
function setCursorPosition(elem, index) {
    var val = elem.value
    var len = val.length

    // 超过文本长度直接返回
    if (len < index) return
    setTimeout(function() {
        elem.focus();
        if (elem.setSelectionRange) { // 标准浏览器
            elem.setSelectionRange(index, index)    
        } else { // IE9-
            var range = elem.createTextRange()
            range.moveStart("character", -len)
            range.moveEnd("character", -len)
            range.moveStart("character", index)
            range.moveEnd("character", 0)
            range.select()
        }
    }, 10)
}
