!function(e){var t={};function a(n){if(t[n])return t[n].exports;var i=t[n]={i:n,l:!1,exports:{}};return e[n].call(i.exports,i,i.exports,a),i.l=!0,i.exports}a.m=e,a.c=t,a.d=function(e,t,n){a.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:n})},a.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},a.t=function(e,t){if(1&t&&(e=a(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var n=Object.create(null);if(a.r(n),Object.defineProperty(n,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var i in e)a.d(n,i,function(t){return e[t]}.bind(null,i));return n},a.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return a.d(t,"a",t),t},a.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},a.p="",a(a.s=17)}({0:function(e,t,a){!function(e,t,a){var n={messages:{required:"The %s field is required.",matches:"The %s field does not match the %s field.",default:"The %s field is still set to default, please change.",valid_email:"The %s field must contain a valid email address.",valid_emails:"The %s field must contain all valid email addresses.",min_length:"The %s field must be at least %s characters in length.",max_length:"The %s field must not exceed %s characters in length.",exact_length:"The %s field must be exactly %s characters in length.",greater_than:"The %s field must contain a number greater than %s.",less_than:"The %s field must contain a number less than %s.",alpha:"The %s field must only contain alphabetical characters.",alpha_numeric:"The %s field must only contain alpha-numeric characters.",alpha_dash:"The %s field must only contain alpha-numeric characters, underscores, and dashes.",numeric:"The %s field must contain only numbers.",integer:"The %s field must contain an integer.",decimal:"The %s field must contain a decimal number.",is_natural:"The %s field must contain only positive numbers.",is_natural_no_zero:"The %s field must contain a number greater than zero.",valid_ip:"The %s field must contain a valid IP.",valid_base64:"The %s field must contain a base64 string.",valid_credit_card:"The %s field must contain a valid credit card number.",is_file_type:"The %s field must contain only %s files.",valid_url:"The %s field must contain a valid URL.",greater_than_date:"The %s field must contain a more recent date than %s.",less_than_date:"The %s field must contain an older date than %s.",greater_than_or_equal_date:"The %s field must contain a date that's at least as recent as %s.",less_than_or_equal_date:"The %s field must contain a date that's %s or older."},callback:function(e){}},i=/^(.+?)\[(.+)\]$/,s=/^[0-9]+$/,r=/^\-?[0-9]+$/,l=/^\-?[0-9]*\.?[0-9]+$/,o=/^[a-zA-Z0-9.!#$%&'*+\/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/,u=/^[a-z]+$/i,d=/^[a-z0-9]+$/i,c=/^[a-z0-9_\-]+$/i,h=/^[0-9]+$/i,f=/^[1-9][0-9]*$/i,m=/^((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\.){3}(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})$/i,p=/[^a-zA-Z0-9\/\+=]/i,v=/^[\d\-\s]+$/,_=/^((http|https):\/\/(\w+:{0,1}\w*@)?(\S+)|)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-\/]))?$/,g=/\d{4}-\d{1,2}-\d{1,2}/,y=function(e,t,a){this.callback=a||n.callback,this.errors=[],this.fields={},this.form=this._formByNameOrNode(e)||{},this.messages={},this.handlers={},this.conditionals={};for(var i=0,s=t.length;i<s;i++){var r=t[i];if((r.name||r.names)&&r.rules)if(r.names)for(var l=0,o=r.names.length;l<o;l++)this._addField(r,r.names[l]);else this._addField(r,r.name);else console.warn("validate.js: The following field is being skipped due to a misconfiguration:"),console.warn(r),console.warn("Check to ensure you have properly configured a name and rules for this field")}var u,d=this.form.onsubmit;this.form.onsubmit=(u=this,function(e){try{return u._validateForm(e)&&(void 0===d||d())}catch(e){}})},b=function(e,t){var a;if(!(e.length>0)||"radio"!==e[0].type&&"checkbox"!==e[0].type)return e[t];for(a=0,elementLength=e.length;a<elementLength;a++)if(e[a].checked)return e[a][t]};y.prototype.setMessage=function(e,t){return this.messages[e]=t,this},y.prototype.registerCallback=function(e,t){return e&&"string"==typeof e&&t&&"function"==typeof t&&(this.handlers[e]=t),this},y.prototype.registerConditional=function(e,t){return e&&"string"==typeof e&&t&&"function"==typeof t&&(this.conditionals[e]=t),this},y.prototype._formByNameOrNode=function(e){return"object"==typeof e?e:t.forms[e]},y.prototype._addField=function(e,t){this.fields[t]={name:t,display:e.display||t,rules:e.rules,depends:e.depends,id:null,element:null,type:null,value:null,checked:null}},y.prototype._validateForm=function(e){for(var t in this.errors=[],this.fields)if(this.fields.hasOwnProperty(t)){var a=this.fields[t]||{},n=this.form[a.name];n&&void 0!==n&&(a.id=b(n,"id"),a.element=n,a.type=n.length>0?n[0].type:n.type,a.value=b(n,"value"),a.checked=b(n,"checked"),a.depends&&"function"==typeof a.depends?a.depends.call(this,a)&&this._validateField(a):a.depends&&"string"==typeof a.depends&&this.conditionals[a.depends]?this.conditionals[a.depends].call(this,a)&&this._validateField(a):this._validateField(a))}return"function"==typeof this.callback&&this.callback(this.errors,e),this.errors.length>0&&(e&&e.preventDefault?e.preventDefault():event&&(event.returnValue=!1)),!0},y.prototype._validateField=function(e){var t,a,s=e.rules.split("|"),r=e.rules.indexOf("required"),l=!e.value||""===e.value||void 0===e.value;for(t=0,ruleLength=s.length;t<ruleLength;t++){var o=s[t],u=null,d=!1,c=i.exec(o);if((-1!==r||-1!==o.indexOf("!callback_")||!l)&&(c&&(o=c[1],u=c[2]),"!"===o.charAt(0)&&(o=o.substring(1,o.length)),"function"==typeof this._hooks[o]?this._hooks[o].apply(this,[e,u])||(d=!0):"callback_"===o.substring(0,9)&&(o=o.substring(9,o.length),"function"==typeof this.handlers[o]&&!1===this.handlers[o].apply(this,[e.value,u,e])&&(d=!0)),d)){var h,f=this.messages[e.name+"."+o]||this.messages[o]||n.messages[o],m="An error has occurred with the "+e.display+" field.";for(f&&(m=f.replace("%s",e.display),u&&(m=m.replace("%s",this.fields[u]?this.fields[u].display:u))),a=0;a<this.errors.length;a+=1)e.id===this.errors[a].id&&(h=this.errors[a]);var p=h||{id:e.id,display:e.display,element:e.element,name:e.name,message:m,messages:[],rule:o};p.messages.push(m),h||this.errors.push(p)}}},y.prototype._getValidDate=function(e){if(!e.match("today")&&!e.match(g))return!1;var t,a=new Date;return e.match("today")||(t=e.split("-"),a.setFullYear(t[0]),a.setMonth(t[1]-1),a.setDate(t[2])),a},y.prototype._hooks={required:function(e){var t=e.value;return"checkbox"===e.type||"radio"===e.type?!0===e.checked:null!==t&&""!==t},default:function(e,t){return e.value!==t},matches:function(e,t){var a=this.form[t];return!!a&&e.value===a.value},valid_email:function(e){return o.test(e.value)},valid_emails:function(e){for(var t=e.value.split(/\s*,\s*/g),a=0,n=t.length;a<n;a++)if(!o.test(t[a]))return!1;return!0},min_length:function(e,t){return!!s.test(t)&&e.value.length>=parseInt(t,10)},max_length:function(e,t){return!!s.test(t)&&e.value.length<=parseInt(t,10)},exact_length:function(e,t){return!!s.test(t)&&e.value.length===parseInt(t,10)},greater_than:function(e,t){return!!l.test(e.value)&&parseFloat(e.value)>parseFloat(t)},less_than:function(e,t){return!!l.test(e.value)&&parseFloat(e.value)<parseFloat(t)},alpha:function(e){return u.test(e.value)},alpha_numeric:function(e){return d.test(e.value)},alpha_dash:function(e){return c.test(e.value)},numeric:function(e){return s.test(e.value)},integer:function(e){return r.test(e.value)},decimal:function(e){return l.test(e.value)},is_natural:function(e){return h.test(e.value)},is_natural_no_zero:function(e){return f.test(e.value)},valid_ip:function(e){return m.test(e.value)},valid_base64:function(e){return p.test(e.value)},valid_url:function(e){return _.test(e.value)},valid_credit_card:function(e){if(!v.test(e.value))return!1;for(var t=0,a=0,n=!1,i=e.value.replace(/\D/g,""),s=i.length-1;s>=0;s--){var r=i.charAt(s);a=parseInt(r,10),n&&(a*=2)>9&&(a-=9),t+=a,n=!n}return t%10==0},is_file_type:function(e,t){if("file"!==e.type)return!0;for(var a=e.value.substr(e.value.lastIndexOf(".")+1),n=t.split(","),i=!1,s=0,r=n.length;s<r;s++)a.toUpperCase()==n[s].toUpperCase()&&(i=!0);return i},greater_than_date:function(e,t){var a=this._getValidDate(e.value),n=this._getValidDate(t);return!(!n||!a)&&a>n},less_than_date:function(e,t){var a=this._getValidDate(e.value),n=this._getValidDate(t);return!(!n||!a)&&a<n},greater_than_or_equal_date:function(e,t){var a=this._getValidDate(e.value),n=this._getValidDate(t);return!(!n||!a)&&a>=n},less_than_or_equal_date:function(e,t){var a=this._getValidDate(e.value),n=this._getValidDate(t);return!(!n||!a)&&a<=n}},e.FormValidator=y}(window,document),e.exports&&(e.exports=FormValidator)},17:function(e,t,a){const n=a(18);document.addEventListener("DOMContentLoaded",e=>{const t=document.getElementById("login-form");new n("login-form");t.addEventListener("submit",e=>{if(e.preventDefault(),n.prototype.isValid){const e=document.getElementById("email").value,t=document.getElementById("password").value;firebase.auth().signInWithEmailAndPassword(e,t).then(()=>{window.location.replace("../html/overview.html")},()=>{alert("Invalid login or password")},e=>{alert(e)})}})})},18:function(e,t,a){const n=a(0);e.exports=function e(t){e.prototype.isValid=!1;this.validator=new n(t,[{name:"email",display:"E-mail Address",rules:"required|valid_email"},{name:"password",display:"Password",rules:"required|min_length[6]|max_length[20]"}],function(t,a){let n=t.length;if(0===n)e.prototype.isValid=!0;else if(n>0){const e=t[0].message,a=document.getElementsByName(t[0].name)[0];!function(e,t){e.className.includes("-invalid")||(e.className+="-invalid",e.setAttribute("title",t))}(a,e),(i=a).onclick=(()=>{i.className=i.className.replace("-invalid",""),i.removeAttribute("title")})}var i}),this.validator.setMessage("required","%s is required."),this.validator.setMessage("min_length","%s must be at least 8 characters in length.")}}});