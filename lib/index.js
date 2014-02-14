var visualCaptcha = null; 

var VisualCaptcha = function(session) {
  this.session = session;
}

VisualCaptcha.prototype.start = function(howmany) {
    // After initializing visualCaptcha, we only need to generate new options
    if ( ! visualCaptcha ) {
      visualCaptcha = Npm.require( 'visualcaptcha' )( this.session );
    }
    visualCaptcha.generate( howmany );
    return JSON.stringify(visualCaptcha.getFrontendData());

}

VisualCaptcha.prototype.getAudio = function(res, type) {
  // It's not impossible this method is called before visualCaptcha is initialized, so we have to send a 404
  if ( ! visualCaptcha ) {
      return { error: true, errorCode: 404, errorMsg: 'Not Found' };
  } else {
    return visualCaptcha.getAudio( res, type);
  }
}

VisualCaptcha.prototype.getImage = function(index, retina, response) {
  var isRetina = false;

  // It's not impossible this method is called before visualCaptcha is initialized, so we have to send a 404
  if ( ! visualCaptcha ) {
      return { error: true, errorCode: 404, errorMsg: 'Not Found' };
  } else {
    // Default is non-retina
    if ( retina ) {
        isRetina = true;
    }
    return visualCaptcha.getImage( index, response, isRetina);
  }

}

VisualCaptcha.prototype.generate = function(num) {
  return visualCaptcha.generate(num);
}

VisualCaptcha.prototype.getImageOptions = function() {
  return visualCaptcha.getImageOptions();
}

VisualCaptcha.prototype.getValidImageOption = function() {
  return visualCaptcha.getValidImageOptions();
}

VisualCaptcha.prototype.validateImage = function(sentOption) {
  return visualCaptcha.validateImage(sentOption)
}

VisualCaptcha.prototype.validateAudio = function(opt) {
  return visualCaptcha.validateAudio(opt);
}

VisualCaptcha.prototype.getFrontendData = function() {
  return visualCaptcha.getFrontendData();
}

Meteor.VisualCaptcha = VisualCaptcha;