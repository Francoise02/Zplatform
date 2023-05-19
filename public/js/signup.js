/* eslint-disable no-restricted-globals */
/* eslint-disable no-undef */
const contactform = document.querySelector('.contact_form');
const disibleControl = document.querySelector('.disible-control');
const signup = document.querySelector('#signup');

signup.addEventListener('click', async (e) => {
    e.preventDefault();
    popupLoading('Signing up...');
    const email = document.querySelector('#email').value;
    const password = document.querySelector('#password').value;
    const password_confirm = document.querySelector('#password_confirm').value;
    const firstName = document.querySelector('#firstName').value;
    const lastName = document.querySelector('#lastName').value;
    const phoneNumber = document.querySelector('#phoneNumber').value;
    const Age = document.querySelector('#Age').value;
    const gender = document.querySelector('#gender').value;
    const maritalStatus = document.querySelector('#maritalStatus').value;
    const nationality = document.querySelector('#nationality').value;


    if (email == '' || password == '' || password_confirm == '' || firstName == '' || lastName == '' || phoneNumber == '' || Age == '' || gender == '' || maritalStatus == '' || nationality == '') {
        popupLoadingRemove();
        popup(warning, 'Please fill empty fields !!');

        return 0;
    }
    disibleControl.style.display = 'block';
    try {
        await axios.post('/api/v1/user/signup', {
            firstName,
            lastName,
            email,
            password,
            phoneNumber,
            Age,
            gender,
            maritalStatus,
            nationality,
            repeat_password: password_confirm
            
        });
        popupLoadingRemove();
        popup(success, 'Successfully created your account');
        setTimeout(() => {
            location.assign('/profile');
        }, 3000);
    } catch (error) {
        popupLoadingRemove();
        console.log(error);
        disibleControl.style.display = 'none';
        if (error.response.data?.message) {
            popup(failure, `${error.response.data.message}`);
        } else {
            popup(failure, `${error.message}`);
        }
    }
});
