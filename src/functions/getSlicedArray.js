export function getSlicedArray(desiredComment, comments) {
    let newCommentArray = [];
    let counterOfArray = 0;
    comments.map(data => {
        if(desiredComment === data.Title) {
            newCommentArray[counterOfArray] = data
            counterOfArray++;
        }
    })
    return newCommentArray
}