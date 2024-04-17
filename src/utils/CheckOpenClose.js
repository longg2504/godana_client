export default function checkOpenClose(startTime, endTime) {
    // Lấy giờ hiện tại
    var now = new Date();
    var currentHour = now.getHours();
    var currentMinute = now.getMinutes();

    // Chuyển đổi thời gian bắt đầu và kết thúc thành giờ và phút tương ứng
    var startSplit = startTime.split(":");
    var endSplit = endTime.split(":");
    var startHour = parseInt(startSplit[0], 10);
    var startMinute = parseInt(startSplit[1], 10);
    var endHour = parseInt(endSplit[0], 10);
    var endMinute = parseInt(endSplit[1], 10);

    // Tính toán giờ và phút hiện tại thành phút
    var currentTimeInMinutes = currentHour * 60 + currentMinute;
    var startTimeInMinutes = startHour * 60 + startMinute;
    var endTimeInMinutes = endHour * 60 + endMinute;

    // Kiểm tra xem thời gian hiện tại có nằm trong khoảng cho phép hay không
    if (currentTimeInMinutes >= startTimeInMinutes && currentTimeInMinutes <= endTimeInMinutes) {
        return `Đang mở cửa - Đóng cửa lúc: ${endTime}`;
    } else {
        return `Đang đóng cửa - Mở cửa lúc: ${startTime}`;
    }
}