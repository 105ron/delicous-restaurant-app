import axios from 'axios';
import { $ } from './bling'

function ajaxHeart(event) {
  event.preventDefault();
  axios
    .post(this.action)
    .then((res) => {
      const isNowHearted = this.heart.classList.toggle('heart__button--hearted');
      $('.heart-count').textContent = res.data.hearts.length;
      if (isNowHearted) {
        this.heart.classList.add('heart__button--float');
        setTimeout(() => this.heart.classList.remove('heart__button--float'), 2500);
      }
    })
    .catch(err => console.log(err));
}

export default ajaxHeart;
