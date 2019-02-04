import React, { Component } from 'react';
import PanelGroup from "react-bootstrap/es/PanelGroup";

export class PlayMovie extends Component {


    constructor(props) {
        super(props);

        this.state={
        }
    }



    render() {
        return (
            <div>
                <PanelGroup>
                    <div>
                        <video controls width="580">
                            <source src="./home/emine/Downloads/videoplayback.mp4" type="video/mp4"/>
                            <source src="video/demo.webm" type="video/webm"/>
                        </video>
                    </div>
                </PanelGroup>
            </div>
        )
    };
}
