(window.webpackJsonp=window.webpackJsonp||[]).push([[0],{J8Zq:function(e,t,n){"use strict";n.d(t,"a",function(){return a});var a=function(){function e(e,t){this.el=e,this.render=t}return e.prototype.writeValue=function(e){e&&this.render.setText(this.el.nativeElement,this.aplicarMascara(e))},e.prototype.registerOnChange=function(e){this.onChange=e},e.prototype.registerOnTouched=function(e){this.onTouched=e},e.prototype.onKeyup=function(e){var t=e.target.value.replace(/\D/g,"");if(8!==e.keyCode){var n=this.IkMask.replace(/\D/g,"").replace(/9/g,"_");t.length<=n.length&&(this.onChange=t),e.target.value=this.aplicarMascara(t)}else this.onChange=t},e.prototype.aplicarMascara=function(e){e=e.replace(/\D/g,"");var t=this.IkMask.replace(/\D/g,"").replace(/9/g,"_"),n=e+t.substring(0,t.length-e.length),a=0;e="";for(var r=0;r<this.IkMask.length;r++)isNaN(parseInt(this.IkMask.charAt(r)))?e+=this.IkMask.charAt(r):e+=n[a++];return e.indexOf("_")>-1&&(e=e.substr(0,e.indexOf("_"))),e},e}()}}]);