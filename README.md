# 🎓 KNN Graduation Invite

Thiệp mời lễ tốt nghiệp của Nguyễn Nguyên Khang (KNN) — trang tĩnh, theme Tokyo Night Storm, có đếm ngược, bản đồ và RSVP.

**🔗 Xem trang tại: https://nguyenkhang-gif.github.io/KNN-grat/**

## Tính năng

- Đếm ngược thời gian đến lễ tốt nghiệp
- Card địa điểm bấm được, mở thẳng Google Maps
- Form RSVP (Có/Không tham dự) kèm lời nhắn tuỳ chọn
- RSVP tự động ghi vào Google Sheet và gửi email thông báo qua Google Apps Script
- Open Graph preview khi share link qua Zalo/Messenger/Facebook

## Cấu trúc

```
index.html              # Nội dung trang
style.css               # Giao diện (Tokyo Night Storm)
script.js                # Đếm ngược + xử lý RSVP
google-apps-script.js    # Dán vào Google Apps Script để nhận dữ liệu RSVP (không deploy lên Pages)
profile.jpg              # Ảnh đại diện
```

## Deploy

Trang được host miễn phí qua GitHub Pages (Settings → Pages → branch `main`, `/root`).
