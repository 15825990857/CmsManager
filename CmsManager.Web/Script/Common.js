//id 渲染标签id
//url 地址
//columns 匹配项
//search  查询参数
//查看回调参数
function SixDataTable(id, url, columns, search, details, searchTitle) {
    var table = $('#' + id).DataTable({
        "ajax": {
            "type": "Post",
            "data": search,
            "url": url,
        },
        order: [[0, "Desc"]],
        columns: columns,
        serverSide: true,
        searching: true,
        ordering: true,
        scrollX: true,
        processing: true,
        "language": {
            "processing": "处理中...",
            "lengthMenu": "显示 _MENU_ 项结果",
            "zeroRecords": "没有匹配结果",
            "info": "显示第 _START_ 至 _END_ 项结果，共 _TOTAL_ 项",
            "infoEmpty": "显示第 0 至 0 项结果，共 0 项",
            "infoFiltered": "(由 _MAX_ 项结果过滤)",
            "infoPostFix": "",
            "search": "搜索:",
            "searchPlaceholder": searchTitle,
            "url": "",
            "emptyTable": "表中数据为空",
            "loadingRecords": "载入中...",
            "infoThousands": ",",
            "paginate": {
                "first": "首页",
                "previous": "上页",
                "next": "下页",
                "last": "末页"
            },
            "aria": {
                paginate: {
                    first: '首页',
                    previous: '上页',
                    next: '下页',
                    last: '末页'
                },
                "sortAscending": ": 以升序排列此列",
                "sortDescending": ": 以降序排列此列"
            },
            "decimal": "-",
            "thousands": "."
        },
        "columnDefs": [{
            width: "13px",
            orderable: false,
            targets: 0,
            render: function (data, type, full, meta) {
                return '<input type="checkbox" name="checkList"  value="' + data + '" onclick="cancelBubble(this);" />';
            }
        }]
    });


    $("#" + id + " tbody").on('click', 'tr', function () {
        var is = $(this).find("input[type=checkbox]").is(":checked");
        if (is) {
            $(this).removeClass('selected');
            $(this).find("input[type=checkbox]").prop("checked", false);
        } else {
            $(this).addClass('selected');
            $(this).find("input[type=checkbox]").prop("checked", true);
        }
    });

    $("#" + id + " tbody").on('dblclick', 'tr', function () {
        table.$('tr.selected').removeClass('selected');
        $(this).addClass('selected');
        var samid = $(this).find("input[type=checkbox]").val();
        $("input[name='checkList']").each(function () {
            $(this).prop("checked", false);
        });
        $(this).find("input[type=checkbox]").prop("checked", true);
        if (samid != null && samid != "") {
            details(samid);
        }
    });

    $("#checkAll").prop("checked", false);

    $("#checkAll").on("click", function () {
        var checked = $("#checkAll").is(":checked");
        if (checked) {
            table.$('tr').addClass('selected');
        } else {
            table.$('tr.selected').removeClass('selected');
        }

        $("input[name='checkList']").each(function () {
            if (checked) {
                $(this).prop("checked", true);
            } else {
                $(this).prop("checked", false);
            }
        });
    });
    return table;
}

//单选框
function SixRadioDataTable(id, url, columns, search, details, searchTitle) {
    var table = $('#' + id).DataTable({
        "ajax": {
            "type": "Post",
            "data": search,
            "url": url,
        },
        order: [[0, "Desc"]],
        columns: columns,
        serverSide: true,
        searching: true,
        ordering: true,
        scrollX: true,
        processing: true,
        "language": {
            "processing": "处理中...",
            "lengthMenu": "显示 _MENU_ 项结果",
            "zeroRecords": "没有匹配结果",
            "info": "显示第 _START_ 至 _END_ 项结果，共 _TOTAL_ 项",
            "infoEmpty": "显示第 0 至 0 项结果，共 0 项",
            "infoFiltered": "(由 _MAX_ 项结果过滤)",
            "infoPostFix": "",
            "search": "搜索:",
            "searchPlaceholder": searchTitle,
            "url": "",
            "emptyTable": "表中数据为空",
            "loadingRecords": "载入中...",
            "infoThousands": ",",
            "paginate": {
                "first": "首页",
                "previous": "上页",
                "next": "下页",
                "last": "末页"
            },
            "aria": {
                paginate: {
                    first: '首页',
                    previous: '上页',
                    next: '下页',
                    last: '末页'
                },
                "sortAscending": ": 以升序排列此列",
                "sortDescending": ": 以降序排列此列"
            },
            "decimal": "-",
            "thousands": "."
        },
        "columnDefs": [{
            width: "13px",
            orderable: false,
            targets: 0,
            render: function (data, type, full, meta) {
                return '<input type="radio"  value="' + data + '" onclick="cancelBubble(this);" />';
            }
        }]
    });


    $("#" + id + " tbody").on('click', 'tr', function () {
        var is = $(this).find("input[type=radio]").is(":checked");
        if (is) {
            $(this).removeClass('selected');
            $(this).find("input[type=radio]").prop("checked", false);
        } else {
            $(this).addClass('selected');
            $(this).find("input[type=radio]").prop("checked", true);
        }
    });

    $("#" + id + " tbody").on('dblclick', 'tr', function () {
        table.$('tr.selected').removeClass('selected');
        $(this).addClass('selected');
        var samid = $(this).find("input[type=radio]").val();
        //$("input[name='checkList']").each(function () {
        //    $(this).prop("radio", false);
        //});
        $(this).find("input[type=radio]").prop("checked", true);
        if (samid != null && samid != "") {
            details(samid);
        }
    });

    $("#checkAll").prop("checked", false);

    $("#checkAll").on("click", function () {
        var checked = $("#checkAll").is(":checked");
        if (checked) {
            table.$('tr').addClass('selected');
        } else {
            table.$('tr.selected').removeClass('selected');
        }

        //$("input[name='checkList']").each(function () {
        //    if (checked) {
        //        $(this).prop("checked", true);
        //    } else {
        //        $(this).prop("checked", false);
        //    }
        //});
    });
    return table;
}




//不分页列表
function SixDataTableNoPaging(id, url, columns, search, details) {
    var table1 = $('#' + id).DataTable({
        "ajax": {
            "type": "Post",
            "data": search,
            "url": url,
        },
        order: [[0, "Desc"]],
        columns: columns,
        info: false,
        serverSide: false,
        searching: false,
        ordering: false,
        scrollX: true,
        processing: false,
        paging: false,
        "columnDefs": [{
            width: "13px",
            orderable: false,
            targets: 0,
            render: function (data, type, full, meta) {
                return '<input type="checkbox" name="checkList"  value="' + data + '"  onclick="cancelBubble(this);"  />';
            }
        }]
    });
    $("#" + id + " tbody").on('click', 'tr', function () {
        var is = $(this).find("input[type=checkbox]").is(":checked");
        if (is) {
            $(this).removeClass('selected');
            $(this).find("input[type=checkbox]").prop("checked", false);
        } else {
            $(this).addClass('selected');
            $(this).find("input[type=checkbox]").prop("checked", true);
        }
    });

    $("#" + id + " tbody").on('dblclick', 'tr', function () {
        table1.$('tr.selected').removeClass('selected');
        $(this).addClass('selected');
        var samid = $(this).find("input[type=checkbox]").val();
        $("input[name='checkList']").each(function () {
            $(this).prop("checked", false);
        });
        $(this).find("input[type=checkbox]").prop("checked", true);
        details(samid);
    });

    $("#checkAll").prop("checked", false);

    $("#checkAll").on("click", function () {
        var checked = $("#checkAll").is(":checked");
        if (checked) {
            table1.$('tr').addClass('selected');
        } else {
            table1.$('tr.selected').removeClass('selected');
        }

        $("input[name='checkList']").each(function () {
            if (checked) {
                $(this).prop("checked", true);
            } else {
                $(this).prop("checked", false);
            }
        });
    });
    return table1;
}


//不分页列表
function SixDataTableNoPagingSAM(id, url, columns, search, details) {
    var table1 = $('#' + id).DataTable({
        "ajax": {
            "type": "Post",
            "data": search,
            "url": url,
        },
        order: [[0, "Desc"]],
        columns: columns,
        info: false,
        serverSide: false,
        searching: false,
        ordering: false,
        scrollX: true,
        processing: false,
        paging: false,
        "columnDefs": [{
            width: "13px",
            orderable: false,
            targets: 0,
            render: function (data, type, full, meta) {
                return '<input type="checkbox" name="checkList"  value="' + data + '"  onclick="cancelBubble(this);"  />';
            }
        }]
    });
    $("#" + id + " tbody").on('click', 'tr', function () {
        var is = $(this).find("input[type=checkbox]").is(":checked");
        if (is) {
            $(this).removeClass('selected');
            $(this).find("input[type=checkbox]").prop("checked", false);
        } else {
            $(this).addClass('selected');
            $(this).find("input[type=checkbox]").prop("checked", true);
        }
        var samid = $(this).find("input[type=checkbox]").val();
        details(samid);
    });

    $("#" + id + " tbody").on('dblclick', 'tr', function () {
        table1.$('tr.selected').removeClass('selected');
        $(this).addClass('selected');
        var samid = $(this).find("input[type=checkbox]").val();
        $("input[name='checkList']").each(function () {
            $(this).prop("checked", false);
        });
        $(this).find("input[type=checkbox]").prop("checked", true);
    });

    $("#checkAll").prop("checked", false);

    $("#checkAll").on("click", function () {
        var checked = $("#checkAll").is(":checked");
        if (checked) {
            table1.$('tr').addClass('selected');
        } else {
            table1.$('tr.selected').removeClass('selected');
        }

        $("input[name='checkList']").each(function () {
            if (checked) {
                $(this).prop("checked", true);
            } else {
                $(this).prop("checked", false);
            }
        });
    });
    return table1;
}



//单选框
function SixRadioDataTableNoPaging(id, url, columns, search, details) {
    var table1 = $('#' + id).DataTable({
        "ajax": {
            "type": "Post",
            "data": search,
            "url": url,
        },
        order: [[0, "Desc"]],
        columns: columns,
        info: false,
        serverSide: false,
        searching: false,
        ordering: false,
        scrollX: true,
        processing: false,
        paging: false,
        "columnDefs": [{
            width: "13px",
            orderable: false,
            targets: 0,
            render: function (data, type, full, meta) {
                return '<input type="radio" name="radioList"  value="' + data + '" onclick="cancelRadioBubble(this);"   />';
            }
        }]
    });
    $("#" + id + " tbody").on('click', 'tr', function () {
        var is = $(this).find("input[type='radio']").is(":checked");
        if (is) {
            $(this).removeClass('selected');

            $(this).find("input[type='radio']").prop("checked", false);
        } else {
            $("input[type='radio']").parent().parent().removeClass('selected');
            $(this).addClass('selected');
            $(this).find("input[type='radio']").prop("checked", true);
        }
    });

    $("#" + id + " tbody").on('dblclick', 'tr', function () {
        table1.$('tr.selected').removeClass('selected');
        $(this).addClass('selected');
        var samid = $(this).find("input[type='radio']").val();
        //$("input[name='checkList']").each(function () {
        //    $(this).prop("radio", false);
        //});
        $(this).find("input[type='radio']").prop("checked", true);
        details(samid);
    });

    $("#checkAll").prop("checked", false);

    $("#checkAll").on("click", function () {
        var checked = $("#checkAll").is(":checked");
        if (checked) {
            table1.$('tr').addClass('selected');
        } else {
            table1.$('tr.selected').removeClass('selected');
        }

        //$("input[name='checkList']").each(function () {
        //    if (checked) {
        //        $(this).prop("checked", true);
        //    } else {
        //        $(this).prop("checked", false);
        //    }
        //});
    });
    return table1;
}



//自定义callid不分页
function SixDataTableNoPagings(callid, id, url, columns, search, details) {
    var table1 = $('#' + id).DataTable({
        "ajax": {
            "type": "Post",
            "data": search,
            "url": url,
        },
        order: [[0, "Desc"]],
        columns: columns,
        info: false,
        serverSide: false,
        searching: false,
        ordering: false,
        scrollX: true,
        processing: false,
        paging: false,
        "columnDefs": [{
            width: "13px",
            orderable: false,
            targets: 0,
            render: function (data, type, full, meta) {
                return '<input type="checkbox" name="checkList"  value="' + data + '"  onclick="cancelBubble(this);"  />';
            }
        }]
    });
    $("#" + id + " tbody").on('click', 'tr', function () {
        var is = $(this).find("input[type=checkbox]:eq(0)").is(":checked");
        if (is) {
            $(this).removeClass('selected');
            $(this).find("input[type=checkbox]:eq(0)").prop("checked", false);
        } else {
            $(this).addClass('selected');
            $(this).find("input[type=checkbox]:eq(0)").prop("checked", true);
        }
    });

    $("#" + id + " tbody").on('dblclick', 'tr', function () {
        table1.$('tr.selected').removeClass('selected');
        $(this).addClass('selected');
        var samid = $(this).find("input[type=checkbox]").val();
        $("input[name='checkList']").each(function () {
            $(this).prop("checked", false);
        });
        $(this).find("input[type=checkbox]").prop("checked", true);
        details(samid);
    });

    $("#" + callid).prop("checked", false);

    $("#" + callid).on("click", function () {
        var checked = $("#" + callid).is(":checked");
        if (checked) {
            table1.$('tr').addClass('selected');
        } else {
            table1.$('tr.selected').removeClass('selected');
        }

        $("input[name='checkList']").each(function () {
            if (checked) {
                $(this).prop("checked", true);
            } else {
                $(this).prop("checked", false);
            }
        });
    });
    return table1;
}



//获取列表所有数据
function SixGetData(table) {
    var SamNodes = [];
    var check = table.rows().data();
    for (var i = 0; i < check.length; i++) {
        SamNodes.push(check[i]);
    }
    return SamNodes;
}


//获取列表选择id
function SixGetChecked(id) {
    var check = [];
    $("#" + id + " input[name='checkList']").each(function () {
        if ($(this).is(":checked")) {
            check.push($(this).val());
        }
    });
    return check;
}

//获取列表选择集合
function SixGetDataChecked(table) {
    var SamNodes = [];
    var check = table.rows('.selected').data();
    for (var i = 0; i < check.length; i++) {
        SamNodes.push(check[i]);
    }
    return SamNodes;
}

//获取单据状态
function GetOrderStatus(str) {
    switch (str) {
        case 1:
            return "生效";
            break;
        case 2:
            return "待入库";
            break;
        case 3:
            return "部分入库";
            break;
        case 4:
            return "完成";
            break;
        default:
            return "";
            break;
    }
}

function GetPrice(str) {
    switch (str) {
        case 1:
            return "产品价格";
            break;
        case 2:
            return "客户价格";
            break;
        case 3:
            return "区域价格";
            break;
        default:
            return "";
            break;
    }
}


function GetNewOrderStatus(strs) {
    var result = "";
    $.ajax({
        async: false,
        type: "Post",
        url: "/Sys_Order/GetOrderStatus",
        data: { value: strs },
        success: function (data) {
            result = data;
        }
    });
    return result;
}
function GetStatus(str) {
    switch (str) {
        case 2:
            return "启用";
            break;
        case 3:
            return "停用";
            break;
        default:
            return "-";
            break;
    }
}

//获取组织架构名称
function GetOrgText(strs)
{
    strs = strs == null ? 0 : strs;
    var result = "";
    $.ajax({
        async: false,
        type: "Post",
        url: "/Sys_Organization/GetOrgText",
        data: { id: strs },
        success: function (data) {
            result = data;
        }
    });
    return result;
}

//获取字典
function GetDictionaryNameById(strs) {
    strs = strs == null ? 0 : strs;
    var result = "";
    $.ajax({
        async: false,
        type: "Post",
        url: "/Sys_Dictionary/GetDictionaryNameById",
        data: { id: strs },
        success: function (data) {
            result = data;
        }
    });
    return result;
}
//获取用户名
function GetUserName(strs) {
    var result = "";
    $.ajax({
        async: false,
        type: "Post",
        url: "/Sys_Company/GetUser",
        data: { value: strs },
        success: function (data) {
            result = data;
        }
    });
    return result;
}
//获取单位
function GetCompanyName(strs) {
    if (strs == null) {
        return "";
    }
    var result = "";
    $.ajax({
        async: false,
        type: "Post",
        url: "/Sys_Company/GetCompanyName",
        data: { value: strs },
        success: function (data) {
            result = data;
        }
    });
    return result;
}
//获取品牌
function GetBrandName(strs) {
    var result = "";
    $.ajax({
        async: false,
        type: "Post",
        url: "/Sys_Brand/GetText",
        data: { id: strs },
        success: function (data) {
            result = data;
        }
    });
    return result;
}
//获取分类
function GetClassificationName(strs) {
    var result = "";
    $.ajax({
        async: false,
        type: "Post",
        url: "/Sys_Classification/GetText",
        data: { id: strs },
        success: function (data) {
            result = data;
        }
    });
    return result;
}


//获取产品
function GetProductByID(strs) {
    var result;
    $.ajax({
        async: false,
        type: "Post",
        url: "/Sys_Product/GetProductByID",
        data: { id: strs },
        success: function (data) {
            result = data;
        }
    });
    return result;
}
//获取定价
function GetProductPrice(strs) {
    var result;
    $.ajax({
        async: false,
        type: "Post",
        url: "/Sys_ProductPrice/GetProductPrice",
        data: { id: strs },
        success: function (data) {
            result = data;
        }
    });
    return result;
}
//获取促销类型
function GetPromotionPriceType(strs) {
    var result;
    $.ajax({
        async: false,
        type: "Post",
        url: "/Sys_PromotionPrice/GetPromotionPriceType",
        data: { id: strs },
        success: function (data) {
            result = data;
        }
    });
    return result;
}
//获取供应商
function GetCustomer(strs) {
    var result = "";
    $.ajax({
        async: false,
        type: "Post",
        url: "/Sys_Customer/GetModel",
        data: { id: strs },
        success: function (data) {
            result = data;
        }
    });
    return result;
}

//获取税率
function GetTaxRate(strs) {
    var result = "";
    $.ajax({
        async: false,
        type: "Post",
        url: "/Sys_TaxRate/GetModel",
        data: { id: strs },
        success: function (data) {
            result = data;
        }
    });
    return result;
}


function IsNull(input) {
    var str = $("#" + input).val();
    if (str == "" || str == null) {
        return true;
    } else {
        return false;
    }
}


function IsNoNull(str) {
    if (str == "" || str == null) {
        return false;
    } else {
        return true;
    }
}

function getQueryString(name) {
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
    var r = window.location.search.substr(1).match(reg);
    if (r != null) return unescape(r[2]); return null;
}


function LayerOpen(title, width, height, url, isFull) {
    if (isFull) {
        return layer.open({
            title: title,
            type: 2,
            area: ['100%', '100%'],
            fixed: false, //不固定
            maxmin: true,
            shade: false,
            content: url
        });
    } else {
        return layer.open({
            title: title,
            type: 2,
            area: [width + "px", height + "px"],
            fixed: false, //不固定 
            maxmin: true,
            shade: false,
            content: url
        });
    }
}

function CloseThisLayer() {
    setTimeout(function () {
        var thisindex = parent.layer.getFrameIndex(window.name);
        parent.layer.close(thisindex);
    }, 1000);
}


function SAMOpenDialog(title, width, height, href) {
    var element = document.getElementById("SamOpen");
    if (typeof (element) == "undefined" || element == null) {
        var divObj = document.createElement("div");
        divObj.setAttribute('id', 'SamOpen');
        var first = document.body.firstChild;
        document.body.insertBefore(divObj, first);
    }
    var content = '<iframe src="' + href + '" width="100%" height="99%" frameborder="0" ></iframe>';
    $("#SamOpen").dialog({
        title: title,
        width: width,
        height: height,
        closed: true,
        cache: false,
        modal: true,
        content: content
    }).dialog("open");
}


function GetDate(value, row, index) {
    var str = "";
    if (value != null) {


        var newvalue = value.split("(")[1];
        var newvalue_1 = newvalue.split(")")[0];

        str = formatDateTime(newvalue_1);
    }
    return str;
}

function formatDateTime(timeStamp) {
    var date = new Date();
    date.setTime(timeStamp);
    var y = date.getFullYear();
    var m = date.getMonth() + 1;
    m = m < 10 ? ('0' + m) : m;
    var d = date.getDate();
    d = d < 10 ? ('0' + d) : d;
    var h = date.getHours();
    h = h < 10 ? ('0' + h) : h;
    var minute = date.getMinutes();
    var second = date.getSeconds();
    minute = minute < 10 ? ('0' + minute) : minute;
    second = second < 10 ? ('0' + second) : second;
    return y + '-' + m + '-' + d + ' ' + h + ':' + minute + ':' + second;
};


function cancelBubble(_this) {
    var is = $(_this).is(":checked");
    if (!is) {
        $(_this).parent().parent().removeClass('selected');
    } else {
        $(_this).parent().parent().addClass('selected');
    }

    var e = getEvent();
    if (window.event) {
        //e.returnValue=false;//阻止自身行为
        e.cancelBubble = true;//阻止冒泡
    } else if (e.preventDefault) {
        //e.preventDefault();//阻止自身行为
        e.stopPropagation();//阻止冒泡
    }

}

function cancelRadioBubble(_this) {
    var is = $(_this).is(":checked");
    if (!is) {
        $(_this).parent().parent().removeClass('selected');
    } else {
        $("input[type='radio']").removeClass('selected');
        $(_this).parent().parent().addClass('selected');
    }

    var e = getEvent();
    if (window.event) {
        //e.returnValue=false;//阻止自身行为
        e.cancelBubble = true;//阻止冒泡
    } else if (e.preventDefault) {
        //e.preventDefault();//阻止自身行为
        e.stopPropagation();//阻止冒泡
    }

}



function getEvent() {
    if (window.event) { return window.event; }
    func = getEvent.caller;
    while (func != null) {
        var arg0 = func.arguments[0];
        if (arg0) {
            if ((arg0.constructor == Event || arg0.constructor == MouseEvent
                || arg0.constructor == KeyboardEvent)
                || (typeof (arg0) == "object" && arg0.preventDefault
                && arg0.stopPropagation)) {
                return arg0;
            }
        }
        func = func.caller;
    }
    return null;
}
