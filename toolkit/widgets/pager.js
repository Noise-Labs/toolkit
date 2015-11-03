 /* toolkit provides different widgets, implements and modules for 
 * building audio based applications in webbrowsers.
 * 
 * Invented 2013 by Markus Schmidt <schmidt@boomshop.net>
 *
 * This program is free software; you can redistribute it and/or
 * modify it under the terms of the GNU Lesser General Public
 * License as published by the Free Software Foundation; either
 * version 2 of the License, or (at your option) any later version.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the GNU
 * Lesser General Public License for more details.
 *
 * You should have received a copy of the GNU Lesser General
 * Public License along with this program; if not, write to the
 * Free Software Foundation, Inc., 51 Franklin Street, Fifth Floor, 
 * Boston, MA  02110-1301  USA
 */
"use strict";
(function(w){
w.Pager = $class({
    /* @class:  Pager
     * 
     * @option: position;  Int; _TOOLKIT_TOP;    The position of the ButtonArray
     * @option: direction; Int; _TOOLKIT_RIGHT; Direction the pages appearance
     * @option: pages;     Array;   []; an array of mappings (objects) containing the members "label" and "content". "label" is a string for the buttons label or an object containing options for a button and content is a string containing HTML or a ready-to-use DOM node, e.g. [{label: "Empty Page 1", content: document.createElement("span")}, {label: {label:"Foobar", class:"foobar"}, content: "<h1>Foobar</h1><p>Lorem ipsum dolor sit amet</p>"}]
     * @option: show;      Int;   -1; The page to show
     * @option: overlap;   Bool;   false; if true pages aren't resized so the #ButtonArray overlaps the contents
     *
     * @extends: Container
     * 
     * @description:
     * Pager, also known as Notebook in other UI toolkits, provides
     * multiple containers for displaying contents which are switchable
     * via a #ButtonArray. */
    _class: "Pager",
    Extends: Container,
    options: {
        position:  _TOOLKIT_TOP,
        direction: _TOOLKIT_VERTICAL,
        pages:     [],
        show:      -1,
        overlap:   false
    },
    
    initialize: function (options) {
        this.pages = [];
        Container.prototype.initialize.call(this, options);
        /* @element: element [d][c][s];     div.toolkit-container.toolkit-pager;             The main pager element */
        /* @element: _buttonarray_wrapper; div.toolkit-wrapper.toolkit-buttonarray-wrapper; An internal container for layout purposes containing the #ButtonArray. */
        /* @element: _container_wrapper;   div.toolkit-wrapper.toolkit-container-wrapper;   An internal container for layout purposes containing the _clip element. */
        /* @element: _clip;                div.toolkit-clip;                                The clipping area containing the pages containers */
        this.element.className += " toolkit-pager";
        /* @module: buttonarray; The #ButtonArray instance acting as the menu */
        this.buttonarray = new ButtonArray({
            container: this.element,
            onchanged: function(button, n) {
                this.set("show", n); 
            }.bind(this),
        });
        this._buttonarray_wrapper = TK.element("div", "toolkit-wrapper", "toolkit-buttonarray-wrapper");
        this._container_wrapper = TK.element("div", "toolkit-wrapper", "toolkit-container-wrapper");
        this._clip = TK.element("div", "toolkit-clip");
        this._container_wrapper.appendChild(this._clip);
        this.element.appendChild(this._buttonarray_wrapper);
        this.element.appendChild(this._container_wrapper);
        
        this.add_child(this.buttonarray);
        this.add_pages(this.options.pages);
        this.set("position", this.options.position);
        this.set("show", this.options.show);
    },
    
    redraw: function () {
        Container.prototype.redraw.call(this);
        var O = this.options;
        var I = this.invalid;
        var E = this.element;

        if (I.overlap)
            TK[(O.overlap ? "add_" : "remove_") + "class"](E, "toolkit-overlap");
        
        if (I.direction) {
            TK.remove_class(E, "toolkit-top");
            TK.remove_class(E, "toolkit-right");
            TK.remove_class(E, "toolkit-bottom");
            TK.remove_class(E, "toolkit-left");
            switch (O.position) {
                case _TOOLKIT_TOP:
                    TK.add_class(E, "toolkit-top");
                    break;
                case _TOOLKIT_BOTTOM:
                    TK.add_class(E, "toolkit-bottom");
                    break;
                case _TOOLKIT_LEFT:
                    TK.add_class(E, "toolkit-left");
                    break;
                case _TOOLKIT_RIGHT:
                    TK.add_class(E, "toolkit-right");
                    break;
            }
        }
        
        if (I.position) {
            TK.remove_class(E, "toolkit-layout-top");
            TK.remove_class(E, "toolkit-layout-right");
            TK.remove_class(E, "toolkit-layout-bottom");
            TK.remove_class(E, "toolkit-layout-left");
            switch (O.position) {
                case _TOOLKIT_TOP:
                    TK.add_class(E, "toolkit-layout-top");
                    break;
                case _TOOLKIT_BOTTOM:
                    TK.add_class(E, "toolkit-layout-bottom");
                    break;
                case _TOOLKIT_LEFT:
                    TK.add_class(E, "toolkit-layout-left");
                    break;
                case _TOOLKIT_RIGHT:
                    TK.add_class(E, "toolkit-layout-right");
                    break;
            }
        }
        
        if (I.show) {
            I.show = false;
            for (var i = 0; i < this.pages.length; i ++) {
                var page = this.pages[i];
                if (i == O.show)
                    page.add_class("toolkit-active");
                else
                    page.remove_class("toolkit-active");
            }
        }
    },
    
    add_pages: function (options) {
        /* @method: add_pages
         * @option: options; Array[{label:String, content:Container|String}[, ...]]; undefined; An Array containing objects with options for the page and its button. Members are: label - a string for the #Button, content: a string or a #Container instance.
         * @description: Adds an array of pages. */
        for (var i = 0; i < options.length; i++)
            this.add_page(options[i].label, options[i].content);
    },
    
    add_page: function (button, content, pos, options) {
        /* @method: add_page
         * @option: button;  String|Object;       undefined; A string with the #Button s label or an object cotaining options for the #Button
         * @option: content; Widget|Class|String; undefined; The content of the page. Either a #Container (or derivate)  widget, a class (needs option "options" to be set) or a string which get embedded in a new #Container
         * @option: options; Object;              undefined; An object containing options for the #Container to add as a page
         * @option: pos;     Int|Undefined;       undefined; The position to add the new page to. If avoided the page is added to the end of the list
         * @description: Adds a #Container to the Pager and a #Button to the pagers #ButtonArray */
        var p;
        if (typeof button === "string")
            button = {label: button};
        this.buttonarray.add_button(button, pos);

        if (typeof content === "string") {
            if (!options) options = {}; 
            options.content = content;
            p = new Container(options);
        } else if (typeof content === "function") {
            // assume here content is a subclass of Container
            p = new content(options);
        } else {
            p = content;
        }

        p.add_class("toolkit-page");
        p.set("container", this._clip);

        var len = this.pages.length;

        if (pos >= 0 && pos < len - 1) {
            this.pages.splice(pos, 0, p);
            this._clip.insertBefore(p.element, this._clip.childNodes[pos]);
        } else {
            pos = len;
            this.pages.push(p);
            this._clip.appendChild(p.element);
        }
        /* @event: added; Page, Widget; A page was added to the Pager */
        this.fire_event("added", p);

        this.add_child(p);

        // TODO: not always necessary
        if (this.current() === p) {
            this.options.show = pos;
            this.buttonarray.set("show", pos);
            p.set("active", true);
            if (!this.hidden()) p.show();
        } else {
            this.hide_child(p);
        }

        return p;
    },

    remove_page: function (page) {
        /* @method: remove_page
         * @option: page; Int|Container; undefined; The container to remove. Either a position or the #Container widget generated by add_page
         * @description: Removes a page from the Pager. */
        if (typeof page == "object")
            page = this.pages.indexOf(page);
        if (page < 0 || page >= this.pages.length)
            return;
        this.buttonarray.remove_button(page);
        if (page < this.options.show)
            this.set("show", this.options.show-1);
        else if (page === this.options.show)
            this.set("show", this.options.show);
        var p = this.pages[page];
        this.pages.splice(page, 1);
        p.destroy();
        this.remove_child(p);
        /* @event: removed; Page, Widget; A page was removed from the Pager */
        this.fire_event("removed", p);
    },
    
    resize: function () {
        this.invalid.show = true;
        this.trigger_draw();

        Container.prototype.resize.call(this);
    },

    current: function() {
        /* @method: current
         * @description: Returns the index of the actual displayed page or null if none is shown */
        var n = this.options.show;
        if (n >= 0 && n < this.pages.length) {
            return this.pages[n];
        }
        return null;
    },
    
    set: function (key, value) {
        var page;
        if (key === "show") {
            if (value < 0) value = 0;
            else if (value >= this.pages.length) value = this.pages.length - 1;

            if (value === this.options.show) return;

            page = this.current();

            if (page) {
                this.hide_child(page);
                page.set("active", false);
            }

            this.buttonarray.set("show", value);
        }
        Container.prototype.set.call(this, key, value);
        switch(key) {
            case "show":
                page = this.current();

                if (page) {
                    page.set("active", true);
                    this.show_child(page);
                    this.fire_event("changed", page, value);
                }

                break;
            case "pages":
                for (var i = 0; i < this.pages.length; i++)
                    this.pages[i].destroy();
                this.pages = [];
                this.add_pages(value);
                break;
            case "position":
                var badir;
                if (value === _TOOLKIT_TOP || value === _TOOLKIT_BOTTOM) {
                    badir = _TOOLKIT_HORIZ;
                } else {
                    badir = _TOOLKIT_VERT;
                }
                this.buttonarray.set("direction", badir);
                break;
        }
    },
    get: function (key) {
        if (key == "pages") return this.pages;
        return Container.prototype.get.call(this, key);
    }
});
})(this);
