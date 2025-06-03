const accounSection = document.querySelector(".account-card");
const token = localStorage.getItem('access_token'); 
if (!token) {
  window.location.href = '/login/index.html'; 
}
fetch("https://api.escuelajs.co/api/v1/users")
  .then((res) => res.json())
  .then((users) => {
    const myEmail = localStorage.getItem('email'); 
    const myUser = users.find((user) => user.email === myEmail);

    if (myUser) {
      myProfileData(myUser);
      console.log("User id:", myUser.id);
    } else {
      console.log("User topilmadi");
    }
  })
  .catch((err) => console.error(err));

function myProfileData(data) {
  console.log(data);
  accounSection.innerHTML = `
        <h2>Profile Information</h2>
        <img url='${data.avatar}' alt='my photo'/>
        <p><strong>Name:</strong> ${data.name}</p>
        <p><strong>Email:</strong> ${data.email}</p>
        <p><strong>Role:</strong> ${data.role}</p>
        <button class="btn-primary">Edit Profile</button>
    `;
}
