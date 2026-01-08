const formData = {
  email: '',
  message: '',
};

const STORAGE_KEY = 'feedback-form-state'; //ключ для локалсторедж
const form = document.querySelector('.feedback-form'); //форма

const savedFormData = localStorage.getItem(STORAGE_KEY); //отримеємо збережені дані з локалсторедж у json форматі

if (savedFormData) {
  //якщо є збережені дані
  const parsedFormData = JSON.parse(savedFormData); //парсимо збережені дані у об'єкт
  formData.email = parsedFormData.email ?? '';
  formData.message = parsedFormData.message ?? '';

  form.email.value = formData.email;
  form.message.value = formData.message;
}

form.addEventListener('input', event => {
  const { name, value } = event.target; //отримуємо ім'я і значення інпуту
  if (!name) return; //якщо немає імені, виходимо з функції

  formData[name] = value.trim(); //записуємо значення інпуту у об'єкт formData
  localStorage.setItem(STORAGE_KEY, JSON.stringify(formData)); //зберігаємо об'єкт у локалсторедж у json форматі
});

form.addEventListener('submit', event => {
  event.preventDefault(); //відміняємо стандартну поведінку форми

  localStorage.removeItem(STORAGE_KEY); //видаляємо збережені дані з локалсторедж

  formData.email = '';
  formData.message = '';
  form.reset(); //скидаємо форму
});
