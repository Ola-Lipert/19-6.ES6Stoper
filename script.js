
class Stopwatch extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            times: {
                minutes: 0,
                seconds: 0,
                miliseconds: 0
            }
        };
        this.running = false;
    }

    reset() {
        this.setState({
            times: {
                minutes: 0,
                seconds: 0,
                miliseconds: 0
            }
        });
    }

    resetTime() {
        this.stop();
        this.reset();
        this.print();
    }

    format(times) {
        return `${pad0(this.times.minutes)}:${pad0(this.times.seconds)}:${pad0(Math.floor(this.times.miliseconds))}`;
    }

    start() {
        if (!this.running) {
            this.running = true;
            this.watch = setInterval(() => this.step(), 10);
        }
    }

    step() {
        if (!this.running) return;
        this.calculate();

    }

    calculate() {
        const times = this.state.times;
        times.miliseconds += 1;
        if (times.miliseconds >= 100) {
            times.seconds += 1;
            times.miliseconds = 0;
        }
        if (times.seconds >= 60) {
            times.minutes += 1;
            times.seconds = 0;
        }
        this.setState({times});
    }

    stop() {
        this.setState({
            running: false
        });
        clearInterval(this.watch);
    }

    render() {

        return (

            <div className="container">
                <nav className="controls">
                    <a href="#" onClick={() => { this.start() }} className="button" id="start">
                        Start
                    </a>
                    <a href="#" onClick={() => { this.stop() }} className="button" id="stop">
                        Stop
                    </a>
                    <a href="#" onClick={() => { this.reset() }} className="button" id="reset">
                        Reset
                    </a>
                </nav>
                <div className="stopwatch">{this.state.display}</div>
                <ul className="result"></ul>
            </div>

        );
    }
}

function pad0(value) {
    let result = value.toString();
    if (result.length < 2) {
        result = '0' + result;
    }
    return result;
}

ReactDOM.render(<Stopwatch />, document.getElementById('app'));