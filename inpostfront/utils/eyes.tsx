import React, { useState } from "react";
import useMightyMouse from "react-hook-mighty-mouse";

// import "./styles.scss";

const EyesFollow = () => {
    const {
        selectedElement: {
            position: { angle: angleLeftEye },
        },
    } = useMightyMouse(true, 'left-eye', { x: 20, y: 20 });
    const {
        selectedElement: {
            position: { angle: angleRightEye },
        },
    } = useMightyMouse(true, 'right-eye', { x: 20, y: 20 });

         // @ts-ignore
    const rotateLeftEye = `rotate(${-angleLeftEye}deg)`;
         // @ts-ignore
    const rotateRightEye = `rotate(${-angleRightEye}deg)`;

    return (
        <div className="eyes-follow" style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
        }}>
            <div className="eyes" style={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "center",
                alignItems: "center",
                
            }}>
                <div id="left-eye" className="eye" style={{
                    transform: rotateLeftEye,
                    borderRadius: "50%",
                    height: "40px",
                    width: "40px",
                    background: "#f3efef",
                }}>
                    <div className="pupil" style={{
                        background: "#382e25",
                        borderRadius: "50%",
                        position: "absolute",
                        width: "15px",
                        height: "15px",
                        left: "25px",
                        top: "12px",
                    }} />
                </div>
                <div id="right-eye" className="eye" style={{
                    transform: rotateRightEye,
                    borderRadius: "50%",
                    height: "40px",
                    width: "40px",
                    background: "#f3efef",
                }}>
                    <div className="pupil" style={{
                        background: "#382e25",
                        borderRadius: "50%",
                        position: "absolute",
                        width: "15px",
                        height: "15px",
                        left: "25px",
                        top: "12px",
                    }} />
                </div>
            </div>
        </div >
    );
};

export default EyesFollow;
