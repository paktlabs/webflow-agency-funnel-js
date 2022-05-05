function bake_cookie(name, value) {
  let cookie = [name, '=', JSON.stringify(value), '; domain=.', window.location.host.toString(), '; path=/;'].join('');
  document.cookie = cookie;
}

function read_cookie(name) {
  let result = document.cookie.match(new RegExp(name + '=([^;]+)'));
  result && (result = JSON.parse(result[1]));
  return result;
}

function build_params(params) {
  let result = "";
  let keys = Object.keys(params);
  for (const k of keys) {
    result += k + "=" + params[k] + "&";
  }
  result = result.slice(0, -1);
  return result;
}

function get_cookied_url_params(cookieName) {

  let cookieVal = read_cookie(cookieName);
  if(Object.keys(cookieVal).length == 0) {
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    let entries = urlParams.entries();
    let obj = {};
    for(const entry of entries) {
      obj[entry[0]] = entry[1];
    }
    bake_cookie(cookieName, obj);
    cookieVal = obj;
  }
  return build_params(cookieVal);
}

function update_common_links(cookieName) {
  let navQuoteLink = document.getElementById("navQuoteLink");
  let faqLink = document.getElementById("faqLink");
  let claimsLink = document.getElementById("claimsLink");
  let accountLink = document.getElementById("accountLink");
  let paktLink = document.getElementById("paktLink");
  let do317Link = document.getElementById("do317Link");

  let legalLink = document.getElementById("legalLink");
  let tosLink = document.getElementById("tosLink");
  let privacyLink = document.getElementById("privacyLink");

  let claimsFooter = document.getElementById("claimsFooter");
  let homeFooter = document.getElementById("homeFooter");
  let do317Footer = document.getElementById("do317Footer");
  let fileClaimFooter = document.getElementById("fileClaimFooter");

  let trackParams = "?" + get_cookied_url_params(cookieName);

  navQuoteLink.href += trackParams;
  faqLink.href += trackParams;
  claimsLink.href += trackParams;
  accountLink.href += trackParams;
  paktLink.href += trackParams;
  do317Link.href += trackParams;

  legalLink.href += trackParams;
  tosLink.href += trackParams;
  privacyLink.href += trackParams;

  claimsFooter.href += trackParams;
  homeFooter.href += trackParams;
  do317Footer.href += trackParams;
  fileClaimFooter.href += trackParams;

}
