/**
 * Created by Jerome on 03-03-16.
 */
//noinspection JSCheckFunctionSignatures,JSCheckFunctionSignatures,JSCheckFunctionSignatures
let w = 1920;
let h = 1920;
var cw = (screen.width * 0.8);
var ch = screen.height;
let dw;
let dh;
var zoom = 2;
function detectMob() {
    const toMatch = [
        /Android/i,
        /webOS/i,
        /iPhone/i,
        /iPad/i,
        /iPod/i,
        /BlackBerry/i,
        /Windows Phone/i
    ];
    
    return toMatch.some((toMatchItem) => {
        return navigator.userAgent.match(toMatchItem);
    });
}
const mobile = detectMob();
if(mobile == true){
  zoom = 1.25;
}
let midw = parseInt(w / 2);
let midh = parseInt(h / 2);
var config = {
    type: Phaser.WEBGL,
    width: cw,
    height: ch,
    physics: {
        default: 'arcade',
        arcade: {
            debug: false
        }
    },
    fps: {
        target: 90,
        forceSetTimeOut: true
    },
    scene: {
        preload: Game.preload,
        create: Game.create,
        update: Game.update
    }
};

var Cthis;
var player;
var cursors;
var ts;
var iter = 0;
var bg;
var limits;
var roofs;
var guns;
var dashs;
var repulse = 2.5;
var spriteMe = '';
var indexCli;
var spriteCli;
var sprites = ['joaquim', 'isaac', 'peko', 'hyoma', 'master'];
var person = window.location.href;
person = person.split("?p=");
spriteMe = person[1];

if((sprites.includes(spriteMe) == false) || spriteMe == null){
    spriteMe = 'isaac';
}

// window.history.replaceState('nextState', '', person[0]);

var collided = false;

let pressed = "";
let pressedH = "";
let pressedV = "";
let kv = 0;
let kh = 0;
let dash = 0;
let dashing = false;
let sprinted = false;
var velocity;
var fr = 0;
var recharged = true; 
var rechargedH = true;    
var p = false;
var send_test = 0;
var verifyed = 0;
var found = 0;
var playerids = [];
var movement = 'turn';
var powered = false;
var sended = false;
var saque = false;
var me = -1;
var indexMe;
var signal;
var direction;
var dead = false;
var danim = false;
var reached = false;
var masterIn = false;
var gun = false;
var capsulate = false;
var touchX = 0;
var touchY = 0;
var touched = 0;
var movePx = 0;
var movePy = 0;
var round;
var analog;
var pointer;
var rpx, rpy;
var apx, apy;

var game = new Phaser.Game(config);

// click to full screen
function toggleFullscreen(elem) {
    elem = elem || document.documentElement;
    if (
      !document.fullscreenElement &&
      !document.mozFullScreenElement &&
      !document.webkitFullscreenElement &&
      !document.msFullscreenElement
    ) {
      if (elem.requestFullscreen) {
        elem.requestFullscreen();
      } else if (elem.msRequestFullscreen) {
        elem.msRequestFullscreen();
      } else if (elem.mozRequestFullScreen) {
        elem.mozRequestFullScreen();
      } else if (elem.webkitRequestFullscreen) {
        elem.webkitRequestFullscreen(Element.ALLOW_KEYBOARD_INPUT);
      }
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen();
      } else if (document.msExitFullscreen) {
        document.msExitFullscreen();
      } else if (document.mozCancelFullScreen) {
        document.mozCancelFullScreen();
      } else if (document.webkitExitFullscreen) {
        document.webkitExitFullscreen();
      }
    }
  }
  $('#clickFullscreen').on('click', function () {
    toggleFullscreen();
  });

  function roll(dado){
    var valor = Math.floor(Math.random() * dado) + 1;
    // console.log(valor);
    if(valor == 1){
      var color = `class="text-danger" `;
    }
    else if(valor == dado){
      var color = `class="text-success" `;
    }
    else{
      var color = ``;
    }
    var data = `<div>
                <h5 style="text-transform:capitalize;">${spriteMe}</h5>
                <div class="col-12" style="height: 3px; background-color: #a3adba; border-radius: 1px; margin-bottom: 15px; margin-top: 15px;"></div>
                <div style="margin-bottom: 3px;"><h4>Rolando D${dado}</h4></div>
                <span style="margin-bottom: 3px; border: solid 1px #183153; padding: 3px;"><strong ${color}style="font-size: 20px;">${valor}</strong></span>
                <div class="col-12" style="height: 3px; background-color: #a3adba; border-radius: 1px; margin-bottom: 15px; margin-top: 15px;"></div>
                </div>`
    Client.sendRoll(data);
  }