/** @type {HTMLCanvasElement} */

const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

let block_color = ['#000', '#fff', '#00f', '#0f9', '#ff0', '#f90', '#f00'];

let select = 1;

// 12*9

function init() {
    area = [];
    let x, y = 20;

    for (let i = 0; i < 9; i++) {
        x = 30;
        for (let j = 0; j < 12; j++) {
            areaAdd(x, y);
            x += 58;
        }
        y += 40;
    }

    ctx.lineWidth = 5;
    ctx.strokeStyle = '#fff';
    for (let i = 0; i < area.length; i++) {
        ctx.strokeRect(area[i].x, area[i].y, 58, 40);
        ctx.fillStyle = block_color[area[i].hard];
        ctx.fillRect(area[i].x, area[i].y, 58, 40);
    }

    for (let i = 0; i < 7; i++) {
        ctx.strokeRect((i * 60) + 165, canvas.height - 62, 60, 60);
        ctx.fillStyle = block_color[i];
        ctx.fillRect((i * 60) + 165, canvas.height - 62, 60, 60);

        ctx.fillStyle = '#999';
        ctx.font = 'bold 25px sans-serif';
        let textWidth = ctx.measureText(i).width;
        ctx.fillText(i, ((60 - textWidth) / 2) + (i * 60) + 165, canvas.height - 18);
    }

    ctx.strokeRect(630, canvas.height - 52, 40, 40);
    ctx.fillStyle = block_color[select];
    ctx.fillRect(630, canvas.height - 52, 40, 40);

    ctx.fillStyle = '#000';
    ctx.strokeRect(40, canvas.height - 52, 80, 40);
    ctx.fillRect(40, canvas.height - 52, 80, 40);
    ctx.strokeRect(40, canvas.height - 92, 80, 40);
    ctx.fillRect(40, canvas.height - 92, 80, 40);
    ctx.fillStyle = '#fff';
    ctx.font = 'bold 18px sans-serif';
    let text = 'CLEAR';
    let textWidth = ctx.measureText(text).width;
    ctx.fillText(text, ((80 - textWidth) / 2) + 40, canvas.height - 64);
    text = 'COPY';
    textWidth = ctx.measureText(text).width;
    ctx.fillText(text, ((80 - textWidth) / 2) + 40, canvas.height - 24);
}


document.addEventListener('mousemove', mouseMove, false);
function mouseMove(e) {
    if (e.offsetX >= 0 && e.offsetX <= 750 && e.offsetY >= 0 && e.offsetY <= 500) {
        draw(e);
    }
}
let copy = false;

document.addEventListener('click', mouseClick, false);
function mouseClick(e) {
    if (e.offsetX > 40 && e.offsetX < 120 && e.offsetY > canvas.height - 92 && e.offsetY < canvas.height - 52) {
        copy = false;
        init();
        return;
    }

    for (let i = 0; i < area.length; i++) {
        copy = false;
        if (e.offsetX > area[i].x && e.offsetX < area[i].x + 58 && e.offsetY > area[i].y && e.offsetY < area[i].y + 40) {
            area[i].hard = select;
            break;
        }
    }

    for (let i = 0; i < 7; i++) {
        if (e.offsetX > ((i * 60) + 165) && e.offsetX < ((i * 60) + 165) + 60 && e.offsetY > canvas.height - 62) {
            select = i;
            break;
        }
    }

    if (e.offsetX > 40 && e.offsetX < 120 && e.offsetY > canvas.height - 52) {
        let output = ', [\n', counter = 0;
        for (let i = 0; i < 9; i++) {
            output += '   [';
            for (let j = 0; j < 12; j++) {
                output += area[counter].hard + ', ';
                counter++;
            }
            output = output.slice(0, output.length - 2);
            output += '],\n';
        }
        output = output.slice(0, output.length - 2);
        output += '\n]';
        console.log(output);
        navigator.clipboard.writeText(output);
        copy = true;

        // const blob = new Blob([output], { type: 'text/plain' });
        // const a = document.createElement('a');
        // a.href = URL.createObjectURL(blob);
        // a.download = 'stage.txt';
        // a.click();
    }

    draw(e);
}

function draw(e) {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    for (let i = 0; i < 7; i++) {
        ctx.strokeRect((i * 60) + 165, canvas.height - 62, 60, 60);
        ctx.fillStyle = block_color[i];
        ctx.fillRect((i * 60) + 165, canvas.height - 62, 60, 60);

        ctx.fillStyle = '#999';
        ctx.font = 'bold 25px sans-serif';
        let textWidth = ctx.measureText(i).width;
        ctx.fillText(i, ((60 - textWidth) / 2) + (i * 60) + 165, canvas.height - 18);
    }

    for (let i = 0; i < area.length; i++) {
        ctx.strokeRect(area[i].x, area[i].y, 58, 40);
        ctx.fillStyle = block_color[area[i].hard];
        ctx.fillRect(area[i].x, area[i].y, 58, 40);
    }

    ctx.fillStyle = '#000';
    ctx.strokeRect(40, canvas.height - 52, 80, 40);
    ctx.fillRect(40, canvas.height - 52, 80, 40);
    ctx.strokeRect(40, canvas.height - 92, 80, 40);
    ctx.fillRect(40, canvas.height - 92, 80, 40);
    ctx.fillStyle = '#fff';
    ctx.font = 'bold 18px sans-serif';
    let text = 'CLEAR';
    let textWidth = ctx.measureText(text).width;
    ctx.fillText(text, ((80 - textWidth) / 2) + 40, canvas.height - 64);
    text = 'COPY';
    textWidth = ctx.measureText(text).width;
    ctx.fillText(text, ((80 - textWidth) / 2) + 40, canvas.height - 24);
    if (copy == true) {
        text = 'COPIED!';
        textWidth = ctx.measureText(text).width;
        ctx.fillText(text, (canvas.width - textWidth) / 2, canvas.height - 90);
    }

    ctx.strokeRect(630, canvas.height - 52, 40, 40);
    ctx.fillStyle = block_color[select];
    ctx.fillRect(630, canvas.height - 52, 40, 40);

    ctx.beginPath();
    ctx.arc(e.offsetX, e.offsetY, 6, 0, 2 * Math.PI);
    ctx.closePath();
    ctx.stroke();
    ctx.fill();
}

class Area {
    constructor(x, y, hard) {
        this.x = x;
        this.y = y;
        this.hard = hard;
    }
}

let area = [];
function areaAdd(x, y) {
    let ax = x;
    let ay = y;
    let ah = 0;

    let a = new Area(ax, ay, ah);
    area.push(a);
}

init();