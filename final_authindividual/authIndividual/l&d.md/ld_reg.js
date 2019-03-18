function doNext(user) {
  var messageRef=firebase.database().ref('lnd');
  document.getElementById('ld').addEventListener('submit',submitForm);
  var total_fee=0;
  fetchData(user);

  function submitForm(e){
      e.preventDefault();
      // var username=document.getElementById("username").value;
      var talk=document.getElementById("cbx1").checked;
      var talk_fee=0;
      var show=document.getElementById("cbx2").checked;
      var show_fee=0;
      var the=document.getElementById("cbx3").checked;
      var the_fee=0;
      var ext=document.getElementById("cbx4").checked;
      var ext_fee=0;
      var talkm=document.getElementById("cbx5").checked;
      var talkm_fee=0;
      total_fee=return_true(talk,talk_fee)+return_true(show,show_fee)+return_true(the,the_fee)++return_true(ext,ext_fee)eturn_true(talkm,talkm_fee)+return_true(the,the_fee);
      writeUserData(user,talk,show,the,ext,talkm,total_fee);
  }
}

function writeUserData(user,talk,show,the,ext,talkm,total_fee) {

        firebase.database().ref('lnd').child(user.uid+"").set({
            username: user.email,
            TALKING_TITANS:talk,
            SHOW_TYM:show,
            THE_AMAZING_RACE:the,
            EXTEMPORE:ext,
            TALK_MASTERS:talkm,
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
      var leadsRef = firebase.database().ref('lnd/'+user.uid);
      var flag=true;
      leadsRef.on('value', function(snapshot) {
                var child = snapshot.val();
                if(child==null &&flag) {
                  flag=false;

                }
                else if(flag){
                  flag=false;
                  document.getElementById("cbx1").checked=child.TALKING_TITANS;
                  document.getElementById("cbx2").checked=child.SHOW_TYM;
                  document.getElementById("cbx3").checked=child.THE_AMAZING_RACE;
                  document.getElementById("cbx4").checked=child.EXTEMPORE;
                  document.getElementById("cbx5").checked=child.TALKING_MASTERS;
                }
        });
}
