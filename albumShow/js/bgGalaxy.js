window.onload = function(){
	var canvas = document.querySelector('canvas');
	var gc = canvas.getContext('2d');
	
	canvas.width = window.innerWidth;
	canvas.height = window.innerHeight;
	
	var particleCount = 750;
	var mouse = {
	    x: window.innerWidth / 2,
	    y: window.innerHeight / 2
	};
	
	window.addEventListener("mousemove",
	function(event) {
	    mouse.x = event.clientX - canvas.width / 2;
	    mouse.y = event.clientY - canvas.height / 2;
	});
	
	window.addEventListener("resize",
	function() {
	    canvas.width = window.innerWidth;
	    canvas.height = window.innerHeight;
	
	    lightParticles = [];
	    initializeParticles();
	});
	
	function LightParticle(x, y, radius, color) {
	    this.x = x;
	    this.y = y;
	    this.radius = radius;
	    this.color = color;
	
	    this.update = function() {
	
	        this.draw();
	    };
	
	    this.draw = function() {
	        gc.save();
	        gc.beginPath();
	        gc.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
	        gc.shadowColor = this.color;
	        gc.shadowBlur = 15;
	        gc.shadowOffsetX = 0;
	        gc.shadowOffsetY = 0;
	        gc.fillStyle = this.color;
	        gc.fill();
	        gc.closePath();
	        gc.restore();
	    };
	}
	
	var lightParticles = [];
	
	var timer = 0;
	var opacity = 1;
	var speed = 0.0005;
	var colors = ["#0952BD", "#A5BFF0", "#118CD6", "#1AAEE8", "#F2E8C9"];
	
	var initializeParticles;
	
	(initializeParticles = function() {
	    for (var i = 0; i < particleCount; i++) {
	
	        var randomColorIndex = Math.floor(Math.random() * 6);
	        var randomRadius = Math.random() * 2;
	        var x = (Math.random() * (canvas.width + 200)) - (canvas.width + 200) / 2;
	        var y = (Math.random() * (canvas.width + 200)) - (canvas.width + 200) / 2;
	        lightParticles.push(new LightParticle(x, y, randomRadius, colors[randomColorIndex]));
	    }
	})();
	
	function animate() {
	    window.requestAnimationFrame(animate);
	
	    gc.save();
	    if (isMouseDown === true) {
	        var desiredOpacity = 0.01;
	        opacity += (desiredOpacity - opacity) * 0.03;
	        gc.fillStyle = "rgba(18, 18, 18," + opacity + ")";
	        var desiredSpeed = 0.012;
	        speed += (desiredSpeed - speed) * 0.01;
	        timer += speed;
	
	    } else {
	        var originalOpacity = 1;
	        opacity += (originalOpacity - opacity) * 0.01;
	        gc.fillStyle = "rgba(18, 18, 18, " + opacity + ")";
	        var originalSpeed = 0.001;
	        speed += (originalSpeed - speed) * 0.01;
	        timer += speed;
	
	    }
	    gc.fillRect(0, 0, canvas.width, canvas.height);
	    gc.translate(canvas.width / 2, canvas.height / 2);
	    gc.rotate(timer);
	
	    for (var i = 0; i < lightParticles.length; i++) {
	        lightParticles[i].update();
	    }
	
	    gc.restore();
	
	}
	
	var isMouseDown = false;
	
	window.addEventListener("mousedown",
	function() {
	    isMouseDown = true;
	});
	
	window.addEventListener("mouseup",
	function() {
	    isMouseDown = false;
	});
	
	animate();
}
