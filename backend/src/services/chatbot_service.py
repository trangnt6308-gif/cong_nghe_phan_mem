from domain.models.ichatbot_repository import IChatbotRepository
from infrastructure.models.app_tin_nhan_chatbot_model import TinNhanChatbotModel
from typing import List, Optional

class ChatbotService:
    def __init__(self, repository: IChatbotRepository):
        self.repository = repository

    def get_history_by_customer_id(self, ma_kh: str) -> List[TinNhanChatbotModel]:
        return self.repository.get_history_by_customer_id(ma_kh)

    def send_message(self, data: dict) -> Optional[TinNhanChatbotModel]:
        customer = self.repository.check_customer_exists(data['ma_kh'])
        if not customer:
            return None
            
        user_content = data['noi_dung']
        ai_response = data.get('phan_hoi')
        
        if not ai_response:
            import os
            api_key = os.environ.get("GROQ_API_KEY")
            
            # Fetch orders context from DB for RAG prompt enrichment & local database fallback
            orders_context = ""
            orders_list_str = ""
            has_orders = False
            try:
                from infrastructure.models.app_don_hang_model import DonHangModel
                from infrastructure.models.app_goi_hang_model import GoiHangModel
                from infrastructure.models.app_dia_chi_model import DiaChiModel
                
                orders = self.repository.session.query(DonHangModel).filter_by(ma_kh=customer.ma_kh).all()
                if orders:
                    has_orders = True
                    lines = []
                    for o in orders:
                        pkg = self.repository.session.query(GoiHangModel).filter_by(ma_don_hang=o.ma_don_hang).first()
                        pkg_desc = f"{pkg.loai_hang_hoa} ({pkg.can_nang}kg)" if pkg else "Kiện hàng"
                        addr = self.repository.session.query(DiaChiModel).filter_by(ma_dia_chi=o.ma_dia_chi).first()
                        addr_desc = addr.dia_chi_cu_the if addr else "Địa chỉ không xác định"
                        short_id = str(o.ma_don_hang)[:8]
                        
                        lines.append(f"- Mã đơn: SD-{short_id}... | Kiện hàng: {pkg_desc} | Giao đến: {addr_desc} | Trạng thái: **{o.trang_thai_don_hang}**")
                        orders_context += f"- Mã đơn: SD-{short_id}... (Mã hệ thống: {o.ma_don_hang}) | Kiện hàng: {pkg_desc} | Địa chỉ: {addr_desc} | Trạng thái: {o.trang_thai_don_hang}\n"
                    
                    orders_list_str = "\n".join(lines)
                else:
                    orders_context = "Khách hàng hiện chưa có đơn hàng nào."
            except Exception as db_err:
                orders_context = f"Không thể kết nối cơ sở dữ liệu: {str(db_err)}"
                
            if api_key:
                import json
                import http.client
                try:
                    conn = http.client.HTTPSConnection("api.groq.com", timeout=10)
                    headers = {
                        "Authorization": f"Bearer {api_key}",
                        "Content-Type": "application/json"
                    }
                    payload = {
                        "model": "qwen/qwen3.8-27b",
                        "messages": [
                            {
                                "role": "system",
                                "content": f"Bạn là trợ lý ảo của dịch vụ giao hàng bằng drone tự động SmartDroneDelivery. Hãy trả lời thân thiện, ngắn gọn và bằng tiếng Việt. Bạn đang phục vụ khách hàng tên là {customer.ho} {customer.ten}. Hãy chào khách hàng bằng tên của họ.\n\nThông tin các đơn hàng hiện tại của khách hàng trong hệ thống:\n{orders_context}\nNếu khách hàng hỏi về thông tin hoặc trạng thái đơn hàng của họ, hãy dựa vào thông tin được cung cấp ở trên để trả lời một cách chính xác nhất."
                            },
                            {
                                "role": "user",
                                "content": user_content
                            }
                        ],
                        "temperature": 0.7
                    }
                    conn.request("POST", "/openai/v1/chat/completions", json.dumps(payload), headers)
                    res = conn.getresponse()
                    if res.status == 200:
                        resp_json = json.loads(res.read().decode('utf-8'))
                        ai_response = resp_json["choices"][0]["message"]["content"]
                    else:
                        raise Exception(f"HTTP {res.status}")
                except Exception as e:
                    # API failure fallback
                    content_lower = user_content.lower()
                    is_asking_orders = any(kw in content_lower for kw in ["đơn", "giao", "ở đâu", "trạng thái", "sd", "eta", "thời gian", "khi nào"])
                    if is_asking_orders and has_orders:
                        ai_response = f"Xin chào {customer.ten}, do kết nối AI tạm thời gián đoạn ({str(e)}), tôi đã lọc nhanh cơ sở dữ liệu cho bạn:\n\n{orders_list_str}\n\nChúc bạn ngày mới tốt lành!"
                    elif is_asking_orders:
                        ai_response = f"Xin chào {customer.ten}, kết nối AI tạm thời gián đoạn ({str(e)}). Tôi kiểm tra hệ thống và thấy bạn chưa có đơn hàng nào được tạo."
                    else:
                        ai_response = f"Xin chào {customer.ten}, kết nối AI tạm thời gián đoạn ({str(e)}). Bạn vừa nói: '{user_content}'. Tôi có thể giúp gì cho bạn?"
            else:
                # No API key local assistant fallback
                content_lower = user_content.lower()
                is_asking_orders = any(kw in content_lower for kw in ["đơn", "giao", "ở đâu", "trạng thái", "sd", "eta", "thời gian", "khi nào"])
                if is_asking_orders and has_orders:
                    ai_response = f"Xin chào {customer.ten}! Trợ lý hệ thống của SmartDrone Delivery đã tìm các đơn hàng của bạn trong cơ sở dữ liệu:\n\n{orders_list_str}\n\nBạn cần trợ giúp gì thêm không?"
                elif is_asking_orders:
                    ai_response = f"Xin chào {customer.ten}! Hiện tại tôi kiểm tra thấy bạn chưa có đơn hàng nào tồn tại trên hệ thống SmartDrone Delivery."
                else:
                    ai_response = f"Xin chào {customer.ten}! Tôi là Trợ lý tự động của SmartDrone Delivery. Hãy hỏi tôi về 'Trạng thái đơn hàng' hoặc 'Đơn hàng của tôi ở đâu' để bắt đầu tra cứu trực tiếp từ hệ thống nhé!"
                
        message = TinNhanChatbotModel(
            ma_kh=data['ma_kh'],
            noi_dung=user_content,
            phan_hoi=ai_response
        )
        return self.repository.save_message(message)
