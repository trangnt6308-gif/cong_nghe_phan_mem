# BÁO CÁO CÁC SƠ ĐỒ THIẾT KẾ CÒN THIẾU (CLASS & SEQUENCE DIAGRAM)
**Dự án:** Hệ thống SmartDroneDelivery
**Ngày lập:** 14/08/2026
**Mục đích:** Liệt kê chi tiết các sơ đồ đang bị thiếu trong tài liệu thiết kế chi tiết (`srs/chapters/phan4.tex`) để phục vụ việc phân công vẽ và chèn sơ đồ cho các thành viên trong nhóm.

---

## 1. TỔNG HỢP CÁC SƠ ĐỒ BỊ THIẾU
Hệ thống hiện tại có tổng cộng **19 Use Case** (sau khi đã đồng bộ hóa Chương III với các sơ đồ tổng thể). Trong đó:
*   **Sơ đồ lớp (Class Diagram)**: Thiếu **6 sơ đồ** cho các Use Case mới thêm.
*   **Sơ đồ tuần tự (Sequence Diagram)**: Thiếu **12 sơ đồ** (6 thuộc về các Use Case cũ đã có đặc tả lớp nhưng chưa vẽ sơ đồ tuần tự, và 6 thuộc về các Use Case mới).

---

## 2. CHI TIẾT CÁC SƠ ĐỒ LỚP CẦN BỔ SUNG (6 Sơ đồ)
Với các Use Case mới này, cần thiết kế **Sơ đồ lớp chi tiết** (gồm Controller, Service, Repository, Entity, DTOs) và bảng đặc tả các lớp tương ứng:

1.  **UC-14: Quản lý trạm hạ cánh** (Landing Station Management)
    *   *Nội dung cần vẽ:* Giao diện quản lý trạm $\rightarrow$ `Controller` $\rightarrow$ `Service` $\rightarrow$ `Repository` $\rightarrow$ `TramHaCanh` Entity.
2.  **UC-15: Xem báo cáo và thống kê (Dashboard)**
    *   *Nội dung cần vẽ:* Dashboard Page $\rightarrow$ `Controller` $\rightarrow$ `Service` $\rightarrow$ `Repository` để truy vấn thống kê dữ liệu.
3.  **UC-16: Quản lý địa chỉ giao hàng**
    *   *Nội dung cần vẽ:* Sổ địa chỉ khách hàng $\rightarrow$ `Controller` $\rightarrow$ `Service` $\rightarrow$ `Repository` $\rightarrow$ `DiaChi` Entity.
4.  **UC-17: Đăng ký tài khoản mới**
    *   *Nội dung cần vẽ:* Giao diện đăng ký $\rightarrow$ `Controller` $\rightarrow$ `Service` $\rightarrow$ `SupabaseAuthClient` $\rightarrow$ `KhachHang` / `NguoiDung` Entity.
5.  **UC-18: Quản lý thông tin cá nhân**
    *   *Nội dung cần vẽ:* Profile Page $\rightarrow$ `Controller` $\rightarrow$ `Service` $\rightarrow$ `Repository` $\rightarrow$ `NguoiDung` Entity.
6.  **UC-19: Tóm tắt thông tin giao hàng bằng AI**
    *   *Nội dung cần vẽ:* Giao diện đơn hàng $\rightarrow$ `Controller` $\rightarrow$ `Service` $\rightarrow$ `LLMClient` (gửi request đến Gemini/Groq API) $\rightarrow$ `GiaoHang` / `DonHang` Entity.

---

## 3. CHI TIẾT CÁC SƠ ĐỒ TUẦN TỰ CẦN BIÊN SOẠN (12 Sơ đồ)

Sơ đồ tuần tự thể hiện luồng giao tiếp theo thời gian giữa các lớp (Client $\rightarrow$ Controller $\rightarrow$ Service $\rightarrow$ Repository $\rightarrow$ Database). 

### Nhóm A: 6 Use Case cũ bị khuyết sơ đồ tuần tự
1.  **UC-04: Phê duyệt yêu cầu giao hàng** (Tác nhân: Dispatcher)
    *   Luồng: Dispatcher click Duyệt $\rightarrow$ Service kiểm tra trạm khả dụng $\rightarrow$ Cập nhật trạng thái đơn.
2.  **UC-05: Lập lịch giao hàng** (Tác nhân: Dispatcher)
    *   Luồng: Dispatcher lên lịch $\rightarrow$ Service kiểm tra sức chứa trạm $\rightarrow$ Tạo bản ghi GiaoHang mới.
3.  **UC-06: Xử lý giao hàng thất bại** (Tác nhân: Dispatcher)
    *   Luồng: Khởi tạo sự cố $\rightarrow$ Robot/Drone quay đầu $\rightarrow$ Ghi nhận lỗi vào su_co_giao_hang.
4.  **UC-10: Ước lượng thời gian giao hàng dự kiến (ETA)** (Tác nhân: Customer, Dispatcher)
    *   Luồng: Client gửi yêu cầu $\rightarrow$ Service tính khoảng cách dựa trên tọa độ GPS giữa Trạm và Địa chỉ giao $\rightarrow$ Trả về ETA.
5.  **UC-11: Trợ lý AI cho khách hàng (Chatbot)** (Tác nhân: Customer)
    *   Luồng: Nhập tin nhắn $\rightarrow$ Service lấy context đơn hàng $\rightarrow$ Gửi prompt qua LLM API $\rightarrow$ Trả về text và lưu lịch sử.
6.  **UC-12: Tạo và quản lý tài khoản người dùng** (Tác nhân: Admin)
    *   Luồng: Admin tạo tài khoản $\rightarrow$ Gọi API tạo user $\rightarrow$ Phân quyền RBAC.

### Nhóm B: 6 Use Case mới bị khuyết sơ đồ tuần tự
7.  **UC-14: Quản lý trạm hạ cánh** (Tác nhân: Admin/Logistics Manager)
    *   Luồng: CRUD trạm hạ cánh $\rightarrow$ Hệ thống lưu database và đồng bộ.
8.  **UC-15: Xem báo cáo và thống kê (Dashboard)** (Tác nhân: Logistics Manager)
    *   Luồng: Yêu cầu xem dashboard $\rightarrow$ Kết xuất các chỉ số và biểu đồ hiệu suất.
9.  **UC-16: Quản lý địa chỉ giao hàng** (Tác nhân: Customer)
    *   Luồng: Cập nhật lat/lng và địa chỉ của khách hàng vào bảng dia_chi.
10. **UC-17: Đăng ký tài khoản mới** (Tác nhân: Khách vãng lai)
    *   Luồng: Đăng ký thông tin $\rightarrow$ Gửi lên Supabase Auth $\rightarrow$ Kích hoạt tài khoản.
11. **UC-18: Quản lý thông tin cá nhân** (Tác nhân: Tất cả)
    *   Luồng: Thay đổi họ tên, số điện thoại hoặc đổi mật khẩu cũ.
12. **UC-19: Tóm tắt thông tin giao hàng bằng AI** (Tác nhân: Customer/Dispatcher/LM)
    *   Luồng: Nhấp tóm tắt $\rightarrow$ Query db lấy log hành trình $\rightarrow$ Call LLM sinh văn bản tóm tắt $\rightarrow$ Hiển thị kết quả.
