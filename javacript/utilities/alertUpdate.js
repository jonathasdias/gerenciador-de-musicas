var interval;
export default function alertUpdate(content) {
    const alert_update = document.getElementById('alert-update');
    const text_alert = document.getElementById('text-alert');
    alert_update.classList.remove('hidden');
    text_alert.innerHTML = content;
    clearTimeout(interval)

    interval = setTimeout(()=> {
        alert_update.classList.add('hidden');
    }, 2000);
}