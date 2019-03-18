function doNext(user) {
  var messageRef=firebase.database().ref('paper');
  document.getElementById('paper').addEventListener('submit',submitForm);
  function submitForm(e){
      e.preventDefault();
      // var username=document.getElementById("username").value;
      var sel = document.getElementById('search_categories');
      var opt = sel.options[sel.selectedIndex];
      writeUserData(user,opt.value);
  }
}

function writeUserData(user,topic) {
        firebase.database().ref('paper').child(user.uid+"").set({
            username: user.email,
            TOPIC:topic,
            paid: 1,
        });
        window.alert("registered successfully");
        window.location.href='../../../index.html';
}
