import { GameService, ChangeResult } from "./GameService";

const cellHeight = 14;
const cellWidth = cellHeight;
const cellBorder = 2;

function drawChanges(ctx: CanvasRenderingContext2D, 
    changes: Array<ChangeResult>) {

    changes.forEach(c => {
        let xPos = c.x * cellWidth + (c.x * cellBorder);
        let yPos = c.y * cellWidth + (c.y * cellBorder);

        if (c.state) {
            ctx.fillRect(xPos, yPos, cellWidth, cellHeight);
        } else {
            ctx.clearRect(xPos, yPos, cellWidth, cellHeight);
        }
    });
}

document.addEventListener("DOMContentLoaded", function(){
    const service = new GameService(150, 150)
    let changes: Array<ChangeResult> = [
        new ChangeResult(0, 1, true),
        new ChangeResult(1, 1, true),
        new ChangeResult(2, 1, true),

        new ChangeResult(6, 1, true),
        new ChangeResult(6, 2, true),
        new ChangeResult(7, 1, true),        
        new ChangeResult(7, 2, true), 
        
        new ChangeResult(10, 10, true),
        new ChangeResult(12, 10, true),
        new ChangeResult(11, 11, true),        
        new ChangeResult(12, 11, true),                
        new ChangeResult(11, 12, true),                
      ];

    service.applyChanges(changes);

    let canvas  = <HTMLCanvasElement> document.getElementById('grid');

    if (!canvas) {
        console.log("oops no canvas ");
        return;
    }

    let ctx : CanvasRenderingContext2D | null = canvas.getContext('2d');

    if (ctx) {
        let c: CanvasRenderingContext2D = ctx;
        drawChanges(c, changes);

        setInterval(() => {
            changes = service.tick();
            drawChanges(c, changes);
        }, 1000);
    }
});
