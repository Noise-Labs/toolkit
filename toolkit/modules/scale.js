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
(function(w) { 
w.Scale = $class({
    // Scale can be used to draw dots and labels as markers next to a meter, a
    // fader or a frequency response graph. Depending on some parameters it
    // tries to decide on its own where to draw labels and dots depending on the
    //  available space and the scale. Scales can be drawn vertically and
    // horizontally. Scale extends Widget and implements Ranges.
    _class: "Scale",
    
    Extends: Widget,
    Implements: [Ranged],
    options: {
        layout:           _TOOLKIT_RIGHT, // how to draw the scale:
                                          // _TOOLKIT_LEFT:   vertical, labels
                                          //                  on the left
                                          // _TOOLKIT_RIGHT:  vertical, labels
                                          //                  on the right,
                                          // _TOOLKIT_TOP:    horizontal, labels
                                          //                  on top
                                          // _TOOLKIT_BOTTOM: horizontal, labels
                                          //                  on bottom
        division:         1,              // minimum step size
        levels:           [1],            // array of steps where to draw labels
                                          // and marker
        base:             false,          // base where dots and labels are
                                          // drawn from
        labels:           function (val) { return val.toFixed(2); },
                                          // callback function for formatting
                                          // the labels
        gap_dots:         4,              // minimum gap between dots (pixel)
        gap_labels:       40,             // minimum gap between labels (pixel)
        show_labels:      true,           // if labels should be drawn
        show_min:         true,           // always draw a label at min
        show_max:         true,           // always draw a label at max
        show_base:        true,           // always draw a label at base
        fixed_dots:       false,          // if fixed dots should be drawn.
                                          // array containing real values or false
        fixed_labels:     false           // if fixed labels should be drawn.
                                          // array contianing real values or false
    },
    
    initialize: function (options, hold) {
        this.__size = 0;
        Widget.prototype.initialize.call(this, options);
        this.element = this.widgetize(
                       TK.element("div","toolkit-scale"), true, true, true);
        
        switch (this.options.layout) {
            case _TOOLKIT_LEFT:
                TK.add_class(this.element, "toolkit-vertical");
                TK.add_class(this.element, "toolkit-left");
                break;
            case _TOOLKIT_RIGHT:
                TK.add_class(this.element, "toolkit-vertical");
                TK.add_class(this.element, "toolkit-right");
                break;
            case _TOOLKIT_TOP:
                TK.add_class(this.element, "toolkit-horizontal");
                TK.add_class(this.element, "toolkit-top");
                break;
            case _TOOLKIT_BOTTOM:
                TK.add_class(this.element, "toolkit-horizontal");
                TK.add_class(this.element, "toolkit-bottom");
                break;
        }
        //this.element.style.position = "relative";
        
        if (this.options.container) this.set("container", this.options.container);
        if (this.options["class"]) this.set("class", this.options["class"]);
        
        if (!hold)
            this.redraw();
        Widget.prototype.initialized.call(this);
    },
    
    redraw: function () {
        var O = this.options;
        this.__size = 0;
        if (O.base === false)
            O.base = O.max
        TK.empty(this.element);
        
        // draw base
            this.draw_dot(O.base, this.__based ? "toolkit-base" : "toolkit-base");
        if (O.show_base) {
            this.draw_label(O.base, "toolkit-base");
        }
        // draw top
        if (this._val2px(O.base - O.min) >= O.gap_labels) {
            this.draw_dot(O.min, "toolkit-min");
            if (O.show_min)
                this.draw_label(O.min, "toolkit-min");
        }
        
        // draw bottom
        if (this._val2px(O.max - O.base) >= O.gap_labels) {
            this.draw_dot(O.max, "toolkit-max");
            if (O.show_max)
                this.draw_label(O.max, "toolkit-max");
        }
        
        if (O.fixed_dots && O.fixed_labels) {
            for (var i = 0; i < O.fixed_dots.length; i++) {
                this.draw_dot(O.fixed_dots[i]);
            }
            for (var i = 0; i < O.fixed_labels.length; i++) {
                this.draw_label(O.fixed_labels[i]);
            }
            return this;
        }
        
        var level;
        
        // draw beneath base
        var iter = O.base;
        this.__last = iter;
        while (iter > O.min) {
            //console.log("beneath", O.reverse, iter)
            iter -= O.division;
            if (level = this._check_label(iter, O.division)) {
                this._check_dots(this.__last,
                                iter,
                               -O.division,
                                level,
                                function (a, b) { return a > b });
                this.__last = iter;
            }
        }
        // draw dots between last label and min
        this._check_dots(this.__last,
                        iter,
                       -O.division,
                        O.levels.length - 1,
                        function (a, b) { return a > b });
        
        // draw above base
        var iter = O.base;
        this.__last = iter;
        while (iter < O.max) {
            //console.log("above", O.reverse, iter)
            iter += O.division;
            if (level = this._check_label(iter, O.division)) {
                this._check_dots(this.__last,
                                iter,
                                O.division,
                                level,
                                function (a, b) { return a < b });
                this.__last = iter;
            }
        }
        // draw dots between last label and max
        this._check_dots(this.__last,
                        iter,
                        O.division,
                        O.levels.length - 1,
                        function (a, b) { return a < b });
        Widget.prototype.redraw.call(this);
        return this;
    },
    destroy: function () {
        TK.empty(this.element);
        TK.destroy(this.element);
        Widget.prototype.destroy.call(this);
        // ??
        return this;
    },
    
    draw_dot: function (val, cls) {
        // draws a dot at a certain value and adds a class if needed
        
        // create dot element
        var d = TK.element("div", "toolkit-dot", { position: "absolute" });
        if (cls) TK.add_class(d, cls);
        
        // position dot element
        var styles = { }
        var pos = Math.round(this.val2px(val));
        pos = Math.min(Math.max(0, pos), this.options.basis - 1);
        styles[this._vert() ? "bottom" : "left"] = pos + "px";
        TK.set_styles(d, styles);
        this.element.appendChild(d);
        return this;
    },
    draw_label: function (val, cls) {
        // draws a label at a certain value and adds a class if needed
        if (!this.options.show_labels) return;
                  
        // create label element
        var label = TK.element("span", "toolkit-label", {
            position: "absolute",
            display: "block",
            cssFloat: "left"
        });
        label.innerHTML = this.options.labels(val);
        if (cls) TK.add_class(label, cls);
        this.element.appendChild(label);
        
        // position label element
        var styles = { }
        var pos = Math.round(this.val2px(val));
        var size = TK[this._vert() ? "outer_height" : "outer_width"](label, true);
        if (this._vert)
            pos = Math.min(Math.max(0, pos - size / 2), this.options.basis - size);
        else
            pos = pos - size / 2;
        styles[this._vert() ? "bottom" : "left"] = pos + "px";
        TK.set_styles(label, styles);
        
        // resize the main element if labels are wider
        // because absolute positioning destroys dimensions
        var s = toolkit[this._vert() ? "outer_width" : "outer_height"](label, true);
        if (s > this.__size) {
            this.__size = s;
            toolkit[this._vert() ? "outer_width" : "outer_height"](this.element, true, s);
        }
        return this;
    },
    
    // HELPERS & STUFF
    _check_label: function (iter, step) {
        var O = this.options;
        // test if a label can be draw at a position and trigger drawing if so
        for (var i = O.levels.length - 1; i >= 0; i--) {
            var level = O.levels[i];
            var diff = Math.abs(O.base - iter);
            if (!(diff % level)
            && (level >= Math.abs(this.__last - iter)
                || i == O.levels.length - 1)
            && this._val2px(Math.abs(this.__last - iter)
                + O.min) >= O.gap_labels
            && this._val2px(iter) >= O.gap_labels) {
                if (iter > O.min && iter < O.max) {
                    this.draw_label(iter);
                    this.draw_dot(iter, "toolkit-marker");
                }
                return i;
            }
        }
        return false;
    },
    _check_dots: function (start, stop, step, level, comp) {
        var O = this.options;
        // test if dots can be drawn between two positions and trigger drawing
        var iter = start;
        while (comp(iter, stop - step)) {
            iter += step;
            for (var i = level - 1; i >= 0; i--) {
                var l = O.levels[i];
                var diff = Math.abs(start - iter);
                if (!(diff % l)
                && this._val2px(Math.abs(start - iter)
                    + O.min) >= O.gap_dots
                && this._val2px(iter) >= O.gap_dots) {
                    this.draw_dot(iter);
                    start = iter;
                }
            }
        }
    },
    _val2px: function (value) {
        // returns a positions according to a value without taking
        // options.reverse into account
        return this.options.reverse ?
            this.options.basis - this.val2px(value) : this.val2px(value);
    },
    _vert: function () {
        // returns true if the meter is drawn vertically
        return this.options.layout == _TOOLKIT_LEFT
            || this.options.layout == _TOOLKIT_RIGHT;
    },
    
    // GETTER & SETTER
    set: function (key, value, hold) {
        this.options[key] = value;
        switch (key) {
            case "division":
            case "levels":
            case "labels":
            case "gap_dots":
            case "gap_labels":
            case "show_labels":
                this.fire_event("scalechanged")
                if (!hold) this.redraw();
                break;
            case "basis":
                if (this._vert()) this.element.style.height = value + "px";
                else this.element.style.width = value + "px";

                break;
            case "base":
                if (value === false) {
                    this.options.base = this.options.min;
                    this.__based = false;
                } else {
                    this.__based = true;
                }
                this.fire_event("basechanged", value);
                if (!hold) this.redraw();
                key = false;
                break;
            case "show_min":
            case "show_max":
            case "show_base":
                if (!hold) this.redraw();
                break;
        }
        Widget.prototype.set.call(this, key, value, hold);
        return this;
    }
});
})(this);
