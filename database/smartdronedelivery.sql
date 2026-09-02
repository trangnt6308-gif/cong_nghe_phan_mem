-- SmartDroneDelivery - Supabase Database Schema
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- 1. Bảng Vai trò (vai_tro)
CREATE TABLE vai_tro (
    ma_vai_tro UUID PRIMARY KEY DEFAULT uuid_generate_v4 (),
    ten_vai_tro VARCHAR(50) NOT NULL UNIQUE,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

COMMENT ON TABLE vai_tro IS 'Bảng lưu các vai trò trong hệ thống: Admin, Logistics Manager, Dispatcher, Station Operator, Customer';

-- 2. Bảng Người dùng (nguoi_dung)
CREATE TABLE nguoi_dung (
    ma_nguoi_dung UUID PRIMARY KEY DEFAULT uuid_generate_v4 (),
    ma_vai_tro UUID NOT NULL REFERENCES vai_tro (ma_vai_tro) ON DELETE RESTRICT,
    ho_ten VARCHAR(150) NOT NULL,
    email VARCHAR(255) NOT NULL UNIQUE,
    so_dien_thoai VARCHAR(20),
    mat_khau_hash TEXT NOT NULL,
    ngay_tao TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

COMMENT ON TABLE nguoi_dung IS 'Bảng lưu thông tin tài khoản người dùng hệ thống, liên kết với bảng vai_tro';

scm-history-item:c%3A%5Cb%C3%A0i%20t%E1%BA%ADp%5Cd%E1%BB%B1%20%C3%A1n%20h%E1%BB%8Dc%20t%E1%BA%ADp%5Cd%E1%BB%B1%20%C3%A1n%20c%C3%B4ng%20ngh%E1%BB%87%20ph%E1%BA%A7n%20m%E1%BB%81m?%7B%22repositoryId%22%3A%22scm0%22%2C%22historyItemId%22%3A%22554d182f9d203a587d47005e6a927eb9ef9d4fee%22%2C%22historyItemParentId%22%3A%22c2ebb62d0908bc702db2f602c318b2f6f8cc1e3e%22%2C%22historyItemDisplayId%22%3A%22554d182%22%7D
CREATE INDEX idx_nguoi_dung_vai_tro ON nguoi_dung (ma_vai_tro);

CREATE INDEX idx_nguoi_dung_email ON nguoi_dung (email);

-- 3. Bảng Khách hàng (khach_hang)
CREATE TABLE khach_hang (
    ma_kh UUID PRIMARY KEY DEFAULT uuid_generate_v4 (),
    ten VARCHAR(50) NOT NULL,
    ten_dem VARCHAR(50),
    ho VARCHAR(50) NOT NULL,
    gioi_tinh VARCHAR(10) CHECK (
        gioi_tinh IN ('Nam', 'Nữ', 'Khác')
    ),
    so_dien_thoai VARCHAR(20),
    email VARCHAR(255) UNIQUE,
    ngay_sinh DATE,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

COMMENT ON TABLE khach_hang IS 'Bảng lưu thông tin khách hàng đặt đơn giao hàng';

CREATE INDEX idx_khach_hang_email ON khach_hang (email);

-- 4. Bảng Địa chỉ (dia_chi)
CREATE TABLE dia_chi (
    ma_dia_chi UUID PRIMARY KEY DEFAULT uuid_generate_v4 (),
    ma_kh UUID NOT NULL REFERENCES khach_hang (ma_kh) ON DELETE CASCADE,
    dia_chi_cu_the TEXT NOT NULL,
    thanh_pho VARCHAR(100) NOT NULL,
    lat DOUBLE PRECISION NOT NULL,
    lng DOUBLE PRECISION NOT NULL,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

COMMENT ON TABLE dia_chi IS 'Bảng lưu các địa chỉ giao hàng của khách hàng, mỗi khách hàng có thể có nhiều địa chỉ';

CREATE INDEX idx_dia_chi_khach_hang ON dia_chi (ma_kh);

-- 5. Bảng Tin nhắn Chatbot (tin_nhan_chatbot)
CREATE TABLE tin_nhan_chatbot (
    ma_tin_nhan UUID PRIMARY KEY DEFAULT uuid_generate_v4 (),
    ma_kh UUID NOT NULL REFERENCES khach_hang (ma_kh) ON DELETE CASCADE,
    noi_dung TEXT NOT NULL,
    phan_hoi TEXT,
    thoi_gian TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

COMMENT ON TABLE tin_nhan_chatbot IS 'Bảng lưu lịch sử hội thoại giữa khách hàng và chatbot AI';

CREATE INDEX idx_tin_nhan_khach_hang ON tin_nhan_chatbot (ma_kh);

CREATE INDEX idx_tin_nhan_thoi_gian ON tin_nhan_chatbot (thoi_gian DESC);

-- 6. Bảng Đơn hàng (don_hang)
CREATE TABLE don_hang (
    ma_don_hang UUID PRIMARY KEY DEFAULT uuid_generate_v4 (),
    ma_kh UUID NOT NULL REFERENCES khach_hang (ma_kh) ON DELETE RESTRICT,
    ma_dia_chi UUID NOT NULL REFERENCES dia_chi (ma_dia_chi) ON DELETE RESTRICT,
    trang_thai_don_hang VARCHAR(30) NOT NULL DEFAULT 'Chờ duyệt' CHECK (
        trang_thai_don_hang IN (
            'Chờ duyệt',
            'Đã duyệt',
            'Bị từ chối',
            'Đã lên lịch',
            'Đang giao',
            'Đã giao thành công',
            'Giao thất bại',
            'Đã hủy'
        )
    ),
    cach_thuc_thanh_toan VARCHAR(50),
    tong_tien DECIMAL(15, 2) DEFAULT 0,
    ngay_dat_hang TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    ngay_cap_nhat TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

COMMENT ON TABLE don_hang IS 'Bảng lưu thông tin đơn hàng giao, mỗi khách hàng có thể đặt nhiều đơn';

CREATE INDEX idx_don_hang_khach_hang ON don_hang (ma_kh);

CREATE INDEX idx_don_hang_dia_chi ON don_hang (ma_dia_chi);

CREATE INDEX idx_don_hang_trang_thai ON don_hang (trang_thai_don_hang);

CREATE INDEX idx_don_hang_ngay_dat ON don_hang (ngay_dat_hang DESC);

-- 7. Bảng Trạm hạ cánh (tram_ha_canh)
CREATE TABLE tram_ha_canh (
    ma_tram UUID PRIMARY KEY DEFAULT uuid_generate_v4 (),
    ten_tram VARCHAR(150) NOT NULL,
    dia_chi_tram TEXT NOT NULL,
    lat DOUBLE PRECISION NOT NULL,
    lng DOUBLE PRECISION NOT NULL,
    cong_suat_toi_da INT NOT NULL DEFAULT 10,
    trang_thai_hoat_dong VARCHAR(20) NOT NULL DEFAULT 'Đang hoạt động' CHECK (
        trang_thai_hoat_dong IN (
            'Đang hoạt động',
            'Bảo trì',
            'Ngừng'
        )
    ),
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

COMMENT ON TABLE tram_ha_canh IS 'Bảng lưu thông tin các trạm hạ cánh của drone trong hệ thống';

CREATE INDEX idx_tram_trang_thai ON tram_ha_canh (trang_thai_hoat_dong);

-- 8. Bảng Gói hàng (goi_hang)
CREATE TABLE goi_hang (
    ma_goi_hang UUID PRIMARY KEY DEFAULT uuid_generate_v4 (),
    ma_don_hang UUID NOT NULL REFERENCES don_hang (ma_don_hang) ON DELETE CASCADE,
    ma_tram UUID REFERENCES tram_ha_canh (ma_tram) ON DELETE SET NULL,
    loai_hang_hoa VARCHAR(100) NOT NULL,
    can_nang DECIMAL(8, 2) NOT NULL CHECK (
        can_nang > 0
        AND can_nang <= 5
    ),
    kich_co VARCHAR(50),
    gia_tri_uoc_tinh DECIMAL(15, 2) DEFAULT 0,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

COMMENT ON TABLE goi_hang IS 'Bảng lưu thông tin gói hàng thuộc đơn hàng, mỗi đơn hàng gồm nhiều gói hàng, mỗi gói hàng được tiếp nhận tại một trạm';

CREATE INDEX idx_goi_hang_don_hang ON goi_hang (ma_don_hang);

CREATE INDEX idx_goi_hang_tram ON goi_hang (ma_tram);

-- 9. Bảng Drone (drone)
CREATE TABLE drone (
    ma_drone UUID PRIMARY KEY DEFAULT uuid_generate_v4 (),
    trang_thai_drone VARCHAR(30) NOT NULL DEFAULT 'Sẵn sàng' CHECK (
        trang_thai_drone IN (
            'Sẵn sàng',
            'Đang giao',
            'Bảo trì',
            'Hỏng'
        )
    ),
    cong_suat_pin INT NOT NULL DEFAULT 100 CHECK (
        cong_suat_pin >= 0
        AND cong_suat_pin <= 100
    ),
    ngay_bao_tri_gan_nhat TIMESTAMPTZ,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

COMMENT ON TABLE drone IS 'Bảng lưu thông tin drone dùng để giao hàng';

CREATE INDEX idx_drone_trang_thai ON drone (trang_thai_drone);

-- 10. Bảng Giao hàng (giao_hang)
CREATE TABLE giao_hang (
    ma_giao_hang UUID PRIMARY KEY DEFAULT uuid_generate_v4 (),
    ma_don_hang UUID NOT NULL REFERENCES don_hang (ma_don_hang) ON DELETE CASCADE,
    ma_drone UUID REFERENCES drone (ma_drone) ON DELETE SET NULL,
    ma_nguoi_phu_trach UUID REFERENCES nguoi_dung (ma_nguoi_dung) ON DELETE SET NULL,
    trang_thai_giao_hang VARCHAR(30) NOT NULL DEFAULT 'Chờ xử lý' CHECK (
        trang_thai_giao_hang IN (
            'Chờ xử lý',
            'Đang giao',
            'Đã giao',
            'Giao thất bại'
        )
    ),
    vi_tri_hien_tai_lat DOUBLE PRECISION,
    vi_tri_hien_tai_lng DOUBLE PRECISION,
    thoi_gian_giao TIMESTAMPTZ,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

COMMENT ON TABLE giao_hang IS 'Bảng lưu thông tin chuyến giao hàng, liên kết đơn hàng với drone và người phụ trách';

CREATE INDEX idx_giao_hang_don_hang ON giao_hang (ma_don_hang);

CREATE INDEX idx_giao_hang_drone ON giao_hang (ma_drone);

CREATE INDEX idx_giao_hang_nguoi_phu_trach ON giao_hang (ma_nguoi_phu_trach);

CREATE INDEX idx_giao_hang_trang_thai ON giao_hang (trang_thai_giao_hang);

-- 11. Bảng Sự cố giao hàng (su_co_giao_hang)
CREATE TABLE su_co_giao_hang (
    ma_van_de UUID PRIMARY KEY DEFAULT uuid_generate_v4 (),
    ma_tram UUID REFERENCES tram_ha_canh (ma_tram) ON DELETE SET NULL,
    ma_giao_hang UUID NOT NULL REFERENCES giao_hang (ma_giao_hang) ON DELETE CASCADE,
    thoi_gian_xay_ra TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    mo_ta_su_co TEXT NOT NULL,
    muc_do_nghiem_trong VARCHAR(20) NOT NULL DEFAULT 'Trung bình' CHECK (
        muc_do_nghiem_trong IN (
            'Thấp',
            'Trung bình',
            'Cao',
            'Nghiêm trọng'
        )
    ),
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

COMMENT ON TABLE su_co_giao_hang IS 'Bảng ghi nhận các sự cố phát sinh trong quá trình giao hàng, liên kết với trạm hạ cánh và chuyến giao hàng';

CREATE INDEX idx_su_co_giao_hang ON su_co_giao_hang (ma_giao_hang);

CREATE INDEX idx_su_co_tram ON su_co_giao_hang (ma_tram);

CREATE INDEX idx_su_co_muc_do ON su_co_giao_hang (muc_do_nghiem_trong);

-- 12. Bảng Thông báo (thong_bao)
CREATE TABLE thong_bao (
    ma_thong_bao UUID PRIMARY KEY DEFAULT uuid_generate_v4 (),
    ma_kh UUID NOT NULL REFERENCES khach_hang (ma_kh) ON DELETE CASCADE,
    ma_don_hang UUID REFERENCES don_hang (ma_don_hang) ON DELETE SET NULL,
    trang_thai VARCHAR(20) NOT NULL DEFAULT 'Chưa đọc' CHECK (
        trang_thai IN ('Chưa đọc', 'Đã đọc')
    ),
    thoi_gian_gui TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    noi_dung TEXT NOT NULL
);

COMMENT ON TABLE thong_bao IS 'Bảng lưu thông báo gửi đến khách hàng khi trạng thái đơn hàng thay đổi';

CREATE INDEX idx_thong_bao_khach_hang ON thong_bao (ma_kh);

CREATE INDEX idx_thong_bao_don_hang ON thong_bao (ma_don_hang);

CREATE INDEX idx_thong_bao_trang_thai ON thong_bao (trang_thai);

CREATE INDEX idx_thong_bao_thoi_gian ON thong_bao (thoi_gian_gui DESC);

-- Vai trò mặc định
INSERT INTO
    vai_tro (ten_vai_tro)
VALUES ('Admin'),
    ('Logistics Manager'),
    ('Dispatcher'),
    ('Station Operator'),
    ('Customer');

-- TRIGGER: Tự động cập nhật updated_at khi có thay đổi
CREATE OR REPLACE FUNCTION trigger_set_updated_at()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Áp dụng trigger cho các bảng có cột updated_at
CREATE TRIGGER set_updated_at_vai_tro
    BEFORE UPDATE ON vai_tro
    FOR EACH ROW EXECUTE FUNCTION trigger_set_updated_at();

CREATE TRIGGER set_updated_at_nguoi_dung
    BEFORE UPDATE ON nguoi_dung
    FOR EACH ROW EXECUTE FUNCTION trigger_set_updated_at();

CREATE TRIGGER set_updated_at_khach_hang
    BEFORE UPDATE ON khach_hang
    FOR EACH ROW EXECUTE FUNCTION trigger_set_updated_at();

CREATE TRIGGER set_updated_at_dia_chi
    BEFORE UPDATE ON dia_chi
    FOR EACH ROW EXECUTE FUNCTION trigger_set_updated_at();

CREATE TRIGGER set_updated_at_don_hang
    BEFORE UPDATE ON don_hang
    FOR EACH ROW
    EXECUTE FUNCTION trigger_set_updated_at();

CREATE TRIGGER set_updated_at_tram_ha_canh
    BEFORE UPDATE ON tram_ha_canh
    FOR EACH ROW EXECUTE FUNCTION trigger_set_updated_at();

CREATE TRIGGER set_updated_at_goi_hang
    BEFORE UPDATE ON goi_hang
    FOR EACH ROW EXECUTE FUNCTION trigger_set_updated_at();

CREATE TRIGGER set_updated_at_drone
    BEFORE UPDATE ON drone
    FOR EACH ROW EXECUTE FUNCTION trigger_set_updated_at();

CREATE TRIGGER set_updated_at_giao_hang
    BEFORE UPDATE ON giao_hang
    FOR EACH ROW EXECUTE FUNCTION trigger_set_updated_at();

-- SUPABASE ROW LEVEL SECURITY (RLS)
ALTER TABLE vai_tro ENABLE ROW LEVEL SECURITY;

ALTER TABLE nguoi_dung ENABLE ROW LEVEL SECURITY;

ALTER TABLE khach_hang ENABLE ROW LEVEL SECURITY;

ALTER TABLE dia_chi ENABLE ROW LEVEL SECURITY;

ALTER TABLE tin_nhan_chatbot ENABLE ROW LEVEL SECURITY;

ALTER TABLE don_hang ENABLE ROW LEVEL SECURITY;

ALTER TABLE tram_ha_canh ENABLE ROW LEVEL SECURITY;

ALTER TABLE goi_hang ENABLE ROW LEVEL SECURITY;

ALTER TABLE drone ENABLE ROW LEVEL SECURITY;

ALTER TABLE giao_hang ENABLE ROW LEVEL SECURITY;

ALTER TABLE su_co_giao_hang ENABLE ROW LEVEL SECURITY;

ALTER TABLE thong_bao ENABLE ROW LEVEL SECURITY;

-- RLS POLICIES: Cho phép service_role truy cập toàn bộ
-- (Bạn cần bổ sung thêm các policy chi tiết theo vai trò)
CREATE POLICY "Service role full access" ON vai_tro FOR ALL USING (true)
WITH
    CHECK (true);

CREATE POLICY "Service role full access" ON nguoi_dung FOR ALL USING (true)
WITH
    CHECK (true);

CREATE POLICY "Service role full access" ON khach_hang FOR ALL USING (true)
WITH
    CHECK (true);

CREATE POLICY "Service role full access" ON dia_chi FOR ALL USING (true)
WITH
    CHECK (true);

CREATE POLICY "Service role full access" ON tin_nhan_chatbot FOR ALL USING (true)
WITH
    CHECK (true);

CREATE POLICY "Service role full access" ON don_hang FOR ALL USING (true)
WITH
    CHECK (true);

CREATE POLICY "Service role full access" ON tram_ha_canh FOR ALL USING (true)
WITH
    CHECK (true);

CREATE POLICY "Service role full access" ON goi_hang FOR ALL USING (true)
WITH
    CHECK (true);

CREATE POLICY "Service role full access" ON drone FOR ALL USING (true)
WITH
    CHECK (true);

CREATE POLICY "Service role full access" ON giao_hang FOR ALL USING (true)
WITH
    CHECK (true);

CREATE POLICY "Service role full access" ON su_co_giao_hang FOR ALL USING (true)
WITH
    CHECK (true);

CREATE POLICY "Service role full access" ON thong_bao FOR ALL USING (true)
WITH
    CHECK (true);