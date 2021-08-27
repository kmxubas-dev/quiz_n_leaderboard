class Header {
    constructor (container) {
        this.container = $(container);
        this.text = $(container+' #headerText');
        this.canvas = $(container+' #canvas');

        this.ctx = this.canvas[0].getContext('2d');
        this.arc_startingAngle = Math.PI * 0.75;
        this.arc_endingAngle = Math.PI * 0.25;

        this.drawGaugeBackground();
    }



    drawGaugeBackground = () => {
        let imd = null;
      
        this.ctx.beginPath();
        this.ctx.strokeStyle = "#cccccc";
        this.ctx.lineCap = "round";
        this.ctx.closePath();
        this.ctx.fill();
        this.ctx.lineWidth = 40.0;
      
        imd = this.ctx.getImageData(0, 0, 250, 250);
      
        this.ctx.putImageData(imd, 0, 0);
        this.ctx.beginPath();
        this.ctx.arc(150, 150, 120, this.arc_startingAngle, this.arc_endingAngle, false);
        this.ctx.stroke();
    };

    drawGaugeProgress = (max = 2, progress = 1) => {
        // var currentValue = 100 / (game.state.numberOfQuestions / (game.state.questionsAnswered - 1)) / 100;
        var currentValue = 100 / (max / progress) / 100;
        // var nextValue = currentValue + 100 / game.state.numberOfQuestions / 100;
        var nextValue = currentValue + 100 / max / 100;

        var imd = null;

        var startRad = 0.75;
        var totalRads = 1.5;

        var sAngle = Math.PI * startRad;

        this.ctx.beginPath();
        this.ctx.strokeStyle = "#1e40af";
        this.ctx.lineCap = "round";
        this.ctx.closePath();
        this.ctx.fill();
        this.ctx.lineWidth = 20.0;

        imd = this.ctx.getImageData(0, 0, 240, 240);

        $({ n: currentValue }).animate(
            { n: nextValue },
            {
                duration: 1000 * nextValue,
                step: (now, fx) => {
                    // game.state.scoreNumber.text(Math.ceil(now * 100) +"%");
                    this.ctx.putImageData(imd, 0, 0);
                    this.ctx.beginPath();
                    this.ctx.arc(
                        150,
                        150,
                        120,
                        this.arc_startingAngle,
                        (totalRads * now + startRad) * Math.PI,
                        false
                    );
                    this.ctx.stroke();
                }
            }
        );
    };

    drawCanvasText = (content) => {

    }

    setHeaderText = (content) => {
        this.text.html(content);
    }
}