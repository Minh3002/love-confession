# 💌 Trang Web Tỏ Tình Người Yêu Lãng Mạn (HTML, CSS, JS)

Dự án trang web tỏ tình tương tác siêu dễ thương, được thiết kế chuẩn Responsive hoạt động hoàn hảo trên mọi kích thước màn hình (Điện thoại iPhone/Android, iPad/Tablet, Laptop & Màn hình lớn).

---

## 🌟 Các Tính Năng Nổi Bật

1. **Gửi cho nhiều người linh hoạt**:
   - Tùy chỉnh tên người nhận, tên người gửi và lời tâm tình qua **URL Parameters** (`?to=...&from=...&msg=...`).
   - Tích hợp sẵn nút **"✨ Tạo link tỏ tình"**: Chỉ cần nhập tên crush, tên bạn và lời nhắn rồi bấm **Copy link** để gửi qua Messenger, Zalo, Telegram, Instagram,...
2. **Thiết kế Responsive không bị vỡ giao diện**:
   - Sử dụng CSS Clamp, Viewport Dynamic (`100dvh`), Flexbox & Glassmorphism hiện đại.
   - Thử nghiệm hiển thị tối ưu từ màn hình nhỏ nhất (320px) đến 4K.
3. **Hiệu ứng & Tương tác cuốn hút**:
   - **Giai đoạn 1**: Phong bì thư bí mật với nắp mở 3D chân thực, trái tim đập thình thịch mời gọi mở thư.
   - **Giai đoạn 2**: Câu hỏi tỏ tình với nút **"Đồng ý luôn! ❤️"** và nút **"Không nha 😜"** chạy trốn siêu bướng bỉnh (hỗ trợ cả lướt chuột và chạm cảm ứng trên điện thoại). Cứ mỗi lần né tránh, nút "Đồng ý" sẽ to dần lên!
   - **Giai đoạn 3**: Khi crush bấm "Đồng ý", pháo hoa confetti bung lụa ngập tràn màn hình cùng bức thư tình viết riêng cho người ấy.
4. **Hiệu ứng nền & Âm thanh nhẹ nhàng**:
   - Canvas trái tim bay lơ lửng ngẫu nhiên, mượt mà 60 FPS.
   - Trình phát nhạc lofi/melody lãng mạn bằng Web Audio API (không sợ chết link nhạc hay vi phạm bản quyền).

---

## 🚀 Cách Dùng Nhanh

### 1. Mở trực tiếp trên máy tính
- Mở thư mục: `C:\Users\MINH\.gemini\antigravity\scratch\love-confession`
- Nhấp đúp vào file `index.html` để mở trong trình duyệt Chrome, Edge, Cốc Cốc, Safari,...

### 2. Ví dụ về đường link tùy biến:
- Gửi cho bạn **Lan Anh**:  
  `index.html?to=Lan%20Anh&from=Hoàng%20Long`
- Gửi cho **Bé Mèo**:  
  `index.html?to=Bé%20Mèo&from=Anh&msg=Em%20là%20điều%20tuyệt%20vời%20nhất%20của%20anh`

---

## 🌐 Hướng Dẫn Đưa Lên Mạng Miễn Phí (Để gửi link cho crush)

Bạn có thể tải thư mục này lên các dịch vụ hosting miễn phí chỉ trong 1 phút:

1. **Vercel** / **Netlify**:
   - Kéo thả cả thư mục `love-confession` vào trang [netlify.com/drop](https://app.netlify.com/drop) là có ngay 1 link web xịn xò dạng `https://to-tinh-xyz.netlify.app`.
2. **GitHub Pages**:
   - Đẩy mã nguồn lên 1 repository GitHub và bật GitHub Pages trong phần Settings.
