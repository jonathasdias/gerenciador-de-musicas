export default function shuffleArray(arrayToBeShuffled) {
    let size = arrayToBeShuffled.length -1;

    for(let i = size; i > 0; i--) {
        let randomNumber = Math.floor( Math.random() * size);
        let savePositionArray = arrayToBeShuffled[i];
        arrayToBeShuffled[i] = arrayToBeShuffled[randomNumber];
        arrayToBeShuffled[randomNumber] = savePositionArray;
    }
}