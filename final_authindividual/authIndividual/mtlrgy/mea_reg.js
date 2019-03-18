function doNext(user) {
  var messageRef=firebase.database().ref('mme');
  document.getElementById('mea').addEventListener('submit',submitForm);
  var total_fee=0;
  fetchData(user);
  function submitForm(e){
      e.preventDefault();
      // var username=document.getElementById("username").value;

      var onet=document.getElementById("cbx1").checked;
      var onet_fee=50;
      var riddle=document.getElementById("cbx2").checked;
      var riddle_fee=0;
      var wax=document.getElementById("cbx3").checked;
      var wax_fee=0;
      var beyond=document.getElementById("cbx4").checked;
      var beyond_fee=0;
      total_fee=return_true(onet,onet_fee)+return_true(riddle,riddle_fee)+return_true(wax,wax_fee)+return_true(beyond,beyond_fee);
      writeUserData(user,onet, riddle, wax,beyond,total_fee);
  }
}

function writeUserData(user,onet, riddle, wax,beyond,total_fee) {

        firebase.database().ref('mme').child(user.uid+"").set({
            username: user.email,
            ONE_THRUST:onet,
            RIDDLE_HURDLES:riddle,
            WAX_MOCK_UP:wax,
            WHAT_S_BEYOND:beyond,
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

function return_true(flag,value)
{
            if(flag) return value;
            else return 0;
}

function fetchData(user){
      var leadsRef = firebase.database().ref('mme/'+user.uid);
      var flag=true;
      leadsRef.on('value', function(snapshot) {
                var child = snapshot.val();
                if(child==null &&flag) {
                  flag=false;

                }
                else if(flag){
                  flag=false;
                  document.getElementById("cbx1").checked=child.ONE_THRUST;
                  document.getElementById("cbx2").checked=child.RIDDLE_HURDLES;
                  document.getElementById("cbx3").checked=child.WAX_MOCK_UP;
                  document.getElementById("cbx4").checked=child.WHAT_S_BEYOND;
                }
        });
}
