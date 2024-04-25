(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[267],{8574:function(e,n,t){Promise.resolve().then(t.bind(t,4e3))},4e3:function(e,n,t){"use strict";t.r(n),t.d(n,{default:function(){return u}});var o=t(7437),r=t(2265),l=t(3767);let s=[{featureType:"all",elementType:"labels",stylers:[{visibility:"off"}]},{featureType:"road",elementType:"geometry",stylers:[{color:"#ffffff"}]}];var i=e=>{let{geoJsonUrl:n,origin:t,destination:i,searchTrigger:a,travelMode:c}=e,d=(0,r.useRef)(null),[u,g]=(0,r.useState)(null),[p,h]=(0,r.useState)([]),[x,m]=(0,r.useState)(null),[f,j]=(0,r.useState)(!1),y=(0,r.useRef)(null);(0,r.useEffect)(()=>{(()=>{if(window.google&&window.google.maps){j(!0);return}if(!document.querySelector('script[src*="maps.googleapis"]')){let e=document.createElement("script");e.src="https://maps.googleapis.com/maps/api/js?key=AIzaSyA4bcHQArQWH2Qxb47goCAhbstZX0WkUZk&libraries=places,geometry",e.async=!0,e.defer=!0,e.onload=()=>j(!0),document.head.appendChild(e)}})()},[]),(0,r.useEffect)(()=>{f&&!u&&d.current&&Z()},[f,d.current]),(0,r.useEffect)(()=>{u&&t&&i&&a&&(v(),console.log("Searching new route"),b())},[u,a]),(0,r.useEffect)(()=>{n&&fetch(n).then(e=>e.json()).then(e=>{m(e)})},[n]);let v=()=>{console.log("Executing clearRouteAndPanel"),y.current?(console.log("DirectionsRenderer is set, clearing map and panel"),y.current.setMap(null),y.current.setPanel(null),console.log("Map and panel cleared")):console.log("DirectionsRenderer not set")},Z=()=>{let e=new window.google.maps.Map(d.current,{center:{lat:-37.8136,lng:144.9631},zoom:14});n&&fetch(n).then(e=>e.json()).then(n=>{h(n.features.map(n=>n.geometry&&"MultiPolygon"===n.geometry.type?n.geometry.coordinates.map(n=>{let t=n.map(e=>e.map(e=>({lat:e[1],lng:e[0]})));return new google.maps.Polygon({paths:t,map:e,strokeColor:"black",strokeOpacity:.8,strokeWeight:.5,fillColor:"white",fillOpacity:0})}):null).filter(e=>null!==e).flat())}),e.setOptions({styles:s}),g(e),y.current=new google.maps.DirectionsRenderer,y.current.setMap(e),y.current.setPanel(document.getElementById("directionsPanel"))},b=()=>{let e=new google.maps.DirectionsService,n=new google.maps.Geocoder;y.current.setMap(u),y.current.setPanel(document.getElementById("directionsPanel"));let o=(e,t)=>{n.geocode({address:e},(e,n)=>{"OK"===n?t(e[0].geometry.location):alert("Geocode was not successful for the following reason: "+n)})};o(t,n=>{if(!x){console.error("GeoJSON data is not loaded");return}o(i,t=>{let o=l.xmu([n.lng(),n.lat()]),r=l.xmu([t.lng(),t.lat()]),s=e=>x.features.some(n=>{let t=l.xmu([n.properties.geo_point_2d.lon,n.properties.geo_point_2d.lat]);return 100>l.TE$(e,t,{units:"meters"})}),i=s(o),a=s(r);if(console.log("originPoint:",o),console.log("destinationPoint:",r),!i||!a){alert("Beginning or end point is outside the defined area");return}n&&t&&e.route({origin:n,destination:t,travelMode:c,transitOptions:{modes:["BUS","RAIL"],routingPreference:"FEWER_TRANSFERS"}},(e,n)=>{n===google.maps.DirectionsStatus.OK?y.current.setDirections(e):console.error("Failed to display directions due to: "+n)})})})};return(0,o.jsxs)("div",{children:[(0,o.jsx)("div",{ref:d,style:{width:"70%",height:"500px",float:"left"}}),(0,o.jsx)("div",{id:"directionsPanel",style:{width:"30%",height:"500px",float:"right",overflow:"auto"}})]})},a=t(9346),c=t(432),d=t(1326),u=()=>{let[e,n]=(0,r.useState)(""),[t,l]=(0,r.useState)(""),[s,u]=(0,r.useState)(0),[g,p]=(0,r.useState)(null),[h,x]=(0,r.useState)(!1);return((0,r.useEffect)(()=>{if(window.google)x(!0),p(google.maps.TravelMode.WALKING);else{let e=document.createElement("script");e.src="https://maps.googleapis.com/maps/api/js?key=AIzaSyA4bcHQArQWH2Qxb47goCAhbstZX0WkUZk&libraries=places",e.async=!0,document.head.appendChild(e),e.onload=()=>{x(!0),p(google.maps.TravelMode.WALKING)}}},[]),h)?(0,o.jsxs)("div",{style:{display:"flex",flexDirection:"column",alignItems:"center",height:"100vh"},children:[(0,o.jsx)(d.Z,{mb:20,children:(0,o.jsx)(a.Z,{})}),(0,o.jsxs)("div",{children:[(0,o.jsx)("h1",{children:"Explore Melbourne CBD"}),(0,o.jsxs)("div",{style:{display:"flex",justifyContent:"center",alignItems:"center",gap:"10px"},children:[(0,o.jsx)("input",{type:"text",value:e,onChange:e=>n(e.target.value),placeholder:"Enter origin"}),(0,o.jsx)("input",{type:"text",value:t,onChange:e=>l(e.target.value),placeholder:"Enter destination"}),(0,o.jsxs)("select",{value:g,onChange:e=>p(google.maps.TravelMode[e.target.value]),children:[(0,o.jsx)("option",{value:"WALKING",children:"Walking"}),(0,o.jsx)("option",{value:"TRANSIT",children:"Public Transit"})]}),(0,o.jsx)("button",{onClick:()=>{u(e=>e+1)},children:"Enter"})]})]}),(0,o.jsx)("div",{style:{width:"100%"},children:(0,o.jsx)(i,{style:{width:"100%",height:"100%"},geoJsonUrl:"footpath-steepness.geojson",origin:e,destination:t,travelMode:g,searchTrigger:s})}),(0,o.jsx)(d.Z,{mt:30,children:(0,o.jsx)(c.Z,{})})]}):(0,o.jsx)("div",{children:"Loading..."})}},432:function(e,n,t){"use strict";var o=t(7437);t(2265),t(7138);var r=t(1326),l=t(8433),s=t(511),i=t(2202),a=t(2326),c=t(335),d=t(1243),u=t(7082),g=t(3111),p=t(4269),h=t(285),x=t(6463);n.Z=function(){let e=(0,x.useRouter)(),n=n=>()=>{e.push("/".concat(n))};return(0,o.jsx)(r.Z,{sx:{width:"100%",color:"rgb(32, 20, 69)",bgcolor:"background.paper",padding:3,fontFamily:"sans-serif",maxWidth:"1200px",margin:"auto"},children:(0,o.jsxs)(l.ZP,{container:!0,spacing:{xs:8,md:70},justifyContent:"space-between",children:[(0,o.jsx)(l.ZP,{item:!0,xs:6,md:6,children:(0,o.jsxs)(l.ZP,{container:!0,spacing:10,justifyContent:"space-between",children:[(0,o.jsxs)(l.ZP,{item:!0,xs:6,md:6,children:[(0,o.jsx)(s.Z,{variant:"h6",sx:{lineHeight:"3"},children:"Recreation"}),(0,o.jsx)(s.Z,{variant:"body2",sx:{lineHeight:"2",cursor:"pointer"},onClick:n("Eaterydrink"),children:"Eateries"}),(0,o.jsx)(s.Z,{variant:"body2",sx:{lineHeight:"2",cursor:"pointer"},onClick:n("Theatres"),children:"Theatres"}),(0,o.jsx)(s.Z,{variant:"body2",sx:{lineHeight:"2",cursor:"pointer"},onClick:n("Recreation"),children:"Retail Stores"}),(0,o.jsx)(s.Z,{variant:"body2",sx:{lineHeight:"2",cursor:"pointer"},onClick:n("Parks"),children:"Parks"})]}),(0,o.jsxs)(l.ZP,{item:!0,xs:6,md:6,children:[(0,o.jsx)(s.Z,{variant:"h6",sx:{lineHeight:"3"},children:"Travel"}),(0,o.jsx)(s.Z,{variant:"body2",sx:{lineHeight:"2",cursor:"pointer"},onClick:n("Travel"),children:"Trams"}),(0,o.jsx)(s.Z,{variant:"body2",sx:{lineHeight:"2",cursor:"pointer"},onClick:n("Travel"),children:"Train"})]})]})}),(0,o.jsxs)(l.ZP,{item:!0,xs:6,md:6,children:[(0,o.jsx)(s.Z,{variant:"h4",gutterBottom:!0,children:"Let's keep in touch."}),(0,o.jsx)(i.Z,{variant:"outlined",placeholder:"Email address",InputProps:{endAdornment:(0,o.jsx)(a.Z,{position:"end",children:(0,o.jsx)(c.Z,{children:(0,o.jsx)(d.Z,{})})})}}),(0,o.jsxs)(r.Z,{mt:3,children:[(0,o.jsx)(c.Z,{children:(0,o.jsx)(u.Z,{})}),(0,o.jsx)(c.Z,{children:(0,o.jsx)(g.Z,{})}),(0,o.jsx)(c.Z,{children:(0,o.jsx)(p.Z,{})}),(0,o.jsx)(c.Z,{children:(0,o.jsx)(h.Z,{})})]})]})]})})}},9346:function(e,n,t){"use strict";var o=t(7437),r=t(2265),l=t(1733),s=t(1326),i=t(9806),a=t(335),c=t(511),d=t(64),u=t(9504),g=t(2197),p=t(6548),h=t(5870),x=t(3520),m=t(3100),f=t(6463);let j=["Home","Recreation","Travel"];function y(e){let{children:n}=e,t=function(e){let n=(0,x.Z)(e),[t,o]=r.useState(window.pageYOffset),[l,s]=r.useState(!1);return r.useEffect(()=>{let e=()=>{let e=window.pageYOffset;console.log("Current Scroll:",e),console.log("Last Scroll:",t),t>e?(console.log("Scrolling Up - Showing AppBar"),s(!1)):t<e&&(console.log("Scrolling Down - Hiding AppBar"),s(!0)),o(e)};return window.addEventListener("scroll",e),console.log("Scroll Event Listener Added"),()=>{window.removeEventListener("scroll",e),console.log("Scroll Event Listener Removed")}},[t]),console.log("Hide State:",l),console.log("Trigger State:",n),console.log("final result",l&&n),l&&n}({threshold:250,disableHysteresis:!0});return(0,o.jsx)(m.Z,{appear:!1,direction:"down",in:!t,timeout:{enter:500,exit:495},easing:{enter:"cubic-bezier(0, 1.5, .8, 1)",exit:"linear"},children:n})}n.Z=function(e){let n=(0,f.useRouter)(),t=e=>()=>{"Home"===e?n.push("/"):n.push("/".concat(e))},[x,m]=r.useState(null);return(0,o.jsx)(y,{...e,children:(0,o.jsx)(l.Z,{position:"fixed",sx:{backgroundColor:"white",color:"black"},elevation:0,children:(0,o.jsx)(g.Z,{maxWidth:"xl",children:(0,o.jsxs)(i.Z,{disableGutters:!0,children:[(0,o.jsx)(c.Z,{noWrap:!0,component:"a",href:"/",sx:{mr:2,display:{xs:"none",md:"flex"},fontFamily:"sans-serif"},children:(0,o.jsx)(s.Z,{component:"img",src:"NewLogo.png",alt:"LOGO",sx:{height:80,mb:1}})}),(0,o.jsxs)(s.Z,{sx:{flexGrow:1,display:{xs:"flex",md:"none"},justifyContent:"flex-end"},children:[(0,o.jsx)(a.Z,{size:"large","aria-label":"account of current user","aria-controls":"menu-appbar","aria-haspopup":"true",onClick:e=>{m(e.currentTarget)},color:"inherit",sx:{"&:hover":{backgroundColor:"orange",textDecoration:"underline"}},children:(0,o.jsx)(u.Z,{})}),(0,o.jsx)(d.Z,{id:"menu-appbar",anchorEl:x,anchorOrigin:{vertical:"bottom",horizontal:"left"},keepMounted:!0,transformOrigin:{vertical:"top",horizontal:"left"},open:!!x,onClose:()=>{m(null)},sx:{display:{xs:"block",md:"none"}},children:j.map(e=>(0,o.jsx)(h.Z,{onClick:t(e),children:(0,o.jsx)(c.Z,{textAlign:"center",sx:{fontFamily:"sans-serif",color:"rgb(32, 20, 69)","&:hover":{backgroundColor:"orange",textDecoration:"underline"}},children:e})},e))})]}),(0,o.jsx)(c.Z,{noWrap:!0,component:"a",href:"/",sx:{mr:2,display:{xs:"flex",md:"none"},flexGrow:1},children:(0,o.jsx)(s.Z,{component:"img",src:"NewLogo.png",alt:"LOGO",sx:{height:80,mb:1}})}),(0,o.jsx)(s.Z,{sx:{flexGrow:1,display:{xs:"none",md:"flex"},justifyContent:"flex-end"},children:j.map(e=>(0,o.jsx)(p.Z,{onClick:t(e),sx:{my:2,color:"black",display:"block",fontFamily:"sans-serif",color:"rgb(32, 20, 69)",padding:"10px 60px",fontSize:"1rem","&:hover":{backgroundColor:"orange",textDecoration:"underline"}},children:e},e))})]})})})})}}},function(e){e.O(0,[866,633,767,971,23,744],function(){return e(e.s=8574)}),_N_E=e.O()}]);