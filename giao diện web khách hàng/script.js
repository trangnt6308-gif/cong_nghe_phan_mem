const pages=[...document.querySelectorAll(".page")];
let loggedIn=false, authRegister=false, currentOrder=null;

let orders=[
 {id:"SD-20260812-001",name:"Tài liệu dự án",weight:1.2,address:"12 Nguyễn Huệ, Quận 1",status:"Đang giao",time:"12/08/2026 20:30",note:"Giao tận tay"},
 {id:"SD-20260812-002",name:"Hộp phụ kiện",weight:2.1,address:"45 Lê Lợi, Quận 1",status:"Chờ duyệt",time:"12/08/2026 21:05",note:""},
 {id:"SD-20260810-014",name:"Hồ sơ",weight:.8,address:"25 Điện Biên Phủ, Bình Thạnh",status:"Hoàn tất",time:"10/08/2026 14:20",note:""},
 {id:"SD-20260808-007",name:"Sản phẩm mẫu",weight:3.4,address:"88 Võ Văn Tần, Quận 3",status:"Hoàn tất",time:"08/08/2026 10:10",note:""}];

function showPage(id){
 if(!loggedIn && ["dashboard","create","orders","detail","tracking","chatbot","profile"].includes(id)){id="login"}
 pages.forEach(p=>p.classList.toggle("hidden",p.id!==id));
 window.scrollTo(0,0);
 if(id==="dashboard"){renderDashboard()}
 if(id==="orders"){renderOrders()}
 if(id==="profile"){loadProfile()}
 if(id==="chatbot"){document.getElementById("chat-input").focus()}
 if(id==="detail" && currentOrder){renderDetail()}
 document.getElementById("public-nav").classList.toggle("hidden",loggedIn);
 document.getElementById("user-nav").classList.toggle("hidden",!loggedIn);
 document.getElementById("chat-float").classList.toggle("hidden",!loggedIn || id==="chatbot");
}
function toast(msg,type="success"){const root=document.getElementById("toast-root");const el=document.createElement("div");el.className="toast "+(type==="error"?"error":"");el.textContent=msg;root.appendChild(el);setTimeout(()=>el.remove(),4000)}
function toggleAuth(){
 authRegister=!authRegister;
 document.getElementById("auth-title").textContent=authRegister?"Đăng ký":"Đăng nhập";
 document.getElementById("auth-subtitle").textContent=authRegister?"Tạo tài khoản khách hàng mới":"Chào mừng bạn quay lại SmartDroneDelivery";
 document.getElementById("auth-submit").textContent=authRegister?"Đăng ký":"Đăng nhập";
 document.getElementById("auth-toggle").textContent=authRegister?"Đã có tài khoản? Đăng nhập":"Chưa có tài khoản? Đăng ký";
 document.getElementById("register-name").classList.toggle("hidden",!authRegister);
 document.getElementById("register-confirm").classList.toggle("hidden",!authRegister);
 document.getElementById("password-checks").classList.toggle("hidden",!authRegister);
}
function handleAuth(e){
 e.preventDefault();
 const email=document.getElementById("email").value,password=document.getElementById("password").value;
 if(authRegister){
   const name=document.getElementById("name").value.trim(),confirm=document.getElementById("confirm").value;
   if(password.length<8){toast("Mật khẩu tối thiểu 8 ký tự.","error");return}
   if(password!==confirm){toast("Mật khẩu xác nhận không khớp.","error");return}
   localStorage.setItem("sdd_user",JSON.stringify({name:name||"Khách hàng",email}));
   toast("Đăng ký tài khoản thành công.");
 }else{
   if(!email||!password){toast("Vui lòng nhập đầy đủ thông tin.","error");return}
 }
 loggedIn=true; localStorage.setItem("sdd_login","1");
 const u=JSON.parse(localStorage.getItem("sdd_user")||'{"name":"Nguyễn Trường","email":"demo@smartdrone.vn"}');
 document.getElementById("user-name").textContent=u.name;
 showPage("dashboard");
}
function demoLogin(){
 localStorage.setItem("sdd_user",JSON.stringify({name:"Nguyễn Trường",email:"demo@smartdrone.vn"}));
 document.getElementById("email").value="demo@smartdrone.vn";document.getElementById("password").value="12345678";
 loggedIn=true;showPage("dashboard");toast("Đăng nhập demo thành công.");
}
function logout(){loggedIn=false;localStorage.removeItem("sdd_login");showPage("landing");toast("Bạn đã đăng xuất.")}
function statusBadge(s){let c=s==="Đang giao"?"blue":s==="Chờ duyệt"?"yellow":s==="Hoàn tất"?"green":"red";return `<span class="badge ${c}">${s}</span>`}
function renderDashboard(){
 document.getElementById("stat-delivering").textContent=orders.filter(o=>o.status==="Đang giao").length;
 document.getElementById("stat-pending").textContent=orders.filter(o=>o.status==="Chờ duyệt").length;
 document.getElementById("stat-done").textContent=orders.filter(o=>o.status==="Hoàn tất").length;
 document.getElementById("recent-orders").innerHTML=orders.slice(0,4).map(o=>`<div class="order-row"><div><div class="order-id">${o.id}</div><div class="order-meta">${o.name} • ${o.address}</div></div>${statusBadge(o.status)}</div>`).join("");
}
function validateWeight(){
 const v=Number(document.getElementById("weight").value),err=document.getElementById("weight-error");
 if(v>5){err.textContent="MSG-006: Gói hàng vượt tải trọng cho phép (tối đa 5kg).";return false}
 err.textContent="";return true
}
function nextCreate(n){
 if(n===2 && !validateWeight()){return}
 if(n===2 && !document.getElementById("pkg-name").value.trim()){toast("Vui lòng nhập tên kiện hàng.","error");return}
 if(n===3){
   if(!document.getElementById("address").value.trim()){toast("Vui lòng nhập địa chỉ giao.","error");return}
   const name=document.getElementById("pkg-name").value,weight=document.getElementById("weight").value,address=document.getElementById("address").value,time=document.getElementById("delivery-time").value,note=document.getElementById("note").value;
   document.getElementById("order-summary").innerHTML=`<b>Tên kiện:</b> ${name}<br><b>Cân nặng:</b> ${weight} kg<br><b>Địa chỉ:</b> ${address}<br><b>Thời gian:</b> ${time}<br><b>Ghi chú:</b> ${note||"Không có"}`;
 }
 [1,2,3].forEach(i=>{document.getElementById("create-step"+i).classList.toggle("hidden",i!==n);document.getElementById("step"+i).classList.toggle("active",i<=n)})
}
function createOrder(){
 const id="SD-"+new Date().toISOString().slice(0,10).replaceAll("-","")+ "-" + String(Math.floor(Math.random()*900)+100);
 orders.unshift({id,name:document.getElementById("pkg-name").value,weight:Number(document.getElementById("weight").value),address:document.getElementById("address").value,status:"Chờ duyệt",time:new Date().toLocaleString("vi-VN"),note:document.getElementById("note").value});
 toast("Đơn hàng đã được tạo thành công.");
 showPage("orders");
}
function renderOrders(){
 const q=(document.getElementById("order-search")?.value||"").toLowerCase(),f=document.getElementById("order-filter")?.value||"Tất cả";
 const data=orders.filter(o=>(f==="Tất cả"||o.status===f)&&(`${o.id} ${o.name} ${o.address}`.toLowerCase().includes(q)));
 document.getElementById("orders-list").innerHTML=data.length?data.map(o=>`<div class="order-card"><div class="order-card-top"><div><h3>${o.id}</h3><p>${o.name} • ${o.weight} kg<br>📍 ${o.address}</p></div>${statusBadge(o.status)}</div><div class="order-card-bottom"><small class="muted">${o.time}</small><div class="order-actions"><button class="small-btn" onclick="openDetail('${o.id}')">Chi tiết</button>${o.status==="Chờ duyệt"?`<button class="small-btn" style="background:#fee2e2;color:#b91c1c" onclick="cancelOrder('${o.id}')">Hủy</button>`:""}</div></div></div>`).join(""):`<div class="panel">Không tìm thấy đơn hàng.</div>`;
}
function openDetail(id){currentOrder=orders.find(o=>o.id===id);showPage("detail")}
function renderDetail(){
 const o=currentOrder;if(!o)return;
 document.getElementById("detail-title").textContent=o.id;
 document.getElementById("detail-subtitle").textContent=`Tạo ngày ${o.time} • ${statusBadge(o.status)}`;
 document.getElementById("detail-info").innerHTML=`<div><span>Kiện hàng</span><b>${o.name}</b></div><div><span>Cân nặng</span><b>${o.weight} kg</b></div><div><span>Địa chỉ</span><b>${o.address}</b></div><div><span>Ghi chú</span><b>${o.note||"Không có"}</b></div>`;
 const steps=["Chờ duyệt","Đã duyệt","Lên lịch","Đang giao","Hoàn tất"],idx=o.status==="Chờ duyệt"?0:o.status==="Đang giao"?3:o.status==="Hoàn tất"?4:1;
 document.getElementById("timeline").innerHTML=steps.map((s,i)=>`<div class="tl ${i<=idx?"done":""}"><b>${s}</b><small>${i<=idx?"Đã cập nhật":"Chưa cập nhật"}</small></div>`).join("");
 document.getElementById("detail-cancel").classList.toggle("hidden",o.status!=="Chờ duyệt");
}
function cancelCurrent(){if(currentOrder)cancelOrder(currentOrder.id)}
function cancelOrder(id){const o=orders.find(x=>x.id===id);if(!o||o.status!=="Chờ duyệt"){toast("MSG-009: Đơn hàng đã được xử lý, không thể thay đổi.","error");return}o.status="Hủy";toast("Đơn hàng đã được hủy.");currentOrder=o;showPage("orders")}
function confirmReceived(){const o=orders.find(x=>x.status==="Đang giao");if(o)o.status="Hoàn tất";toast("Đơn hàng đã được giao thành công.");showPage("dashboard")}
function askBot(text){document.getElementById("chat-input").value=text;sendChat()}
function sendChat(){
 const input=document.getElementById("chat-input"),text=input.value.trim();if(!text)return;
 const box=document.getElementById("chat-messages");box.innerHTML+=`<div class="bubble user">${text}</div>`;input.value="";
 setTimeout(()=>{let reply="Mình có thể giúp bạn kiểm tra đơn hàng và ETA.";if(/eta/i.test(text)||/thời gian/i.test(text))reply="Đơn SD-20260812-001 hiện đang giao, ETA dự kiến khoảng 12 phút.";else if(/ở đâu|trạng thái|đơn/i.test(text))reply="Đơn SD-20260812-001 đang ở trạng thái Đang giao.";box.innerHTML+=`<div class="bubble bot">${reply}</div>`;box.scrollTop=box.scrollHeight},500)
}
function loadProfile(){const u=JSON.parse(localStorage.getItem("sdd_user")||'{"name":"Nguyễn Trường","email":"demo@smartdrone.vn"}');document.getElementById("profile-name").value=u.name;document.getElementById("profile-email").value=u.email}
function saveProfile(){const u=JSON.parse(localStorage.getItem("sdd_user")||"{}");u.name=document.getElementById("profile-name").value||"Khách hàng";localStorage.setItem("sdd_user",JSON.stringify(u));document.getElementById("user-name").textContent=u.name;toast("Đã lưu thay đổi hồ sơ.")}
(function init(){loggedIn=localStorage.getItem("sdd_login")==="1";showPage(loggedIn?"dashboard":"landing")})()
