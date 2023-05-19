/* eslint-disable no-restricted-globals */
/* eslint-disable no-undef */
const contactform = document.querySelector('.contact_form');
const disibleControl = document.querySelector('.disible-control');
const login = document.querySelector('#login');

login.addEventListener('click', async (e) => {
  e.preventDefault();
  popupLoading('Logging in...');
  const email = document.querySelector('#email').value;
  const password = document.querySelector('#password').value;

  if (email == '' || password == '') {
    popupLoadingRemove();
    popup(warning, 'Please fill empty fields !!');

    return 0;
  }
  disibleControl.style.display = 'block';
  try {
    await axios.post('/api/v1/user/login', {
      email,
      password,
    });
    popupLoadingRemove();
    popup(success, 'Logged in successfully');
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
