﻿Number.prototype.map = function(istart, istop, ostart, ostop){
    return ostart+(ostop-ostart)*((this-istart)/(istop-istart));
};

Number.prototype.limit=function(min,max){
    return Math.min(max,Math.max(min,this));
};

Number.prototype.round=function(precision){
    precision = Math.pow(10,precision||0);
	return Math.round(this*precision)/precision;
};

Number.prototype.floor=function(){
    return Math.floor(this);
};

Number.prototype.ceil=function(){
    return Math.ceil(this);
};

Number.prototype.toInt=function(){
    return(this|0);
};

Array.prototype.erase=function(item){
    for(var i=this.length; i--;	i){
        if(this[i]===item)
            this.splice(i,1);
	}
	return this;
};

Array.prototype.random=function(){
    return this[(Math.random()*this.length).floor()];
};

Function.prototype.bind=function(bind){
    var self=this;
	return function(){
        var args=Array.prototype.slice.call(arguments);
		return self.apply(bind||null,args);
	};
};

(function(window){window.ig={
        game:null,
        version:'1.15',
        global:window,
        modules:{},
        resources:[],
        ready:false,
        baked:false,
        nocache:'',
        ua:{},
        lib:'lib/',
        _current:null,
        _loadQueue:[],
        _waitForOnload:0,
        $:function(selector){
            return selector.charAt(0)=='#' ?
                document.getElementById(selector.substr(1)) :
                document.getElementsByTagName(selector);
		},
        $new:function(name){
            return document.createElement(name);
		},
        copy:function(object){
            if(!object||typeof(object)!='object'||object instanceof HTMLElement){
                return object;
			}
			else if(object instanceof Array){
                var c=[];
				for(var i=0,l=object.length; i<l; i++){
                    c[i]=ig.copy(object[i]);
				}
				return c;
			}
			else{var c={};
				for(var i in object){
                    c[i]=ig.copy(object[i]);
				}
				if(object instanceof ig.Class){
                    c.__proto__=object.__proto__;
				}
				return c;
			}},
        merge:function(original,extended){
            for(var key in extended){
                if(typeof(extended[key])=='object'&&!(extended[key]instanceof HTMLElement)){
                    if(!original[key]||typeof(original[key])!='object'){
                        original[key]={};
					}
				ig.merge(original[key],extended[key]);
				} else{
                original[key]=extended[key];
				}
            }
			return original;
		    },
            ksort:function(obj){
                if(!obj||typeof(obj)!='object'){
                    return[];
			    }
		    var keys=[],values=[];
		    for(var i in obj){keys.push(i);
		    }
		    keys.sort();
		    for(var i=0;
		    i<keys.length;
		    i++){values.push(obj[keys[i]]);
		    }
		    return values;
		},
        module:function(name){
            if(ig._current){
                throw("Module '"+ig._current.name+"' defines nothing");
			}
			ig._current={name:name,requires:[],loaded:false,body:null};
			ig.modules[name]=ig._current;
			ig._loadQueue.push(ig._current);
			ig._initDOMReady();
			return ig;
		},
        requires:function(){ig._current.requires=Array.prototype.slice.call(arguments);
			return ig;
		},
        defines:function(body){name=ig._current.name;
			ig._current.body=body;
			ig._current=null;
			ig._execModules();
		},
        addResource:function(resource){ig.resources.push(resource);
		},
        setNocache:function(set){ig.nocache=set?'?'+Math.random().toString().substr(2):'';
		},
        _loadScript:function(name,requiredFrom){ig.modules[name]={name:name,requires:[],loaded:false,body:null};
			ig._waitForOnload++;
			var path=ig.lib+name.replace(/\./g,'/')+'.js'+ig.nocache;
			var script=ig.$new('script');
			script.type='text/javascript';
			script.src=path;
			script.onload=function(){ig._waitForOnload--;
				ig._execModules();
			};
			script.onerror=function(){throw('Failed to load module '+name+' at '+path+' '+'required from '+requiredFrom);
			};
			ig.$('head')[0].appendChild(script);
		},
        _execModules:function(){var modulesLoaded=false;
			for(var i=0;
			i<ig._loadQueue.length;
			i++){var m=ig._loadQueue[i];
				var dependenciesLoaded=true;
				for(var j=0;
				j<m.requires.length;
				j++){var name=m.requires[j];
					if(!ig.modules[name]){dependenciesLoaded=false;
						ig._loadScript(name,m.name);
					}
					else if(!ig.modules[name].loaded){dependenciesLoaded=false;
					}}
				if(dependenciesLoaded&&m.body){ig._loadQueue.splice(i,1);
					m.loaded=true;
					m.body();
					modulesLoaded=true;
					i--;
				}}
			if(modulesLoaded){ig._execModules();
			}
			else if(!ig.baked&&ig._waitForOnload==0&&ig._loadQueue.length!=0){var unresolved=[];
				for(var i=0;
				i<ig._loadQueue.length;
				i++){unresolved.push(ig._loadQueue[i].name);
				}
				throw('Unresolved (circular?) dependencies: '+unresolved.join(', '));
			}},_DOMReady:function(){if(!ig.modules['dom.ready'].loaded){if(!document.body){return setTimeout(ig._DOMReady,13);
				}
				ig.modules['dom.ready'].loaded=true;
				ig._waitForOnload--;
				ig._execModules();
			}
			return 0;
		},
        _boot:function(){if(document.location.href.match(/\?nocache/)){ig.setNocache(true);
			}
			ig.ua.pixelRatio=window.devicePixelRatio||1;
			ig.ua.viewport={width:window.innerWidth,height:window.innerHeight,};
			ig.ua.screen={width:window.screen.availWidth*ig.ua.pixelRatio,height:window.screen.availHeight*ig.ua.pixelRatio};
			ig.ua.iPhone=/iPhone/i.test(navigator.userAgent);
			ig.ua.iPhone4=(ig.ua.iPhone&&ig.ua.pixelRatio==2);
			ig.ua.iPad=/iPad/i.test(navigator.userAgent);
			ig.ua.android=/android/i.test(navigator.userAgent);
			ig.ua.iOS=ig.ua.iPhone||ig.ua.iPad;
			ig.ua.mobile=ig.ua.iOS||ig.ua.android;
		},
        _initDOMReady:function(){if(ig.modules['dom.ready']){return;
			}
			ig._boot();
			ig.modules['dom.ready']={requires:[],loaded:false,body:null};
			ig._waitForOnload++;
			if(document.readyState==='complete'){ig._DOMReady();
			}
			else{document.addEventListener('DOMContentLoaded',ig._DOMReady,false);
				window.addEventListener('load',ig._DOMReady,false);
			}},};
	var initializing=false,fnTest=/xyz/.test(function(){xyz;
	})?/\bparent\b/:/.*/;
	window.ig.Class=function(){};
	window.ig.Class.extend=function(prop){
        var parent=this.prototype;
		initializing=true;
		var prototype=new this();
		initializing=false;
		for(var name in prop){
            if(typeof(prop[name])=="function"
                && typeof(parent[name])=="function"
                && fnTest.test(prop[name])){
                    prototype[name]=(function(name,fn){
                        return function(){
                            var tmp=this.parent;
						    this.parent=parent[name];
						    var ret=fn.apply(this,arguments);
						    this.parent=tmp;
						    return ret;
					    };
				})(name,prop[name])}
			else{prototype[name]=prop[name];
			}}
		function Class(){if(!initializing){if(this.staticInstantiate){var obj=this.staticInstantiate.apply(this,arguments);
					if(obj){return obj;
					}}
				for(p in this){this[p]=ig.copy(this[p]);
				}
				if(this.init){this.init.apply(this,arguments);
				}}
			return this;
		}
		Class.prototype=prototype;
		Class.constructor=Class;
		Class.extend=arguments.callee;
		return Class;
	};
})(window);