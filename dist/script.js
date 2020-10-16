function _defineProperty(obj, key, value) {if (key in obj) {Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true });} else {obj[key] = value;}return obj;}
const TimeLengthControl = props => {
  return (
    React.createElement("div", null,
    React.createElement("div", null, React.createElement("label", { id: props.id + "-label" }, " ", React.createElement("h2", null, props.label, " Length"), " ")),
    React.createElement("button", { id: props.id + "-decrement", className: "btn",
      onClick: () => props.handleDecrement(props.id + "Mins", -1) }, React.createElement("i", { className: "fas fa-arrow-down" })),

    React.createElement("span", { id: props.id + "-length" }, props.minutes),
    React.createElement("button", { id: props.id + "-increment", className: "btn",
      onClick: () => props.handleIncrement(props.id + "Mins", 1) }, React.createElement("i", { className: "fas fa-arrow-up" }))));



};

const DisplayTime = props => {

  let minutes = props.minutesRemaining < 10 ?
  "0" + props.minutesRemaining :
  props.minutesRemaining;

  let seconds = props.secondsRemaining < 10 ?
  "0" + props.secondsRemaining :
  props.secondsRemaining;

  return (
    React.createElement("div", null,
    React.createElement("div", null, React.createElement("label", { id: "timer-label" }, React.createElement("h2", null, props.displayLabel))),
    React.createElement("div", { id: "time-left" }, minutes + ":" + seconds)));



};

const ControlButtons = props => {
  return (
    React.createElement("div", null,
    props.loop ?
    React.createElement("button", { id: "start_stop", onClick: props.handleStart, className: "btn btn-secondary" }, "PAUSE") :
    React.createElement("button", { id: "start_stop", onClick: props.handleStart, className: "btn btn-secondary" }, "START"),
    React.createElement("button", { id: "reset", onClick: props.handleReset, className: "btn btn-secondary" }, "RESET"),
    React.createElement("div", null,
    React.createElement("a", { href: "https://en.wikipedia.org/wiki/Pomodoro_Technique", target: "_blank" },
    React.createElement("button", { className: "btn btn-info" }, "What is a pomodoro Clock?")))));




};

class PomodoroClock extends React.Component {
  constructor(props) {
    super(props);_defineProperty(this, "tick",











    () => {
      if (this.state.minutesRemaining === 0 && this.state.secondsRemaining === 0) {
        this.buzzer();
        return this.state.displayLabel === "Session" ?
        this.setState(function (state) {
          return { minutesRemaining: state.breakMins,
            displayLabel: "Break" };
        }) :
        this.setState(function (state) {
          return { minutesRemaining: state.sessionMins,
            displayLabel: "Session" };
        });
      }
      if (this.state.secondsRemaining === 0) {
        return this.setState(
        function (state) {
          return { secondsRemaining: 59,
            minutesRemaining: state.minutesRemaining - 1 };});
      }
      if (this.state.secondsRemaining > 0) {
        return this.setState(state => {return { secondsRemaining: state.secondsRemaining - 1 };});
      }
    });_defineProperty(this, "buzzer",

    () => {
      let playAudio = this.audioBeep.play();
      playAudio.catch(error => {console.log(error);});
    });_defineProperty(this, "handleStart",

    () => {
      this.setState(state => ({
        loop: !state.loop }));


      this.state.loop ?
      clearInterval(this.timerID) :
      this.timerID = setInterval(() => this.tick(), 1000);

      if (!this.state.timerStarted) {
        this.setState(state => ({
          timerStarted: true,
          minutesRemaining: state.sessionMins }));

      }
    });_defineProperty(this, "handleReset",

    () => {
      clearInterval(this.timerID);
      this.setState({
        displayLabel: "Session",
        breakMins: 5,
        sessionMins: 25,
        minutesRemaining: 25,
        secondsRemaining: 0,
        loop: false,
        timerStarted: false });

      this.audioBeep.pause();
      this.audioBeep.currentTime = 0;
    });_defineProperty(this, "handleIncrement",

    (stateItem, value) => {
      return this.state[stateItem] < 60 && !this.state.timerStarted ?
      stateItem === "sessionMins" ?
      this.setState(state => ({
        minutesRemaining: state.minutesRemaining + value,
        [stateItem]: state[stateItem] + value })) :

      this.setState(state => ({
        [stateItem]: state[stateItem] + value })) :
      null;
    });_defineProperty(this, "handleDecrement",

    (stateItem, value) => {
      return this.state[stateItem] > 1 && !this.state.timerStarted ?
      stateItem === "sessionMins" ?
      this.setState(state => ({
        minutesRemaining: state.minutesRemaining + value,
        [stateItem]: state[stateItem] + value })) :

      this.setState(state => ({
        [stateItem]: state[stateItem] + value })) :
      null;
    });this.state = { displayLabel: "Session", breakMins: 5, sessionMins: 25, minutesRemaining: 25, secondsRemaining: 0, loop: false, timerStarted: false };}

  render() {
    return (
      React.createElement("div", { id: "container", className: "container text-align-center" },
      React.createElement("h1", null, "Pomodoro Clock"),

      React.createElement("div", { className: "jumbotron text-center border-info" },
      React.createElement(TimeLengthControl, { label: "Break", id: "break", minutes: this.state.breakMins,
        handleIncrement: this.handleIncrement,
        handleDecrement: this.handleDecrement }),
      React.createElement(TimeLengthControl, { label: "Session", id: "session", minutes: this.state.sessionMins,
        handleIncrement: this.handleIncrement,
        handleDecrement: this.handleDecrement }),
      React.createElement(DisplayTime, {
        displayLabel: this.state.displayLabel,
        minutesRemaining: this.state.minutesRemaining,
        secondsRemaining: this.state.secondsRemaining }),
      React.createElement(ControlButtons, {
        loop: this.state.loop,
        handleStart: this.handleStart,
        handleReset: this.handleReset }),
      React.createElement("audio", { id: "beep", preload: "auto"
        // src="https://goo.gl/65cBl1"
        , src: "http://www.peter-weinberg.com/files/1014/8073/6015/BeepSound.wav",
        ref: audio => {this.audioBeep = audio;} }))));



  }}
;

ReactDOM.render(React.createElement(PomodoroClock, null), document.getElementById("root"));