(function (){
	var root = this;

	var SopaBlackout = function(){};
	var	addEvent = function(obj, type, fn, ref_obj){
		if (obj.addEventListener){
			obj.addEventListener(type, fn, false);
		}else if (obj.attachEvent){
			obj["e"+type+fn] = fn;
			obj[type+fn] = function(){
				obj["e"+type+fn](window.event,ref_obj);
			};
			obj.attachEvent("on"+type, obj[type+fn]);
		}
	};
	var onDomReady = function(fn){
		if (document.addEventListener) {
			document.addEventListener('DOMContentLoaded', fn, false);
		}else{
			if (!document.uniqueID && document.expando){return;};
			var tempNode = document.createElement('document:ready');
			try{
				tempNode.doScroll('left');
				fn();
			}catch (err){
				setTimeout(arguments.callee, 0);
			}
		}
	};
	var getStyle = function(e, prop){
		if (e.currentStyle){
			return e.currentStyle[prop];
		}else if (document.defaultView && document.defaultView.getComputedStyle){
			return document.defaultView.getComputedStyle(e, "")[prop];
		}else{
			return e.style[prop];
		}
	};
	var findPos = function(obj){
		var curleft = 0;
		var curtop = 0;
		if (obj.offsetParent){
			do{
				curleft += obj.offsetLeft;
				curtop += obj.offsetTop;
			}while(obj = obj.offsetParent);
			return [curleft, curtop];
		}
	}

	SopaBlackout.VERSION = '0.1.0';
	SopaBlackout.blackout = function(obj_id){
		var obj;
		var body = document.body;
		if (typeof obj_id === 'undefined'){
			obj = body;
		}else{
			obj = document.getElementById(obj_id);
		}
		var offsets = findPos(obj);
		var height = getStyle(obj, 'height');
		var blackout = document.createElement('div');
		blackout.appendChild(document.createTextNode("Hi there"));
		blackout.style.position = "absolute";
		blackout.style.top = offsets[1];
		blackout.style.width = "100%";
		blackout.style.height = height;
		blackout.style.backgroundColor = "black";
		body.appendChild(blackout);
	};
	SopaBlackout.go = function(){
		SopaBlackout.blackout(sopablackout_id);
	};

	onDomReady(SopaBlackout.go);
}).call(this);
