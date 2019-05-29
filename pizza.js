const PI_2 = Math.PI * 2;

class Pizza {
  constructor(el) {
    this.el = el;
    this.ctx = el.getContext('2d');

    // radius in pixels
    this.radius = 200;
    this.pepSize = this.radius * 0.15;
    this.pepMinDist = this.radius * 0.4;
    this.pepMaxDist = this.radius * 0.8;
    this.strokeStyle = '#000';
    this.lineWidth = this.radius * 0.02;

    const padding = 50;
    this.el.width = (this.radius * 2) + padding;
    this.el.height = (this.radius * 2) + padding;

    this.names = [
      'Tinky Winky',
      'Dipsy',
      'La La',
      'Po',
      'John McClane',
      'J R R Tolkien'
    ];

    this.sliceCount = this.names.length;
    this.slices = [];
    this.arcSize = PI_2 / this.sliceCount;

    this.ctx.translate(padding / 2, padding / 2);

    for (let i = 0; i < this.sliceCount; i++) {
      this.drawSlice(i);
    }
  }

  drawSlice(index) {
    const arcStart = this.arcSize * index;
    const arcEnd = this.arcSize * (index + 1);

    const ctx = this.ctx;

    ctx.fillStyle = '#ffe192';
    ctx.strokeStyle = this.strokeStyle;
    ctx.lineWidth = this.lineWidth;

    // base
    ctx.beginPath();
    ctx.moveTo(this.radius, this.radius);
    ctx.arc(this.radius, this.radius, this.radius, arcStart, arcEnd);

    ctx.lineTo(this.radius, this.radius);
    ctx.fill();
    ctx.stroke();

    // crust
    const crustSize = this.radius * 0.1;
    ctx.strokeStyle = '#ff6f36';
    ctx.lineWidth = crustSize;

    ctx.beginPath();
    ctx.arc(this.radius, this.radius, this.radius - (crustSize / 2), arcStart, arcEnd);
    ctx.stroke();

    // pepperoni
    const midArc = arcEnd - (this.arcSize / 2);

    const pepX = this.radius + Math.cos(midArc) * this.randBetween(this.pepMinDist, this.pepMaxDist);
    const pepY = this.radius + Math.sin(midArc) * this.randBetween(this.pepMinDist, this.pepMaxDist);

    ctx.beginPath();
    ctx.ellipse(pepX, pepY, this.pepSize, this.pepSize, 0, 0, PI_2);
    ctx.fillStyle = '#ff5a5a';
    ctx.strokeStyle = this.strokeStyle;
    ctx.lineWidth = this.lineWidth;
    ctx.fill();
    ctx.stroke();

    // text label
    const initials = this.names[index].split(' ').map((part) => {
      return part[0];
    }).join('').substring(0, 3);

    ctx.save();
    ctx.translate(pepX, pepY);
    // ctx.rotate(arcStart + (arcEnd - arcStart) / 2);

    ctx.fillStyle = '#ffffff';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.font = '20px Arial';
    ctx.fillText(initials, 0, 0);

    ctx.restore();
  }

  randBetween(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }
}
