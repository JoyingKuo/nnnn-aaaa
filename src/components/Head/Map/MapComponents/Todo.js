import React, { PropTypes } from 'react'
import './Map.css';
import FlatButton from 'material-ui/FlatButton';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import ReactHover from 'react-hover';


const optionsCursorTrueWithMargin = {
    followCursor: true,
    shiftX: 20,
    shiftY: 0
}

class Todo extends React.Component {

    render(){
        return(
            <div className="course"
                 style={{
                     opacity: !this.props.completed ? "1" : "0.1",
                 }}>
                <ReactHover
                    options={optionsCursorTrueWithMargin}>
                    <ReactHover.Trigger>
                        <MuiThemeProvider>
                            <FlatButton className="course-btn"
                                        backgroundColor="#616161"
                                        fullWidth="true"
                                        labelStyle={{
                                            color: "#fcfcfc",
                                            fontSize: "1em",
                                            fontWeight: "100",
                                            letterSpacing: "1px"
                                        }}
                                        style={{
                                            border: this.props.pre_flag ? "solid 2px #611505":"#616161",
                                            paddingRight: 0,
                                        }}
                                        label={this.props.cosCame}
                                        onClick={this.props.onClick}>

                            </FlatButton>
                        </MuiThemeProvider>
                    </ReactHover.Trigger>
                    <ReactHover.Hover>
                        <h1>{this.props.cosCame}</h1>
                    </ReactHover.Hover>
                </ReactHover>
            </div>

        )
    }
}


Todo.PropTypes = {
    onClick: PropTypes.func.isRequired,
    pre_flag: PropTypes.bool.isRequired,
    completed: PropTypes.number.isRequired,
    cos_cname: PropTypes.string.isRequired
}

export default Todo