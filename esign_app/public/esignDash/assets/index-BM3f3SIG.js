import{s as Bt,v as Ft,w as jt,x as Ot,y as zt,A as Dt,e as $,B as lt,D as Vt,E as qt,_ as gt,c as ir,F as Tt,G as H,H as he,J as Gt,K as It,L as Ie,O as vt,P as Kt,f as wt,Q as ft,d as Ut,R as Jt,T as xt}from"./index-BhjCMKpx.js";import{r as a}from"./index-DIjc9gFd.js";var dt=a.createContext(null);function Qt(e){var t=e.children,r=e.onBatchResize,n=a.useRef(0),i=a.useRef([]),o=a.useContext(dt),u=a.useCallback(function(l,v,f){n.current+=1;var b=n.current;i.current.push({size:l,element:v,data:f}),Promise.resolve().then(function(){b===n.current&&(r==null||r(i.current),i.current=[])}),o==null||o(l,v,f)},[r,o]);return a.createElement(dt.Provider,{value:u},t)}var Lt=function(){if(typeof Map!="undefined")return Map;function e(t,r){var n=-1;return t.some(function(i,o){return i[0]===r?(n=o,!0):!1}),n}return function(){function t(){this.__entries__=[]}return Object.defineProperty(t.prototype,"size",{get:function(){return this.__entries__.length},enumerable:!0,configurable:!0}),t.prototype.get=function(r){var n=e(this.__entries__,r),i=this.__entries__[n];return i&&i[1]},t.prototype.set=function(r,n){var i=e(this.__entries__,r);~i?this.__entries__[i][1]=n:this.__entries__.push([r,n])},t.prototype.delete=function(r){var n=this.__entries__,i=e(n,r);~i&&n.splice(i,1)},t.prototype.has=function(r){return!!~e(this.__entries__,r)},t.prototype.clear=function(){this.__entries__.splice(0)},t.prototype.forEach=function(r,n){n===void 0&&(n=null);for(var i=0,o=this.__entries__;i<o.length;i++){var u=o[i];r.call(n,u[1],u[0])}},t}()}(),ht=typeof window!="undefined"&&typeof document!="undefined"&&window.document===document,Or=function(){return typeof global!="undefined"&&global.Math===Math?global:typeof self!="undefined"&&self.Math===Math?self:typeof window!="undefined"&&window.Math===Math?window:Function("return this")()}(),Zt=function(){return typeof requestAnimationFrame=="function"?requestAnimationFrame.bind(Or):function(e){return setTimeout(function(){return e(Date.now())},1e3/60)}}(),pt=2;function Yt(e,t){var r=!1,n=!1,i=0;function o(){r&&(r=!1,e()),n&&l()}function u(){Zt(o)}function l(){var v=Date.now();if(r){if(v-i<pt)return;n=!0}else r=!0,n=!1,setTimeout(u,t);i=v}return l}var Xt=20,en=["top","right","bottom","left","width","height","size","weight"],rn=typeof MutationObserver!="undefined",tn=function(){function e(){this.connected_=!1,this.mutationEventsAdded_=!1,this.mutationsObserver_=null,this.observers_=[],this.onTransitionEnd_=this.onTransitionEnd_.bind(this),this.refresh=Yt(this.refresh.bind(this),Xt)}return e.prototype.addObserver=function(t){~this.observers_.indexOf(t)||this.observers_.push(t),this.connected_||this.connect_()},e.prototype.removeObserver=function(t){var r=this.observers_,n=r.indexOf(t);~n&&r.splice(n,1),!r.length&&this.connected_&&this.disconnect_()},e.prototype.refresh=function(){var t=this.updateObservers_();t&&this.refresh()},e.prototype.updateObservers_=function(){var t=this.observers_.filter(function(r){return r.gatherActive(),r.hasActive()});return t.forEach(function(r){return r.broadcastActive()}),t.length>0},e.prototype.connect_=function(){!ht||this.connected_||(document.addEventListener("transitionend",this.onTransitionEnd_),window.addEventListener("resize",this.refresh),rn?(this.mutationsObserver_=new MutationObserver(this.refresh),this.mutationsObserver_.observe(document,{attributes:!0,childList:!0,characterData:!0,subtree:!0})):(document.addEventListener("DOMSubtreeModified",this.refresh),this.mutationEventsAdded_=!0),this.connected_=!0)},e.prototype.disconnect_=function(){!ht||!this.connected_||(document.removeEventListener("transitionend",this.onTransitionEnd_),window.removeEventListener("resize",this.refresh),this.mutationsObserver_&&this.mutationsObserver_.disconnect(),this.mutationEventsAdded_&&document.removeEventListener("DOMSubtreeModified",this.refresh),this.mutationsObserver_=null,this.mutationEventsAdded_=!1,this.connected_=!1)},e.prototype.onTransitionEnd_=function(t){var r=t.propertyName,n=r===void 0?"":r,i=en.some(function(o){return!!~n.indexOf(o)});i&&this.refresh()},e.getInstance=function(){return this.instance_||(this.instance_=new e),this.instance_},e.instance_=null,e}(),Wt=function(e,t){for(var r=0,n=Object.keys(t);r<n.length;r++){var i=n[r];Object.defineProperty(e,i,{value:t[i],enumerable:!1,writable:!1,configurable:!0})}return e},ar=function(e){var t=e&&e.ownerDocument&&e.ownerDocument.defaultView;return t||Or},Nt=qr(0,0,0,0);function Vr(e){return parseFloat(e)||0}function Mt(e){for(var t=[],r=1;r<arguments.length;r++)t[r-1]=arguments[r];return t.reduce(function(n,i){var o=e["border-"+i+"-width"];return n+Vr(o)},0)}function nn(e){for(var t=["top","right","bottom","left"],r={},n=0,i=t;n<i.length;n++){var o=i[n],u=e["padding-"+o];r[o]=Vr(u)}return r}function an(e){var t=e.getBBox();return qr(0,0,t.width,t.height)}function on(e){var t=e.clientWidth,r=e.clientHeight;if(!t&&!r)return Nt;var n=ar(e).getComputedStyle(e),i=nn(n),o=i.left+i.right,u=i.top+i.bottom,l=Vr(n.width),v=Vr(n.height);if(n.boxSizing==="border-box"&&(Math.round(l+o)!==t&&(l-=Mt(n,"left","right")+o),Math.round(v+u)!==r&&(v-=Mt(n,"top","bottom")+u)),!un(e)){var f=Math.round(l+o)-t,b=Math.round(v+u)-r;Math.abs(f)!==1&&(l-=f),Math.abs(b)!==1&&(v-=b)}return qr(i.left,i.top,l,v)}var sn=function(){return typeof SVGGraphicsElement!="undefined"?function(e){return e instanceof ar(e).SVGGraphicsElement}:function(e){return e instanceof ar(e).SVGElement&&typeof e.getBBox=="function"}}();function un(e){return e===ar(e).document.documentElement}function cn(e){return ht?sn(e)?an(e):on(e):Nt}function ln(e){var t=e.x,r=e.y,n=e.width,i=e.height,o=typeof DOMRectReadOnly!="undefined"?DOMRectReadOnly:Object,u=Object.create(o.prototype);return Wt(u,{x:t,y:r,width:n,height:i,top:r,right:t+n,bottom:i+r,left:t}),u}function qr(e,t,r,n){return{x:e,y:t,width:r,height:n}}var vn=function(){function e(t){this.broadcastWidth=0,this.broadcastHeight=0,this.contentRect_=qr(0,0,0,0),this.target=t}return e.prototype.isActive=function(){var t=cn(this.target);return this.contentRect_=t,t.width!==this.broadcastWidth||t.height!==this.broadcastHeight},e.prototype.broadcastRect=function(){var t=this.contentRect_;return this.broadcastWidth=t.width,this.broadcastHeight=t.height,t},e}(),fn=function(){function e(t,r){var n=ln(r);Wt(this,{target:t,contentRect:n})}return e}(),dn=function(){function e(t,r,n){if(this.activeObservations_=[],this.observations_=new Lt,typeof t!="function")throw new TypeError("The callback provided as parameter 1 is not a function.");this.callback_=t,this.controller_=r,this.callbackCtx_=n}return e.prototype.observe=function(t){if(!arguments.length)throw new TypeError("1 argument required, but only 0 present.");if(!(typeof Element=="undefined"||!(Element instanceof Object))){if(!(t instanceof ar(t).Element))throw new TypeError('parameter 1 is not of type "Element".');var r=this.observations_;r.has(t)||(r.set(t,new vn(t)),this.controller_.addObserver(this),this.controller_.refresh())}},e.prototype.unobserve=function(t){if(!arguments.length)throw new TypeError("1 argument required, but only 0 present.");if(!(typeof Element=="undefined"||!(Element instanceof Object))){if(!(t instanceof ar(t).Element))throw new TypeError('parameter 1 is not of type "Element".');var r=this.observations_;r.has(t)&&(r.delete(t),r.size||this.controller_.removeObserver(this))}},e.prototype.disconnect=function(){this.clearActive(),this.observations_.clear(),this.controller_.removeObserver(this)},e.prototype.gatherActive=function(){var t=this;this.clearActive(),this.observations_.forEach(function(r){r.isActive()&&t.activeObservations_.push(r)})},e.prototype.broadcastActive=function(){if(this.hasActive()){var t=this.callbackCtx_,r=this.activeObservations_.map(function(n){return new fn(n.target,n.broadcastRect())});this.callback_.call(t,r,t),this.clearActive()}},e.prototype.clearActive=function(){this.activeObservations_.splice(0)},e.prototype.hasActive=function(){return this.activeObservations_.length>0},e}(),At=typeof WeakMap!="undefined"?new WeakMap:new Lt,Ht=function(){function e(t){if(!(this instanceof e))throw new TypeError("Cannot call a class as a function.");if(!arguments.length)throw new TypeError("1 argument required, but only 0 present.");var r=tn.getInstance(),n=new dn(t,r,this);At.set(this,n)}return e}();["observe","unobserve","disconnect"].forEach(function(e){Ht.prototype[e]=function(){var t;return(t=At.get(this))[e].apply(t,arguments)}});var hn=function(){return typeof Or.ResizeObserver!="undefined"?Or.ResizeObserver:Ht}(),Le=new Map;function mn(e){e.forEach(function(t){var r,n=t.target;(r=Le.get(n))===null||r===void 0||r.forEach(function(i){return i(n)})})}var $t=new hn(mn);function gn(e,t){Le.has(e)||(Le.set(e,new Set),$t.observe(e)),Le.get(e).add(t)}function yn(e,t){Le.has(e)&&(Le.get(e).delete(t),Le.get(e).size||($t.unobserve(e),Le.delete(e)))}var bn=function(e){Bt(r,e);var t=Ft(r);function r(){return jt(this,r),t.apply(this,arguments)}return Ot(r,[{key:"render",value:function(){return this.props.children}}]),r}(a.Component);function wn(e,t){var r=e.children,n=e.disabled,i=a.useRef(null),o=a.useRef(null),u=a.useContext(dt),l=typeof r=="function",v=l?r(i):r,f=a.useRef({width:-1,height:-1,offsetWidth:-1,offsetHeight:-1}),b=!l&&a.isValidElement(v)&&zt(v),h=b?v.ref:null,L=Dt(h,i),m=function(){var R;return lt(i.current)||(i.current&&Vt(i.current)==="object"?lt((R=i.current)===null||R===void 0?void 0:R.nativeElement):null)||lt(o.current)};a.useImperativeHandle(t,function(){return m()});var z=a.useRef(e);z.current=e;var W=a.useCallback(function(y){var R=z.current,D=R.onResize,M=R.data,d=y.getBoundingClientRect(),B=d.width,U=d.height,j=y.offsetWidth,q=y.offsetHeight,ue=Math.floor(B),X=Math.floor(U);if(f.current.width!==ue||f.current.height!==X||f.current.offsetWidth!==j||f.current.offsetHeight!==q){var ce={width:ue,height:X,offsetWidth:j,offsetHeight:q};f.current=ce;var ee=j===Math.round(B)?B:j,re=q===Math.round(U)?U:q,G=$($({},ce),{},{offsetWidth:ee,offsetHeight:re});u==null||u(G,y,M),D&&Promise.resolve().then(function(){D(G,y)})}},[]);return a.useEffect(function(){var y=m();return y&&!n&&gn(y,W),function(){return yn(y,W)}},[i.current,n]),a.createElement(bn,{ref:o},b?a.cloneElement(v,{ref:L}):v)}var Mn=a.forwardRef(wn),Cn="rc-observer-key";function _n(e,t){var r=e.children,n=typeof r=="function"?[r]:qt(r);return n.map(function(i,o){var u=(i==null?void 0:i.key)||"".concat(Cn,"-").concat(o);return a.createElement(Mn,gt({},e,{key:u,ref:o===0?t:void 0}),i)})}var yt=a.forwardRef(_n);yt.Collection=Qt;const Rn=function(){if(typeof navigator=="undefined"||typeof window=="undefined")return!1;var e=navigator.userAgent||navigator.vendor||window.opera;return/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino|android|ipad|playbook|silk/i.test(e)||/1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw-(n|u)|c55\/|capi|ccwa|cdm-|cell|chtm|cldc|cmd-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc-s|devi|dica|dmob|do(c|p)o|ds(12|-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(-|_)|g1 u|g560|gene|gf-5|g-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd-(m|p|t)|hei-|hi(pt|ta)|hp( i|ip)|hs-c|ht(c(-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i-(20|go|ma)|i230|iac( |-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|-[a-w])|libw|lynx|m1-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|-([1-8]|c))|phil|pire|pl(ay|uc)|pn-2|po(ck|rt|se)|prox|psio|pt-g|qa-a|qc(07|12|21|32|60|-[2-7]|i-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h-|oo|p-)|sdk\/|se(c(-|0|1)|47|mc|nd|ri)|sgh-|shar|sie(-|m)|sk-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h-|v-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl-|tdg-|tel(i|m)|tim-|t-mo|to(pl|sh)|ts(70|m-|m3|m5)|tx-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas-|your|zeto|zte-/i.test(e==null?void 0:e.substr(0,4))};function Sn(e){var t=e.prefixCls,r=e.align,n=e.arrow,i=e.arrowPos,o=n||{},u=o.className,l=o.content,v=i.x,f=v===void 0?0:v,b=i.y,h=b===void 0?0:b,L=a.useRef();if(!r||!r.points)return null;var m={position:"absolute"};if(r.autoArrow!==!1){var z=r.points[0],W=r.points[1],y=z[0],R=z[1],D=W[0],M=W[1];y===D||!["t","b"].includes(y)?m.top=h:y==="t"?m.top=0:m.bottom=0,R===M||!["l","r"].includes(R)?m.left=f:R==="l"?m.left=0:m.right=0}return a.createElement("div",{ref:L,className:ir("".concat(t,"-arrow"),u),style:m},l)}function kn(e){var t=e.prefixCls,r=e.open,n=e.zIndex,i=e.mask,o=e.motion;return i?a.createElement(Tt,gt({},o,{motionAppear:!0,visible:r,removeOnLeave:!0}),function(u){var l=u.className;return a.createElement("div",{style:{zIndex:n},className:ir("".concat(t,"-mask"),l)})}):null}var Pn=a.memo(function(e){var t=e.children;return t},function(e,t){return t.cache}),En=a.forwardRef(function(e,t){var r=e.popup,n=e.className,i=e.prefixCls,o=e.style,u=e.target,l=e.onVisibleChanged,v=e.open,f=e.keepDom,b=e.fresh,h=e.onClick,L=e.mask,m=e.arrow,z=e.arrowPos,W=e.align,y=e.motion,R=e.maskMotion,D=e.forceRender,M=e.getPopupContainer,d=e.autoDestroy,B=e.portal,U=e.zIndex,j=e.onMouseEnter,q=e.onMouseLeave,ue=e.onPointerEnter,X=e.ready,ce=e.offsetX,ee=e.offsetY,re=e.offsetR,G=e.offsetB,me=e.onAlign,T=e.onPrepare,N=e.stretch,g=e.targetWidth,J=e.targetHeight,C=typeof r=="function"?r():r,le=v||f,te=(M==null?void 0:M.length)>0,or=a.useState(!M||!te),Ke=H(or,2),ge=Ke[0],Ue=Ke[1];if(he(function(){!ge&&te&&u&&Ue(!0)},[ge,te,u]),!ge)return null;var ne="auto",A={left:"-1000vw",top:"-1000vh",right:ne,bottom:ne};if(X||!v){var Q,ve=W.points,fe=W.dynamicInset||((Q=W._experimental)===null||Q===void 0?void 0:Q.dynamicInset),Je=fe&&ve[0][1]==="r",sr=fe&&ve[0][0]==="b";Je?(A.right=re,A.left=ne):(A.left=ce,A.right=ne),sr?(A.bottom=G,A.top=ne):(A.top=ee,A.bottom=ne)}var F={};return N&&(N.includes("height")&&J?F.height=J:N.includes("minHeight")&&J&&(F.minHeight=J),N.includes("width")&&g?F.width=g:N.includes("minWidth")&&g&&(F.minWidth=g)),v||(F.pointerEvents="none"),a.createElement(B,{open:D||le,getContainer:M&&function(){return M(u)},autoDestroy:d},a.createElement(kn,{prefixCls:i,open:v,zIndex:U,mask:L,motion:R}),a.createElement(yt,{onResize:me,disabled:!v},function(Qe){return a.createElement(Tt,gt({motionAppear:!0,motionEnter:!0,motionLeave:!0,removeOnLeave:!1,forceRender:D,leavedClassName:"".concat(i,"-hidden")},y,{onAppearPrepare:T,onEnterPrepare:T,visible:v,onVisibleChanged:function(I){var ye;y==null||(ye=y.onVisibleChanged)===null||ye===void 0||ye.call(y,I),l(I)}}),function(Se,I){var ye=Se.className,w=Se.style,We=ir(i,ye,n);return a.createElement("div",{ref:Gt(Qe,t,I),className:We,style:$($($($({"--arrow-x":"".concat(z.x||0,"px"),"--arrow-y":"".concat(z.y||0,"px")},A),F),w),{},{boxSizing:"border-box",zIndex:U},o),onMouseEnter:j,onMouseLeave:q,onPointerEnter:ue,onClick:h},m&&a.createElement(Sn,{prefixCls:i,arrow:m,arrowPos:z,align:W}),a.createElement(Pn,{cache:!v&&!b},C))})}))}),zn=a.forwardRef(function(e,t){var r=e.children,n=e.getTriggerDOMNode,i=zt(r),o=a.useCallback(function(l){It(t,n?n(l):l)},[n]),u=Dt(o,r.ref);return i?a.cloneElement(r,{ref:u}):r}),Ct=a.createContext(null);function _t(e){return e?Array.isArray(e)?e:[e]:[]}function Dn(e,t,r,n){return a.useMemo(function(){var i=_t(r!=null?r:t),o=_t(n!=null?n:t),u=new Set(i),l=new Set(o);return e&&(u.has("hover")&&(u.delete("hover"),u.add("click")),l.has("hover")&&(l.delete("hover"),l.add("click"))),[u,l]},[e,t,r,n])}function Tn(){var e=arguments.length>0&&arguments[0]!==void 0?arguments[0]:[],t=arguments.length>1&&arguments[1]!==void 0?arguments[1]:[],r=arguments.length>2?arguments[2]:void 0;return r?e[0]===t[0]:e[0]===t[0]&&e[1]===t[1]}function xn(e,t,r,n){for(var i=r.points,o=Object.keys(e),u=0;u<o.length;u+=1){var l,v=o[u];if(Tn((l=e[v])===null||l===void 0?void 0:l.points,i,n))return"".concat(t,"-placement-").concat(v)}return""}function Rt(e,t,r,n){return t||(r?{motionName:"".concat(e,"-").concat(r)}:n?{motionName:n}:null)}function Cr(e){return e.ownerDocument.defaultView}function mt(e){for(var t=[],r=e==null?void 0:e.parentElement,n=["hidden","scroll","clip","auto"];r;){var i=Cr(r).getComputedStyle(r),o=i.overflowX,u=i.overflowY,l=i.overflow;[o,u,l].some(function(v){return n.includes(v)})&&t.push(r),r=r.parentElement}return t}function Mr(e){var t=arguments.length>1&&arguments[1]!==void 0?arguments[1]:1;return Number.isNaN(e)?t:e}function wr(e){return Mr(parseFloat(e),0)}function St(e,t){var r=$({},e);return(t||[]).forEach(function(n){if(!(n instanceof HTMLBodyElement||n instanceof HTMLHtmlElement)){var i=Cr(n).getComputedStyle(n),o=i.overflow,u=i.overflowClipMargin,l=i.borderTopWidth,v=i.borderBottomWidth,f=i.borderLeftWidth,b=i.borderRightWidth,h=n.getBoundingClientRect(),L=n.offsetHeight,m=n.clientHeight,z=n.offsetWidth,W=n.clientWidth,y=wr(l),R=wr(v),D=wr(f),M=wr(b),d=Mr(Math.round(h.width/z*1e3)/1e3),B=Mr(Math.round(h.height/L*1e3)/1e3),U=(z-W-D-M)*d,j=(L-m-y-R)*B,q=y*B,ue=R*B,X=D*d,ce=M*d,ee=0,re=0;if(o==="clip"){var G=wr(u);ee=G*d,re=G*B}var me=h.x+X-ee,T=h.y+q-re,N=me+h.width+2*ee-X-ce-U,g=T+h.height+2*re-q-ue-j;r.left=Math.max(r.left,me),r.top=Math.max(r.top,T),r.right=Math.min(r.right,N),r.bottom=Math.min(r.bottom,g)}}),r}function kt(e){var t=arguments.length>1&&arguments[1]!==void 0?arguments[1]:0,r="".concat(t),n=r.match(/^(.*)\%$/);return n?e*(parseFloat(n[1])/100):parseFloat(r)}function Pt(e,t){var r=t||[],n=H(r,2),i=n[0],o=n[1];return[kt(e.width,i),kt(e.height,o)]}function Et(){var e=arguments.length>0&&arguments[0]!==void 0?arguments[0]:"";return[e[0],e[1]]}function nr(e,t){var r=t[0],n=t[1],i,o;return r==="t"?o=e.y:r==="b"?o=e.y+e.height:o=e.y+e.height/2,n==="l"?i=e.x:n==="r"?i=e.x+e.width:i=e.x+e.width/2,{x:i,y:o}}function xe(e,t){var r={t:"b",b:"t",l:"r",r:"l"};return e.map(function(n,i){return i===t?r[n]||"c":n}).join("")}function Ln(e,t,r,n,i,o,u){var l=a.useState({ready:!1,offsetX:0,offsetY:0,offsetR:0,offsetB:0,arrowX:0,arrowY:0,scaleX:1,scaleY:1,align:i[n]||{}}),v=H(l,2),f=v[0],b=v[1],h=a.useRef(0),L=a.useMemo(function(){return t?mt(t):[]},[t]),m=a.useRef({}),z=function(){m.current={}};e||z();var W=Ie(function(){if(t&&r&&e){let Y=function(Re,Ge){var rr=arguments.length>2&&arguments[2]!==void 0?arguments[2]:We,tr=C.x+Re,yr=C.y+Ge,br=tr+Q,Br=yr+A,at=Math.max(tr,rr.left),ot=Math.max(yr,rr.top),st=Math.min(br,rr.right),ut=Math.min(Br,rr.bottom);return Math.max(0,(st-at)*(ut-ot))},$r=function(){$e=C.y+_,Be=$e+A,Me=C.x+S,Fe=Me+Q};var D,M,d=t,B=d.ownerDocument,U=Cr(d),j=U.getComputedStyle(d),q=j.width,ue=j.height,X=j.position,ce=d.style.left,ee=d.style.top,re=d.style.right,G=d.style.bottom,me=d.style.overflow,T=$($({},i[n]),o),N=B.createElement("div");(D=d.parentElement)===null||D===void 0||D.appendChild(N),N.style.left="".concat(d.offsetLeft,"px"),N.style.top="".concat(d.offsetTop,"px"),N.style.position=X,N.style.height="".concat(d.offsetHeight,"px"),N.style.width="".concat(d.offsetWidth,"px"),d.style.left="0",d.style.top="0",d.style.right="auto",d.style.bottom="auto",d.style.overflow="hidden";var g;if(Array.isArray(r))g={x:r[0],y:r[1],width:0,height:0};else{var J=r.getBoundingClientRect();g={x:J.x,y:J.y,width:J.width,height:J.height}}var C=d.getBoundingClientRect(),le=B.documentElement,te=le.clientWidth,or=le.clientHeight,Ke=le.scrollWidth,ge=le.scrollHeight,Ue=le.scrollTop,ne=le.scrollLeft,A=C.height,Q=C.width,ve=g.height,fe=g.width,Je={left:0,top:0,right:te,bottom:or},sr={left:-ne,top:-Ue,right:Ke-ne,bottom:ge-Ue},F=T.htmlRegion,Qe="visible",Se="visibleFirst";F!=="scroll"&&F!==Se&&(F=Qe);var I=F===Se,ye=St(sr,L),w=St(Je,L),We=F===Qe?w:ye,Z=I?w:We;d.style.left="auto",d.style.top="auto",d.style.right="0",d.style.bottom="0";var _r=d.getBoundingClientRect();d.style.left=ce,d.style.top=ee,d.style.right=re,d.style.bottom=G,d.style.overflow=me,(M=d.parentElement)===null||M===void 0||M.removeChild(N);var ke=Mr(Math.round(Q/parseFloat(q)*1e3)/1e3),Pe=Mr(Math.round(A/parseFloat(ue)*1e3)/1e3);if(ke===0||Pe===0||vt(r)&&!Kt(r))return;var Rr=T.offset,O=T.targetOffset,Gr=Pt(C,Rr),ur=H(Gr,2),ie=ur[0],ae=ur[1],Sr=Pt(g,O),oe=H(Sr,2),Ir=oe[0],kr=oe[1];g.x-=Ir,g.y-=kr;var Kr=T.points||[],Ne=H(Kr,2),p=Ne[0],Ee=Ne[1],be=Et(Ee),K=Et(p),Pr=nr(g,be),Er=nr(C,K),we=$({},T),S=Pr.x-Er.x+ie,_=Pr.y-Er.y+ae,E=Y(S,_),Ze=Y(S,_,w),ze=nr(g,["t","l"]),Ae=nr(C,["t","l"]),cr=nr(g,["b","r"]),lr=nr(C,["b","r"]),He=T.overflow||{},se=He.adjustX,Ur=He.adjustY,vr=He.shiftX,pe=He.shiftY,fr=function(Ge){return typeof Ge=="boolean"?Ge:Ge>=0},$e,Be,Me,Fe;$r();var zr=fr(Ur),dr=K[0]===be[0];if(zr&&K[0]==="t"&&(Be>Z.bottom||m.current.bt)){var De=_;dr?De-=A-ve:De=ze.y-lr.y-ae;var Dr=Y(S,De),Ye=Y(S,De,w);Dr>E||Dr===E&&(!I||Ye>=Ze)?(m.current.bt=!0,_=De,ae=-ae,we.points=[xe(K,0),xe(be,0)]):m.current.bt=!1}if(zr&&K[0]==="b"&&($e<Z.top||m.current.tb)){var je=_;dr?je+=A-ve:je=cr.y-Ae.y-ae;var V=Y(S,je),Jr=Y(S,je,w);V>E||V===E&&(!I||Jr>=Ze)?(m.current.tb=!0,_=je,ae=-ae,we.points=[xe(K,0),xe(be,0)]):m.current.tb=!1}var Tr=fr(se),xr=K[1]===be[1];if(Tr&&K[1]==="l"&&(Fe>Z.right||m.current.rl)){var Oe=S;xr?Oe-=Q-fe:Oe=ze.x-lr.x-ie;var Lr=Y(Oe,_),Qr=Y(Oe,_,w);Lr>E||Lr===E&&(!I||Qr>=Ze)?(m.current.rl=!0,S=Oe,ie=-ie,we.points=[xe(K,1),xe(be,1)]):m.current.rl=!1}if(Tr&&K[1]==="r"&&(Me<Z.left||m.current.lr)){var Ve=S;xr?Ve+=Q-fe:Ve=cr.x-Ae.x-ie;var Wr=Y(Ve,_),Zr=Y(Ve,_,w);Wr>E||Wr===E&&(!I||Zr>=Ze)?(m.current.lr=!0,S=Ve,ie=-ie,we.points=[xe(K,1),xe(be,1)]):m.current.lr=!1}$r();var de=vr===!0?0:vr;typeof de=="number"&&(Me<w.left&&(S-=Me-w.left-ie,g.x+fe<w.left+de&&(S+=g.x-w.left+fe-de)),Fe>w.right&&(S-=Fe-w.right-ie,g.x>w.right-de&&(S+=g.x-w.right+de)));var Ce=pe===!0?0:pe;typeof Ce=="number"&&($e<w.top&&(_-=$e-w.top-ae,g.y+ve<w.top+Ce&&(_+=g.y-w.top+ve-Ce)),Be>w.bottom&&(_-=Be-w.bottom-ae,g.y>w.bottom-Ce&&(_+=g.y-w.bottom+Ce)));var hr=C.x+S,Nr=hr+Q,Te=C.y+_,qe=Te+A,mr=g.x,Xe=mr+fe,_e=g.y,pr=_e+ve,Yr=Math.max(hr,mr),Xr=Math.min(Nr,Xe),Ar=(Yr+Xr)/2,et=Ar-hr,rt=Math.max(Te,_e),tt=Math.min(qe,pr),Hr=(rt+tt)/2,nt=Hr-Te;u==null||u(t,we);var gr=_r.right-C.x-(S+C.width),er=_r.bottom-C.y-(_+C.height);ke===1&&(S=Math.round(S),gr=Math.round(gr)),Pe===1&&(_=Math.round(_),er=Math.round(er));var it={ready:!0,offsetX:S/ke,offsetY:_/Pe,offsetR:gr/ke,offsetB:er/Pe,arrowX:et/ke,arrowY:nt/Pe,scaleX:ke,scaleY:Pe,align:we};b(it)}}),y=function(){h.current+=1;var M=h.current;Promise.resolve().then(function(){h.current===M&&W()})},R=function(){b(function(M){return $($({},M),{},{ready:!1})})};return he(R,[n]),he(function(){e||R()},[e]),[f.ready,f.offsetX,f.offsetY,f.offsetR,f.offsetB,f.arrowX,f.arrowY,f.scaleX,f.scaleY,f.align,y]}function Wn(e,t,r,n,i){he(function(){if(e&&t&&r){let h=function(){n(),i()};var o=t,u=r,l=mt(o),v=mt(u),f=Cr(u),b=new Set([f].concat(wt(l),wt(v)));return b.forEach(function(L){L.addEventListener("scroll",h,{passive:!0})}),f.addEventListener("resize",h,{passive:!0}),n(),function(){b.forEach(function(L){L.removeEventListener("scroll",h),f.removeEventListener("resize",h)})}}},[e,t,r])}function Nn(e,t,r,n,i,o,u,l){var v=a.useRef(e);v.current=e,a.useEffect(function(){if(t&&n&&(!i||o)){var f=function(m){var z=m.target;v.current&&!u(z)&&l(!1)},b=Cr(n);b.addEventListener("mousedown",f,!0),b.addEventListener("contextmenu",f,!0);var h=ft(r);return h&&(h.addEventListener("mousedown",f,!0),h.addEventListener("contextmenu",f,!0)),function(){b.removeEventListener("mousedown",f,!0),b.removeEventListener("contextmenu",f,!0),h&&(h.removeEventListener("mousedown",f,!0),h.removeEventListener("contextmenu",f,!0))}}},[t,r,n,i,o])}var An=["prefixCls","children","action","showAction","hideAction","popupVisible","defaultPopupVisible","onPopupVisibleChange","afterPopupVisibleChange","mouseEnterDelay","mouseLeaveDelay","focusDelay","blurDelay","mask","maskClosable","getPopupContainer","forceRender","autoDestroy","destroyPopupOnHide","popup","popupClassName","popupStyle","popupPlacement","builtinPlacements","popupAlign","zIndex","stretch","getPopupClassNameFromAlign","fresh","alignPoint","onPopupClick","onPopupAlign","arrow","popupMotion","maskMotion","popupTransitionName","popupAnimation","maskTransitionName","maskAnimation","className","getTriggerDOMNode"];function Hn(){var e=arguments.length>0&&arguments[0]!==void 0?arguments[0]:xt,t=a.forwardRef(function(r,n){var i=r.prefixCls,o=i===void 0?"rc-trigger-popup":i,u=r.children,l=r.action,v=l===void 0?"hover":l,f=r.showAction,b=r.hideAction,h=r.popupVisible,L=r.defaultPopupVisible,m=r.onPopupVisibleChange,z=r.afterPopupVisibleChange,W=r.mouseEnterDelay,y=r.mouseLeaveDelay,R=y===void 0?.1:y,D=r.focusDelay,M=r.blurDelay,d=r.mask,B=r.maskClosable,U=B===void 0?!0:B,j=r.getPopupContainer,q=r.forceRender,ue=r.autoDestroy,X=r.destroyPopupOnHide,ce=r.popup,ee=r.popupClassName,re=r.popupStyle,G=r.popupPlacement,me=r.builtinPlacements,T=me===void 0?{}:me,N=r.popupAlign,g=r.zIndex,J=r.stretch,C=r.getPopupClassNameFromAlign,le=r.fresh,te=r.alignPoint,or=r.onPopupClick,Ke=r.onPopupAlign,ge=r.arrow,Ue=r.popupMotion,ne=r.maskMotion,A=r.popupTransitionName,Q=r.popupAnimation,ve=r.maskTransitionName,fe=r.maskAnimation,Je=r.className,sr=r.getTriggerDOMNode,F=Ut(r,An),Qe=ue||X||!1,Se=a.useState(!1),I=H(Se,2),ye=I[0],w=I[1];he(function(){w(Rn())},[]);var We=a.useRef({}),Z=a.useContext(Ct),_r=a.useMemo(function(){return{registerSubPopup:function(c,k){We.current[c]=k,Z==null||Z.registerSubPopup(c,k)}}},[Z]),ke=Jt(),Pe=a.useState(null),Rr=H(Pe,2),O=Rr[0],Gr=Rr[1],ur=a.useRef(null),ie=Ie(function(s){ur.current=s,vt(s)&&O!==s&&Gr(s),Z==null||Z.registerSubPopup(ke,s)}),ae=a.useState(null),Sr=H(ae,2),oe=Sr[0],Ir=Sr[1],kr=a.useRef(null),Kr=Ie(function(s){vt(s)&&oe!==s&&(Ir(s),kr.current=s)}),Ne=a.Children.only(u),p=(Ne==null?void 0:Ne.props)||{},Ee={},be=Ie(function(s){var c,k,x=oe;return(x==null?void 0:x.contains(s))||((c=ft(x))===null||c===void 0?void 0:c.host)===s||s===x||(O==null?void 0:O.contains(s))||((k=ft(O))===null||k===void 0?void 0:k.host)===s||s===O||Object.values(We.current).some(function(P){return(P==null?void 0:P.contains(s))||s===P})}),K=Rt(o,Ue,Q,A),Pr=Rt(o,ne,fe,ve),Er=a.useState(L||!1),we=H(Er,2),S=we[0],_=we[1],E=h!=null?h:S,Ze=Ie(function(s){h===void 0&&_(s)});he(function(){_(h||!1)},[h]);var ze=a.useRef(E);ze.current=E;var Ae=a.useRef([]);Ae.current=[];var cr=Ie(function(s){var c;Ze(s),((c=Ae.current[Ae.current.length-1])!==null&&c!==void 0?c:E)!==s&&(Ae.current.push(s),m==null||m(s))}),lr=a.useRef(),He=function(){clearTimeout(lr.current)},se=function(c){var k=arguments.length>1&&arguments[1]!==void 0?arguments[1]:0;He(),k===0?cr(c):lr.current=setTimeout(function(){cr(c)},k*1e3)};a.useEffect(function(){return He},[]);var Ur=a.useState(!1),vr=H(Ur,2),pe=vr[0],fr=vr[1];he(function(s){(!s||E)&&fr(!0)},[E]);var $e=a.useState(null),Be=H($e,2),Me=Be[0],Fe=Be[1],zr=a.useState([0,0]),dr=H(zr,2),De=dr[0],Dr=dr[1],Ye=function(c){Dr([c.clientX,c.clientY])},je=Ln(E,O,te?De:oe,G,T,N,Ke),V=H(je,11),Jr=V[0],Tr=V[1],xr=V[2],Oe=V[3],Lr=V[4],Qr=V[5],Ve=V[6],Wr=V[7],Zr=V[8],de=V[9],Ce=V[10],hr=Dn(ye,v,f,b),Nr=H(hr,2),Te=Nr[0],qe=Nr[1],mr=Te.has("click"),Xe=qe.has("click")||qe.has("contextMenu"),_e=Ie(function(){pe||Ce()}),pr=function(){ze.current&&te&&Xe&&se(!1)};Wn(E,oe,O,_e,pr),he(function(){_e()},[De,G]),he(function(){E&&!(T!=null&&T[G])&&_e()},[JSON.stringify(N)]);var Yr=a.useMemo(function(){var s=xn(T,o,de,te);return ir(s,C==null?void 0:C(de))},[de,C,T,o,te]);a.useImperativeHandle(n,function(){return{nativeElement:kr.current,popupElement:ur.current,forceAlign:_e}});var Xr=a.useState(0),Ar=H(Xr,2),et=Ar[0],rt=Ar[1],tt=a.useState(0),Hr=H(tt,2),nt=Hr[0],gr=Hr[1],er=function(){if(J&&oe){var c=oe.getBoundingClientRect();rt(c.width),gr(c.height)}},it=function(){er(),_e()},Y=function(c){fr(!1),Ce(),z==null||z(c)},$r=function(){return new Promise(function(c){er(),Fe(function(){return c})})};he(function(){Me&&(Ce(),Me(),Fe(null))},[Me]);function Re(s,c,k,x){Ee[s]=function(P){var Fr;x==null||x(P),se(c,k);for(var ct=arguments.length,bt=new Array(ct>1?ct-1:0),jr=1;jr<ct;jr++)bt[jr-1]=arguments[jr];(Fr=p[s])===null||Fr===void 0||Fr.call.apply(Fr,[p,P].concat(bt))}}(mr||Xe)&&(Ee.onClick=function(s){var c;ze.current&&Xe?se(!1):!ze.current&&mr&&(Ye(s),se(!0));for(var k=arguments.length,x=new Array(k>1?k-1:0),P=1;P<k;P++)x[P-1]=arguments[P];(c=p.onClick)===null||c===void 0||c.call.apply(c,[p,s].concat(x))}),Nn(E,Xe,oe,O,d,U,be,se);var Ge=Te.has("hover"),rr=qe.has("hover"),tr,yr;Ge&&(Re("onMouseEnter",!0,W,function(s){Ye(s)}),Re("onPointerEnter",!0,W,function(s){Ye(s)}),tr=function(c){(E||pe)&&O!==null&&O!==void 0&&O.contains(c.target)&&se(!0,W)},te&&(Ee.onMouseMove=function(s){var c;(c=p.onMouseMove)===null||c===void 0||c.call(p,s)})),rr&&(Re("onMouseLeave",!1,R),Re("onPointerLeave",!1,R),yr=function(){se(!1,R)}),Te.has("focus")&&Re("onFocus",!0,D),qe.has("focus")&&Re("onBlur",!1,M),Te.has("contextMenu")&&(Ee.onContextMenu=function(s){var c;ze.current&&qe.has("contextMenu")?se(!1):(Ye(s),se(!0)),s.preventDefault();for(var k=arguments.length,x=new Array(k>1?k-1:0),P=1;P<k;P++)x[P-1]=arguments[P];(c=p.onContextMenu)===null||c===void 0||c.call.apply(c,[p,s].concat(x))}),Je&&(Ee.className=ir(p.className,Je));var br=$($({},p),Ee),Br={},at=["onContextMenu","onClick","onMouseDown","onTouchStart","onMouseEnter","onMouseLeave","onFocus","onBlur"];at.forEach(function(s){F[s]&&(Br[s]=function(){for(var c,k=arguments.length,x=new Array(k),P=0;P<k;P++)x[P]=arguments[P];(c=br[s])===null||c===void 0||c.call.apply(c,[br].concat(x)),F[s].apply(F,x)})});var ot=a.cloneElement(Ne,$($({},br),Br)),st={x:Qr,y:Ve},ut=ge?$({},ge!==!0?ge:{}):null;return a.createElement(a.Fragment,null,a.createElement(yt,{disabled:!E,ref:Kr,onResize:it},a.createElement(zn,{getTriggerDOMNode:sr},ot)),a.createElement(Ct.Provider,{value:_r},a.createElement(En,{portal:e,ref:ie,prefixCls:o,popup:ce,className:ir(ee,Yr),style:re,target:oe,onMouseEnter:tr,onMouseLeave:yr,onPointerEnter:tr,zIndex:g,open:E,keepDom:pe,fresh:le,onClick:or,mask:d,motion:K,maskMotion:Pr,onVisibleChanged:Y,onPrepare:$r,forceRender:q,autoDestroy:Qe,getPopupContainer:j,align:de,arrow:ut,arrowPos:st,ready:Jr,offsetX:Tr,offsetY:xr,offsetR:Oe,offsetB:Lr,onAlign:_e,stretch:J,targetWidth:et/Wr,targetHeight:nt/Zr})))});return t}const Fn=Hn(xt);export{yt as R,Fn as T,Rn as i};