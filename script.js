// تأثير النجوم عند تحريك الماوس
document.addEventListener("mousemove", (e) => {
  const star = document.createElement("div");
  star.className = "star";
  star.style.left = e.pageX + "px";
  star.style.top = e.pageY + "px";
  document.body.appendChild(star);

  setTimeout(() => {
    star.remove();
  }, 800);
});

// دالة إظهار Toast تفاعلي
function showToast(message, type = "success") {
  const toast = document.getElementById("toast");
  if (!toast) return;

  toast.textContent = message;
  toast.className = "toast " + type + " show";

  setTimeout(() => {
    toast.classList.remove("show");
  }, 3000);
}

// نموذج التواصل / الشكاوي
const form = document.getElementById("contactForm");
if (form) {
  form.addEventListener("submit", (e) => {
    e.preventDefault();

    const name = form.querySelector("input[type='text']").value;
    const type = form.querySelector("select").value;
    const details = form.querySelector("textarea").value;

    // إرسال البيانات إلى Google Apps Script
    fetch("https://docs.google.com/spreadsheets/d/1pRVWZPvSM85EAA8T8VFETWihSiOUlnT0DkS_yoMOs5w/edit?usp=sharing", {
      method: "POST",
      body: JSON.stringify({ name, type, details }),
      headers: { "Content-Type": "Complaints" }
    })
    .then(res => res.text())
    .then(() => {
      showToast("✅ تم إرسال الشكوى وحفظها في Google Sheets");
      form.reset();
      displayComplaints(); // تحديث القائمة محلياً
    })
    .catch(() => {
      showToast("❌ حدث خطأ أثناء الإرسال", "error");
    });
  });
}

// عرض الشكاوي المحفوظة محلياً (اختياري)
function displayComplaints() {
  const listContainer = document.getElementById("complaintsList");
  if (!listContainer) return;

  listContainer.innerHTML = "";
  let complaints = JSON.parse(localStorage.getItem("complaints")) || [];

  complaints.forEach((c, index) => {
    const li = document.createElement("li");
    li.className = "complaint-card";

    const text = document.createElement("div");
    text.className = "complaint-text";
    text.textContent = `${index + 1}- ${c.name} (${c.type}): ${c.details}`;

    const actions = document.createElement("div");
    actions.className = "complaint-actions";

    // زر حذف
    const deleteBtn = document.createElement("button");
    deleteBtn.innerHTML = '<i class="fa-solid fa-trash"></i>';
    deleteBtn.onclick = () => {
      complaints.splice(index, 1);
      localStorage.setItem("complaints", JSON.stringify(complaints));
      displayComplaints();
      showToast("🗑️ تم حذف الشكوى", "error");
    };

    // زر نسخ
    const copyBtn = document.createElement("button");
    copyBtn.innerHTML = '<i class="fa-solid fa-copy"></i>';
    copyBtn.onclick = () => {
      navigator.clipboard.writeText(`${c.name} (${c.type}): ${c.details}`).then(() => {
        showToast("📋 تم نسخ الشكوى");
      }).catch(() => {
        showToast("❌ حدث خطأ أثناء النسخ", "error");
      });
    };

    actions.appendChild(copyBtn);
    actions.appendChild(deleteBtn);

    li.appendChild(text);
    li.appendChild(actions);
    listContainer.appendChild(li);
  });
}

// زر تبديل الوضع الليلي/النهاري
const toggleBtn = document.getElementById("modeToggle");
if (toggleBtn) {
  toggleBtn.addEventListener("click", () => {
    const body = document.body;

    if (body.classList.contains("night-mode")) {
      body.classList.remove("night-mode");
      body.classList.add("day-mode");
      toggleBtn.innerHTML = '<i class="fa-solid fa-sun"></i> الوضع النهاري';
      showToast("☀️ تم تفعيل الوضع النهاري");
    } else {
      body.classList.remove("day-mode");
      body.classList.add("night-mode");
      toggleBtn.innerHTML = '<i class="fa-solid fa-moon"></i> الوضع الليلي';
      showToast("🌙 تم تفعيل الوضع الليلي");
    }
  });
}

// أزرار نسخ حسابات الديسكورد
document.querySelectorAll(".copy-btn").forEach((btn) => {
  btn.addEventListener("click", () => {
    const user = btn.parentElement.querySelector(".discord-user").textContent.trim();
    navigator.clipboard.writeText(user).then(() => {
      showToast("📋 تم نسخ الحساب: " + user);
    }).catch(() => {
      showToast("❌ حدث خطأ أثناء النسخ", "error");
    });
  });
});

// تشغيل عند تحميل الصفحة
window.onload = displayComplaints;
