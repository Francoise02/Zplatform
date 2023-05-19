const success = document.querySelector('.popup-success');
const warning = document.querySelector('.popup-warning');
const failure = document.querySelector('.popup-failure');
const loading = document.querySelector('.popup-loading');
const readMore = document.querySelector('.modal_banner_read');
const readBlock = document.querySelector('.read_block');

function popup(action, message) {
  action.classList.remove('hide');
  action.children[1].children[0].innerHTML = message;
  action.style.transform = 'translate(-20%,-50%)';

  setTimeout(() => {
    action.style.transform = 'translate(120%,-50%)';
  }, 3000);
}
function popupLoading(message) {
  loading.classList.remove('hide');
  loading.children[1].children[0].innerHTML = message;
  loading.style.transform = 'translate(-20%,-50%)';


}
function popupLoadingRemove() {
  loading.style.transform = 'translate(120%,-50%)';
}

function readMoreModal(title, content) {
  readMore.children[0].innerHTML = title;
  readMore.children[1].children[0].innerHTML = content;
  readMore.classList.add('upwards-read');
  readBlock.style.display = 'block';

  readBlock.addEventListener("click", () => {
    readMore.classList.remove('upwards-read');
    readBlock.style.display = 'none';
  })

}
