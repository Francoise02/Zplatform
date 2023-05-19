
const updateNormalForm = document.querySelector('#normal-data');
const updatePasswordForm = document.querySelector('#password-data');
const verifyAccountForm = document.querySelector('#verify-data');

updateNormalForm.addEventListener("submit", async (e) => {
  e.preventDefault();
  popupLoading('Updating profile...');
  const formData = new FormData(updateNormalForm);
  try {
    await axios
      .patch(`/api/v1/user/updateMe`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
    popupLoadingRemove();
    popup(success, 'Profile updated successfully');
    setTimeout(() => {
      location.reload();
    }, 3000);

  } catch (error) {
    console.log(error)
    popupLoadingRemove();
    if (error.response.data?.message) {
      popup(failure, `${error.response.data.message}`);
    } else {
      popup(failure, `${error.message}`);
    }
  }

});

verifyAccountForm.addEventListener("submit", async (e) => {
  e.preventDefault();
  popupLoading('Uploading the document...');
  const formData = new FormData(verifyAccountForm);
  try {
    await axios
      .patch(`/api/v1/user/verifyMe`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
    popupLoadingRemove();
    popup(success, 'Account verification is under review');
    setTimeout(() => {
      location.reload();
    }, 3000);

  } catch (error) {
    console.log(error)
    popupLoadingRemove();
    if (error.response.data?.message) {
      popup(failure, `${error.response.data.message}`);
    } else {
      popup(failure, `${error.message}`);
    }
  }

});

updatePasswordForm.addEventListener("submit", async (e) => {
  e.preventDefault();
  popupLoading('Changing password...');
  const password_current = document.querySelector('#oldpassword').value;
  const password = document.querySelector('#npassword').value;
  const password_confirm = document.querySelector('#cnpassword').value;
  try {
    await axios
      .patch(`/api/v1/user/updatepassword`, {
        password,
        password_confirm,
        password_current
      });
    popupLoadingRemove();
    popup(success, 'Password changed successfully');
    setTimeout(() => {
      location.reload();
    }, 3000);

  } catch (error) {
    popupLoadingRemove();
    if (error.response.data?.message) {
      popup(failure, `${error.response.data.message}`);
    } else {
      popup(failure, `${error.message}`);
    }
  }

});

