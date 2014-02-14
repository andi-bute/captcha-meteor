window.VisualCaptcha = {};

Template.captcha.selectedWord = function() { 
  return Session.get("selectedWord");
};

Template.captcha.images = function() {
  return Session.get("captchaImages");
}

Template.statusMessage.msg = function() {
  return Session.get("statusMessage");
}

Template.captcha.created = function(){
	var SERVER = window.location.origin;
  var urls = {
    start: SERVER + "/captcha/start/5"
  }
  var imageName = "";
  $.get(urls.start, function(res) {
    var jsonResp = JSON.parse(res);
    var images = [];
    Session.set("selectedWord", jsonResp.imageName);
    jsonResp.values.forEach(function(val, idx) {
      images.push({idx: idx, val: val});
    })
    Session.set("captchaImages", images);
  });
}
Template.captcha.rendered = function(){
  var captchaEl = $( '#sample-captcha' ).visualCaptcha({
          imgPath: '/packages/captcha/images/img/',
          captcha: {
              url: window.location.origin,
              numberOfImages: 5
          }
      } );
      VisualCaptcha.captcha = captchaEl.data( 'captcha' );

      
      var queryString = window.location.search;
      // Show success/error messages
      
}

VisualCaptcha.validateCaptcha = function(callback){
  var data = VisualCaptcha.captcha.getCaptchaData();
  Meteor.call("validateCaptcha",data, function(err,result){
    if(!err){
      if ( result === 'noCaptcha') {
        Session.set("statusMessage", { valid: "", css: "icon-no", text: "visualCaptcha was not started!" } );
      } else if ( result === 'validImage'){
          Session.set("statusMessage", { valid: "valid",css: "icon-yes", text: "Image was valid!" } );
          callback()
      } else if ( result ==='failedImage'){
          Session.set("statusMessage", { valid: "",css: "icon-no", text: "Image was NOT valid!" } );
      } else if ( result === 'validAudio'){
          Session.set("statusMessage", { valid: "valid",css: "icon-yes", text: "Accessibility answer was valid!" } );
          callback();
      } else if ( result === 'failedAudio'){
          Session.set("statusMessage", { valid: "",css: "icon-no", text: "Accessibility answer was NOT valid!" } );
      } else if ( result === 'failedPost'){
          Session.set("statusMessage", { valid: "",css: "icon-no", text: "No visualCaptcha answer was given!" } );
      }
    }
    
  });
}