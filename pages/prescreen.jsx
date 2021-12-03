import { useState } from 'react'

export default function PreScreen() {
    const [ preScreenClosed , setPreScreenClosed ] = useState(false)
    console.log(preScreenClosed)
    return(
        <>
            <div className={`prescreen ${ preScreenClosed ? "prescreen--hide" : ""}`}>
                <div className="preescreen__inner-container">
                    <div className="preescreen__text">
                        Pero que pringao canijo, alguien se ha dejado sus cartas delante de la pantalla del video de Mudd Show. Ayuda a Cecilio a terminar el juego así puede mostrarle el video a la peña.
                    </div>
                    <button className="empezar" onClick={() => setPreScreenClosed(true)}>Empezar</button>
                </div>
            </div>
            <style jsx>
            {`
                .prescreen{
                    display: flex;
                    flex-direction: column;
                    justify-content: center;
                    align-items:center;
                    background-color: black;
                    color: white;
                    position: absolute;
                    top: 0;
                    width: 100vw;
                    height: 100vh;
                    z-index: 99;
                    opacity:1;
                    transition: opacity 0.7s;
                }
                .prescreen--hide{
                    opacity:0;
                    pointer-events: none;
                }
                .preescreen__inner-container{
                    display: flex;
                    justify-content: center;
                    align-items:center;
                    flex-direction: column;
                    width: 50%;
                    text-align: center;
                }
                .preescreen__text{
                    font-size: 1.6rem;
                    font-family: monospace;
                    margin-bottom: 1.5rem;
                }
                .empezar{
                    font-size: 1.3rem;
                    padding: 0.5rem;
                    cursor: pointer;
                }
            `}
            </style>
        </>
    )
}
