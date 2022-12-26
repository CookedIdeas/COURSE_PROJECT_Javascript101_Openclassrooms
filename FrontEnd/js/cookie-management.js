export function setCookie(name, value, expirationInHours) {
  var expires = "";
  if (expirationInHours) {
    var now = new Date();
    var time = now.getTime();
    var expireTime = time + expirationInHours * 60 * 60 * 1000;
    now.setTime(expireTime);
    expires = "; expires=" + now.toUTCString() + ";";
  }
  document.cookie = name + "=" + (value || "") + expires;
}

export function eraseCookie(name) {
  document.cookie = name + "=; Max-Age=-99999999;";
}

export function getCookie(name) {
  var nameEQ = name + "=";
  var ca = document.cookie.split(";");
  for (var i = 0; i < ca.length; i++) {
    var c = ca[i];
    while (c.charAt(0) == " ") c = c.substring(1, c.length);
    // console.log(c.substring(nameEQ.length, c.length));
    if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length, c.length);
  }
  return null;
}
