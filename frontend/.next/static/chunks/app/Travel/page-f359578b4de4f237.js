(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[267],{9261:function(e,t,n){Promise.resolve().then(n.bind(n,7940))},7940:function(e,t,n){"use strict";n.r(t);var s=n(7437),o=n(2265),a=n(2126),l=n(8996),i=n(1326),r=n(2562),d=n(2843),c=n(2170),u=n.n(c),h=n(9346),p=n(432);t.default=()=>{let[e,t]=(0,o.useState)(""),[n,c]=(0,o.useState)(""),[g,x]=(0,o.useState)([]),[m,j]=(0,o.useState)([]),[b,f]=(0,o.useState)(null),[v,C]=(0,o.useState)(null),[S,I]=(0,o.useState)(!1),[y,E]=(0,o.useState)(null),[Z,T]=(0,o.useState)(!1);(0,o.useEffect)(()=>{if(window.google)T(!0),E(google.maps.TravelMode.WALKING);else{let e=document.createElement("script");e.src="https://maps.googleapis.com/maps/api/js?key=AIzaSyDjQXyYlP5QOFLFJ58xocind5smlnaC3mA&libraries=places",e.async=!0,document.head.appendChild(e),e.onload=()=>{T(!0),E(google.maps.TravelMode.WALKING)}}},[]);let w=u()(e=>{""!==e.trim()?a.Z.get("https://melbourneunbound.com/api/addresses?search=".concat(encodeURIComponent(e))).then(e=>x(e.data||[])).catch(e=>{console.error("Error fetching start addresses:",e),x([])}):x([])},300),A=u()(e=>{""!==e.trim()?a.Z.get("https://melbourneunbound.com/api/addresses?search=".concat(encodeURIComponent(e))).then(e=>j(e.data||[])).catch(e=>{console.error("Error fetching destination addresses:",e),j([])}):j([])},300);return(0,s.jsxs)("div",{style:{display:"flex",flexDirection:"column",alignItems:"center",height:"100vh"},children:[(0,s.jsx)(i.Z,{mb:20,children:(0,s.jsx)(h.Z,{})}),(0,s.jsxs)("div",{children:[(0,s.jsx)("h1",{children:"Explore Melbourne CBD"}),(0,s.jsxs)("div",{style:{display:"flex",justifyContent:"center",alignItems:"center",gap:"10px"},children:[(0,s.jsx)(d.Z,{disablePortal:!0,options:g,onInputChange:(e,t)=>w(t),onChange:(e,n)=>t(n),isOptionEqualToValue:(e,t)=>e===t,getOptionLabel:e=>e.toString(),sx:{width:300},renderInput:e=>(0,s.jsx)(r.Z,{...e,label:"Start Address",variant:"outlined"})}),(0,s.jsx)(d.Z,{disablePortal:!0,options:m,onInputChange:(e,t)=>A(t),onChange:(e,t)=>c(t),isOptionEqualToValue:(e,t)=>e===t,getOptionLabel:e=>e.toString(),sx:{width:300},renderInput:e=>(0,s.jsx)(r.Z,{...e,label:"Destination Address",variant:"outlined"})}),(0,s.jsxs)("select",{value:y,onChange:e=>E(google.maps.TravelMode[e.target.value]),children:[(0,s.jsx)("option",{value:"WALKING",children:"Walking"}),(0,s.jsx)("option",{value:"TRANSIT",children:"Public Transit"})]}),(0,s.jsx)("button",{onClick:()=>{e&&n&&(f(e),C(n),I(!S))},children:"Enter"})]})]}),(0,s.jsx)("div",{style:{width:"100%"},children:(0,s.jsx)(l.Z,{style:{width:"100%",height:"100%"},geoJsonUrl:"footpath-steepness.geojson",origin:b,destination:v,travelMode:y,searchTrigger:S})}),(0,s.jsx)(i.Z,{mt:30,children:(0,s.jsx)(p.Z,{})})]})}}},function(e){e.O(0,[384,127,878,971,23,744],function(){return e(e.s=9261)}),_N_E=e.O()}]);