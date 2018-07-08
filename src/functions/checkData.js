export function checkData(allData, title) {
    let checkTheTitle = false
    allData.map(data => {
        if (data.Title===title) {
            checkTheTitle = true;
        }
    })
    return checkTheTitle;
}