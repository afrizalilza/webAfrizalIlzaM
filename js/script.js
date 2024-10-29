$(document).ready(function () {
  // Validasi form
  $("#registration-form").submit(function (e) {
    e.preventDefault();
    if (validateForm()) {
      alert("Pendaftaran berhasil!");
      this.reset();
    }
  });

  // Efek hover pada tombol dan link
  $(".btn, .nav-link").hover(
    function () {
      $(this).css("opacity", "0.8");
    },
    function () {
      $(this).css("opacity", "1");
    }
  );

  // Tambah fitur baru
  $("#tambah-fitur").click(function () {
    var newFeature = prompt("Masukkan fitur baru:");
    if (newFeature) {
      $("#fitur-list").append("<li>" + newFeature + "</li>");
    }
  });

  $(window).scroll(function () {
    if ($(this).scrollTop() > 50) {
      $(".navbar").addClass("navbar-scrolled");
    } else {
      $(".navbar").removeClass("navbar-scrolled");
    }
  });

  $("#login-form").submit(function (e) {
    e.preventDefault();
    var email = $("#email").val();
    var password = $("#password").val();

    // Simulasi login sederhana
    if (email && password) {
      // Simpan status login di localStorage
      localStorage.setItem("isLoggedIn", "true");
      localStorage.setItem("userEmail", email);

      // Redirect ke halaman index
      window.location.href = "index.html";
    } else {
      alert("Mohon isi email dan password");
    }
  });

  // Cek status login saat halaman dimuat
  function checkLoginStatus() {
    var isLoggedIn = localStorage.getItem("isLoggedIn");
    var userEmail = localStorage.getItem("userEmail");

    if (isLoggedIn === "true" && userEmail) {
      // User sudah login
      $('.nav-link[href="login.html"]').text("Logout (" + userEmail + ")");
      $('.nav-link[href="login.html"]').attr("href", "#");
      $('.nav-link[href="#"]').click(function (e) {
        e.preventDefault();
        localStorage.removeItem("isLoggedIn");
        localStorage.removeItem("userEmail");
        location.reload();
      });
    }
  }

  checkLoginStatus();
});

function validateForm() {
  var nama = $("#nama").val();
  var email = $("#email").val();
  var password = $("#password").val();
  var paket = $("#paket").val();
  var setuju = $("#setuju").is(":checked");

  if (!nama || !email || !password || !paket || !setuju) {
    alert("Semua field harus diisi dan syarat & ketentuan harus disetujui.");
    return false;
  }

  return true;
}

// Fungsi untuk mengecek status login
function checkLoginStatus() {
  const isLoggedIn = localStorage.getItem("isLoggedIn");
  const userEmail = localStorage.getItem("userEmail");
  
  // Jika belum login dan mencoba mengakses halaman utama
  if (!isLoggedIn && window.location.pathname !== "/login.html") {
    window.location.href = "login.html";
    return false;
  }
  
  // Jika sudah login dan mencoba mengakses halaman login
  if (isLoggedIn && window.location.pathname === "/login.html") {
    window.location.href = "index.html";
    return false;
  }
  
  return true;
}

// Fungsi untuk logout
function logout() {
    localStorage.removeItem("isLoggedIn");
    localStorage.removeItem("userEmail");
    window.location.href = "login.html";
}

// Menambahkan event listener untuk form login
$(document).ready(function() {
    // Handle form login
    $("#login-form").submit(function(e) {
        e.preventDefault();
        
        const email = $("#email").val();
        const password = $("#password").val();
        
        // Simpan status login
        localStorage.setItem("isLoggedIn", "true");
        localStorage.setItem("userEmail", email);
        
        // Redirect ke halaman utama
        window.location.href = "index.html";
    });
    
    // Modifikasi link Login menjadi Logout jika sudah login
    if (localStorage.getItem("isLoggedIn")) {
        $(".nav-link:contains('Login')").text("Logout").attr("onclick", "logout()");
    }
});

// Fungsi untuk kembali ke halaman sebelumnya
function goBack() {
    window.history.back();
}

// Update fungsi handleSubmit
async function handleSubmit(event) {
    event.preventDefault();
    const submitButton = form.querySelector('.btn-send-message');
    
    // Tambahkan class loading
    submitButton.classList.add('loading');
    submitButton.querySelector('i').classList.remove('fa-paper-plane');
    submitButton.querySelector('i').classList.add('fa-spinner');
    
    var status = document.createElement("div");
    status.classList.add("alert");
    var data = new FormData(event.target);
    
    try {
        const response = await fetch(event.target.action, {
            method: form.method,
            body: data,
            headers: {
                Accept: "application/json",
            },
        });
        
        if (response.ok) {
            // Success state
            submitButton.classList.remove('loading');
            submitButton.classList.add('success');
            submitButton.querySelector('i').classList.remove('fa-spinner');
            submitButton.querySelector('i').classList.add('fa-check');
            
            status.classList.add("alert-success");
            status.innerHTML = "Terima kasih! Pesan Anda telah terkirim.";
            form.reset();
            
            // Reset button after 2 seconds
            setTimeout(() => {
                submitButton.classList.remove('success');
                submitButton.querySelector('i').classList.remove('fa-check');
                submitButton.querySelector('i').classList.add('fa-paper-plane');
            }, 2000);
        } else {
            throw new Error('Submission failed');
        }
    } catch (error) {
        // Error state
        submitButton.classList.remove('loading');
        submitButton.querySelector('i').classList.remove('fa-spinner');
        submitButton.querySelector('i').classList.add('fa-paper-plane');
        
        status.classList.add("alert-danger");
        status.innerHTML = "Oops! Ada masalah saat mengirim pesan Anda.";
    }
    
    form.appendChild(status);
}
