import { TweenLite } from "gsap";

export default class Point {
    constructor(_x, _y, _ix, _iy, _context, _sizes, _cursor, big) {
        this.x = _x;
        this.ix = _ix;
        this.vx = 0;
        this.vy = 0;
        this.cx = 0;
        this.y = _y;
        this.iy = _iy;
        this.cy = 0;
        this.sizes = _sizes
        this.cursor = _cursor
        this.context = _context;
        
        this.viscosity = 200;
        this.mouseDist = 120;
        this.damping = 0.05;

        
        this.angle = (Math.random() - 0.5) * Math.PI*2
        this.randomPosition()
        this.resetAfterStart()
    }

    resetAfterStart() {
        setTimeout(() => {
            this.viscosity = 30;
            this.mouseDist = 120;
            this.damping = 0.1;
        }, 2000);
    }



    
    
    randomPosition() {
        let interval = Math.floor(Math.random() * 3)
        let time = [3000, 6000, 9000]
        setInterval(() => {
            this.angle = -this.angle
            interval = Math.floor(Math.random() * 3)
        }, time[interval]);

        const loop = () => {
            window.requestAnimationFrame(loop)
            this.x += (this.angle / 20)
            this.y += (this.angle / 20)
        }
          
        loop()
          
    }
    
    coordX() {
        var dx = this.ix - this.cursor.x,
        dy = this.iy - this.cursor.y;
        this.vx += (this.ix - this.x) / this.viscosity;
        // Move point only when leaving color block
        if ((this.cursor.directionX > 0 && this.cursor.x > this.x) || (this.cursor.directionX < 0 && this.cursor.x < this.x)) {
            if (Math.sqrt(dx * dx) < this.mouseDist && Math.sqrt(dy * dy) < this.mouseDist) {
                this.vx = this.cursor.speedMouseX / 8
            } 
        } 
        
        this.vx *= (1 - this.damping);
        

        this.x += this.vx
        return this.vx;
    }
    
    
    coordY() {
        var dx = this.ix - this.cursor.x,
        dy = this.iy - this.cursor.y;
        this.vy += (this.iy - this.y) / this.viscosity ;
        
        if ((this.cursor.directionY > 0 && this.cursor.y > this.y) || (this.cursor.directionY < 0 && this.cursor.y < this.y)) {
            if (Math.sqrt(dx * dx) < this.mouseDist && Math.sqrt(dy * dy) < this.mouseDist) {
                this.vy = this.cursor.speedMouseY / 8
            }
        } 
        
        this.vy *= (1 - this.damping);
        this.y += this.vy
        return this.vy;
    }

}