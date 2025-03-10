const container = document.querySelector('.container')
const registbtn = document.querySelector('.register-btn')
const loginbtn = document.querySelector('.login-btn')

registbtn.addEventListener("click",()=>{container.classList.add('active');})
loginbtn.addEventListener("click",()=>{container.classList.remove('active');})
