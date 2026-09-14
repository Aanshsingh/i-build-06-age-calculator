const TDate = document.getElementById('TDate');
const dateBirth = document.getElementById('dateBirth');
const rYears = document.getElementById('rYears');
const rMonths = document.getElementById('rMonths');
const rDays = document.getElementById('rDays');
const refreshBtn = document.getElementById('refreshBtn');
 
function pad(n) {
    return String(n).padStart(2, '0');
}
 
function toISO(d) {
    const y = d.getFullYear();
    const m = pad(d.getMonth() + 1);
    const day = pad(d.getDate());
    return `${y}-${m}-${day}`;
}
 
function formatDisplay(d) {
    return `${pad(d.getDate())} - ${pad(d.getMonth() + 1)} - ${d.getFullYear()}`;
}
 
function getToday() {
    return new Date();
}
 
function setDefaults() {
    const today = getToday();
    TDate.textContent = formatDisplay(today);
    TDate.dataset.iso = toISO(today);
 
    const defaultBirthday = new Date(1991, 10, 29); // 29 Nov 1991
    dateBirth.value = toISO(defaultBirthday);
}
 
function calcAge() {
    const todayISO = TDate.dataset.iso;
    const birthISO = dateBirth.value;
 
    if (!todayISO || !birthISO) {
        rYears.textContent = '00';
        rMonths.textContent = '00';
        rDays.textContent = '00';
        return;
    }
 
    const today = new Date(todayISO + 'T00:00:00');
    const birth = new Date(birthISO + 'T00:00:00');
 
    if (birth > today) {
        rYears.textContent = '00';
        rMonths.textContent = '00';
        rDays.textContent = '00';
        return;
    }
 
    let years = today.getFullYear() - birth.getFullYear();
    let months = today.getMonth() - birth.getMonth();
    let days = today.getDate() - birth.getDate();
 
    if (days < 0) {
        months -= 1;
        const prevMonth = new Date(today.getFullYear(), today.getMonth(), 0);
        days += prevMonth.getDate();
    }
    if (months < 0) {
        years -= 1;
        months += 12;
    }
 
    rYears.textContent = pad(years);
    rMonths.textContent = pad(months);
    rDays.textContent = pad(days);
}
 
dateBirth.addEventListener('change', calcAge);
refreshBtn.addEventListener('click', () => {
    setDefaults();
    calcAge();
});
 
setDefaults();
calcAge();