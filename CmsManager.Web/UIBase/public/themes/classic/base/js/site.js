/**
 * Admui-basic v1.0.0 (http://www.admui.com/)
 * Copyright 2015-2017 Admui Team
 * Licensed under the Admui License 1.0 (http://www.admui.com/about/#license)
 */
(function (window, document, $) {
    'use strict';

    /* global screenfull*/

    var $html, $body;

    var _objExtend = _objExtend || {}; // 自定义对象扩展

    $.extend(_objExtend, {
        _queue: {
            prepare: [],
            run: [],
            complete: []
        },
        run: function () {
            var self = this;
            this.dequeue('prepare', function () {
                self.trigger('before.run', self);
            });

            this.dequeue('run', function () {
                self.dequeue('complete', function () {
                    self.trigger('after.run', self);
                });
            });
        },
        dequeue: function (name, done) { // 队列当前状态离队，进行下一步操作
            var self = this,
                queue = this.getQueue(name),
                fn = queue.shift(),
                next = function () {
                    self.dequeue(name, done);
                };

            if (fn) {
                fn.call(this, next);
            } else if ($.isFunction(done)) {
                done.call(this);
            }
        },
        getQueue: function (name) { // 获取队列状态信息
            if (!$.isArray(this._queue[name])) {
                this._queue[name] = [];
            }

            return this._queue[name];
        },
        extend: function (obj) { // 公用模块对象扩展方法
            $.each(this._queue, function (name, queue) {
                if ($.isFunction(obj[name])) {
                    queue.unshift(obj[name]);

                    delete obj[name];
                }
            });
            $.extend(this, obj);
            return this;
        },
        trigger: function (name, data, $el) { // 离队状态执行动作

            if (typeof name === 'undefined') {
                return;
            }
            if (typeof $el === 'undefined') {
                $el = $("#admui-pageContent");
            }

            $el.trigger(name + '.app', data);
        }
    });

    $.components = $.components || {}; // 实现插件的提前检测和调用

    $.extend($.components, {
        _components: {},
        register: function (name, obj) {
            this._components[name] = obj;
        },
        init: function (args, name, context) {
            var self = this, obj;
            args = args || true;

            if (typeof name === 'undefined') {
                $.each(this._components, function (name) {
                    self.init(args, name);
                });
            } else {
                context = context || document;

                obj = this.get(name);

                if (!obj) {
                    return;
                }

                switch (obj.mode) {
                    case 'default':
                        return this._initDefault(name, context);
                    case 'init':
                        return this._initComponent(obj, context);
                    case 'api':
                        return this._initApi(obj, context, args);
                    default:
                        this._initApi(obj, context, args);
                        this._initComponent(obj, context);
                        return;
                }
            }
        },
        _initDefault: function (name, context) { // jquery 3rd的基本用法
            if (!$.fn[name]) {
                return;
            }

            var defaults = this.getDefaults(name);

            $('[data-plugin=' + name + ']', context).each(function () {
                var $this = $(this),
                    options = $.extend(true, {}, defaults, $this.data());

                $this[name](options);
            });
        },
        _initComponent: function (obj, context) { // jquery 3rd的高级用法
            if ($.isFunction(obj.init)) {
                obj.init.call(obj, context);
            }
        },
        _initApi: function (obj, context, args) { // 其他处理
            if (args && $.isFunction(obj.api)) {
                obj.api.call(obj, context);
            }
        },
        getDefaults: function (name) {
            var component = this.get(name);

            return component && typeof component.defaults !== "undefined" ? component.defaults : {};
        },
        get: function (name) {
            if (typeof this._components[name] !== "undefined") {
                return this._components[name];
            } else {
                console.error('component:' + name + ' 脚本文件没有注册任何信息！');
                return undefined;
            }
        }
    });

    $.configs = $.configs || {}; // 配置基本信息

    $.extend($.configs, {
        _data: {},
        get: function (name) {
            var data = this._data;

            for (var i = 0; i < arguments.length; i++) {
                name = arguments[i];

                data = data[name];
            }

            return data;
        },
        set: function (name, value) {
            this._data[name] = value;
        },
        extend: function (name, options) {
            var value = this.get(name);
            return $.extend(true, value, options);
        }
    });

    $.colors = function (name, level) { // 获取颜色配置信息
        if (!$.configs.colors && typeof $.configs.colors[name] === 'undefined') {
            return null;
        }

        if (level && typeof $.configs.colors[name][level] !== 'undefined') {
            return $.configs.colors[name][level];
        } else {
            return $.configs.colors[name];
        }
    };

    $.po = function (name, options) { // 3rd调用参数
        var defaults = $.components.getDefaults(name);
        return $.extend(true, {}, defaults, options);
    };

    /* 通用功能对象（可配置增加，也可扩展） */
    var _app = {
        pageAside: function () { // 小屏幕下侧边栏（展开&收起）操作
            var pageAside = $(".page-aside"),
                isOpen = pageAside.hasClass('open');

            pageAside.toggleClass('open', !isOpen);
        },
        run: function (next) {
            var self = this;

            // 侧边栏开关
            $(document).on('click', '.page-aside-switch', function (e) {
                self.pageAside();
                e.stopPropagation();
            });

            next();
        }
    };

    window.App = $.extend({}, _app, _objExtend);

    $.site = $.site || {}; // 应用初始化

    $.extend($.site, {
        run: function () {

            function hideNavbar() {
                var $body = $('body');

                $body.addClass('site-navbar-collapsing');
                $('#admui-navbarCollapse').collapse('hide');

                setTimeout(function () {
                    $body.removeClass('site-navbar-collapsing');
                }, 10);

                $body.removeClass('site-navbar-collapse-show');
            }

            if (typeof $.site.menu !== 'undefined') {
                $.site.menu.init();
            }

            $('#admui-navMenu').responsiveHorizontalTabs({ // 导航条响应式
                tabParentSelector: '#admui-navTabs',
                fnCallback: function (el) {
                    if ($('#admui-navMenu').is(':visible')) {
                        el.removeClass('is-load');
                    }
                }
            });

            if (typeof $.site.menubar !== 'undefined') { // 导航条&菜单的响应式工作
                $('.site-menubar').on('changing.site.menubar', function () {
                    var $menubar = $('[data-toggle="menubar"]');

                    $menubar.toggleClass('hided', !$.site.menubar.opened);
                    $menubar.toggleClass('unfolded', !$.site.menubar.folded);
                });

                $.site.menubar.init();

                Breakpoints.on('change', function () {
                    $.site.menubar.change();
                });

                /*
                 *  小屏幕下导航条展开 | 收起按钮
                 *  搜索按钮（href）
                 * */
                $(document).on('click', '[data-toggle="collapse"]', function (e) {
                    var $trigger = $(e.target),
                        href, target, $target;

                    if (!$trigger.is('[data-toggle="collapse"]')) {
                        $trigger = $trigger.parents('[data-toggle="collapse"]');
                    }

                    target = $trigger.attr('data-target') || (href = $trigger.attr('href')) && href.replace(/.*(?=#[^\s]+$)/, '');
                    $target = $(target);

                    if ($target.hasClass('navbar-search-overlap')) {
                        $target.find('input').focus();

                        e.preventDefault();
                    } else if ($target.attr('id') === 'admui-navbarCollapse') {
                        var isOpen = !$trigger.hasClass('collapsed'),
                            $body = $(document.body);

                        $body.addClass('site-navbar-collapsing');
                        $body.toggleClass('site-navbar-collapse-show', isOpen);

                        $('#admui-navMenu').responsiveHorizontalTabs({
                            tabParentSelector: '#admui-navTabs',
                            fnCallback: function (el) {
                                el.removeClass('is-load');
                            }
                        });

                        setTimeout(function () {
                            $body.removeClass('site-navbar-collapsing');
                        }, 350);
                    }
                });

                $(document).on('click', '[data-toggle="menubar"]', function () { // 菜单展开|收起控制按钮
                    if (Breakpoints.is('xs') && $('body').hasClass('site-menubar-open')) {
                        hideNavbar();
                    }

                    $.site.menubar.toggle();
                });

                /*
                 *  菜单收起
                 *  导航条收起
                 * */

                $('.site-page').on('click', '#admui-pageContent', function () {
                    if (Breakpoints.is('xs') && $('body').hasClass('site-menubar-open')) {
                        $.site.menubar.hide();

                        hideNavbar();
                    }
                });

                // 图标对应菜单展开
                $('#admui-navMenu >.nav-tabs >li:not(.no-menu)').on('click', function (e) {
                    if ($(e.target).closest('li').is('.dropdown')) {
                        return;
                    }

                    if (Breakpoints.is('xs')) {
                        $.site.menubar.open();
                    }
                });
            }

            if (typeof screenfull !== 'undefined') { // 全屏模式操作
                $(document).on('click', '[data-toggle="fullscreen"]', function () {
                    if (screenfull.enabled) {
                        screenfull.toggle();
                    }

                    return false;
                });
                if (screenfull.enabled) {
                    document.addEventListener(screenfull.raw.fullscreenchange, function () {
                        $('[data-toggle="fullscreen"]').toggleClass('active', screenfull.isFullscreen);
                    });
                }
            }

            /* 对下拉列表的其他功能 */
            $(document).on('show.bs.dropdown', function (e) {
                var $target = $(e.target), $menu,
                    $trigger = e.relatedTarget ? $(e.relatedTarget) : $target.children('[data-toggle="dropdown"]'),
                    animation = $trigger.data('animation');

                if (animation) {
                    $menu = $target.children('.dropdown-menu');

                    $menu.addClass('animation-' + animation);

                    $menu.one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', function () {
                        $menu.removeClass('animation-' + animation);
                    });
                }
            });

            $('[data-toggle="tooltip"]').tooltip({trigger: 'hover'});
            $('[data-toggle="popover"]').popover();

            $.components.init();
            this.theme();
        },

        theme: function () { // 主题渲染
            if (!window.localStorage) {
                return;
            }

            var $body = $('body'),
                settingsName = 'admui.base.skinTools',
                $link = $('#admui-siteStyle', $('head')),
                settings = localStorage.getItem(settingsName),
                etx = $link.prop('href').indexOf('?v=') === -1 ? '' : '.min';

            if (!settings) {
                return;
            }

            settings = JSON.parse(settings);

            if (settings.themeColor && settings.themeColor !== 'primary') {
                $link.attr('href', $.ctx + '/public/themes/classic/base/skins/' + settings.themeColor + etx + '.css');
            }

            if (settings.sidebar && settings.sidebar === 'site-menubar-light') {
                $('nav.site-menubar').addClass('site-menubar-light');
            }

            if (settings.navbar && settings.navbar !== '') {
                $('.site-navbar').addClass(settings.navbar);
            }

            if (settings.navbarInverse === '') {
                $('.site-navbar').removeClass('navbar-inverse');
            }

            if (settings.menuDisplay && settings.menuDisplay === 'site-menubar-fold') {
                $.site.menubar.fold();

                if (settings.menuTxtIcon && settings.menuTxtIcon === 'site-menubar-keep') {
                    $body.addClass('site-menubar-keep');
                } else {
                    $body.addClass('site-menubar-fold-alt');
                }
            }

            if (settings.tabFlag === '') {
                $body.removeClass('site-contabs-open');
            }

        }
    });

    $.site.menu = {
        speed: 250,
        accordion: true, // 将默认的折叠效果改为手风琴效果

        init: function () {
            this.$instance = $('.site-menu');

            if (this.$instance.length === 0) {
                return;
            }

            this.bind();
        },

        bind: function () {
            var self = this;

            this.$instance.on('mouseenter.site.menu', '.site-menu-item', function () {
                var $item = $(this);

                if ($.site.menubar.folded === true && $item.is('.has-sub') && $item.parent('.site-menu').length > 0) {
                    self.position($item, $item.children('.site-menu-sub'));
                    $('body').addClass('site-menubar-fold-hover');
                }

                $item.addClass('hover');
            }).on('mouseleave.site.menu', '.site-menu-item', function () {
                var $item = $(this);
                if ($.site.menubar.folded === true && $item.is('.has-sub') && $item.parent('.site-menu').length > 0) {
                    $item.children('.site-menu-sub').css("max-height", "");
                    $('body').removeClass('site-menubar-fold-hover');
                }

                $item.removeClass('hover');
            }).on('deactive.site.menu', '.site-menu-item.active', function (e) {
                var $item = $(this);

                $item.removeClass('active');

                e.stopPropagation();
            }).on('active.site.menu', '.site-menu-item', function (e) {
                var $item = $(this);

                $item.addClass('active');

                e.stopPropagation();
            }).on('open.site.menu', '.site-menu-item', function (e) {
                var $item = $(this);

                self.expand($item, function () {
                    $item.addClass('open');
                });

                if (self.accordion) {
                    $item.siblings('.open').trigger('close.site.menu');
                }

                e.stopPropagation();
            }).on('close.site.menu', '.site-menu-item.open', function (e) {
                var $item = $(this);

                self.collapse($item, function () {
                    $item.removeClass('open');
                });

                e.stopPropagation();
            }).on('click.site.menu ', '.site-menu-item>a', function () {
                var $parent = $(this).parent();

                if ($parent.is('.has-sub')) {
                    if ($parent.is('.open')) {
                        $parent.trigger('close.site.menu');
                    } else {
                        $parent.trigger('open.site.menu');
                    }
                } else {
                    self.$instance.find('li.active').trigger('deactive.site.menu');
                    $parent.trigger('active.site.menu');

                }
            }).on('tap.site.menu', '> .site-menu-item > a', function () {
                var link = $(this).attr('href');

                if (link) {
                    window.location = link;
                }
            }).on('touchend.site.menu', '> .site-menu-item > a', function () {
                var $item = $(this).parent('.site-menu-item');

                if (!$.site.menubar.folded) {
                    return;
                }

                if ($item.is('.has-sub') && $item.parent('.site-menu').length > 0) {
                    $item.siblings('.hover').removeClass('hover');

                    if ($item.is('.hover')) {
                        $item.removeClass('hover');
                    } else {
                        $item.addClass('hover');
                    }
                }
            }).on('scroll.site.menu', '.site-menu-sub', function (e) {
                e.stopPropagation();
            });

        },

        collapse: function ($item, callback) { // 菜单的子级菜单的折叠动作
            var self = this;
            var $sub = $item.children('.site-menu-sub');

            $sub.show().slideUp(this.speed, function () {
                $(this).css('display', '');

                $(this).find('> .site-menu-item').removeClass('is-shown');

                if (callback) {
                    callback();
                }

                self.$instance.trigger('collapsed.site.menu');
            });
        },

        expand: function ($item, callback) { // 菜单的子级菜单的展开动作
            var self = this,
                $sub = $item.children('.site-menu-sub'),
                $children = $sub.children('.site-menu-item').addClass('is-hidden');

            $sub.hide().slideDown(this.speed, function () {
                $(this).css('display', '');

                if (callback) {
                    callback();
                }

                self.$instance.trigger('expanded.site.menu');
            });

            setTimeout(function () {
                $children.addClass('is-shown');
                $children.removeClass('is-hidden');
            }, 0);
        },

        refresh: function () { // 折叠未选中的左侧系统菜单
            this.$instance.find('.open').filter(':not(.active)').removeClass('open');
        },

        position: function ($item, $dropdown) { // 窗口 | 在小屏幕设备上，左侧系统菜单的下拉列表的位置操作功能
            var offsetTop = $item.position().top,
                menubarHeight = $.site.menubar.$instance.outerHeight(),
                itemHeight = $item.find("> a").outerHeight();

            $dropdown.removeClass('site-menu-sub-up').css('max-height', "");

            if (offsetTop > menubarHeight / 2) {
                $dropdown.addClass('site-menu-sub-up');

                if ($.site.menubar.foldAlt) {
                    offsetTop = offsetTop - itemHeight;
                }
                $dropdown.css('max-height', offsetTop + itemHeight);
            } else {
                if ($.site.menubar.foldAlt) {
                    offsetTop = offsetTop + itemHeight;
                }
                $dropdown.removeClass('site-menu-sub-up');
                $dropdown.css('max-height', menubarHeight - offsetTop);
            }
        }
    };

    $.site.menubar = {
        opened: null,
        folded: null,
        top: false,
        foldAlt: false,
        $instance: null,
        auto: true,

        init: function () {
            var self = this;

            $html.removeClass('css-menubar').addClass('js-menubar');

            this.$instance = $("#admui-navTabs");
            this.tagId = $('.nav-tabs li.active > a').attr('href');

            if (this.tagId === '#') {
                this.tagId = $('.nav-tabs li.active').find('ul>li.active>a').attr('href');
            }

            if (this.$instance.length === 0) {
                return;
            }

            // 鼠标经过左侧菜单显示图标
            if ($body.is('.site-menubar-fold-alt')) {
                this.foldAlt = true;
            }

            // 鼠标经过左侧菜单显示文字
            if ($body.is('.site-menubar-keep')) {
                if ($body.hasClass('site-menubar-fold')) { // 收起
                    this.auto = 'fold';
                } else if ($body.hasClass('site-menubar-unfold')) { //展开
                    this.auto = 'unfold';
                }
            }

            this.$instance.on('changed.site.menubar', function () {
                self.update();
            });

            $('.nav-tabs li:not(.no-menu)').on('shown.bs.tab', function (event) {
                var tagId = self.tagId = $(event.target).attr('href');
                if ($body.hasClass('site-menubar-fold')) {
                    self.hoverscroll.enable(tagId);
                } else if ($body.hasClass('site-menubar-unfold')) {
                    self.slimScroll.enable();
                }
            });

            this.change();
        },

        change: function () {
            var breakpoint = Breakpoints.current();

            if (this.auto !== true) {
                switch (this.auto) {
                    case 'fold':
                        this.reset();
                        if (breakpoint.name === 'xs') {
                            this.hide();
                        } else {
                            this.fold();
                        }
                        return;
                    case 'unfold':
                        this.reset();
                        if (breakpoint.name === 'xs') {
                            this.hide();
                        } else {
                            this.unfold();
                        }
                        return;
                }
            }

            this.reset();

            if (breakpoint) {
                switch (breakpoint.name) {
                    case 'lg':
                        this.unfold();
                        break;
                    case 'md':
                    case 'sm':
                        this.fold();
                        break;
                    case 'xs':
                        this.hide();
                        break;
                }
            }
            Breakpoints.on('xs', 'leave', function () {
                $('#admui-navMenu').responsiveHorizontalTabs({
                    tabParentSelector: '#admui-navTabs',
                    fnCallback: function (el) {
                        if ($('#admui-navMenu').is(':visible')) {
                            el.removeClass('is-load');
                        }
                    }
                });
            });
        },

        animate: function (doing, callback) {
            var self = this;
            $body.addClass('site-menubar-changing');

            doing.call(self);
            this.$instance.trigger('changing.site.menubar');

            callback.call(self);
            $body.removeClass('site-menubar-changing');

            self.$instance.trigger('changed.site.menubar');
        },

        reset: function () {
            this.opened = null;
            this.folded = null;
            $body.removeClass('site-menubar-hide site-menubar-open site-menubar-fold site-menubar-unfold');
            $html.removeClass('disable-scrolling');
        },

        open: function () {
            if (this.opened !== true) {
                this.animate(function () {
                    $body.removeClass('site-menubar-hide').addClass('site-menubar-open site-menubar-unfold');
                    this.opened = true;

                    $html.addClass('disable-scrolling');

                }, function () {
                    this.slimScroll.enable();
                });
            }
        },

        hide: function () {
            this.hoverscroll.disable();

            if (this.opened !== false) {
                this.animate(function () {

                    $html.removeClass('disable-scrolling');
                    $body.removeClass('site-menubar-open').addClass('site-menubar-hide site-menubar-unfold');
                    this.opened = false;

                }, function () {
                    this.slimScroll.enable();
                });
            }
        },

        unfold: function () {
            this.hoverscroll.disable();

            if (this.folded !== false) {
                this.animate(function () {
                    $body.removeClass('site-menubar-fold').addClass('site-menubar-unfold');
                    this.folded = false;

                }, function () {
                    this.slimScroll.enable();
                });
            }
        },

        fold: function () {
            this.slimScroll.destroy();

            if (this.folded !== true) {
                this.animate(function () {
                    $body.removeClass('site-menubar-unfold').addClass('site-menubar-fold');
                    this.folded = true;

                }, function () {
                    this.hoverscroll.enable(this.tagId);
                });
            }
        },

        toggle: function () {
            var breakpoint = Breakpoints.current(),
                folded = this.folded,
                opened = this.opened;

            switch (breakpoint.name) {
                case 'lg':
                    if (folded === null || folded === false) {
                        this.fold();
                    } else {
                        this.unfold();
                    }
                    break;
                case 'md':
                case 'sm':
                    if (folded === null || folded === true) {
                        this.unfold();
                    } else {
                        this.fold();
                    }

                    $('#admui-navMenu').responsiveHorizontalTabs({
                        tabParentSelector: '#admui-navTabs'
                    });
                    break;
                case 'xs':
                    if (opened === null || opened === false) {
                        this.open();
                    } else {
                        this.hide();
                    }
                    break;
            }
        },

        update: function () {
            this.hoverscroll.update();
        },

        slimScroll: {
            api: null,
            native: false,
            init: function () {
                // if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
                //   this.native = true;
                //   $body.addClass('site-menubar-native');
                //   return;
                // }

                if ($body.is('.site-menubar-native')) {
                    this.native = true;
                    return;
                }

                $.site.menubar.$instance.slimScroll($.po('slimScroll'));
            },

            enable: function () {
                if (this.native) {
                    return;
                }
                this.init();
            },

            destroy: function () {
                $.site.menubar.$instance.slimScroll({destroy: true});
                $.site.menubar.$instance.removeAttr('style');
            }
        },

        hoverscroll: {
            api: null,

            init: function (tagId) {
                $.site.menubar.$instance.find(tagId).children('div').attr('style', '');
                this.api = $.site.menubar.$instance.find(tagId).asHoverScroll({
                    namespace: 'hoverscorll',
                    direction: 'vertical',
                    list: '.site-menu',
                    item: '> li',
                    exception: '.site-menu-sub',
                    fixed: false,
                    boundary: 100,
                    onEnter: function () {
                        //$(this).siblings().removeClass('hover');
                        //$(this).addClass('hover');
                    },
                    onLeave: function () {
                        //$(this).removeClass('hover');
                    }
                }).data('asHoverScroll');
            },

            update: function () {
                if (this.api) {
                    this.api.update();
                }
            },

            enable: function (tagId) {
                if (tagId !== this.tagId) {
                    this.tagId = tagId;
                    this.init(tagId);
                } else {
                    this.api.enable();
                }
            },

            disable: function () {
                if (this.api) {
                    this.api.disable();
                }
            }
        }
    };

    $(function () {
        $html = $('html');
        $body = $('body');

        $.site.run();
    });
})(window, document, jQuery);