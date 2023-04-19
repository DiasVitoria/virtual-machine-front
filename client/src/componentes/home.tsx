import { Component } from "react";

type props = {
    tema: string
}

export default class Home extends Component<props> {

    render() {
        return (
            <>
                <div id="homeContainer">
                   <p>Bem vindo(a)!</p>
                </div >
            </>
        )
    }
}