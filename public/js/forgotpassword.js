/* eslint-disable no-restricted-globals */
/* eslint-disable no-undef */
const contactformForgot = document.querySelector('#send-forgot');
const disibleControl = document.querySelector('.disible-control');

contactformForgot.addEventListener('click', async (e) => {
  e.preventDefault();
  popupLoading('Sending token...');
  const email = document.querySelector('#email').value;

  if (email == '') {
    popupLoadingRemove();
    popup(warning, 'Please fill empty field !!');

    return 0;
  }

  disibleControl.style.display = 'block';
  try {
    await axios.post('/api/v1/user/forgotpassword', {
      email,
    });
    popupLoadingRemove();
    document.querySelector('#email').value = '';
    popup(success, 'Reset token was sent to your Email address');
    disibleControl.style.display = 'none';
  } catch (error) {
    popupLoadingRemove();
    disibleControl.style.display = 'none';
    console.log(error);
    if (error.response.data?.message) {
      popup(failure, `${error.response.data.message}`);
    } else {
      popup(failure, `${error.message}`);
    }
  }
});
