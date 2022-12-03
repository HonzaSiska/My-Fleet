export const formatDateTime = (datetime) => {
    const day = datetime.getDate() < 10 ? '0'+ datetime.getDate() : datetime.getDate()
    const month = datetime.getMonth() + 1
    const year = datetime.getFullYear()
    const h = datetime.getHours() < 10 ? '0' + datetime.getHours() : datetime.getHours()
    const m = datetime.getMinutes() < 10 ? '0'+ datetime.getMinutes() : datetime.getMinutes()
    const convertedDate = `${year}-${month}-${day} ${h}:${m}`
    return convertedDate
}

export const  parseMillisecondsIntoReadableTime = (milliseconds) => {
    //Get hours from milliseconds
    var hours = milliseconds / (1000*60*60);
    var absoluteHours = Math.floor(hours);
    var h = absoluteHours > 9 ? absoluteHours : '0' + absoluteHours;
  
    //Get remainder from hours and convert to minutes
    var minutes = (hours - absoluteHours) * 60;
    var absoluteMinutes = Math.floor(minutes);
    var m = absoluteMinutes > 9 ? absoluteMinutes : '0' +  absoluteMinutes;
  
    //Get remainder from minutes and convert to seconds
    var seconds = (minutes - absoluteMinutes) * 60;
    var absoluteSeconds = Math.floor(seconds);
    var s = absoluteSeconds > 9 ? absoluteSeconds : '0' + absoluteSeconds;
  
    //h > 0 ?  h + 'h ' : '' + m > 0 ?  m + 'm ' : '' + s > 0 ?  s + 's' : ''
    return h + 'h ' + m + 'm ' + s + 's' ;
  }