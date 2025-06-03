const form = document.querySelector("form");
const createAccBtn = document.querySelector('.create-account-btn')

form.addEventListener("submit", async (e) => {
  e.preventDefault();

  const formData = {
    email: document.getElementById("email").value,
    password: document.getElementById("password").value,
  };

  try {
    const res = await fetch(`https://api.escuelajs.co/api/v1/auth/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    });
    if (res.ok) {
      const data = await res.json();
      localStorage.setItem('email', formData.email);
      localStorage.setItem("access_token", data.access_token);
      localStorage.setItem("refresh_token", data.refresh_token);
      alert("Login successful!");
      location.href = "/index.html";
    } else {
      alert("Error signing up");
    }
  } catch (error) {
    console.error(error);
    alert("Something went wrong!");
  }
});

createAccBtn.addEventListener('click',(e) =>{
    window.location.href = '/sign-up/index.html'
})

