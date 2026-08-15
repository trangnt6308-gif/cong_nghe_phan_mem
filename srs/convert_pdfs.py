import fitz, os

BASE = r"c:\bài tập\dự án học tập\dự án công nghệ phần mềm\srs\so-do"
SEQ  = r"c:\bài tập\dự án học tập\dự án công nghệ phần mềm\srs\so-do\sodo-tuantu"
OUT  = r"C:\Users\pc\.gemini\antigravity\brain\bf959ca5-9020-4425-b0d4-ce69b0216dc4"

uc_pdfs = [
    "uc_ai_analytics.pdf",
    "uc_customer_order.pdf",
    "uc_package_management.pdf",
    "uc_station_management.pdf",
    "uc_tracking_confirmation.pdf",
]

seq_pdfs = [
    "Cập nhật và hủy đơn hàng.drawio.pdf",
    "Theo Dõi Giao Hàng Thời Gian Thực.drawio.pdf",
    "Tạo đơn hàng mới.drawio.pdf",
    "Xác Nhận Giao Hàng Thành Công.drawio.pdf",
    "Xác Nhận Nhận_Gửi Kiện Hàng Tại Trạm.drawio.pdf",
    "Đăng nhập và phân quyền.drawio.pdf",
]

def convert(folder, fname, outname):
    path = os.path.join(folder, fname)
    doc = fitz.open(path)
    for i, page in enumerate(doc):
        pix = page.get_pixmap(dpi=120)
        out = os.path.join(OUT, f"{outname}_p{i+1}.png")
        pix.save(out)
        print(f"Saved: {out}")

print("=== UC Diagrams ===")
for f in uc_pdfs:
    name = f.replace(".pdf","").replace(" ","_")
    convert(BASE, f, name)

print("=== Sequence Diagrams ===")
for f in seq_pdfs:
    name = f.replace(".drawio.pdf","").replace(".pdf","")
    name = "seq_" + name[:30].replace(" ","_").replace("/","_")
    convert(SEQ, f, name)

print("All done!")
