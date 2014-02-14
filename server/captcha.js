if (Meteor.isServer) {
  var session = {}; //global fake session for server side 
  var VisualCaptcha = (VisualCaptcha != undefined) ? VisualCaptcha : null;
  Meteor.startup(function () {
    //Define the routes of the API
    Router.map(function () {
      this.route("audio", {
        path: "/captcha/audio/?:type?",
        where: 'server',
        action: getAudio
      });
      this.route("image", {
        path: "/captcha/image/:index",
        where: 'server',
        action: getImage
      });
      this.route("start", {
        path: "/captcha/start/:howmany",
        where: 'server',
        action: start
      });
    });
  });
  Meteor.methods({
    validateCaptcha: function(data){
      var status;
      // It's not impossible this method is called before VisualCaptcha is initialized, so we have to send a 404
      if ( ! VisualCaptcha ) {
          status = 'noCaptcha';
      } else {
          frontendData = VisualCaptcha.getFrontendData();
          // If an image field name was submitted, try to validate it
          if ( data.name === frontendData.imageFieldName ) {
              if ( VisualCaptcha.validateImage(data.value) ) {
                  status = 'validImage';
              } else {
                  status = 'failedImage';
              }
          } else if ( data.name === frontendData.audioFieldName ) {
              if ( VisualCaptcha.validateAudio(data.value.toLowerCase()) ) {// We set lowercase to allow case-insensitivity, but it's actually optional
                  status = 'validAudio';
              } else {
                  status = 'failedAudio';
              }
          } else {
              status = 'failedPost';
          }
          // We need to know how many images were generated before, to generate the same number again
          var howmany = VisualCaptcha.getImageOptions().length;
          VisualCaptcha.generate( howmany );
          return status;
      }
    }
  });

  function allowCORS(res) {
    res.setHeader("access-control-allow-origin", "*");
  }

  function getAudio() {
    var type = this.params.type;
    // It's not impossible this method is called before VisualCaptcha is initialized, so we have to send a 404
    allowCORS(this.response);
    if ( ! VisualCaptcha ) {
      this.response.writeHead(404);
      this.response.end('Not Found');
    } else {
      // Default file type is mp3, but we need to support ogg as well
      if ( type !== 'ogg' ) {
          type = 'mp3';
      }

      var result = VisualCaptcha.getAudio( this.response, type );
      if(!result.error) {
        this.response.writeHead(200);
        this.response.end(result.audio);
      } else {
        this.response.writeHead(result.errorCode);
        this.response.end(result.errorMsg);
      }
    }
  }

  function getImage() {
    allowCORS(this.response);
    try {
      var result = VisualCaptcha.getImage(this.params.index, this.request.query.retina, this.response);
      if(!result.error) {
        this.response.writeHead(200);
        this.response.end(result.image);
      } else {
        this.response.writeHead(result.errorCode);
        this.response.end(result.errorMsg);
      }
    } catch (er){
      this.response.writeHead(400);
      this.response.end(er.toString());
    }
  }

  function start() {
     // After initializing VisualCaptcha, we only need to generate new options
    allowCORS(this.response);
    if ( ! VisualCaptcha ) {
        VisualCaptcha = new Meteor.VisualCaptcha(session);
    }
    this.response.writeHead(200);
    this.response.end(VisualCaptcha.start( this.params.howmany ));
  }
}