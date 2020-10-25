 var listUsers = [];
 var status = "2";
 var current_user = {
     f: '',
     u: '',
     l: '',
     p: '',
     m: ''
 };

 function VisibilityState() {
     Wellcome.prototype.setVisibility(status == "0");
     Sing_In.prototype.setVisibility(status == "1");
     Log_In.prototype.setVisibility(status == "2");



 }