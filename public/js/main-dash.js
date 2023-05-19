/* eslint-disable no-restricted-globals */
/* eslint-disable no-undef */
const menu = document.querySelector('.menu_banner_area');
const toggler = document.querySelector('.navbar-toggler');
const barA = document.querySelector('.icon-bar-a');
const barB = document.querySelector('.icon-bar-b');

async function logoutDash() {
  try {
    await axios.get('/api/v1/user/logout');
    popup(success, 'Logged out successfully');
    setTimeout(() => {
      location.assign("/login");
    }, 3000);
  } catch (error) {
    console.log(error);
    if (error.response.data?.message) {
      popup(failure, `${error.response.data.message}`);
    } else {
      popup(failure, `${error.message}`);
    }
  }
}

toggler.addEventListener('click', () => {
  menu.style.marginLeft == "" ? menu.style.marginLeft = "-258px" : "";
  if (menu.style.marginLeft == '-258px') {
    menu.style.marginLeft = '0px';
  } else {
    menu.style.marginLeft = '-258px';
  }
});
