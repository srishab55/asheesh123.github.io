function doNext(user) {
  var messageRef=firebase.database().ref('dsh');
  document.getElementById('snh').addEventListener('submit',submitForm);
  var total_fee=0;
  fetchData(user);
  function submitForm(e){
      e.preventDefault();
      // var username=document.getElementById("username").value;
      var best=document.getElementById("cbx1").checked;
      var best_fee=50;
      var lazy=document.getElementById("cbx2").checked;
      var lazy_fee=50;
      var vdg=document.getElementById("cbx3").checked;
      var vdg_fee=0;
      var lantern=document.getElementById("cbx4").checked;
      var lantern_fee=0;
      var rtw=document.getElementById("cbx5").checked;
      var rtw_fee=50;
    	var nb=document.getElementById("cbx6").checked;
      var nb_fee=0;
      total_fee=return_true(best,best_fee)+return_true(lazy,lazy_fee)+return_true(vdg,vdg_fee)+return_true(lantern,lantern_fee)+return_true(rtw,rtw_fee)+return_true(nb,nb_fee);
      writeUserData(user,best,lazy,vdg,lantern,rtw,nb,total_fee);
  }
}

function writeUserData(user,best,lazy,vdg,lantern,rtw,nb,total_fee) {

        firebase.database().ref('dsh').child(user.uid+"").set({
            username: user.email,
            BEST_OUT_OF_WASTE:best,
            LAZY_HOVER_V1_0:lazy,
            VAN_DE_GRAFF_GENERATOR:vdg,
            LANTERN_MAKING:lantern,
            RUN_TO_WIN:rtw,
            NIPPY_BUZZ:nb,
            paid: 0,
            totalfee:total_fee
          }, function(error) {
            if(error) {
              window.alert('error occured!');
            } else {
              window.alert('successful!');
              if(total_fee==0){
                  window.alert("Registered Successfully");
              }
              else{
                  window.alert("Registered Successfully\nYou have to pay total of Rs. "+total_fee);
              }
              window.location.href='../../../index.html';
            }
          });
}

function fetchData(user){
      var leadsRef = firebase.database().ref('dsh/'+user.uid);
      var flag=true;
      leadsRef.on('value', function(snapshot) {
                var child = snapshot.val();
                if(child==null &&flag) {
                  flag=false;

                }
                else if(flag){
                  flag=false;
                  document.getElementById("cbx1").checked=child.BEST_OUT_OF_WASTE;
                  document.getElementById("cbx2").checked=child.LAZY_HOVER_V1_0;
                  document.getElementById("cbx3").checked=child.VAN_DE_GRAFF_GENERATOR;
                  document.getElementById("cbx4").checked=child.LANTERN_MAKING;
                  document.getElementById("cbx5").checked=child.RUN_TO_WIN;
                  document.getElementById("cbx6").checked=child.NIPPY_BUZZ;
                }
        });
}
function return_true(flag,value)
{
            if(flag) return value;
            else return 0;
}
