import { useEffect, useRef, useState } from "react";
import { Container } from "react-bootstrap";

const formatTime = (time) => {
    let minutes = Math.floor(time / 60);
    let seconds = Math.floor(time - minutes * 60);

    if (minutes <= 10) {minutes = "0" + minutes}
    if (seconds <= 10) {seconds = "0" + seconds}
    return minutes + ":" + seconds;
};
    

export default function PayTimer({seconds}) {
    const [countdown, setCountdown] = useState(seconds);

    const timerID = useRef();



    useEffect(() => {
        timerID.current = setInterval(() => {
            setCountdown((count) => count - 1);
        }, 1000);
        return () => clearInterval(timerID.current);
    }, []);

    useEffect(() => {
        if (countdown <= 0) {
            alert("Time's up!, Pay your premium");
            clearInterval(timerID.current);
            window.location.reload();
        }
    }, [countdown]);

    return (
        <Container>
            <p>Time left to pay: {formatTime(countdown)} </p>
        </Container>
    )
}