function doNext(user) {
  var messageRef=firebase.database().ref('magazine');
  document.getElementById('mgz').addEventListener('submit',submitForm);
  var total_fee=0;
  fetchData(user);
  function submitForm(e){
      e.preventDefault();
      // var username=document.getElementById("username").value;
      var book=document.getElementById("cbx1").checked;
      var book_fee=0;
      var ill=document.getElementById("cbx2").checked;
      var ill_fee=0;
      total_fee=return_true(book,book_fee)+return_true(ill,ill_fee);
      writeUserData(user,book,ill,total_fee);
  }
}

function writeUserData(user,book,ill,total_fee) {

        firebase.database().ref('magazine').child(user.uid+"").set({
            username: user.email,
            BOOKFIE:book,
            ILLUSION:ill,
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
      var leadsRef = firebase.database().ref('magazine/'+user.uid);
      var flag=true;
      leadsRef.on('value', function(snapshot) {
                var child = snapshot.val();
                if(child==null &&flag) {
                  flag=false;

                }
                else if(flag){
                  flag=false;
                  document.getElementById("cbx1").checked=child.BOOKFIE;
                  document.getElementById("cbx2").checked=child.ILLUSION;
                }
        });
}
