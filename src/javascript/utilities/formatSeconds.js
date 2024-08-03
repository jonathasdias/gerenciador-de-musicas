export default function formatSeconds(secondsNumber) {
    const hourInSeconds = 3600;
    const minutesInSeconds = 60;

    let hor = Math.floor( secondsNumber / hourInSeconds );
    let min = Math.floor( (secondsNumber - hor * hourInSeconds) / minutesInSeconds );
    let sec = Math.floor( secondsNumber - hor * hourInSeconds - min * minutesInSeconds );
    
    function controlFormatTime(hor,min,sec) {
        if(hor < 1) {
            return `${min.toString().padStart(2,'0')}:${sec.toString().padStart(2,'0')}`;
        }else {
            return `${hor.toString().padStart(2,'0')}:${min.toString().padStart(2,'0')}:${sec.toString().padStart(2,'0')}`;
        }
    }

    return controlFormatTime(hor,min,sec);
}