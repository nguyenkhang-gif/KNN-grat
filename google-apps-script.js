// File này KHÔNG cần đưa lên GitHub Pages.
// Dán toàn bộ nội dung vào Google Apps Script (Extensions > Apps Script) của Google Sheet dùng để lưu RSVP.

function doPost(e) {
  var sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();

  if (sheet.getLastRow() === 0) {
    sheet.appendRow(["Thời gian", "Tham dự", "Lời nhắn"]);
  }

  var data = JSON.parse(e.postData.contents);
  var attendingText = data.attending === "yes" ? "Sẽ đến" : "Không thể đến";

  sheet.appendRow([new Date(), attendingText, data.message || ""]);

  var recipient = "nguyennguyenkhang915@gmail.com";
  var subject = "🎓 RSVP mới - " + attendingText;
  var body =
    "Tham dự: " + attendingText + "\n" +
    "Lời nhắn: " + (data.message || "(không có)");

  MailApp.sendEmail(recipient, subject, body);

  return ContentService.createTextOutput(JSON.stringify({ status: "ok" })).setMimeType(
    ContentService.MimeType.JSON
  );
}
