/* eslint-disable no-restricted-globals */
/* eslint-disable no-undef */
const contactform = document.querySelector('#send-reset');
const disibleControl = document.querySelector('.disible-control');

contactform.addEventListener('click', async (e) => {
  e.preventDefault();
  popupLoading('Resetting password...');

  const password = document.querySelector('#password').value;
  const password_confirm = document.querySelector('#password_confirm').value;
  const token = document.querySelector('#token').value;

  if (password == '' || password_confirm == '') {
    popupLoadingRemove();
    popup(warning, 'Please fill empty fields!!');

    return 0;
  }
  if (password !== password_confirm) {
    popupLoadingRemove();
    popup(warning, 'The two passwords must much !!');

    return 0;
  }

  disibleControl.style.display = 'block';
  try {
    await axios.patch(`/api/v1/user/resetpassword/${token}`, {
      password,
      password_confirm,
    });
    popupLoadingRemove();
    document.querySelector('#password').value = '';
    document.querySelector('#password_confirm').value = '';
    popup(success, 'Password reset successfully');
    setTimeout(() => {
      location.assign('/login');
    }, 3000);
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
