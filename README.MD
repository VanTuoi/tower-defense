# Game Design Document - Tower Defense

## 1. Tổng quan

- **Tên game**: Tower Defense (tạm gọi)
- **Thể loại**: Tower Defense
- **Mục tiêu**: Người chơi xây dựng và nâng cấp các đơn vị (units) như "Archer", "Healer", "Wizard", "Warrior" để ngăn chặn kẻ thù di chuyển từ trên xuống dưới màn hình. Game kết thúc nếu HP người chơi về 0 hoặc khi vượt qua tất cả các wave.
- **Phong cách đồ họa**: Hiện đại, vector-based, với hiệu ứng mượt mà, gradient, và bóng đổ.
- **Nền tảng**: Trình duyệt (có thể mở rộng sang mobile sau).
- **Ngày tạo tài liệu**: May 27, 2025

## 2. Cơ chế gameplay cốt lõi

### 2.1. Xây dựng đơn vị (BaseUnit Placement)

- Người chơi sử dụng tiền để mua các đơn vị từ cửa hàng (shop).
- Đơn vị được đặt vào khu vực chơi bằng cách kéo thả hoặc nhấp chuột (tùy thiết kế bản đồ: vị trí cố định hoặc linh hoạt).
- Đơn vị tự động tấn công kẻ thù trong phạm vi (range) của chúng khi kẻ thù xuất hiện.
- Có giới hạn số lượng đơn vị trên màn hình (ví dụ: tối đa 10 đơn vị).

### 2.2. Nâng cấp đơn vị (BaseUnit Upgrades)

- Người chơi có thể nâng cấp đơn vị bằng tiền để tăng chỉ số (sức mạnh, phạm vi, tốc độ bắn, v.v.).
- Mỗi đơn vị có nhiều cấp độ (level 1 → level 3):
  - Nâng cấp tăng các chỉ số cơ bản (damage, range, speed).
  - Có thể có tùy chọn nâng cấp theo hướng khác nhau (ví dụ: Archer tăng damage hoặc tốc độ bắn).
- Workshop: Một khu vực để nâng cấp các thuộc tính chung (power, attack speed, critical chance) cho tất cả đơn vị.

### 2.3. Phòng thủ (Defense)

- Các đơn vị tự động tấn công kẻ thù trong phạm vi của chúng.
- Kẻ thù di chuyển từ trên xuống dưới. Nếu kẻ thù chạm đáy màn hình, người chơi mất HP.
- HP người chơi về 0 thì thua game.

## 3. Hệ thống đơn vị (Units)

### 3.1. Loại đơn vị

- **Archer**:
  - Tấn công từ xa, bắn mũi tên với sát thương đơn mục tiêu.
  - Kỹ năng: Có thể nâng cấp để bắn đa mục tiêu (multi-shot).
- **Healer**:
  - Hồi máu cho các đơn vị khác trong phạmvi, không tấn công trực tiếp.
  - Kỹ năng: Tăng phạm vi hồi máu hoặc thêm hiệu ứng hồi phục liên tục.
- **Wizard**:
  - Gây sát thương diện rộng (AoE) bằng phép thuật, tốc độ bắn chậm.
  - Kỹ năng: Thêm hiệu ứng làm chậm (slow) hoặc bùng nổ (explosion).
- **Warrior**:
  - Đơn vị cận chiến, chịu đòn tốt, thu hút kẻ thù.
  - Kỹ năng: Thêm phản đòn (counter-attack) hoặc tăng giáp (armor).

### 3.2. Chỉ số đơn vị

- **Units**: Số lượng đơn vị trên màn hình.
- **Power**: Sát thương mỗi đòn.
- **Health**: Máu của đơn vị (có thể bị tấn công bởi kẻ thù trong một số trường hợp).
- **Speed**: Tốc độ tấn công (số đòn mỗi giây).
- Ví dụ:
  - Archer Level 1: Power 10, Health 50, Speed 1 đòn/giây.
  - Archer Level 2: Power 20, Health 75, Speed 1.5 đòn/giây.

## 4. Hệ thống kẻ thù (Enemies)

### 4.1. Xuất hiện theo làn sóng (Waves)

- Kẻ thù xuất hiện từ trên cùng màn hình, di chuyển xuống dưới theo các làn sóng.
- Mỗi wave tăng số lượng và sức mạnh:
  - Wave 1: 5 kẻ thù, HP 10.
  - Wave 5: 10 kẻ thù, HP 50.
- Có thời gian nghỉ ngắn (5 giây) giữa các wave để người chơi chuẩn bị.

### 4.2. Loại kẻ thù

- **Normal**: Tốc độ và HP trung bình.
- **Fast**: Tốc độ cao, HP thấp.
- **Tank**: Tốc độ chậm, HP cao.
- **Boss** (tùy chọn): Xuất hiện sau mỗi 5 wave, HP rất cao, có kỹ năng đặc biệt (triệu hồi kẻ thù nhỏ).

### 4.3. Cơ chế di chuyển

- Di chuyển thẳng từ trên xuống dưới.
- Có thể thêm đường zig-zag hoặc ngẫu nhiên để tăng độ khó.

## 5. Quản lý tài nguyên

### 5.1. Tiền (Money)

- Người chơi kiếm tiền bằng cách tiêu diệt kẻ thù (5-10 tiền mỗi kẻ thù tùy sức mạnh).
- Dùng tiền để mua hoặc nâng cấp đơn vị.
- Ví dụ giá:
  - Archer: 50 tiền.
  - Healer: 100 tiền.
  - Nâng cấp Level 1 → Level 2: 75 tiền.

### 5.2. Máu (HP)

- Người chơi bắt đầu với 100 HP.
- Mỗi khi kẻ thù chạm đáy màn hình, HP giảm (-10 HP mỗi kẻ thù).
- HP về 0 thì thua game.

### 5.3. Workshop Upgrades

- Nâng cấp các thuộc tính chung cho tất cả đơn vị:
  - **Power**: Tăng sát thương (x1.00 → x1.10 → x1.20).
  - **Attack Speed**: Tăng tốc độ bắn.
  - **Critical Chance**: Tăng xác suất chí mạng.
- Mỗi nâng cấp có giá tăng dần (ví dụ: Power x1.00 → x1.10 giá 150,000 tiền).

## 6. Giao diện người dùng (UI)

### 6.1. Thanh thông tin

- **HP**: Góc trên bên trái.
- **Tiền**: Góc trên bên phải.
- **Wave**: Hiển thị wave hiện tại (Wave 1/10).

### 6.2. Cửa hàng (Shop)

- Nút mua từng loại đơn vị (Archer, Healer, Wizard, Warrior) với giá tiền.
- Nút nâng cấp cho từng đơn vị đã đặt trên màn hình.

### 6.3. Workshop

- Hiển thị các thuộc tính nâng cấp (Power, Attack Speed, Critical Chance).
- Mỗi thuộc tính có mức độ hiện tại và giá nâng cấp.

### 6.4. Kết thúc game

- **Thua (HP = 0)**: Màn hình "Game Over" với điểm số và nút chơi lại.
- **Thắng (vượt qua tất cả wave)**: Màn hình chiến thắng với điểm số.

## 7. Hiệu ứng và âm thanh

### 7.1. Hiệu ứng hình ảnh

- **Nâng cấp đơn vị**: Đơn vị phát sáng hoặc phóng to tạm thời.
- **Bắn**: Hiệu ứng đạn (mũi tên cho Archer, tia sáng cho Wizard).
- **Tiêu diệt kẻ thù**: Hiệu ứng nổ hoặc biến mất.

### 7.2. Âm thanh

- **Nâng cấp**: Tiếng "ding" hoặc hiệu ứng ma thuật.
- **Bắn**: Tiếng cung tên (Archer), tiếng phép thuật (Wizard).
- **Tiêu diệt kẻ thù**: Tiếng nổ nhỏ.
- **Nhạc nền**: Nhẹ nhàng, tăng nhịp độ khi wave khó hơn.

## 8. Lưu trữ và tiến trình

### 8.1. Lưu điểm số

- Dùng SQLite để lưu:
  - Highscore (số wave cao nhất đạt được).
  - Tiến trình (tiền, cấp độ workshop, đơn vị đã mở khóa).

### 8.2. Bảng xếp hạng (tùy chọn)

- Hiển thị top 5 người chơi có wave cao nhất.

## 9. Luồng chơi (Game Flow)

1. **Màn hình chính (Main Menu)**:

   - Nút "Play" để bắt đầu game.
   - Hiển thị highscore và wave cao nhất đạt được.

2. **Bắt đầu game**:

   - Người chơi bắt đầu với 200 tiền và 100 HP.
   - Wave 1 bắt đầu, kẻ thù xuất hiện từ trên cùng.

3. **Trong game**:

   - Người chơi mua đơn vị từ cửa hàng, đặt vào khu vực chơi.
   - Nâng cấp đơn vị bằng tiền hoặc qua workshop.
   - Đơn vị tự động bắn kẻ thù trong phạm vi.
   - Kẻ thù di chuyển xuống, nếu chạm đáy thì mất HP.

4. **Kết thúc wave**:

   - Sau mỗi wave, người chơi nhận tiền thưởng.
   - Có thời gian nghỉ ngắn (5 giây) để chuẩn bị.

5. **Kết thúc game**:
   - Thua: HP về 0 → Màn hình "Game Over".
   - Thắng: Vượt qua tất cả wave → Màn hình chiến thắng.

## 10. Ý tưởng mở rộng (tương lai)

- **Kỹ năng đặc biệt (Skills)**:
  - Người chơi có thể dùng tiền để kích hoạt kỹ năng (tăng tốc bắn, gọi đơn vị mạnh tạm thời).
- **Nâng cấp toàn cầu (Global Upgrades)**:
  - Mở khóa nâng cấp chung (tăng 10% damage cho tất cả đơn vị) sau mỗi 5 wave.
- **Chế độ thử thách (Challenge Mode)**:
  - Wave khó hơn với giới hạn tiền hoặc HP thấp hơn.
- **Skin cho đơn vị**:
  - Mở khóa skin bằng cách đạt wave cao hoặc hoàn thành nhiệm vụ.
- **Multiplayer**:
  - Hợp tác (Co-op): Hai người chơi cùng xây dựng đội quân.
  - Đối kháng (PvP): Mỗi người chơi có khu vực riêng, gửi kẻ thù mạnh hơn cho đối thủ.

## 11. Ghi chú

- Game sẽ được phát triển tuần tự, bắt đầu từ phiên bản tối giản (MVP) với 1 loại đơn vị và kẻ thù cơ bản.
- Tập trung vào tính năng cốt lõi trước (đơn vị, kẻ thù, nâng cấp), sau đó mở rộng UI, hiệu ứng, và lưu trữ.
- Multiplayer sẽ được triển khai ở giai đoạn sau.

---

**Tài liệu được tạo bởi Grok 3 (xAI) vào ngày May 27, 2025.**
