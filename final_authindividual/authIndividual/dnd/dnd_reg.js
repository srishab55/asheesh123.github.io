function doNext(user) {
  var messageRef=firebase.database().ref('dnd');
  document.getElementById('dnd').addEventListener('submit',submitForm);
  var total_fee=0;
  fetchData(user);
  function submitForm(e){
      e.preventDefault();
      // var username=document.getElementById("username").value;

      var meme=document.getElementById("cbx1").checked;
      var meme_fee=0;
      var boom=document.getElementById("cbx2").checked;
      var boom_fee=0;
      var tell=document.getElementById("cbx3").checked;
      var tell_fee=0;
      var short=document.getElementById("cbx4").checked;
      var short_fee=50;
      var dance=document.getElementById("cbx5").checked;
      var dance_fee=0;
  	  var drama=document.getElementById("cbx6").checked;
      var drama_fee=0;
      total_fee=return_true(meme,meme_fee)+return_true(boom,boom_fee)+return_true(tell,tell_fee)+return_true(short,short_fee)+return_true(dance,dance_fee)+return_true(drama,drama_fee);
      writeUserData(user,meme,boom,tell,short,dance,drama,total_fee);
  }
}

function writeUserData(user,meme,boom,tell,short,dance,drama,total_fee) {
  firebase.database().ref('dnd').child(user.uid+"").set({
      username: user.email,
      MEME_FINITY_WAR:meme,
      BOOMERANG:boom,
      TELL_A_TALE:tell,
      LIGHTS_CAMERA_ACTION:short,
      DANZOMANIO:dance,
      DRAMEBAAZ:drama,
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
      var leadsRef = firebase.database().ref('dnd/'+user.uid);
      var flag=true;
      leadsRef.on('value', function(snapshot) {
                var child = snapshot.val();
                if(child==null &&flag) {
                  flag=false;

                }
                else if(flag){
                  flag=false;
                  document.getElementById("cbx1").checked=child.MEME_FINITY_WAR;
                  document.getElementById("cbx2").checked=child.BOOMERANG;
                  document.getElementById("cbx3").checked=child.TELL_A_TALE;
                  document.getElementById("cbx4").checked=child.LIGHTS_CAMERA_ACTION;
                  document.getElementById("cbx5").checked=child.DANZOMANIO;
                  document.getElementById("cbx6").checked=child.DRAMEBAAZ;
                }
        });
}