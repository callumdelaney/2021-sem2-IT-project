import React, { useState } from "react";
import { SketchPicker } from "react-color";
import { reactCSS } from "reactcss";

function ColorPicker() {
    const [displayColor, setDisplayColor] = useState(false);
    const [color, setColor] = useState("#ff0000");
    const handleClick = () => {
        setDisplayColor(!displayColor);
    };

    const handleClose = () => {
        setDisplayColor(false);
    };

    const handleChange = (color) => {
        this.setState({ color: color.rgb });
    };

    const styles = reactCSS({
        default: {
            color: {
                width: "36px",
                height: "14px",
                borderRadius: "2px",
                background: `rgba(${this.state.color.r}, ${this.state.color.g}, ${this.state.color.b}, ${this.state.color.a})`,
            },
            swatch: {
                padding: "5px",
                background: "#fff",
                borderRadius: "1px",
                boxShadow: "0 0 0 1px rgba(0,0,0,.1)",
                display: "inline-block",
                cursor: "pointer",
            },
            popover: {
                position: "absolute",
                zIndex: "2",
            },
            cover: {
                position: "fixed",
                top: "0px",
                right: "0px",
                bottom: "0px",
                left: "0px",
            },
        },
    });

    return (
        <div>
            <div style={styles.swatch} onClick={this.handleClick}>
                <div style={styles.color} />
            </div>
            {this.state.displayColorPicker ? (
                <div style={styles.popover}>
                    <div style={styles.cover} onClick={this.handleClose} />
                    <SketchPicker
                        color={this.state.color}
                        onChange={this.handleChange}
                    />
                </div>
            ) : null}
        </div>
    );
}

export default ColorPicker;
