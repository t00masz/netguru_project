export function checkData(allData, title) {
console.log(title)
console.log(allData)
    let checkTheTitle = false
    allData.map(data => {
        if (data.Title===title) {
            checkTheTitle = true;
        }
    })
    return checkTheTitle;
}