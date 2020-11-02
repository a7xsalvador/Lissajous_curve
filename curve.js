let dt=0.01;
let particulas=[];

//se dibuja el rastro del movimiento con el codigo de https://p5js.org/examples/interaction-follow-3.html
let x = [],
  y = [],
  segNum = 10,
  segLength = 4;

for (let i = 0; i < segNum; i++) {
  x[i] = 0;
  y[i] = 0;
}

function dragSegment(i, xin, yin) {
  const dx = xin - x[i];
  const dy = yin - y[i];
  const angle = atan2(dy, dx);
  x[i] = xin - cos(angle) * segLength;
  y[i] = yin - sin(angle) * segLength;
  segment(x[i], y[i], angle);
}

function segment(x, y, a) {
  push();
  translate(x, y);
  rotate(a);
  line(0, 0, segLength, 0);
  pop();
}

//Se define la particula
class Particula{
  constructor(){
    this.x=width/2;
    this.y=height/2;
    this.vx=random(0,3000);
    this.vy=random(0,3000);
    this.ax=0;
    this.ay=0;
    this.kx=random(100,1000);
    this.ky=random(100,1000);
  }
  mover(particulas){
    //se aplica la ley de Hooke
    this.ax=-this.kx*(this.x-width/2);
    this.ay=-this.ky*(this.y-height/2);
    
    //Algoritmo de Euler
    this.vx+=this.ax*dt;
    this.vy+=this.ay*dt; 
    this.x+=this.vx*dt;
    this.y+=this.vy*dt;
  }
}

function setup() {
  createCanvas(800, 400);
  strokeWeight(9);
  stroke(255, 100)
  particulas.push(new Particula());

}

function draw() {
  background(0);
  for(let i = 0;i<particulas.length;i++) {
    dragSegment(0, particulas[i].x,particulas[i].y);
    for (let i = 0; i < x.length - 1; i++) {
      dragSegment(i + 1, x[i], y[i]);
    }
    particulas[i].mover(particulas);
  }
}
