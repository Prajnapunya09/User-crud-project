let f_name = document.getElementById("name")
let f_email = document.getElementById("email")
let f_mobile = document.getElementById("mobile")
let userForm = document.getElementById("userForm")

let errName = document.getElementById('nameErr')
let errEmail = document.getElementById('emailErr')
let errMobile = document.getElementById('mobileErr')

const url = "https://node-crud-api-0n4d.onrender.com";


// read the user id from router query
let urlParams = new URLSearchParams(window.location.search)
let id = urlParams.get("userId")
console.log(`user id =`, id)


// submit event listener
userForm.addEventListener("submit", async (e) => {
        e.preventDefault(); // to avoid page refresh on event submit
        let user = {
            name: f_name.value,
            email: f_email.value,
            mobile: f_mobile.value
        }

       if(validate(user)) {
           console.log(`new user =`, user);
           await fetch(`${url}/api/user/update/${id}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(user)
           }).then(out => out.json())
           .then(res => {
                alert(res?.msg)
                window.location.href = "/";
           })
           .catch(err => console.error(err?.response?.msg))
       } else {
        console.error(`error in the form inputs`)
       }
})

// validate 
function validate(user) {
     let isValid = true;

        if(!user?.name) {
            errName.innerText = "name is required";
            errName.style.color = "red";
            isValid = false;
        } else if (!/^[a-zA-Z ]+$/.test(user?.name)) {
             errName.innerText = "invalid name format";
            errName.style.color = "red";
            isValid = false;
        }

        if(!user?.email) {
            errEmail.innerText = "email is required";
            errEmail.style.color = "red";
            isValid = false;
        // } else if (!/\S+@\S+\.\S+/.test(user?.email)) {
        } else if (!/^[a-z0-9_-]+@[a-z0-9-]+?\.[a-z]{2,10}$/.test(user?.email)) {
             errEmail.innerText = "invalid email format";
            errEmail.style.color = "red";
            isValid = false;
        }


        if(!user?.mobile) {
            errMobile.innerText = "mobile is required";
            errMobile.style.color = "red";
            isValid = false;
        } else if (!/^(0|\+91)?[6-9]\d{9}$/.test(user?.mobile)) {
            errMobile.innerText = "invalid indian mobile number";
            errMobile.style.color = "red";
            isValid = false;
        }
        

        setTimeout(() => {
            errName.innerText = "";
            errEmail.innerText = "";
            errMobile.innerText = "";
        },3000)

        return isValid
}


// read single user data from db ref is userid
async function getUserById(id) {
    await fetch(`${url}/api/user/single/${id}`)
          .then(out => out.json())
           .then(res => {
                console.log(`single user =`, res)
                f_name.value = res?.user.name
                f_email.value = res?.user?.email
                f_mobile.value = res?.user?.mobile
           }).catch(err => console.error(err?.data?.msg))
}

getUserById(id)