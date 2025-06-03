const form = document.querySelector("form");
const loginBtn = document.querySelector('.signin')

form.addEventListener("submit", async (e) => {
  e.preventDefault();

  const formData = {
    email: document.getElementById("email").value,
    password: document.getElementById("password").value,
    name: document.getElementById("name").value,
    avatar: document.getElementById("avatar").value
  };

  try {
    const res = await fetch(`https://api.escuelajs.co/api/v1/users/`, {
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
      alert("SignUp successful!");
      location.href = "/login/index.html";
    } else {
      alert("Error signing up");
    }
  } catch (error) {
    console.error(error);
    alert("Something went wrong!");
  }
});

loginBtn.addEventListener('click',() => {
    window.location.href = '/login/index.html'
})