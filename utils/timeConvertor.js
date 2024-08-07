exports.tConvert = (time) => {
    // Check correct time format and split into components
    time = time.toString().match(/^([01]\d|2[0-3])(:)([0-5]\d)(:[0-5]\d)?$/) || [time];

    if (time.length > 1) { // If time format correct
        time = time.slice(1);  // Remove full string match value
        time[5] = +time[0] < 12 ? 'AM' : 'PM'; // Set AM/PM
        time[0] = +time[0] % 12 || 12; // Adjust hours
    }
    return time.join(''); // return adjusted time or original string
}

exports.getMinutes = (startTime, endTime) => {
    const startTimeInMs = new Date(startTime).getTime();
    const endTimeInMs = new Date(endTime).getTime();
    return ((endTimeInMs - startTimeInMs) / 60000);
}


exports.setTimeInFormat = (time) => {
    const isLessThanTen = (num) => num>=10 ? num : `0${num}`;

    const date = `${isLessThanTen(time.getMonth()+1)}/${isLessThanTen(time.getDate())}/${time.getFullYear()}`;
    const timing = `${isLessThanTen(time.getHours())}:${isLessThanTen(time.getMinutes())}:00`;
    return `${date} ${timing}`;
}


exports.currentGreeting = () => {
    const currentTime = new Date();
    const currentHour = currentTime.getHours();

    if (currentHour < 12) return "Morning";
    else if (currentHour >= 12 && currentHour < 17) return "Afternoon";
    else if (currentHour >= 17) return "Evening";
}

