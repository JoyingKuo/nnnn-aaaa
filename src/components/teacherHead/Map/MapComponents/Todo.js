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
const Todo = ({ onClick, completed , pre_flag, cosCame }) =>(

    <div className="course" >
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
                                            border: pre_flag ? "solid 2px #611505":"#616161",
                                            padding: 0,
                                        }}
                                        label={cosCame}
                                        onClick={onClick}>

                            </FlatButton>
                        </MuiThemeProvider>
                </ReactHover.Trigger>
                <ReactHover.Hover>
                    <h1>{cosCame}</h1>
                </ReactHover.Hover>
            </ReactHover>
    </div>
)


// const Todo = ({ onClick, completed , pre_flag, cosCame }) => (
//                 <div className="course">
//                     <ReactHoverObserver {...{
//                         onMouseOver: ({ e, setIsHovering, unsetIsHovering }) =>
//                             onClick
//
//                     }}>
//                         <MuiThemeProvider>
//                             <FlatButton className="course-btn"
//                                  backgroundColor="#616161"
//                                  fullWidth="true"
//                                  labelStyle={{
//                                      color: '#fcfcfc',
//                                      fontSize: '1em',
//                                      fontWeight: '100',
//                                      letterSpacing: '1px'
//                                  }}
//                                  style={{
//                                      display:completed? "hidden": "inline",
//                                      border: pre_flag ? 'solid 2px #611505':'#616161',
//                                  }}
//                                  label={cosCame}
//                                  onClick={onClick}>
//
//                             </FlatButton>
//                         </MuiThemeProvider>
//                     </ReactHoverObserver>
//                 </div>
// )

Todo.PropTypes = {
    onClick: PropTypes.func.isRequired,
    pre_flag: PropTypes.bool.isRequired,
    completed: PropTypes.bool.isRequired,
    cos_cname: PropTypes.string.isRequired
}

export default Todo