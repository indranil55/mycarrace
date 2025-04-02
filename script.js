const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");
canvas.width = 500;
canvas.height = 700;

const road = { x: 100, y: 0, width: 300, height: canvas.height, color: "brown" };
const whiteLines = [];
for (let i = 0; i < 10; i++) {
    whiteLines.push({ x: 240, y: i * 100, width: 10, height: 40, color: "white" });
}

const car = { x: 225, y: 600, width: 50, height: 80, color: "red", speed: 5 };
const obstacles = [];
const powerUps = [];

const scenery = [
    { x: 20, y: 50, width: 50, height: 50, color: "green" }, // Tree
    { x: 10, y: 150, width: 60, height: 60, color: "blue" }, // House
    { x: 400, y: 200, width: 80, height: 50, color: "gray" }, // Hospital
];

function drawRect(obj) {
    ctx.fillStyle = obj.color;
    ctx.fillRect(obj.x, obj.y, obj.width, obj.height);
}

function drawScene() {
    ctx.fillStyle = "skyblue";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    drawRect(road);
    whiteLines.forEach(drawRect);
    scenery.forEach(drawRect);
    drawRect(car);
    obstacles.forEach(drawRect);
    powerUps.forEach(drawRect);
}

function update() {
    whiteLines.forEach(line => {
        line.y += car.speed;
        if (line.y > canvas.height) line.y = -40;
    });

    obstacles.forEach(obstacle => {
        obstacle.y += car.speed;
        if (obstacle.y > canvas.height) {
            obstacle.y = -100;
            obstacle.x = 100 + Math.random() * 200;
        }
    });

    powerUps.forEach(powerUp => {
        powerUp.y += car.speed;
        if (powerUp.y > canvas.height) {
            powerUp.y = -200;
            powerUp.x = 100 + Math.random() * 200;
        }
    });

    drawScene();
    requestAnimationFrame(update);
}

function generateObstacles() {
    for (let i = 0; i < 3; i++) {
        obstacles.push({ x: 100 + Math.random() * 200, y: -i * 200, width: 50, height: 80, color: "black" });
    }
}

function generatePowerUps() {
    powerUps.push({ x: 100 + Math.random() * 200, y: -300, width: 30, height: 30, color: "yellow" });
}

document.addEventListener("keydown", (event) => {
    if (event.key === "ArrowLeft" && car.x > road.x) car.x -= 20;
    if (event.key === "ArrowRight" && car.x + car.width < road.x + road.width) car.x += 20;
    if (event.key === "ArrowUp") car.speed = 10;
});

document.addEventListener("keyup", (event) => {
    if (event.key === "ArrowUp") car.speed = 5;
});

generateObstacles();
generatePowerUps();
update();
