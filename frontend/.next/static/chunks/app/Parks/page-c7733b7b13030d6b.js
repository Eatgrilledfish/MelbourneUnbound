(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[99],{8464:function(e,t,n){Promise.resolve().then(n.bind(n,7010))},7010:function(e,t,n){"use strict";n.r(t),n.d(t,{default:function(){return b}});var i=n(7437);n(5204);var r=n(2265),o=n(9346),s=n(432),l=n(4444),a=n(1705),c=n(1326),d=n(511),x=n(8433),h=n(270),m=n(4037),u=n(4696),g=n(6548),p=function(e){let{initialRating:t}=e,[n,o]=(0,r.useState)(t),s=e=>{o(e)},l=[];for(let e=1;e<=5;e++)e<=n?l.push((0,i.jsx)("span",{onClick:()=>s(e),style:{cursor:"pointer"},children:"⭐"},e)):l.push((0,i.jsx)("span",{onClick:()=>s(e),style:{cursor:"pointer"},children:"☆"},e));return(0,i.jsx)("div",{children:l})};let j="image/";function f(){let[e,t]=(0,r.useState)([]),[n,o]=(0,r.useState)([]),[s,l]=(0,r.useState)("name"),[a,f]=(0,r.useState)(""),[Z,b]=(0,r.useState)(!1);(0,r.useEffect)(()=>{(async()=>{let e=await fetch("https://melbourneunbound.com/api/parks");if(!e.ok)return console.error("Failed to fetch parks:",e.status,e.statusText);t(await e.json())})()},[]),(0,r.useEffect)(()=>{a.trim()},[s,a]);let y=async()=>{try{let e=await fetch("https://melbourneunbound.com/api/parks?".concat(s,"=").concat(a)),t=await e.json();o(t)}catch(e){console.error("Failed to fetch eateries:",e)}};return Array.isArray(e)&&0!==e.length?(0,i.jsxs)(c.Z,{display:"flex",flexDirection:"column",alignItems:"center",minHeight:"100vh",children:[(0,i.jsx)(c.Z,{sx:{backgroundImage:"url(lights.jpg)",backgroundSize:"cover",width:"100%",borderRadius:"30px"},children:(0,i.jsxs)(x.ZP,{item:!0,xs:8,md:8,sx:{display:"flex",flexDirection:"column",bgcolor:"white",ml:25,mt:10,mb:10,borderRadius:"30px"},container:!0,spacing:5,justifyContent:"center",children:[(0,i.jsx)(x.ZP,{container:!0,sx:{justifyContent:"flex"},children:(0,i.jsxs)(x.ZP,{item:!0,xs:8,md:12,sx:{display:"flex",flexDirection:"column",bgcolor:"orange",borderTopLeftRadius:"30px",borderTopRightRadius:"30px"},children:[(0,i.jsx)(d.Z,{variant:"h2",sx:{fontWeight:"bold",color:"black",textAlign:"left",position:"relative",ml:18,mb:5,fontStyle:"italic",mt:10},children:"The Best"}),(0,i.jsx)(d.Z,{variant:"h2",sx:{fontWeight:"bold",color:"black",textAlign:"left",position:"relative",ml:18,mb:5,fontStyle:"italic"},children:"among"}),(0,i.jsx)(d.Z,{variant:"h2",sx:{fontWeight:"bold",color:"black",textAlign:"left",position:"relative",ml:18,mb:5,fontStyle:"italic"},children:"The Best"}),(0,i.jsx)(d.Z,{variant:"h5",sx:{color:"black",textAlign:"left",position:"relative",fontStyle:"italic",ml:18,mb:5},children:"Top 10 Parks"})]})}),e.map((e,t)=>(0,i.jsxs)(x.ZP,{item:!0,sx:{},spacing:4,xs:12,sm:12,md:12,lg:12,container:!0,alignItems:"center",justifyContent:"center",children:[(0,i.jsx)(x.ZP,{item:!0,xs:3,sx:{ml:10},children:(0,i.jsx)(h.Z,{children:(0,i.jsx)(m.Z,{component:"img",style:{borderRadius:"20px"},height:"140",image:"".concat(j).concat(e.img),alt:"Photo of ".concat(e.building_name)})})}),(0,i.jsx)(x.ZP,{item:!0,xs:8,children:(0,i.jsxs)(u.Z,{children:[(0,i.jsxs)(d.Z,{gutterBottom:!0,variant:"h5",component:"div",sx:{fontStyle:"italic",fontWeight:"bold"},children:[t+1,". ",e.building_name]}),(0,i.jsx)(d.Z,{variant:"body2",color:"text.secondary",children:e.street_address}),(0,i.jsx)(g.Z,{sx:{mt:2,backgroundColor:"orange",color:"black",fontStyle:"italic",mb:2},variant:"contained",color:"primary",href:e.website,target:"_blank",rel:"noopener noreferrer",children:"Visit Site"}),(0,i.jsx)("div",{children:(0,i.jsxs)(c.Z,{display:"flex",alignItems:"center",children:[(0,i.jsx)(d.Z,{variant:"body1",style:{marginRight:8},children:"Been Here Before? Share your vote! (optional)"}),(0,i.jsx)(p,{initialRating:3})]})})]})})]},t))]})}),(0,i.jsxs)(c.Z,{sx:{bgcolor:"grey.200",width:"100vw",m:0,p:0,mt:10},children:[(0,i.jsxs)(c.Z,{sx:{mb:10},children:[(0,i.jsxs)(c.Z,{sx:{ml:32,mt:10,mb:5},children:[" ",(0,i.jsx)(d.Z,{variant:"h3",sx:{fontWeight:"bold",mb:5},children:"Want to go somewhere else?"}),(0,i.jsx)(d.Z,{variant:"h5",sx:{color:"text.secondary",fontStyle:"italic"},children:"Double-check if they have what you need"})]}),(0,i.jsxs)("div",{style:{marginLeft:"250px"},children:[" ",(0,i.jsx)("input",{type:"text",value:a,onChange:e=>f(e.target.value),placeholder:"Search by ".concat(s),style:{margin:"10px 0"}}),(0,i.jsxs)(g.Z,{sx:{color:"orange",m:1},onClick:()=>l("name"===s?"address":"name"),children:["Switch to ","name"===s?"Address":"Name"]}),(0,i.jsx)(g.Z,{sx:{backgroundColor:"orange",color:"black",m:1},onClick:()=>{console.log("Manual submit: Searching for ".concat(a," by ").concat(s)),a.trim()&&(y(),console.log(n))},variant:"contained",color:"primary",children:"Search"})]})]}),n.id>0&&(0,i.jsx)(c.Z,{sx:{mt:5,ml:15,mb:10},children:(0,i.jsx)(d.Z,{variant:"h4",gutterBottom:!0,children:(0,i.jsx)(x.ZP,{container:!0,spacing:5,justifyContent:"center",children:(0,i.jsxs)(x.ZP,{item:!0,sx:{ml:10},xs:12,container:!0,alignItems:"center",justifyContent:"center",children:[(0,i.jsx)(x.ZP,{item:!0,xs:3,children:(0,i.jsx)(h.Z,{children:(0,i.jsx)(m.Z,{component:"img",style:{width:"100%",maxWidth:"500px",height:"auto",borderRadius:"20px"},image:"".concat(j).concat(n.photo),alt:"Photo of ".concat(n.format_name)})})}),(0,i.jsx)(x.ZP,{item:!0,xs:8,children:(0,i.jsxs)(u.Z,{children:[(0,i.jsx)(d.Z,{gutterBottom:!0,variant:"h5",component:"div",children:n.format_name}),(0,i.jsx)(d.Z,{variant:"body2",color:"text.secondary",children:n.format_address}),(0,i.jsx)(g.Z,{sx:{mt:2,backgroundColor:"orange",color:"black",fontStyle:"italic"},variant:"contained",color:"primary",href:n.website,target:"_blank",rel:"noopener noreferrer",children:"Visit Site"}),(0,i.jsx)("div",{children:(0,i.jsxs)(c.Z,{display:"flex",alignItems:"center",mt:2,children:[(0,i.jsx)(d.Z,{variant:"body1",sx:{marginRight:2},children:"What's the Accessibility rating of the place you visited? (optional)"}),(0,i.jsx)(p,{initialRating:3})]})})]})})]})})})})]})]}):(0,i.jsx)(c.Z,{display:"flex",justifyContent:"center",alignItems:"center",height:"100vh",children:(0,i.jsx)(d.Z,{children:"Loading..."})})}let Z=(0,l.Z)({palette:{text:{primary:"rgb(32, 20, 69)",secondary:"rgb(32, 20, 69)"}}});function b(){let[e,t]=(0,r.useState)(1);return(0,r.useEffect)(()=>{let e=setTimeout(()=>{t(1)},100);return()=>clearTimeout(e)},[]),(0,i.jsx)(a.Z,{theme:Z,children:(0,i.jsxs)("div",{children:[(0,i.jsxs)(c.Z,{mb:8,children:[" ",(0,i.jsx)(o.Z,{})]}),(0,i.jsx)(c.Z,{mt:20,mb:70,children:(0,i.jsx)(f,{})}),(0,i.jsx)(c.Z,{sx:{height:"2px",bgcolor:"#F6F4EF",width:"100%"}}),(0,i.jsx)(c.Z,{children:(0,i.jsx)(s.Z,{})})]})})}},432:function(e,t,n){"use strict";var i=n(7437);n(2265),n(7138);var r=n(2960),o=n(2804),s=n(1326),l=n(8433),a=n(511),c=n(2562),d=n(2326),x=n(335),h=n(1243),m=n(7082),u=n(3111),g=n(4269),p=n(285),j=n(6463);t.Z=function(){let e=(0,r.Z)(),t=(0,j.useRouter)(),n=(0,o.Z)(e.breakpoints.up("md")),f=e=>()=>{t.push("/".concat(e))};return(0,i.jsx)(s.Z,{sx:{width:"100%",color:"rgb(32, 20, 69)",bgcolor:"grey.200",padding:3,fontFamily:"sans-serif",maxWidth:"96.5%",margin:"auto"},children:(0,i.jsxs)(l.ZP,{container:!0,spacing:10,justifyContent:"space-between",children:[(0,i.jsx)(l.ZP,{item:!0,xs:4,md:4,children:(0,i.jsxs)(l.ZP,{container:!0,spacing:10,justifyContent:"space-between",children:[(0,i.jsxs)(l.ZP,{item:!0,xs:6,md:6,children:[(0,i.jsx)(a.Z,{variant:"h6",sx:{lineHeight:"3"},children:"Recreation"}),(0,i.jsx)(a.Z,{variant:"body2",sx:{lineHeight:"2",cursor:"pointer"},onClick:f("Eaterydrink"),children:"Eateries"}),(0,i.jsx)(a.Z,{variant:"body2",sx:{lineHeight:"2",cursor:"pointer"},onClick:f("Theatres"),children:"Theatres"}),(0,i.jsx)(a.Z,{variant:"body2",sx:{lineHeight:"2",cursor:"pointer"},onClick:f("Recreation"),children:"Retail Stores"}),(0,i.jsx)(a.Z,{variant:"body2",sx:{lineHeight:"2",cursor:"pointer"},onClick:f("Parks"),children:"Parks"})]}),(0,i.jsxs)(l.ZP,{item:!0,xs:6,md:6,children:[(0,i.jsx)(a.Z,{variant:"h6",sx:{lineHeight:"3"},children:"Travel"}),(0,i.jsx)(a.Z,{variant:"body2",sx:{lineHeight:"2",cursor:"pointer"},onClick:f("Travel"),children:"Trams"}),(0,i.jsx)(a.Z,{variant:"body2",sx:{lineHeight:"2",cursor:"pointer"},onClick:f("Travel"),children:"Train"})]})]})}),(0,i.jsx)(l.ZP,{item:!0,xs:4,md:4,style:{width:n?"350px":"50px"}}),(0,i.jsxs)(l.ZP,{item:!0,xs:4,md:4,children:[(0,i.jsx)(a.Z,{variant:"h4",gutterBottom:!0,children:"Let's keep in touch."}),(0,i.jsx)(c.Z,{variant:"outlined",placeholder:"Email address",InputProps:{endAdornment:(0,i.jsx)(d.Z,{position:"end",children:(0,i.jsx)(x.Z,{children:(0,i.jsx)(h.Z,{})})})}}),(0,i.jsxs)(s.Z,{mt:3,children:[(0,i.jsx)(x.Z,{children:(0,i.jsx)(m.Z,{})}),(0,i.jsx)(x.Z,{children:(0,i.jsx)(u.Z,{})}),(0,i.jsx)(x.Z,{children:(0,i.jsx)(g.Z,{})}),(0,i.jsx)(x.Z,{children:(0,i.jsx)(p.Z,{})})]})]})]})})}},9346:function(e,t,n){"use strict";var i=n(7437),r=n(2265),o=n(1733),s=n(1326),l=n(9806),a=n(335),c=n(511),d=n(687),x=n(9504),h=n(2197),m=n(6548),u=n(5870),g=n(3520),p=n(3100),j=n(6463);let f=["Home","Recreation","Travel"];function Z(e){let{children:t}=e,n=function(e){let t=(0,g.Z)(e),[n,i]=r.useState(window.pageYOffset),[o,s]=r.useState(!1);return r.useEffect(()=>{let e=()=>{let e=window.pageYOffset;console.log("Current Scroll:",e),console.log("Last Scroll:",n),n>e?(console.log("Scrolling Up - Showing AppBar"),s(!1)):n<e&&(console.log("Scrolling Down - Hiding AppBar"),s(!0)),i(e)};return window.addEventListener("scroll",e),console.log("Scroll Event Listener Added"),()=>{window.removeEventListener("scroll",e),console.log("Scroll Event Listener Removed")}},[n]),console.log("Hide State:",o),console.log("Trigger State:",t),console.log("final result",o&&t),o&&t}({threshold:250,disableHysteresis:!0});return(0,i.jsx)(p.Z,{appear:!1,direction:"down",in:!n,timeout:{enter:500,exit:495},easing:{enter:"cubic-bezier(0, 1.5, .8, 1)",exit:"linear"},children:t})}t.Z=function(e){let t=(0,j.useRouter)(),n=e=>()=>{"Home"===e?t.push("/"):t.push("/".concat(e))},[g,p]=r.useState(null);return(0,i.jsx)(Z,{...e,children:(0,i.jsx)(o.Z,{position:"fixed",sx:{backgroundColor:"white",color:"black"},elevation:0,children:(0,i.jsx)(h.Z,{maxWidth:"xl",children:(0,i.jsxs)(l.Z,{disableGutters:!0,children:[(0,i.jsx)(c.Z,{noWrap:!0,component:"a",href:"/",sx:{mr:2,display:{xs:"none",md:"flex"},fontFamily:"sans-serif"},children:(0,i.jsx)(s.Z,{component:"img",src:"NewLogo.png",alt:"LOGO",sx:{height:80,mb:1}})}),(0,i.jsxs)(s.Z,{sx:{flexGrow:1,display:{xs:"flex",md:"none"},justifyContent:"flex-end"},children:[(0,i.jsx)(a.Z,{size:"large","aria-label":"account of current user","aria-controls":"menu-appbar","aria-haspopup":"true",onClick:e=>{p(e.currentTarget)},color:"inherit",sx:{"&:hover":{backgroundColor:"orange",textDecoration:"underline"}},children:(0,i.jsx)(x.Z,{})}),(0,i.jsx)(d.Z,{id:"menu-appbar",anchorEl:g,anchorOrigin:{vertical:"bottom",horizontal:"left"},keepMounted:!0,transformOrigin:{vertical:"top",horizontal:"left"},open:!!g,onClose:()=>{p(null)},sx:{display:{xs:"block",md:"none"}},children:f.map(e=>(0,i.jsx)(u.Z,{onClick:n(e),children:(0,i.jsx)(c.Z,{textAlign:"center",sx:{fontFamily:"sans-serif",color:"rgb(32, 20, 69)","&:hover":{backgroundColor:"orange",textDecoration:"underline"}},children:e})},e))})]}),(0,i.jsx)(c.Z,{noWrap:!0,component:"a",href:"/",sx:{mr:2,display:{xs:"flex",md:"none"},flexGrow:1},children:(0,i.jsx)(s.Z,{component:"img",src:"NewLogo.png",alt:"LOGO",sx:{height:80,mb:1}})}),(0,i.jsx)(s.Z,{sx:{flexGrow:1,display:{xs:"none",md:"flex"},justifyContent:"flex-end"},children:f.map(e=>(0,i.jsx)(m.Z,{onClick:n(e),sx:{my:2,color:"black",display:"block",fontFamily:"sans-serif",color:"rgb(32, 20, 69)",padding:"10px 60px",fontSize:"1rem","&:hover":{backgroundColor:"orange",textDecoration:"underline"}},children:e},e))})]})})})})}},5204:function(){}},function(e){e.O(0,[846,384,70,971,23,744],function(){return e(e.s=8464)}),_N_E=e.O()}]);