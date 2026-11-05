// PLACEHOLDER signup: shows a thank-you only. Nothing is sent or stored until an email service is connected.
(function(){
  var f=document.getElementById('signup'),t=document.getElementById('thanks');
  if(!f)return;
  f.addEventListener('submit',function(e){
    e.preventDefault();
    var i=f.querySelector('input');
    if(!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(i.value.trim())){f.classList.add('err');i.focus();i.setAttribute('aria-invalid','true');return;}
    f.hidden=true;t.hidden=false;
  });
})();
