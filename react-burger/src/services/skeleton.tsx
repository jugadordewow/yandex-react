import {useEffect, useState} from "react";


export const LoadingElem = () => {

    const[timeLeft, setTimeLeft] = useState<number>(15);
    const getPadtime = (timeLeft:number) => timeLeft.toString().padStart(2, '0')

    useEffect(() => {
        const interval = setInterval(() => {
            setTimeLeft((timeLeft) => (timeLeft >=1 ? timeLeft - 1 : 0));
        }, 1000);
        return () => {
            clearInterval(interval);
        }
    }, [timeLeft])


    return (
        <>
            <div className="skeletonMsg">
                Ваш заказ в процессе оформления, осталось подождать:
            </div>
            <div className="order-details-id text_type_digits-large">
                {timeLeft}
            </div>
        </>
    )
}