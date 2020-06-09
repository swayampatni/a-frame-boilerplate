var scene = document.querySelector('a-scene');
if (scene.hasLoaded) {
  run();
} else {
  scene.addEventListener('loaded', run);
}

// Better setTimeout, using rAF
window.requestTimeout = function(fn, delay) {
  var start = new Date().getTime();
  var handle = new Object();
  function loop(){
    var current = new Date().getTime();
    var delta = current - start;
    delta >= delay ? fn.call() : handle.value = requestAnimationFrame(loop);
  };
  handle.value = requestAnimationFrame(loop);
  return handle;
};

function run() {

  var ghost = document.querySelector('#phantom');
  var spider = document.querySelector('#arachnid');
  var startBtn = document.querySelector('#start');

  startBtn.addEventListener('click', event => {
    event.currentTarget.setAttribute('visible', false);
    requestTimeout(() => {
      spider.emit('spider-attack');
    }, 3500);
  });

  document.querySelector('#spider-attack-start').addEventListener('animationend', () => {
    requestTimeout(() => {
      spider.emit('spider-retreat');
    }, 2000);
  });

  ghost.addEventListener('click', event => {
    event.currentTarget.emit('ghost-attack');
  });

  document.querySelector('#ghost-opacity').addEventListener('animationend', () => {
    ghost.emit('ghost-hide');
  });

  // document.querySelector('#restart').addEventListener('click', event => {
  //   startBtn.setAttribute('visible', true);
  //   ghost.setAttribute('visible', true);
  // });
}
