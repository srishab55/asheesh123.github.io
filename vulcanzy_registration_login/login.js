

var messageRef=firebase.database().ref('register');
//event listener for form submit
var usernames=[];
var passwords=[];
console.log("hi")
document.getElementById('login').addEventListener('submit',submitForm);
//submit form
function submitForm(e){

    e.preventDefault();
    var username=document.getElementById("username").value;
    var password="000";
    username+="";
    password+="";
    var leadsRef = firebase.database().ref('register/'+username);
    var flag=true;
   leadsRef.on('value',function(snapshot){
      var user=snapshot.val();
     console.log(123);
     if(user!=null)
     {
      console.log("present");
         sessionStorage.setItem("storageName",username);
         window.location.href = "../index.html";
     }
     else
     {          window.alert("incorrect username ...\n\n PLease try again");
                window.location.href = "../vulcanzy_registration_login/login.html";
     }
//     leadsRef.on('value', function(snapshot) {
//       var all=[];
//       var all1=[];
//           snapshot.forEach(function(childSnapshot) {
//           var childData = childSnapshot.val();
//           var str=childData.username;
//           var str1=childData.password;
//           usernames.push(str+"");
//           passwords.push(str1+"");
//           all.push(str+"");
//           all1.push(str1+"");
      });
      console.log("completed");
//       if(all.includes(username)&&all1.includes(password) && (all1[all.indexOf(username)]+""==password)){
//           flag=false;
//           console.log(123);
//           sessionStorage.setItem("storageName",username);
//           console.log(username)
//             window.location.href = "../index.html";
//       }
//       else if(all.includes(username)&&flag){
//         flag=false;
//         window.alert("incorrect username or password..");
//       }
//      else if(flag){
//        window.alert("Please goto registration page");
//        window.location.href = "../vulcanzy_registration_login/main_registration.html";
//     }
//  });
}
