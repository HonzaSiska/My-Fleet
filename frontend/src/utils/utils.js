export const formatDateTime = (datetime) => {
    const day = datetime.getDate() < 10 ? '0'+ datetime.getDate() : datetime.getDate()
    const month = datetime.getMonth() + 1
    const year = datetime.getFullYear()
    const h = datetime.getHours() < 10 ? '0' + datetime.getHours() : datetime.getHours()
    const m = datetime.getMinutes() < 10 ? '0'+ datetime.getMinutes() : datetime.getMinutes()
    const convertedDate = `${year}-${month}-${day} ${h}:${m}`
    return convertedDate
}