    function run_gauge(root) {
        gauge = [];
        gauge[0] = new TK.Gauge({
            id: "gauge0",
            min:0,
            max:10,
            value: 3,
            size: 116,
            width: 100,
            height: 55,
            start: 195,
            angle: 150,
            x:-10,
            y:-10,
            margin: 20,
            thickness: 27,
            show_value: false,
            markers: [{from:0, to:2, margin:20, thickness: 5, color: "rgba(255,0,0,0.8)"}],
            label: {align:"outer", margin: 20},
            show_hand: true,
            hand: {margin: 29, length: 21, width: 2, color:"white"},
            labels: [{pos:0},{pos:2},{pos:4},{pos:6},{pos:8},{pos:10}]
        });
        gauge[1] = new TK.Gauge({
            id: "gauge1",
            min:0,
            max:60,
            margin: 20,
            value:22,
            start: 270,
            angle: 360,
            title: {margin:38,title:"t/sec"},
            dot: {width: 1, length: 1, margin: 17},
            label: {align:"outer", margin:17},
            show_hand: false,
            dots:[{pos:0},{pos:5},{pos:10},{pos:15},{pos:20},{pos:25},{pos:30},
                  {pos:35},{pos:40},{pos:45}, {pos:50},{pos:55}],
            labels: [{pos:0},{pos:5},{pos:10},{pos:15},{pos:20},{pos:30},{pos:40},{pos:50}]
        });
        gauge[2] = new TK.Gauge({
            id: "gauge2",
            min:-60,
            max:12,
            value:-10,
            title: "dBu",
            markers: [{from:0, to:12}],
            dots:[{pos:-60},{pos:-50},{pos:-40},{pos:-30},{pos:-20},{pos:-10},
                  {pos:0},{pos:5},{pos:10},{pos:120}],
            labels: [{pos:-60},{pos:-40},{pos:-20},{pos:0,label:"0 dB"},{pos:12,label:"+12"}]
        });
        gauge[3] = new TK.Gauge({
            id: "gauge3",
            min:-100,
            max:100,
            value:50,
            base: 0,
            title: "Temp \u00B0C",
            label: {format: TK.FORMAT("%d \u00B0")},
            markers: [{from:80, to:100}, {from:-80, to:-100}],
            dots:[{pos:0},{pos:10},{pos:20},{pos:30},{pos:40},{pos:50},{pos:60},{pos:70},{pos:80},{pos:90},{pos:100},
                  {pos:-10},{pos:-20},{pos:-30},{pos:-40},{pos:-50},{pos:-60},{pos:-70},{pos:-80},{pos:-90},{pos:-100}],
            labels: [{pos:0, label:"0"},{pos:20},{pos:60},{pos:40},{pos:80},{pos:100},
                     {pos:-20},{pos:-60},{pos:-40},{pos:-80},{pos:-100}]
        });
        gauge[4] = new TK.Gauge({
            id: "gauge4",
            "class": "inset",
            min:-40,
            max:12,
            value:-25,
            width: 170,
            height: 70,
            size: 350,
            start: 245,
            angle: 50,
            x: -90,
            y: 5,
            margin: 20,
            thickness: 1.5,
            dot: {margin: 12, width: 1, length: 10},
            marker: {margin: 11, thickness: 10},
            hand: {margin: 12, length:70, width:2},
            label: {margin: 12, align: "outer"},
            title: {margin: 46, pos: 270, title: "VU"},
            show_value: false,
            markers: [{from:0, to:12},
                      {from:-20, to:0, margin: 23, thickness: 3}
            ],
            dots:[{pos:-60},{pos:-50},{pos:-40},{pos:-30},{pos:-20},{pos:-10},
                  {pos:0},{pos:5},{pos:10},{pos:120},
                  {pos:-20, margin:23, length: 7},
                  {pos:-10, margin:23, length: 7},
                  {pos:0, margin:23, length: 7}
            ],
            labels: [{pos:-40},{pos:-20},{pos:0,label:"0 dB"},{pos:12,label:"+12"},
                {pos: -20, label:"0", margin: 29, align:"inner"},
                {pos: -10, label:"50", margin: 29, align:"inner"},
                {pos: -0, label:"100%", margin: 29, align:"inner"}
            ]
        });
        gauge[5] = new TK.Gauge({
            id: "gauge5",
            "class": "inset",
            min:-40,
            max:12,
            value:-25,
            width: 170,
            height: 70,
            size: 350,
            start: 245,
            angle: 50,
            x: -90,
            y: 5,
            margin: 20,
            thickness: 1.5,
            dot: {margin: 12, width: 1, length: 10},
            marker: {margin: 11, thickness: 10},
            hand: {margin: 12, length:70, width:2},
            label: {margin: 12, align: "outer"},
            title: {margin: 46, pos: 270, title: "VU"},
            show_value: false,
            markers: [{from:0, to:12},
                      {from:-20, to:0, margin: 23, thickness: 3, color:"rgba(0,0,0,0.8)"}
            ],
            dots:[{pos:-60},{pos:-50},{pos:-40},{pos:-30},{pos:-20},{pos:-10},
                  {pos:0},{pos:5},{pos:10},{pos:120},
                  {pos:-20, margin:23, length: 7},
                  {pos:-10, margin:23, length: 7},
                  {pos:0, margin:23, length: 7}
            ],
            labels: [{pos:-40,label:"-40"},{pos:-20,label:"-20"},{pos:0,label:"0 dB"},{pos:12,label:"+12"},
                {pos: -20, label:"0", margin: 29, align:"inner"},
                {pos: -10, label:"50", margin: 29, align:"inner"},
                {pos: -0, label:"100%", margin: 29, align:"inner"}
            ]
        });
        TK.seat_all_svg()
        root.append_children(gauge);
    }
<pre class='css prettyprint source'><code>
.toolkit-gauge {
    margin-right: 6px;
    margin-left: 6px;
    width: 128px;
}
#gauge0 .toolkit-base {
    opacity: 1;
    stroke-width: 12px;
    stroke: rgba(0, 42, 66, 0.1);
    fill: rgb(0, 42, 66);
}
#gauge0 .toolkit-hand {
    fill: white;
}
#gauge0 .toolkit-dot {
    fill: rgba(255,255,255,0.33);
}

#gauge1 .toolkit-label {
    font-size: 9px;
}

#gauge3 {
    background: url(images/gauge.svg) no-repeat 50% 0%;
    background-size: contain;
    fill: white;
}
#gauge3 .toolkit-dot, #gauge3 .toolkit-label {
    fill: white;
}
#gauge3 .toolkit-title {
    opacity: 0.9;
    fill: white;
}

#gauge4 {
    background: url(images/vumeter.png) no-repeat 50% 0%;
    background-size: 100% 100%;
    fill: white;
}
#gauge4 .toolkit-base {
    opacity: 1;
}
#gauge4 .toolkit-hand {
    opacity: 1;
}
#gauge4 .toolkit-marker {
    fill: rgba(255,255,255,0.4);
}
#gauge4 .toolkit-title {
    opacity: 0.9;
    fill: white;
}
#gauge4 .toolkit-dot, #gauge4 .toolkit-label {
    fill: white;
}

#gauge5 {
    background: url(images/vumeter_light.png) no-repeat 50% 0%;
    background-size: 100% 100%;
    fill: rgba(0,0,0,0.8);
}
#gauge5 .toolkit-base {
    opacity: 1;
    fill: rgba(0,0,0,0.8);
}
#gauge5 .toolkit-hand {
    opacity: 1;
}
#gauge5 .toolkit-title {
    opacity: 0.9;
}
</code></pre>
<script> prepare_example(); </script>
