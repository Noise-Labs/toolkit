 /* toolkit. provides different widgets, implements and modules for 
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

Fader = $class({
    _class: "Fader",
    Extends: Widget,
    Implements: [Ranged, Warning, Tooltip, GlobalCursor],
    options: {
        value: 0,
        division: 1,
        levels: [1, 6, 12, 24],
        gap_dots: 3,
        gap_labels: 40,
        show_labels: true,
        labels: function (val) { return val.toFixed(2); },
        tooltip: false,
        layout: _TOOLKIT_LEFT,
        fixed_dots: false,
        fixed_labels: false
    },
    initialize: function (options) {
        this.__tt = false;
        Widget.prototype.initialize.call(this, options);
        
        this.element = this.widgetize(toolkit.element("div","toolkit-fader"),
                       true, true, true);
        
        if (TK.get_style(this.element, "position") != "absolute"
            && TK.get_style(this.element, "position") != "relative")
            this.element.style["position"] = "relative";
            
        this._background_top    = toolkit.element("div", "toolkit-background-top-left");
        this._background_center = toolkit.element("div", "toolkit-background-center");
        this._background_bottom = toolkit.element("div", "toolkit-background-bottom-right");

        this.element.appendChild(this._background_top);
        this.element.appendChild(this._background_center);
        this.element.appendChild(this._background_bottom);

        if (this.options.container)
            this.set("container", this.options.container);
        
        var opt = $mixin({}, this.options, {
            container:   this.element,
        });
        this.scale = new Scale(opt);
        this._scale = this.scale.element;
        
        this._handle = toolkit.element("div", "toolkit-handle");
        this.element.appendChild(this._handle);
            
        this.drag = new DragValue({
            element: this._handle,
            range:   function () { return this }.bind(this),
            get:     function () { return this.options.value; }.bind(this),
            set:     function (v) {
                this.set("value", v);
                this.fire_event("useraction", ["value", v, this]);
            }.bind(this),
            events: function () { return this }.bind(this),
            direction: this.options.direction
        });
        this.scroll = new ScrollValue({
            element: this.element,
            range:   function () { return this }.bind(this),
            get:     function () { return this.options.value; }.bind(this),
            set:     function (v) {
                this.set("value", v);
                this.fire_event("useraction", ["value", v, this]);
            }.bind(this),
            events: function () { return this }.bind(this),
        });
        
        this.set("layout", this.options.layout);
        
        this.add_event("pointerdown",  function () { this.__down = true; }.bind(this));
        this.element.addEventListener("mouseup",    this._clicked.bind(this));
        this.element.addEventListener("touchend",   this._touchend.bind(this));
        this.element.addEventListener("mouseenter", this._mouseenter.bind(this));
        this.element.addEventListener("mouseleave", this._mouseleave.bind(this));
        this.element.addEventListener("mousemove",  this._move.bind(this));
        
        if (typeof this.options.reset == "undefined")
            this.options.reset = this.options.value;
        this.element.addEventListener("dblclick", function () {
            this.set("value", this.options.reset);
            this.fire_event("doubleclick", [this.options.value, this]);
        }.bind(this));
        
        this.drag.add_event("dragging", function (ev) {
            this.__down = false;
            this.__dragging = true;
            this._move(ev);
        }.bind(this));
        
        this.drag.add_event("stopdrag", function (ev) {
            this.__dragging = false;
            this.__down = true;
            if (!this.__entered)
                this.__tt = this.tooltip(false, this.__tt);
        }.bind(this));
        
        this.scroll.add_event("scrolling", function (ev) {
            if (!this.options.tooltip) return;
            this.__tt = this.tooltip(this.options.tooltip(
                this.get("value")), this.__tt);
        }.bind(this));
        
        this.redraw();
        Widget.prototype.initialized.call(this);
    },
    
    redraw: function () {
        if (this._vert()) {
            // VERTICAL
            //toolkit.set_styles(this._background_top, {
                //position: "absolute",
                //top: "0px",
                //left: undefined
            //});
            //toolkit.set_styles(this._background_bottom, {
                //position: "absolute",
                //bottom: "0px",
                //right: undefined
            //});
            
            var h  = toolkit.inner_height(this.element);
            //var hl = toolkit.outer_height(this._background_top, true);
            //var hr = toolkit.outer_height(this._background_bottom, true);
            
            //toolkit.set_styles(this._background_center, {
                //position: "absolute",
                //top: hl + "px",
                //left: undefined,
                //height: (h - hl - hr) + "px"
            //});
            
            //var p = toolkit.inner_width(this.element);
            //toolkit.outer_width(this._background_top, true, p);
            //toolkit.outer_width(this._background_bottom, true, p);
            //toolkit.outer_width(this._background_center, true, p);
            //toolkit.outer_width(this._scale, true, p);
            
            //toolkit.set_styles(this._handle, {
                //position: "absolute",
                //bottom: "0px",
                //right: undefined
            //});
            this._handlesize = toolkit.outer_height(this._handle, true);
            //toolkit.outer_height(this._scale, true, h - this._handlesize);
            //this._scale.style["top"] = (this._handlesize / 2) + "px";
        } else {
            // HORIZONTAL
            
            //toolkit.set_styles(this._background_top, {
                //position: "absolute",
                //left: "0px",
                //top: undefined
            //});
            //toolkit.set_styles(this._background_bottom, {
                //position: "absolute",
                //right: "0px",
                //bottom: undefined
            //});
            
            var h  = toolkit.inner_width(this.element);
            //var hl = toolkit.outer_width(this._background_top, true);
            //var hr = toolkit.outer_width(this._background_bottom, true);
            
            //toolkit.set_styles(this._background_center, {
                //position: "absolute",
                //left: hl + "px",
                //top: undefined,
                //width: (h - hl - hr) + "px"
            //});
            
            //var p = toolkit.inner_height(this.element);
            //toolkit.outer_height(this._background_top, true, p);
            //toolkit.outer_height(this._background_bottom, true, p);
            //toolkit.outer_height(this._background_center, true, p);
            //toolkit.outer_height(this._scale, true, p);
            
            //toolkit.set_styles(this._handle, {
                //position: "absolute",
                //right: "0px",
                //bottom: undefined
            //});
            this._handlesize = toolkit.outer_width(this._handle, true);
            //toolkit.outer_width(this._scale, true, h - this._handlesize);
            //this._scale.style["left"] = (this._handlesize / 2) + "px";
        }
        var s = h - this._handlesize;
        if (s != this.options.basis) {
            this.options.basis = s;
            this.scale.set("basis", s);
        }
        this.set("value", this.options.value);
        this.scale.redraw();
        
        //toolkit.inner_width(this.element,
                            //Math.max(toolkit.outer_width(this._handle, true),
                                     //toolkit.outer_width(this._scale, true)));
        
        Widget.prototype.redraw.call(this);
    },
    resize: function () {
        this.redraw();
    },
    destroy: function () {
        TK.destroy(this._background_top);
        TK.destroy(this._background_bottom);
        TK.destroy(this._background_center);
        TK.destroy(this._handle);
        this.scale.destroy();
        TK.destroy(this.element);
        Widget.prototype.destroy.call(this);
    },
    
    // HELPERS & STUFF
    _vert: function () {
        return this.options.layout == _TOOLKIT_LEFT
            || this.options.layout == _TOOLKIT_RIGHT;
    },
    _clicked: function (ev) {
        if (!this.__down) return;
        this.set("value", this._get_value(ev));
        if (!this.__entered)
            this.__tt = this.tooltip(false, this.__tt);
        this.fire_event("useraction", ["value", this.get("value"), this]);
    },
    _move: function (ev) {
        if (!this.options.tooltip) return;
        var s = this.__dragging ? this.get("value") : this._get_value(ev);
        // NOTE: mouseenter/mouseleave do not fire when left mouse button is pressed
        // so dont show tooltip here
        if (this.__entered)
            this.__tt = this.tooltip(this.options.tooltip(s), this.__tt);
    },
    _mouseenter : function (ev) {
        this.__entered = true;
    },
    _mouseleave : function (ev) {
        this.__entered = false;
        if (!this.options.tooltip) return;
        if (!this.__dragging)
            this.__tt = this.tooltip(false, this.__tt);
    },
    _touchend : function (ev) {
        this.__entered = false;
        ev = ev.changedTouches[0];
        this._clicked(ev);
        event.preventDefault();
    },
    _get_value: function (ev) {
        var pos   = TK[this._vert() ? "position_top" : "position_left"](this.element) + this._handlesize / 2;
        var click = ev[
                    this._vert() ? "pageY" : "pageX"];
        var size  = toolkit[
                    this._vert() ? "outer_height" : "outer_width"](this._scale, true);
        var real = click - pos
        if (this._vert()) real = size - real;
        console.log(pos, click, size)
        return Math.max(this.options.min,
               Math.min(this.real2val(real), this.options.max));
    },
    
    // GETTER & SETTER
    set: function (key, value, hold) {
        this.options[key] = value;
        switch (key) {
            case "value":
                this.options.value = this.snap_value(Math.min(this.options.max,
                                     Math.max(this.options.min, value)));
                if (value > this.options.max || value < this.options.min)
                    this.warning(this.element);
                this.fire_event("set_value", [this.options.value, this]);
                this.fire_event("set", ["value", this.options.value, this]);
                if (!hold) {
                    this._handle.style[this._vert() ? "bottom" : "right"] = this.val2real() + "px";
                }
                return;
            case "layout":
                TK.remove_class(this.element, "toolkit-vertical");
                TK.remove_class(this.element, "toolkit-horizontal");
                TK.remove_class(this.element, "toolkit-left");
                TK.remove_class(this.element, "toolkit-right");
                TK.remove_class(this.element, "toolkit-top");
                TK.remove_class(this.element, "toolkit-bottom");
                var c = this._vert() ? "vertical" : "horizontal";
                TK.add_class(this.element, "toolkit-" + c);
                var d = value == _TOOLKIT_LEFT   ? "left" :
                        value == _TOOLKIT_RIGHT  ? "right" :
                        value == _TOOLKIT_TOP    ? "top" : "bottom";
                TK.add_class(this.element, "toolkit-" + d);
                this.scale.set("layout", value);
                this.options.direction = this._vert() ? _TOOLKIT_VERT
                                                      : _TOOLKIT_HORIZ;
                this.drag.set("direction", this.options.direction);
                this.scroll.set("direction", this.options.direction);
                break;
            case "min":
            case "max":
            case "reverse":
            case "log_factor":
            case "step":
            case "round":
            case "snap":
            case "scale":
            case "basis":
                if (!hold) this.redraw();
                break;
        }
        Widget.prototype.set.call(this, key, value, hold);
    }
});
