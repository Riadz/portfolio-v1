//handling contact form
const form = document.getElementById('contact-form');
form.addEventListener('submit', (e) => {
  e.preventDefault();
  contactStatusSending()

  const data = new FormData(form);

  fetch('https://rh-works.cf/mailer/mailer.php', {
    method: 'POST',
    mode: 'cors',
    credentials: 'same-origin',
    body: data
  })
    .then(res => res.json())
    .then(res => {
      if (res.response)
        contactStatusSuccess();
      else
        contactStatusError(res.error_message);
    })
    .catch(err => {
      contactStatusError(err)
    })
});

const contactStatus = document.querySelector('.contact-send-status');
const statusMessage = document.getElementById('status-message');

function contactStatusSending() {
  contactStatus.classList.remove('success');
  contactStatus.classList.remove('error');
  contactStatus.classList.add('sending');

  statusMessage.innerText = statusMessage.dataset.sending;

}
function contactStatusSuccess() {
  contactStatus.classList.remove('sending');
  contactStatus.classList.remove('error');
  contactStatus.classList.add('success');

  statusMessage.innerText = statusMessage.dataset.success;
}
function contactStatusError(error) {
  contactStatus.classList.remove('sending');
  contactStatus.classList.remove('success');
  contactStatus.classList.add('error');

  statusMessage.innerText = error;
}
