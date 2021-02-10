'use strict';


/**
 * A component that renders a Calculator, includes all app functionality.
 */
class Calculator extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            /* The equation string in calculator display */
            mathString: ""
        };
        this.appendNumber = this.appendNumber.bind(this);
        this.appendOperator = this.appendOperator.bind(this);
        this.remove = this.remove.bind(this);
        this.clear = this.clear.bind(this);
        this.calc = this.calc.bind(this);
    }
    render(){
        return(
            <React.Fragment>
                <header> 
                    <div className="row mt-3">
                        <CalculatorTitle /> 
                    </div>
                </header>
                <main className="mt-5">
                    <div className="row">
                        <CalculatorScreen text={this.state.mathString} />
                    </div>
                    <div className="row">
                        <CalculatorButton elem="/" cols="3" mathFunc ={this.appendOperator}/>
                        <CalculatorButton elem="*" cols="3" mathFunc ={this.appendOperator}/>
                        <CalculatorButton elem="+" cols="3" mathFunc ={this.appendOperator}/>
                        <CalculatorButton elem="-" cols="3" mathFunc ={this.appendOperator}/>
                    </div>
                    <div className="row">
                        <CalculatorButton elem="7" cols="3" mathFunc ={this.appendNumber}/>
                        <CalculatorButton elem="8" cols="3" mathFunc ={this.appendNumber}/>
                        <CalculatorButton elem="9" cols="3" mathFunc ={this.appendNumber}/>
                        <CalculatorButton elem="⌫" cols="3" mathFunc={this.remove}/>
                    </div>
                    <div className="row">
                        <CalculatorButton elem="4" cols="3" mathFunc ={this.appendNumber}/>
                        <CalculatorButton elem="5" cols="3" mathFunc ={this.appendNumber}/>
                        <CalculatorButton elem="6" cols="3" mathFunc ={this.appendNumber}/>
                        <CalculatorButton elem="AC" cols="3" mathFunc={this.clear}/>
                    </div>
                    <div className="row">
                        <div className="col-9">
                            <div className="row">
                                <CalculatorButton elem="1" cols="4" mathFunc ={this.appendNumber}/>
                                <CalculatorButton elem="2" cols="4" mathFunc ={this.appendNumber}/>
                                <CalculatorButton elem="3" cols="4" mathFunc ={this.appendNumber}/>
                            </div>
                            <div className="row">
                                <CalculatorButton elem="0" cols="4" mathFunc ={this.appendNumber}/>
                                <CalculatorButton elem="." cols="4" mathFunc ={this.appendOperator}/>
                                <CalculatorButton elem="%" cols="4" mathFunc ={this.appendOperator}/>
                            </div>
                        </div>
                        <CalculatorButton elem="=" cols="3" mathFunc={this.calc}/> 
                    </div>
                </main>
                <PageFooter />
            </React.Fragment>
        );
    }
    appendNumber(number){
        /**
         * Append number value to math string equation.
         * @param {Number} number
         */
        this.setState({mathString: this.state.mathString + number});
    }
    appendOperator(op){
        /**
         * Append operator to math string equation.
         * @param {String} op
         */
        let lastChar = this.state.mathString.charAt(this.state.mathString.length -1);
        if (isNaN(lastChar)){
            this.setState({mathString: this.state.mathString.slice(0, this.state.mathString.length - 1) + op});
        }
        else{
            this.setState({mathString:  this.state.mathString + op});
        }
    }
    remove(){
        /**
         * Remove last charecter from math string equation.
         */
        this.setState({mathString:  this.state.mathString.slice(0, this.state.mathString.length - 1)});
    }
    clear(){
        /**
         * Delete math string equation.
         */
        this.setState({mathString:  ""});
    }
    calc(){
        /**
         * Calculate math string equation.
         */
        try {
            let ans = eval(this.state.mathString);
            if(isNaN(ans) || ans==Infinity){
                ans = "";
            }
            this.setState({mathString:  "" + ans}); 
        } catch (e) {
            if (e instanceof SyntaxError) {
                window.alert("Incorrect equation")
                this.setState({mathString:  ""}); 
            }
        }
    }
}


/**
 * A component that renders a Calculator page Title.
 */
class CalculatorTitle extends React.Component{
    constructor(props){
        super(props);
    }
    render(){
        return(
            <h1 className="col-12 font-weight-bold text-center">Calculator</h1>
        );
    }
}


/**
 * A component that renders a Calculator Screen.
 */
class CalculatorScreen extends React.Component{
    constructor(props){
        super(props);
    }
    render(){
        return(
            <div className="col-12 text-left bg-info border border-default d-block p-3">
                {this.props.text!="" ? <p className="overflow-auto">{this.props.text}</p> : <p>0</p>}
            </div>
        );
    }
}


/**
 * A component that renders a Calculator Button.
 */
class CalculatorButton extends React.Component{
    constructor(props){
        super(props);
        this.mathFunc = this.mathFunc.bind(this);
    }
    render(){
        let btClassName ="col-" + this.props.cols;
        return(
            <button className={btClassName + " font-weight-bold btn btn-primary border border-default"} onClick={this.mathFunc}>{this.props.elem}</button>
        );
    }
    mathFunc(){
        /**
         * Call parents right math method given to child.
         */
        this.props.mathFunc(this.props.elem);
    }
}


/**
 * A component that renders footer for page, includes author name and github link.
 */
class PageFooter extends React.Component{
    constructor(props){
        super(props);
    }
    render(){
        return (
            <footer className="col-12 mt-5 text-center">
                <p className="d-inline-block"> <strong>©</strong> Leor Ariel Rose </p>
                <a href="https://github.com/leorrose" target="_blank">
                    <img className="github-logo align-middle ml-3 d-inline-block" src="resources/githubLogo.png" alt="git Hub Profile" ></img>
                </a>
            </footer>
        );
    }
}


/* Render app to html */
ReactDOM.render(<Calculator />, document.getElementsByClassName("root")[0]);