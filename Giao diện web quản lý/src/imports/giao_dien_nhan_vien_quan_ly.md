# Mô Tả Chi Tiết Giao Diện Web Nhân Viên & Quản Lý (Admin Web)

> **Dự án:** SmartDroneDelivery — Nền tảng quản lý giao hàng bằng Drone tích hợp AI  
> **Đối tượng sử dụng:** Điều phối viên (Dispatcher) · Nhân viên vận hành trạm (Station Operator) · Quản lý logistics (Logistics Manager) · Quản trị viên (Admin)  
> **Màu chủ đạo:** Trắng `#FFFFFF` · Xanh đậm navy `#1E3A5F` · Xanh sidebar `#EFF6FF` · Xanh nhấn `#3B82F6` · Cam cảnh báo `#F97316` · Xanh lá thành công `#22C55E` · Đỏ lỗi `#EF4444` · Xám nền `#F8FAFC`  
> **Font:** Inter / Outfit  
> **Phong cách:** Dashboard chuyên nghiệp, sidebar điều hướng cố định, bảng dữ liệu đầy đủ (tương tự GHN admin panel / FlytBase dashboard)

---

## 1. Bảng Giao Diện Chi Tiết (14 Màn Hình)

| STT | Tên Màn Hình | Đối Tượng Dùng | Mô Tả Chức Năng | Thành Phần Giao Diện Chính | Màu Sắc & Phong Cách |
|:---:|:---|:---|:---|:---|:---|
| 1 | **Trang đăng nhập (Admin)** | Tất cả vai trò | Xác thực và điều hướng theo vai trò sau đăng nhập | Logo SmartDroneDelivery; form email + mật khẩu; nút "Đăng nhập"; thông báo lỗi inline; tự động redirect theo role sau đăng nhập thành công | Nền xanh navy `#1E3A5F`; card trắng giữa màn hình; input bo góc; nút xanh `#3B82F6` |
| 2 | **Layout chung (Sidebar + Header)** | Tất cả vai trò | Khung giao diện dùng chung cho toàn bộ Admin Web | Sidebar trái cố định: logo, menu điều hướng (icon + label) theo role; Header trên: breadcrumb, tên người dùng + avatar, nút đăng xuất, chuông thông báo; vùng nội dung chính (main content) | Sidebar nền `#1E3A5F` text trắng; item active `#3B82F6` nền sáng; header trắng bóng nhẹ; main nền `#F8FAFC` |
| 3 | **Dashboard tổng quan** | Dispatcher, Logistics Manager, Admin | Cái nhìn tổng thể hoạt động giao hàng trong ngày | 4 thẻ KPI: Tổng đơn hôm nay / Đang giao / Hoàn tất / Thất bại; biểu đồ cột đơn hàng theo giờ (7 ngày gần); biểu đồ donut tỷ lệ trạng thái; bảng 5 đơn mới nhất cần xử lý; bản đồ vị trí drone đang hoạt động | Thẻ KPI trắng bóng, số liệu đậm; KPI "Đang giao" xanh `#3B82F6`, "Hoàn tất" xanh lá `#22C55E`, "Thất bại" đỏ `#EF4444`; biểu đồ Chart.js |
| 4 | **Quản lý đơn hàng — Danh sách** | Dispatcher | Xem và xử lý toàn bộ đơn hàng trong hệ thống | Thanh tìm kiếm mã đơn / tên khách; bộ lọc đa cấp (Trạng thái, Ngày tạo, Trạm giao); bảng dữ liệu: Mã đơn, Khách hàng, Địa chỉ, Cân nặng, Trạng thái, Ngày tạo, Hành động; phân trang; nút hành động nhanh: Duyệt / Từ chối / Xem chi tiết | Bảng nền trắng, header xanh nhạt `#EFF6FF`; badge trạng thái màu; nút "Duyệt" xanh lá, "Từ chối" đỏ outline; hover row xám nhạt |
| 5 | **Chi tiết & Phê duyệt đơn hàng** | Dispatcher | Xem chi tiết và ra quyết định duyệt/từ chối đơn | Thông tin đầy đủ đơn (khách hàng, địa chỉ, gói hàng, ghi chú); timeline trạng thái; bản đồ vị trí trạm gần nhất; nút "Phê duyệt" → modal xác nhận; nút "Từ chối" → modal nhập lý do; lịch sử log hành động | Panel 2 cột: trái thông tin đơn, phải bản đồ + hành động; modal confirm trắng bóng; nút Duyệt `#22C55E`, Từ chối `#EF4444` |
| 6 | **Lập lịch giao hàng (Scheduling)** | Dispatcher | Gán trạm hạ cánh và thời gian giao cho đơn đã duyệt | Danh sách đơn "Đã duyệt" cần lên lịch; bản đồ hiển thị trạm khả dụng gần địa chỉ giao (màu xanh = đang hoạt động, đỏ = bảo trì); dropdown chọn trạm; date-time picker chọn giờ giao; nút "Xác nhận lịch"; AI gợi ý ETA dự kiến | Bản đồ toàn chiều cao trái; panel phải: form chọn trạm + giờ; trạm available xanh lá, maintenance cam, ngừng đỏ; ETA hiển thị cam nổi bật |
| 7 | **Xử lý giao hàng thất bại** | Dispatcher | Tiếp nhận và xử lý sự cố đơn giao không thành công | Danh sách đơn "Thất bại" / "Đang có sự cố"; thông tin sự cố (mô tả lỗi, thời điểm, trạm liên quan); 3 lựa chọn hành động: Giao lại (chọn trạm mới) / Hủy đơn / Liên hệ khách hàng; ghi chú xử lý; lịch sử sự cố | Badge đỏ nổi bật cho đơn lỗi; panel hành động xanh nhạt; nút "Giao lại" xanh `#3B82F6`, "Hủy" đỏ `#EF4444`; textarea ghi chú xám nhạt |
| 8 | **Quản lý kiện hàng tại trạm** | Station Operator | Xác nhận nhận kiện hàng và cập nhật trạng thái khi giao | Ô quét / nhập mã đơn to ở trên; thông tin kiện hàng hiện ra sau khi nhập; nút lớn "✔ Xác nhận đã nhận tại trạm"; nút lớn "🚀 Xác nhận gửi đi (Đang giao)"; danh sách kiện hàng đang chờ tại trạm này; nút "Xác nhận giao thành công" | Giao diện đơn giản dành cho thiết bị di động; nút lớn chiều cao 56px; nền trắng; nút "Nhận" `#22C55E`, "Gửi đi" `#3B82F6`; đơn đang chờ badge cam |
| 9 | **Theo dõi giao hàng (Dispatcher/Operator view)** | Dispatcher, Station Operator | Giám sát vị trí và trạng thái tất cả đơn đang giao theo thời gian thực | Bản đồ lớn hiển thị tất cả drone đang hoạt động (icon drone theo màu trạng thái); click drone → popup thông tin đơn, ETA, khách hàng; panel bên phải danh sách đơn đang giao; bộ lọc theo trạm; cập nhật vị trí mỗi 5 giây qua Supabase Realtime | Bản đồ chiếm 70% màn hình; drone icon: đang giao xanh `#3B82F6`, sắp đến cam `#F97316`, có sự cố đỏ `#EF4444`; popup trắng bóng glassmorphism |
| 10 | **Quản lý trạm hạ cánh** | Admin, Dispatcher | CRUD danh sách trạm hạ cánh, giám sát trạng thái | Bản đồ tổng các trạm (màu theo trạng thái); bảng danh sách trạm: Tên, Tọa độ, Sức chứa, Trạng thái, Hành động; nút "Thêm trạm mới" → modal form (tên, tọa độ chọn trên bản đồ, sức chứa); nút Sửa / Xóa; toggle trạng thái (Hoạt động / Bảo trì / Ngừng) | Trạm "Hoạt động" xanh lá `#22C55E`; "Bảo trì" cam `#F97316`; "Ngừng" đỏ `#EF4444`; nút "Thêm" xanh `#3B82F6`; modal trắng bóng |
| 11 | **Báo cáo & Thống kê** | Logistics Manager | Xem báo cáo hiệu suất vận hành giao hàng | Bộ lọc khoảng thời gian (ngày/tuần/tháng); KPI: Tỷ lệ giao thành công, Tổng đơn, TB thời gian giao, Đơn thất bại; biểu đồ đường xu hướng đơn hàng; biểu đồ cột hiệu suất từng trạm; bảng top 5 trạm hiệu quả nhất; nút Xuất báo cáo PDF/Excel | Nền `#F8FAFC`; thẻ KPI trắng viền xanh nhạt; biểu đồ Chart.js màu xanh/xanh lá/cam; nút xuất xanh `#3B82F6` |
| 12 | **Phân tích AI & ETA** | Dispatcher, Logistics Manager | Xem dự đoán ETA và phân tích từ AI cho các đơn đang lên lịch | Danh sách đơn kèm ETA AI dự đoán (khoảng cách, tốc độ TB, giờ dự kiến); biểu đồ phân bố thời gian giao theo khu vực; badge "AI Prediction" nổi bật; nút refresh cập nhật ETA | Nhãn "AI" badge tím `#8B5CF6`; ETA nổi bật cam `#F97316`; biểu đồ gradient xanh; loading skeleton khi fetch AI |
| 13 | **Quản lý người dùng** | Admin | CRUD tài khoản toàn hệ thống, phân quyền vai trò | Bảng danh sách người dùng: Họ tên, Email, Vai trò, Ngày tạo, Trạng thái, Hành động; bộ lọc theo Role; nút "Tạo tài khoản mới" → modal form (họ tên, email, mật khẩu, chọn Role); nút Sửa / Khóa / Mở khóa; ghi log hoạt động | Vai trò badge màu: Admin tím `#7C3AED`, Dispatcher xanh `#2563EB`, Operator vàng `#D97706`, Manager xanh lá `#16A34A`, Customer xám `#6B7280`; trạng thái khóa đỏ nhạt |
| 14 | **Nhật ký hoạt động (Activity Log)** | Admin | Xem log mọi hành động quan trọng trong hệ thống | Bảng log: Thời gian, Người dùng, Hành động, Đối tượng, IP; bộ lọc theo người dùng / hành động / khoảng thời gian; phân trang; nút xuất log CSV | Bảng striped (xen kẽ trắng / xám nhạt `#F8FAFC`); text log font mono nhỏ; badge hành động: Tạo xanh lá, Sửa vàng, Xóa đỏ, Đăng nhập xanh |

---

## 2. Quy Trình Sử Dụng Của Nhân Viên & Quản Lý

### 🛡️ Điều phối viên (Dispatcher)

| Bước | Màn Hình | Hành Động | Kết Quả |
|:---:|:---|:---|:---|
| 1 | Đăng nhập Admin | Nhập tài khoản Dispatcher | Vào Dashboard tổng quan |
| 2 | Dashboard | Xem KPI + bảng đơn cần xử lý | Nhấn vào đơn "Chờ duyệt" |
| 3 | Chi tiết & Phê duyệt | Kiểm tra thông tin, nhấn "Duyệt" | Đơn chuyển "Đã duyệt", hiện MSG-002 |
| 4 | Lập lịch giao hàng | Chọn trạm trên bản đồ + giờ giao | Đơn chuyển "Đã lên lịch" |
| 5 | Theo dõi giao hàng | Giám sát drone realtime trên bản đồ | Phát hiện sự cố → vào màn Xử lý thất bại |
| 6 | Xử lý thất bại | Chọn: Giao lại / Hủy / Liên hệ khách | Cập nhật trạng thái đơn |

### 📦 Nhân viên vận hành trạm (Station Operator)

| Bước | Màn Hình | Hành Động | Kết Quả |
|:---:|:---|:---|:---|
| 1 | Đăng nhập Admin | Nhập tài khoản Operator | Vào giao diện Quản lý kiện tại trạm |
| 2 | Quản lý kiện tại trạm | Quét/nhập mã đơn | Hiện thông tin kiện hàng |
| 3 | Quản lý kiện tại trạm | Nhấn "Xác nhận đã nhận tại trạm" | Trạng thái → "Đã nhận tại trạm" |
| 4 | Quản lý kiện tại trạm | Gắn kiện lên drone, nhấn "Xác nhận gửi đi" | Trạng thái → "Đang giao" |
| 5 | Theo dõi giao hàng | Giám sát hành trình drone | Khi đến đích: xác nhận hoàn tất |

---

## 3. Các Quy Tắc Nghiệp Vụ (Business Rules) Trên Admin UI

| Mã | Quy Tắc Nghiệp Vụ | Màn Hình Áp Dụng | Cách Thể Hiện Trên UI |
|:---:|:---|:---|:---|
| **BR-03** | Mỗi đơn hàng chỉ được gán **một trạm hạ cánh** tại một thời điểm | Lập lịch giao hàng | Dropdown chọn trạm chỉ cho phép chọn 1; sau khi lưu không thể thay đổi trạm trừ khi Dispatcher hủy lịch |
| **BR-04** | Trạm đang **"Bảo trì"** hoặc **"Ngừng"** không được gán đơn mới | Lập lịch giao hàng / Quản lý trạm | Trạm Bảo trì/Ngừng bị grayed out trong dropdown; icon cảnh báo cam/đỏ trên bản đồ; tooltip "Trạm không khả dụng" |
| **BR-06** | Mỗi tài khoản chỉ đăng nhập đồng thời **một thiết bị** | Trang đăng nhập Admin | Khi phát hiện session mới: hiện modal "Thiết bị khác đang đăng nhập" |
| **BR-08** | Sau **24 giờ** không xác nhận giao hàng → chuyển "Chờ xác nhận quá hạn" | Dashboard / Danh sách đơn | Badge đặc biệt màu cam đậm "⏰ Quá hạn xác nhận" + pulse; nút "Xác nhận ngay" nổi bật cho Dispatcher |

---

## 4. Danh Sách Thông Báo Hệ Thống Liên Quan

| Mã | Loại | Nội Dung Thông Báo | Màu Hiển Thị | Vị Trí Hiển Thị |
|:---:|:---:|:---|:---|:---|
| **MSG-002** | ✅ Thành công | Đơn hàng đã được phê duyệt. | Xanh lá `#22C55E` | Toast góc trên phải, tự đóng sau 4s |
| **MSG-003** | ✅ Thành công | Đơn hàng đã được giao thành công. | Xanh lá `#22C55E` | Toast góc trên phải |
| **MSG-004** | ❌ Lỗi | Sai tài khoản hoặc mật khẩu. Vui lòng thử lại. | Đỏ `#EF4444` | Inline dưới form đăng nhập |
| **MSG-005** | ❌ Lỗi | Tài khoản đã bị khóa. Vui lòng liên hệ quản trị viên. | Đỏ `#EF4444` | Inline dưới form đăng nhập |
| **MSG-008** | ❌ Lỗi | Không có trạm hạ cánh khả dụng trong khu vực. | Đỏ `#EF4444` | Toast góc trên phải + highlight bản đồ |
| **MSG-011** | ℹ️ Thông tin | Phiên làm việc sắp hết hạn (5 phút). | Xanh dương `#3B82F6` | Toast góc trên phải kèm nút "Gia hạn" |

---

## 5. Responsive Breakpoints Cho Admin Web

| Breakpoint | Độ Rộng | Thiết Kế Giao Diện |
|:---:|:---:|:---|
| **Mobile** | < 640px | Sidebar ẩn, hiện qua hamburger menu; bảng dữ liệu cuộn ngang; nút hành động thu gọn thành icon; Operator view tối ưu 1 cột |
| **Tablet** | 640px – 1024px | Sidebar thu gọn chỉ hiển thị icon (icon-only mode); bảng 2 cột; bản đồ + panel side-by-side |
| **Desktop** | > 1024px | Sidebar đầy đủ label + icon; bảng full columns; dashboard 4 thẻ KPI hàng ngang; bản đồ chiếm 70% chiều rộng |
| **Large Desktop** | > 1280px | Dashboard 2 cột charts bên cạnh KPI; bản đồ realtime lớn hơn |
